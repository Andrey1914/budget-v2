import { NextApiRequest, NextApiResponse } from "next";
import { reviewService } from "@/services/reviewService";
import { getToken } from "next-auth/jwt";

const secret = process.env.JWT_SECRET;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  switch (req.method) {
    case "GET":
      try {
        const { all } = req.query;

        if (all === "true") {
          const publicReviews = await reviewService.getAllPublicReviews();
          return res.status(200).json(publicReviews);
        }

        const token = await getToken({ req, secret });
        if (!token || !token.sub) {
          return res.status(401).json({ error: "Unauthorized" });
        }

        const userReviews = await reviewService.getUserReviews(token.sub);
        return res.status(200).json(userReviews);
      } catch (error: any) {
        console.error("GET /api/review error:", error);
        return res.status(500).json({ error: "Failed to fetch reviews" });
      }

    case "POST":
      try {
        const token = await getToken({ req, secret });
        if (!token || !token.sub) {
          return res.status(401).json({ error: "Unauthorized" });
        }

        const { rating, text } = req.body;

        if (typeof rating !== "number" || rating < 1 || rating > 5) {
          return res
            .status(400)
            .json({ error: "Rating must be a number between 1 and 5" });
        }

        if (typeof text !== "string" || text.trim() === "") {
          return res
            .status(400)
            .json({ error: "Text must be a non-empty string" });
        }

        const username = token.name || "Anonymous";
        const newReview = await reviewService.createReview(token.sub, {
          rating,
          text,
          username,
        });

        return res.status(201).json(newReview);
      } catch (error: any) {
        console.error("POST /api/review error:", error);
        return res.status(500).json({ error: "Failed to add review" });
      }

    default:
      res.setHeader("Allow", ["GET", "POST"]);
      return res
        .status(405)
        .json({ error: `Method ${req.method} not allowed` });
  }
}

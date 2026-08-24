import { NextApiRequest, NextApiResponse } from "next";
import { getDb } from "@/lib/db";
import { getToken } from "next-auth/jwt";
import { ObjectId } from "mongodb";

const secret = process.env.JWT_SECRET;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const db = await getDb();

  switch (req.method) {
    case "GET":
      try {
        const { all } = req.query;

        if (all === "true") {
          const reviews = await db.collection("reviews").find({}).toArray();

          const reviewsWithAvatars = await Promise.all(
            reviews.map(async (review) => {
              const user = await db
                .collection("users")
                .findOne({ _id: review.userId });
              return {
                ...review,
                avatar: user ? user.image : null,
              };
            }),
          );

          return res.status(200).json(reviewsWithAvatars);
        }

        const token = await getToken({ req, secret });
        if (!token || !token.sub) {
          return res.status(401).json({ error: "Unauthorized" });
        }

        const userId = new ObjectId(token.sub);
        const userReviews = await db
          .collection("reviews")
          .find({ userId })
          .toArray();

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

        const userId = new ObjectId(token.sub);
        const username = token.name || "Anonymous";

        const newReview = {
          userId,
          username,
          rating,
          text,
          createdAt: new Date(),
        };

        const result = await db.collection("reviews").insertOne(newReview);

        return res.status(201).json({
          _id: result.insertedId,
          ...newReview,
        });
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

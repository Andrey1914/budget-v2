import { NextApiResponse } from "next";
import { withAuth, AuthenticatedNextApiRequest } from "@/lib/withAuth";
import { reviewService } from "@/services/reviewService";

export default withAuth(async function handler(
  req: AuthenticatedNextApiRequest,
  res: NextApiResponse,
) {
  const { id } = req.query;

  if (!id || typeof id !== "string") {
    return res.status(400).json({ error: "Invalid review ID" });
  }

  const userId = req.user.userId;

  switch (req.method) {
    case "PUT":
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

      const updated = await reviewService.updateReview(id, userId, {
        rating,
        text,
      });
      if (!updated) return res.status(404).json({ error: "Review not found" });

      return res.status(200).json({ message: "Review updated successfully" });

    case "DELETE":
      const deleted = await reviewService.deleteReview(id, userId);
      if (!deleted) return res.status(404).json({ error: "Review not found" });

      return res.status(200).json({ message: "Review deleted successfully" });

    default:
      res.setHeader("Allow", ["PUT", "DELETE"]);
      return res
        .status(405)
        .json({ error: `Method ${req.method} not allowed` });
  }
});

import { NextApiResponse } from "next";
import { getDb } from "@/lib/db";
import { withAuth, AuthenticatedNextApiRequest } from "@/lib/withAuth";
import { ObjectId } from "mongodb";

export default withAuth(async function handler(
  req: AuthenticatedNextApiRequest,
  res: NextApiResponse,
) {
  const { id } = req.query;

  if (!id || typeof id !== "string" || !ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid review ID" });
  }

  const reviewId = new ObjectId(id);
  const userId = new ObjectId(req.user.userId);
  const db = await getDb();

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

      const result = await db.collection("reviews").updateOne(
        { _id: reviewId, userId },
        {
          $set: {
            rating,
            text,
            updatedAt: new Date(),
          },
        },
      );

      if (result.matchedCount === 0) {
        return res.status(404).json({ error: "Review not found" });
      }

      return res.status(200).json({ message: "Review updated successfully" });

    case "DELETE":
      const deleteResult = await db.collection("reviews").deleteOne({
        _id: reviewId,
        userId,
      });

      if (deleteResult.deletedCount === 0) {
        return res.status(404).json({ error: "Review not found" });
      }

      return res.status(200).json({ message: "Review deleted successfully" });

    default:
      res.setHeader("Allow", ["PUT", "DELETE"]);
      return res
        .status(405)
        .json({ error: `Method ${req.method} not allowed` });
  }
});

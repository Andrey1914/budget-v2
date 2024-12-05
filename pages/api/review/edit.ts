import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/lib/db";
import { getToken } from "next-auth/jwt";
import { ObjectId } from "mongodb";

const secret = process.env.JWT_SECRET;

const editReview = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "PUT") {
    const token = await getToken({ req, secret });

    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { id, rating, text } = req.body;

    if (!id || !ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid review ID" });
    }

    if (typeof rating !== "number" || rating < 1 || rating > 5) {
      return res
        .status(400)
        .json({ error: "Rating must be a number between 1 and 5" });
    }

    if (typeof text !== "string" || text.trim() === "") {
      return res.status(400).json({ error: "Text must be a non-empty string" });
    }

    const userId = token.sub;

    const client = await clientPromise;
    const db = client.db("budget-v2");

    try {
      const result = await db.collection("reviews").updateOne(
        { _id: new ObjectId(id), userId: new ObjectId(userId) },
        {
          $set: {
            rating,
            text,
            updatedAt: new Date(),
          },
        }
      );

      if (result.matchedCount === 0) {
        return res.status(404).json({ error: "Review not found" });
      }

      res.status(200).json(result);
    } catch (error: any) {
      res.status(500).json({ error: error.message || "Failed to edit review" });
    }
  } else {
    res.status(405).end();
  }
};

export default editReview;

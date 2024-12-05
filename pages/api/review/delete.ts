import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/lib/db";
import { getToken } from "next-auth/jwt";
import { ObjectId } from "mongodb";

const secret = process.env.JWT_SECRET;

const deleteReview = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "DELETE") {
    const token = await getToken({ req, secret });

    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { id } = req.body;

    if (!id || !ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid review ID" });
    }

    const userId = token.sub;

    const client = await clientPromise;
    const db = client.db("budget-v2");

    try {
      const result = await db.collection("reviews").deleteOne({
        _id: new ObjectId(id),
        userId: new ObjectId(userId),
      });

      if (result.deletedCount === 0) {
        return res
          .status(404)
          .json({ error: "Review not found or not authorized to delete" });
      }

      res.status(200).json({ message: "Review successfully deleted" });
    } catch (error: any) {
      res
        .status(500)
        .json({ error: error.message || "Failed to delete review" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
};

export default deleteReview;

import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/lib/db";

const getAllReviews = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const client = await clientPromise;

    const db = client.db("budget-v2");

    try {
      const reviews = await db.collection("reviews").find({}).toArray();

      res.status(200).json(reviews);
    } catch (error) {
      console.error("Ошибка при получении всех отзывов:", error);

      res.status(500).json({ error: "Failed to fetch reviews" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
};

export default getAllReviews;

import { NextApiRequest, NextApiResponse } from "next";
import { getDb } from "@/lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).json({ error: `Method ${req.method} not allowed` });
  }

  const db = await getDb();

  try {
    const reviews = await db.collection("reviews").find({}).toArray();

    if (reviews.length === 0) {
      return res.status(200).json({ averageRating: 0 });
    }

    const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);

    const averageRating = totalRating / reviews.length;

    return res.status(200).json({ averageRating });
  } catch (error: any) {
    return res
      .status(500)
      .json({ error: error.message || "Failed to calculate average rating" });
  }
}

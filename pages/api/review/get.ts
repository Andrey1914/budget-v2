import { NextApiRequest, NextApiResponse } from "next";
import { getDb } from "@/lib/db";
import { getToken } from "next-auth/jwt";
import { ObjectId } from "mongodb";

const secret = process.env.JWT_SECRET;

const getReviews = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const token = await getToken({ req, secret });

    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const userId = new ObjectId(token.sub);

    const db = await getDb();

    try {
      const reviews = await db
        .collection("reviews")
        .find({ userId: userId })
        .toArray();
      res.status(200).json(reviews);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch reviews" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
};

export default getReviews;

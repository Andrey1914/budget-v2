import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/lib/db";
import { getToken } from "next-auth/jwt";
import { ObjectId } from "mongodb";
import Review from "@/app/models/Review";

const secret = process.env.JWT_SECRET;

const addReview = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const token = await getToken({ req, secret });

    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { rating, text } = req.body;

    const userId = new ObjectId(token.sub);

    const username = token.name || "Anonymous";

    console.log(username);

    const client = await clientPromise;
    const db = client.db("budget-v2");

    try {
      const review = new Review({
        userId: userId,
        username: username,
        rating,
        text,
        createdAt: new Date(),
      });

      await db.collection("reviews").insertOne(review.toObject());
      res.status(201).json(review);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to add review" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
};

export default addReview;

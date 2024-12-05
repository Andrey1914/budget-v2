import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/lib/db";

const getAllReviews = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const client = await clientPromise;

    const db = client.db("budget-v2");

    try {
      const reviews = await db.collection("reviews").find({}).toArray();

      const reviewsWithAvatars = await Promise.all(
        reviews.map(async (review) => {
          const user = await db
            .collection("users")
            .findOne({ _id: review.userId });

          if (!user) {
            console.error(
              `User not found for review with userId: ${review.userId}`
            );
          }

          const avatar = user ? user.image : null;

          return {
            ...review,
            avatar,
          };
        })
      );

      res.status(200).json(reviewsWithAvatars);
    } catch (error) {
      console.error("Ошибка при получении всех отзывов:", error);

      res.status(500).json({ error: "Failed to fetch reviews" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
};

export default getAllReviews;

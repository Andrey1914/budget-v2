import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/lib/db";

const getAverageRating = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const client = await clientPromise;
    const db = client.db("budget-v2");

    try {
      // Получаем все отзывы из коллекции
      const reviews = await db.collection("reviews").find({}).toArray();

      // Если нет отзывов, возвращаем 0 как среднюю оценку
      if (reviews.length === 0) {
        return res.status(200).json({ averageRating: 0 });
      }

      // Суммируем все рейтинги
      const totalRating = reviews.reduce(
        (acc, review) => acc + review.rating,
        0
      );

      // Вычисляем среднее значение
      const averageRating = totalRating / reviews.length;

      // Отправляем среднюю оценку
      return res.status(200).json({ averageRating });
    } catch (error: any) {
      res
        .status(500)
        .json({ error: error.message || "Failed to calculate average rating" });
    }
  } else {
    res.status(405).end(); // Метод не разрешен
  }
};

export default getAverageRating;

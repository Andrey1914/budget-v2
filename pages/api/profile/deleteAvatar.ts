import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import clientPromise from "@/lib/db";

const secret = process.env.JWT_SECRET;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "DELETE") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    // Проверяем токен
    const token = await getToken({ req, secret });
    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { email } = token;
    if (!email) {
      return res.status(400).json({ error: "Invalid token: email missing" });
    }

    // Подключение к базе данных
    const client = await clientPromise;
    const db = client.db("budget-v2");

    // Обновление поля `image` пользователя
    const result = await db
      .collection("users")
      .updateOne({ email }, { $set: { image: null } });

    if (result.modifiedCount === 0) {
      return res
        .status(404)
        .json({ error: "User not found or no changes made" });
    }

    res.status(200).json({ message: "Avatar deleted successfully" });
  } catch (error) {
    console.error("Error deleting avatar:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

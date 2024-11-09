import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/lib/db";
import { getToken } from "next-auth/jwt";
import { ObjectId } from "mongodb";

const secret = process.env.JWT_SECRET;

if (!secret) {
  console.error("JWT_SECRET is not defined");
}

const addIncome = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      const token = await getToken({ req, secret });

      if (!token) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      const { amount, description, category, date } = req.body;
      if (!amount || !category || !date) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      if (typeof token.sub !== "string") {
        return res.status(400).json({ error: "Invalid user ID type in token" });
      }

      const userId = new ObjectId(token);
      console.log(userId);

      const client = await clientPromise;
      const db = client.db("budget-v2");

      const incomeDate = new Date(date);

      const categoryId =
        typeof category === "string" ? new ObjectId(category) : category;

      const income = await db.collection("income").insertOne({
        userId: userId,
        amount: parseFloat(amount),
        description: description || "",
        category: categoryId,
        date: incomeDate,
        createdAt: new Date(),
      });

      res.status(201).json(income);
    } catch (error) {
      console.error("Error adding income:", error);
      res.status(500).json({ error: "Failed to add income" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
};

export default addIncome;

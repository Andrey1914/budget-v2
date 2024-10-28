import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/lib/db";
import { getToken } from "next-auth/jwt";
import { ObjectId } from "mongodb";

const secret = process.env.JWT_SECRET;

const addExpense = async (req: NextApiRequest, res: NextApiResponse) => {
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

      const client = await clientPromise;
      const db = client.db("budget-v2");

      const expenseDate = new Date(date);

      const expense = await db.collection("expense").insertOne({
        userId: userId,
        amount: parseFloat(amount),
        description: description || "",
        category,
        date: expenseDate,
        createdAt: new Date(),
      });

      res.status(201).json(expense);
    } catch (error) {
      console.error("Error adding expense:", error);
      res.status(500).json({ error: "Failed to add expense" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
};

export default addExpense;

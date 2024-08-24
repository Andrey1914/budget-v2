import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/lib/db";
import { getToken } from "next-auth/jwt";
import { ObjectId } from "mongodb";

const secret = process.env.JWT_SECRET;

const addIncome = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const token = await getToken({ req, secret });
    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { amount, description, category, date } = req.body;

    const client = await clientPromise;
    const db = client.db("budget-v2");

    try {
      const expenseDate = new Date(date);

      const income = await db.collection("income").insertOne({
        userId: new ObjectId(token.sub),
        amount: parseFloat(amount),
        description,
        category,
        date: expenseDate,
        createdAt: new Date(),
      });
      res.status(201).json(income);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to add income" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
};

export default addIncome;

import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/lib/db";
import { getTokenFromRequest } from "@/utils/getTokenFromRequest";
import { ObjectId } from "mongodb";

const addTransaction = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const token = await getTokenFromRequest(req);

    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { type, amount, description, category, date, currency } = req.body;

    if (type !== "income" && type !== "expense") {
      return res.status(400).json({ error: "Invalid transaction type" });
    }

    if (!amount || !category || !date || !currency) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    if (typeof token.sub !== "string") {
      return res.status(400).json({ error: "Invalid user ID type in token" });
    }

    const userId = new ObjectId(token.sub);
    const transactionDate = new Date(date);
    const categoryId =
      typeof category === "string" ? new ObjectId(category) : category;

    const client = await clientPromise;
    const db = client.db("budget-v2");

    const collection = db.collection(type);

    const transaction = await collection.insertOne({
      userId,
      amount: parseFloat(amount),
      description: description || "",
      category: categoryId,
      date: transactionDate,
      createdAt: new Date(),
      currency,
    });

    res.status(201).json(transaction);
  } catch (error) {
    console.error("Error adding transaction:", error);
    res.status(500).json({ error: "Failed to add transaction" });
  }
};

export default addTransaction;

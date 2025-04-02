import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/lib/db";
import { getTokenFromRequest } from "@/utils/getTokenFromRequest";
import { ObjectId } from "mongodb";

const editTransaction = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "PUT") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const token = await getTokenFromRequest(req);
    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { id, type, amount, description, category, date } = req.body;

    if (!id || !type || !amount || !description || !category || !date) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    if (type !== "income" && type !== "expense") {
      return res.status(400).json({ error: "Invalid transaction type" });
    }

    const userId = new ObjectId(token.sub);
    const client = await clientPromise;
    const db = client.db("budget-v2");

    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount)) {
      return res.status(400).json({ error: "Amount must be a number" });
    }

    const categoryId =
      typeof category === "string" ? new ObjectId(category) : category;

    const result = await db.collection(type).updateOne(
      { _id: new ObjectId(id), userId },
      {
        $set: {
          amount: parsedAmount,
          description,
          category: categoryId,
          date: new Date(date),
          updatedAt: new Date(),
        },
      }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: "Transaction not found" });
    }

    res.status(200).json({ message: "Transaction updated successfully" });
  } catch (error) {
    console.error("Error updating transaction:", error);
    res.status(500).json({ error: "Failed to update transaction" });
  }
};

export default editTransaction;

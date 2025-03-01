import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/lib/db";
import { getToken } from "next-auth/jwt";
import { ObjectId } from "mongodb";

const secret = process.env.JWT_SECRET;

const editExpense = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "PUT") {
    const token = await getToken({ req, secret });

    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { id, amount, description, category, date } = req.body;

    if (!id || !amount || !description || !category || !date) {
      return res.status(400).json({ error: "Invalid input" });
    }

    const userId = new ObjectId(token);

    const client = await clientPromise;
    const db = client.db("budget-v2");

    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount)) {
      return res.status(400).json({ error: "Amount must be a number" });
    }

    const categoryId =
      typeof category === "string" ? new ObjectId(category) : category;

    try {
      const result = await db.collection("expense").updateOne(
        { _id: new ObjectId(id), userId: userId },
        {
          $set: {
            amount: parsedAmount,
            description,
            category: categoryId,
            updatedAt: new Date(),
          },
        }
      );

      if (result.matchedCount === 0) {
        return res.status(404).json({ error: "Еxpense not found" });
      }

      res.status(200).json(result);
    } catch (error: any) {
      res
        .status(500)
        .json({ error: error.message || "Failed to edit expense" });
    }
  } else {
    res.status(405).end();
  }
};

export default editExpense;

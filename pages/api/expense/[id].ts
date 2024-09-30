import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/lib/db";
import { ObjectId } from "mongodb";
import { getToken } from "next-auth/jwt";

const secret = process.env.JWT_SECRET;

const getExpenseById = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const token = await getToken({ req, secret });

    if (!token) {
      return res.status(401).json({ error: "Unauthorized." });
    }

    const { id } = req.query;

    if (!ObjectId.isValid(id as string)) {
      return res.status(400).json({ error: "Invalid expense ID." });
    }

    const client = await clientPromise;
    const db = client.db("budget-v2");

    try {
      const expense = await db.collection("expense").findOne({
        _id: new ObjectId(id as string),
        userId: new ObjectId(token.sub),
      });

      if (!expense) {
        return res.status(404).json({ error: "Expense not found." });
      }

      res.status(200).json(expense);
    } catch (error: any) {
      res
        .status(500)
        .json({ error: error.message || "Failed to fetch expense." });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
};

export default getExpenseById;

import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/lib/db";
import { getToken } from "next-auth/jwt";
import { ObjectId } from "mongodb";

const secret = process.env.JWT_SECRET;

const getExpenses = async (req: NextApiRequest, res: NextApiResponse) => {
  const token = await getToken({ req, secret });
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const userId = new ObjectId(token.sub);

  const client = await clientPromise;
  const db = client.db("budget-v2");

  try {
    const expenses = await db
      .collection("expense")
      .find({ userId: userId })
      .toArray();

    res.status(200).json(expenses);
  } catch (error) {
    console.error("Failed to fetch expenses:", error);
    res.status(500).json({ error: "Failed to fetch expenses" });
  }
};

export default getExpenses;

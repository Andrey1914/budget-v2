import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/lib/db";
import { getTokenFromRequest } from "@/utils/getTokenFromRequest";
import { ObjectId } from "mongodb";

const getTransactions = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const token = await getTokenFromRequest(req);
    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { type, startDate, endDate } = req.query;

    if (type !== "income" && type !== "expense") {
      return res.status(400).json({ error: "Invalid transaction type" });
    }

    const userId = new ObjectId(token.sub);
    const client = await clientPromise;
    const db = client.db("budget-v2");

    const start = startDate
      ? new Date(startDate as string)
      : new Date(new Date().getFullYear(), new Date().getMonth(), 1);
    const end = endDate
      ? new Date(endDate as string)
      : new Date(
          new Date().getFullYear(),
          new Date().getMonth() + 1,
          0,
          23,
          59,
          59
        );

    const transactions = await db
      .collection(type)
      .find({
        userId,
        date: { $gte: start, $lte: end },
      })
      .toArray();

    res.status(200).json(transactions);
  } catch (error) {
    console.error("Failed to fetch transactions:", error);
    res.status(500).json({ error: "Failed to fetch transactions" });
  }
};

export default getTransactions;

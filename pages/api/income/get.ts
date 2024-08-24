import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/lib/db";
import { getToken } from "next-auth/jwt";
import { ObjectId } from "mongodb";

const secret = process.env.JWT_SECRET;

const getIncome = async (req: NextApiRequest, res: NextApiResponse) => {
  const token = await getToken({ req, secret });
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const userId = new ObjectId(token.sub);

  const client = await clientPromise;
  const db = client.db("budget-v2");

  try {
    const incomes = await db
      .collection("income")
      .find({ userId: userId })
      .toArray();
    res.status(200).json(incomes);
  } catch (error) {
    console.error("Failed to fetch incomes:", error);
    res.status(500).json({ error: "Failed to fetch income" });
  }
};

export default getIncome;

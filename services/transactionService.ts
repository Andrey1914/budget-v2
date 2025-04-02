import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/lib/db";
import { ObjectId } from "mongodb";
import { getTokenFromRequest } from "@/utils/getTokenFromRequest";

export const getTransactionById = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const token = await getTokenFromRequest(req);

  if (!token) {
    return res.status(401).json({ error: "Unauthorized." });
  }

  const { id, type } = req.query;
  if (!["income", "expense"].includes(type as string)) {
    return res.status(400).json({ error: "Invalid transaction type." });
  }

  if (!ObjectId.isValid(id as string)) {
    return res.status(400).json({ error: "Invalid ID." });
  }

  const client = await clientPromise;
  const db = client.db("budget-v2");

  try {
    const transaction = await db.collection(type as string).findOne({
      _id: new ObjectId(id as string),
      userId: new ObjectId(token.sub),
    });

    if (!transaction) {
      return res.status(404).json({ error: "Transaction not found." });
    }

    res.status(200).json(transaction);
  } catch (error: any) {
    res
      .status(500)
      .json({ error: error.message || "Failed to fetch transaction." });
  }
};

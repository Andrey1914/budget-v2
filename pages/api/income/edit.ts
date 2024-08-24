import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/lib/db";
import { getToken } from "next-auth/jwt";
import { ObjectId } from "mongodb";
import { Token } from "@/interfaces";

const editIncome = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "PUT") {
    const token = (await getToken({ req })) as Token;
    if (!token) {
      return res.status(401).end();
    }

    const { id, amount } = req.body;
    const client = await clientPromise;
    const db = client.db("budget-v2");

    try {
      const result = await db.collection("income").updateOne(
        { _id: new ObjectId(id), userId: token.sub }, // Используем token.sub
        { $set: { amount, updatedAt: new Date() } }
      );
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: "Failed to edit income" });
    }
  } else {
    res.status(405).end();
  }
};

export default editIncome;

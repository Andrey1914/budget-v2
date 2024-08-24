import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/lib/db";
import { getToken } from "next-auth/jwt";
import { ObjectId } from "mongodb";
import { Token } from "@/interfaces";

const deleteIncome = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "DELETE") {
    const token = (await getToken({ req })) as Token;
    if (!token) {
      return res.status(401).end();
    }

    const { id } = req.body;
    const client = await clientPromise;
    const db = client.db("budget-v2");

    try {
      const result = await db.collection("income").deleteOne({
        _id: new ObjectId(id),
        userId: token.sub, // Используем token.sub
      });
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: "Failed to delete income" });
    }
  } else {
    res.status(405).end();
  }
};

export default deleteIncome;

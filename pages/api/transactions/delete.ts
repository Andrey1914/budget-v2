import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/lib/db";
import { getTokenFromRequest } from "@/utils/getTokenFromRequest";
import { ObjectId } from "mongodb";

const deleteTransaction = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "DELETE") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const token = await getTokenFromRequest(req);
    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { id, type } = req.body;

    if (!id || !type) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    if (type !== "income" && type !== "expense") {
      return res.status(400).json({ error: "Invalid transaction type" });
    }

    const userId = new ObjectId(token.sub);
    const client = await clientPromise;
    const db = client.db("budget-v2");

    const result = await db.collection(type).deleteOne({
      _id: new ObjectId(id),
      userId,
    });

    console.log("Delete result:", result);

    if (result.deletedCount === 0) {
      return res
        .status(404)
        .json({ error: "Transaction not found or not authorized" });
    }

    res.status(200).json({ message: "Transaction deleted successfully" });
  } catch (error) {
    console.error("Failed to delete transaction:", error);
    res.status(500).json({ error: "Failed to delete transaction" });
  }
};

export default deleteTransaction;

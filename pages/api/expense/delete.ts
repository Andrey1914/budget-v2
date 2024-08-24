import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/lib/db";
import { getToken } from "next-auth/jwt";
import { ObjectId } from "mongodb";

const secret = process.env.JWT_SECRET;

const deleteExpense = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log("API Delete Endpoint Called");
  if (req.method !== "DELETE") {
    console.log("Invalid method:", req.method);
    return res.status(405).end();
  }

  const token = await getToken({ req, secret });

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const userId = token.sub;

  const { id } = req.body;
  if (!id) {
    return res.status(400).json({ error: "Missing expense ID" });
  }

  const client = await clientPromise;
  const db = client.db("budget-v2");

  try {
    const result = await db.collection("expense").deleteOne({
      _id: new ObjectId(id),
      userId: userId,
    });

    if (result.deletedCount === 0) {
      return res
        .status(404)
        .json({ error: "Expense not found or not authorized" });
    }

    res.status(200).json({ message: "Expense deleted successfully" });
  } catch (error) {
    console.error("Failed to delete expense:", error);
    res.status(500).json({ error: "Failed to delete expense" });
  }
};

export default deleteExpense;

import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "PUT") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email, currency } = req.body;

  if (!email || !currency) {
    return res.status(400).json({ error: "Email and currency are required" });
  }

  try {
    const client = await clientPromise;
    const db = client.db("budget-v2");
    const result = await db
      .collection("users")
      .updateOne({ email }, { $set: { currency } });

    if (result.modifiedCount === 0) {
      return res
        .status(404)
        .json({ error: "User not found or no changes made" });
    }

    res.status(200).json({ message: "Currency updated successfully" });
  } catch (error) {
    console.error("Error updating currency:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

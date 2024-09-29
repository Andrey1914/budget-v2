import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { ObjectId } from "mongodb";
import clientPromise from "@/lib/db";

const secret = process.env.JWT_SECRET;

export default async function confirmEmail(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const token = await getToken({ req, secret });

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const userId = new ObjectId(token.sub);

  try {
    const client = await clientPromise;
    const db = client.db("budget-v2");

    const user = await db.collection("users").findOne({ _id: userId });

    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    user.isVerified = true;
    await db
      .collection("users")
      .updateOne({ _id: userId }, { $set: { isVerified: true } });

    res.redirect("/auth/confirmed-email");
  } catch (error) {
    console.error("Error confirming email:", error);
    res.status(500).json({ error: "Server error" });
  }
}

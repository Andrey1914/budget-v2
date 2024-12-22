import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import clientPromise from "@/lib/db";

const secret = process.env.JWT_SECRET;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const token = await getToken({ req, secret });
    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { email } = req.query;

    if (!email || typeof email !== "string") {
      return res
        .status(400)
        .json({ error: "Email is required and must be a string" });
    }

    const client = await clientPromise;
    const db = client.db("budget-v2");

    const user = await db.collection("users").findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({
      name: user.name,
      image: user.image,
      createdAt: user.createdAt,
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

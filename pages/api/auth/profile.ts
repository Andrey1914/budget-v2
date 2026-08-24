import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { getDb } from "@/lib/db";

const secret = process.env.JWT_SECRET;

const profile = async (req: NextApiRequest, res: NextApiResponse) => {
  const token = await getToken({ req, secret });
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const db = await getDb();

  const user = await db.collection("users").findOne({ _id: token.sub });
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  res.status(200).json({ user });
};

export default profile;

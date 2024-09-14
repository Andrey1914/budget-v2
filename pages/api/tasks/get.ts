import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/lib/db";
import { getToken } from "next-auth/jwt";
import { ObjectId } from "mongodb";

const secret = process.env.JWT_SECRET;

const getTasks = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const token = await getToken({ req, secret });
    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const userId = token.sub;

    const client = await clientPromise;
    const db = client.db("budget-v2");

    try {
      const tasks = await db
        .collection("tasks")

        .find({ userId: new ObjectId(userId) })
        .toArray();
      res.status(200).json(tasks);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch tasks" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
};

export default getTasks;

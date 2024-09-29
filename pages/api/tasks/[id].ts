import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/lib/db";
import { ObjectId } from "mongodb";
import { getToken } from "next-auth/jwt";

const secret = process.env.JWT_SECRET;

const getTaskById = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const token = await getToken({ req, secret });

    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { id } = req.query;

    if (!ObjectId.isValid(id as string)) {
      return res.status(400).json({ error: "Invalid task ID" });
    }

    const client = await clientPromise;
    const db = client.db("budget-v2");

    try {
      const task = await db.collection("tasks").findOne({
        _id: new ObjectId(id as string),
        userId: new ObjectId(token.sub),
      });

      if (!task) {
        return res.status(404).json({ error: "Task not found" });
      }

      res.status(200).json(task);
    } catch (error: any) {
      res.status(500).json({ error: error.message || "Failed to fetch task" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
};

export default getTaskById;

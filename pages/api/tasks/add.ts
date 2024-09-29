import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/lib/db";
import { getToken } from "next-auth/jwt";
import { ObjectId } from "mongodb";

const secret = process.env.JWT_SECRET;

const addTask = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const token = await getToken({ req, secret });
    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { title, content, date } = req.body;

    const userId = new ObjectId(token);

    const client = await clientPromise;
    const db = client.db("budget-v2");

    const taskDate = new Date(date);

    try {
      const task = await db.collection("tasks").insertOne({
        userId: userId,
        title,
        content,
        date: taskDate,
        createdAt: new Date(),
      });
      res.status(201).json(task);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to add task" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
};

export default addTask;

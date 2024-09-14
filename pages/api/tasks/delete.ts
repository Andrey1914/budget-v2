import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/lib/db";
import { ObjectId } from "mongodb";

const deleteTask = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "DELETE") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { id } = req.query;

    if (!id || typeof id !== "string") {
      return res.status(400).json({ error: "Invalid request query" });
    }

    const client = await clientPromise;
    const db = client.db("budget-v2");

    const result = await db
      .collection("tasks")
      .deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error: any) {
    console.error("Failed to delete task:", error.message);
    res.status(500).json({ error: "Failed to delete task" });
  }
};

export default deleteTask;

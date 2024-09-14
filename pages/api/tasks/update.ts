import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/lib/db";
import { ObjectId } from "mongodb";

const updateTask = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "PATCH") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { id, completed } = req.body;

    if (!id || typeof completed !== "boolean") {
      return res.status(400).json({ error: "Invalid request body" });
    }

    const client = await clientPromise;
    const db = client.db("budget-v2");

    const result = await db
      .collection("tasks")
      .updateOne({ _id: new ObjectId(id) }, { $set: { completed: completed } });

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.status(200).json({ message: "Task updated successfully" });
  } catch (error: any) {
    console.error("Failed to update task:", error.message);
    res.status(500).json({ error: "Failed to update task" });
  }
};

export default updateTask;

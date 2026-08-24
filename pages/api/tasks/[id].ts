import { NextApiResponse } from "next";
import { getDb } from "@/lib/db";
import { withAuth, AuthenticatedNextApiRequest } from "@/lib/withAuth";
import { ObjectId } from "mongodb";

export default withAuth(async function handler(
  req: AuthenticatedNextApiRequest,
  res: NextApiResponse,
) {
  const { id } = req.query;

  if (!id || typeof id !== "string" || !ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid task ID" });
  }

  const taskId = new ObjectId(id);
  const userId = new ObjectId(req.user.userId);
  const db = await getDb();

  switch (req.method) {
    case "GET":
      const task = await db.collection("tasks").findOne({
        _id: taskId,
        userId,
      });

      if (!task) {
        return res.status(404).json({ error: "Task not found" });
      }

      return res.status(200).json(task);

    case "PUT":
      const { title, content, date } = req.body;

      if (!title || !content) {
        return res
          .status(400)
          .json({ error: "Title and content are required" });
      }

      const updateData: Record<string, any> = {
        title,
        content,
        updatedAt: new Date(),
      };

      if (date) {
        updateData.date = new Date(date);
      }

      const putResult = await db
        .collection("tasks")
        .updateOne({ _id: taskId, userId }, { $set: updateData });

      if (putResult.matchedCount === 0) {
        return res.status(404).json({ error: "Task not found" });
      }

      return res.status(200).json({ message: "Task updated successfully" });

    case "PATCH":
      const { completed } = req.body;

      if (typeof completed !== "boolean") {
        return res.status(400).json({ error: "Invalid completed status" });
      }

      const patchResult = await db
        .collection("tasks")
        .updateOne(
          { _id: taskId, userId },
          { $set: { completed, updatedAt: new Date() } },
        );

      if (patchResult.matchedCount === 0) {
        return res.status(404).json({ error: "Task not found" });
      }

      return res
        .status(200)
        .json({ message: "Task status updated successfully" });

    case "DELETE":
      const deleteResult = await db.collection("tasks").deleteOne({
        _id: taskId,
        userId,
      });

      if (deleteResult.deletedCount === 0) {
        return res.status(404).json({ error: "Task not found" });
      }

      return res.status(200).json({ message: "Task deleted successfully" });

    default:
      res.setHeader("Allow", ["GET", "PUT", "PATCH", "DELETE"]);
      return res
        .status(405)
        .json({ error: `Method ${req.method} not allowed` });
  }
});

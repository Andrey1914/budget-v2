import { NextApiResponse } from "next";
import { withAuth, AuthenticatedNextApiRequest } from "@/lib/withAuth";
import { taskService } from "@/services/taskService";

export default withAuth(async function handler(
  req: AuthenticatedNextApiRequest,
  res: NextApiResponse,
) {
  const { id } = req.query;

  if (!id || typeof id !== "string") {
    return res.status(400).json({ error: "Invalid task ID" });
  }

  const userId = req.user.userId;

  switch (req.method) {
    case "GET":
      const task = await taskService.getTaskById(id, userId);
      if (!task) return res.status(404).json({ error: "Task not found" });
      return res.status(200).json(task);

    case "PUT":
      const updated = await taskService.updateTask(id, userId, req.body);
      if (!updated) return res.status(404).json({ error: "Task not found" });
      return res.status(200).json({ message: "Task updated successfully" });

    case "PATCH":
      const { completed } = req.body;
      if (typeof completed !== "boolean") {
        return res.status(400).json({ error: "Invalid completed status" });
      }
      const patched = await taskService.updateTaskStatus(id, userId, completed);
      if (!patched) return res.status(404).json({ error: "Task not found" });
      return res
        .status(200)
        .json({ message: "Task status updated successfully" });

    case "DELETE":
      const deleted = await taskService.deleteTask(id, userId);
      if (!deleted) return res.status(404).json({ error: "Task not found" });
      return res.status(200).json({ message: "Task deleted successfully" });

    default:
      res.setHeader("Allow", ["GET", "PUT", "PATCH", "DELETE"]);
      return res
        .status(405)
        .json({ error: `Method ${req.method} not allowed` });
  }
});

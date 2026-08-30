import { NextApiResponse } from "next";
import { withAuth, AuthenticatedNextApiRequest } from "@/lib/withAuth";
import { taskService } from "@/services/taskService";

export default withAuth(async function handler(
  req: AuthenticatedNextApiRequest,
  res: NextApiResponse,
) {
  switch (req.method) {
    case "GET":
      const tasks = await taskService.getTasks(req.user.userId);
      return res.status(200).json(tasks);

    case "POST":
      const { title, content } = req.body;
      if (!title || !content) {
        return res
          .status(400)
          .json({ error: "Title and content are required" });
      }

      const newTask = await taskService.createTask(req.user.userId, req.body);
      return res.status(201).json(newTask);

    default:
      res.setHeader("Allow", ["GET", "POST"]);
      return res
        .status(405)
        .json({ error: `Method ${req.method} not allowed` });
  }
});

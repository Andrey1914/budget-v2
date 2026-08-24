import { NextApiResponse } from "next";
import { getDb } from "@/lib/db";
import { withAuth, AuthenticatedNextApiRequest } from "@/lib/withAuth";
import { ObjectId } from "mongodb";

export default withAuth(async function handler(
  req: AuthenticatedNextApiRequest,
  res: NextApiResponse,
) {
  const userId = new ObjectId(req.user.userId);
  const db = await getDb();

  switch (req.method) {
    case "GET":
      const tasks = await db.collection("tasks").find({ userId }).toArray();
      return res.status(200).json(tasks);

    case "POST":
      const { title, content, date } = req.body;

      if (!title || !content) {
        return res
          .status(400)
          .json({ error: "Title and content are required" });
      }

      const taskDate = date ? new Date(date) : new Date();

      const result = await db.collection("tasks").insertOne({
        userId,
        title,
        content,
        date: taskDate,
        completed: false,
        createdAt: new Date(),
      });

      return res.status(201).json({
        _id: result.insertedId,
        userId,
        title,
        content,
        date: taskDate,
        completed: false,
      });

    default:
      res.setHeader("Allow", ["GET", "POST"]);
      return res
        .status(405)
        .json({ error: `Method ${req.method} not allowed` });
  }
});

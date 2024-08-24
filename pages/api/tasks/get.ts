import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/lib/db";
import { getToken } from "next-auth/jwt";
import { Token } from "@/interfaces";

const secret = process.env.JWT_SECRET;

const getTasks = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const token = (await getToken({ req, secret })) as Token;
    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const client = await clientPromise;
    const db = client.db("budget-v2");

    try {
      const tasks = await db
        .collection("tasks")
        .find({ userId: token.sub })
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

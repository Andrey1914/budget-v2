import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/lib/db";
import { getToken } from "next-auth/jwt";
import { Token } from "@/interfaces";

const secret = process.env.JWT_SECRET;

const addTask = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const token = (await getToken({ req, secret })) as Token;
    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { title, content } = req.body; // Предполагаем, что title и content приходят в теле запроса
    const client = await clientPromise;
    const db = client.db("budget-v2");

    try {
      const task = await db.collection("tasks").insertOne({
        userId: token.sub, // Используем token.sub
        title,
        content,
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

// import { NextApiRequest, NextApiResponse } from "next";
// import clientPromise from "@/lib/db";
// import { getToken } from "next-auth/jwt";
// import { Token } from "@/interfaces";

// const addTask = async (req: NextApiRequest, res: NextApiResponse) => {
//   if (req.method === "POST") {
//     const token = (await getToken({ req })) as Token;
//     if (!token) {
//       return res.status(401).end();
//     }

//     const { amount } = req.body;
//     const client = await clientPromise;
//     const db = client.db("budget-v2");

//     try {
//       const task = await db.collection("tasks").insertOne({
//         userId: token.sub, // Используем token.sub
//         amount,
//         createdAt: new Date(),
//       });
//       res.status(201).json(task);
//     } catch (error) {
//       res.status(500).json({ error: "Failed to add task" });
//     }
//   } else {
//     res.status(405).end();
//   }
// };

// export default addTask;

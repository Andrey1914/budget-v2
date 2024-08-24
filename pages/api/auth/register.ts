import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";

import clientPromise from "@/lib/db";

const register = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { name, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const client = await clientPromise;
    const db = client.db("budget-v2");

    try {
      const user = await db.collection("users").insertOne({
        name,
        email,
        password: hashedPassword,
      });
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ error: "User creation failed" });
    }
  } else {
    res.status(405).end();
  }
};

export default register;

// export default async function handle(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   if (req.method === "POST") {
//     const { name, email, password } = req.body;

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const client = await clientPromise;
//     const db = client.db("budget-v2");

//     try {
//       const user = await db.collection("users").insertOne({
//         name,
//         email,
//         password: hashedPassword,
//       });
//       res.status(201).json(user);
//     } catch (error) {
//       res.status(500).json({ error: "User creation failed" });
//     }
//   } else {
//     res.status(405).end();
//   }
// }

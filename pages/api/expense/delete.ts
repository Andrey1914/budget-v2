// import { NextApiRequest, NextApiResponse } from "next";
// import clientPromise from "@/lib/db";
// import { getToken } from "next-auth/jwt";
// import { ObjectId } from "mongodb";

// const secret = process.env.JWT_SECRET;

// const deleteExpense = async (req: NextApiRequest, res: NextApiResponse) => {
//   if (req.method === "OPTIONS") {
//     return res.status(200).end();
//   }

//   if (req.method !== "DELETE") {
//     return res.status(405).end();
//   }

//   const token = await getToken({ req, secret });

//   if (!token) {
//     return res.status(401).json({ error: "Unauthorized" });
//   }

//   const userId = new ObjectId(token);

//   const { id } = req.body;

//   if (!id) {
//     return res.status(400).json({ error: "Missing expense ID" });
//   }

//   const client = await clientPromise;
//   const db = client.db("budget-v2");

//   try {
//     const result = await db.collection("expense").deleteOne({
//       _id: new ObjectId(id),
//       userId: new ObjectId(userId),
//     });
//     console.log("Delete result:", result);

//     if (result.deletedCount === 0) {
//       return res
//         .status(404)
//         .json({ error: "Expense not found or not authorized" });
//     }

//     res.status(200).json({ result, message: "Expense deleted successfully" });
//   } catch (error) {
//     console.error("Failed to delete expense:", error);
//     res.status(500).json({ error: "Failed to delete expense" });
//   }
// };

// export default deleteExpense;

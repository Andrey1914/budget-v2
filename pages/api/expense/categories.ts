// import { NextApiRequest, NextApiResponse } from "next";
// import clientPromise from "@/lib/db";
// import { getToken } from "next-auth/jwt";
// import { ObjectId } from "mongodb";

// const secret = process.env.JWT_SECRET;

// const ExpenseCategories = async (req: NextApiRequest, res: NextApiResponse) => {
//   const client = await clientPromise;
//   const db = client.db("budget-v2");

//   const token = await getToken({ req, secret });
//   if (!token) {
//     return res.status(401).json({ error: "Unauthorized" });
//   }

//   if (typeof token.sub !== "string") {
//     return res.status(400).json({ error: "Invalid user ID type in token" });
//   }

//   const userId = new ObjectId(token.sub);

//   if (req.method === "POST") {
//     const { name, description } = req.body;

//     if (!name) {
//       return res.status(400).json({ error: "Name is required" });
//     }

//     try {
//       const result = await db.collection("expense-categories").insertOne({
//         userId,
//         name,
//         description,
//       });

//       res.status(201).json({
//         category: {
//           _id: result.insertedId,
//           name,
//           description,
//           createdAt: new Date(),
//         },
//       });
//     } catch (error: any) {
//       res.status(500).json({ error: error.message });
//     }
//   } else if (req.method === "GET") {
//     const categories = await db
//       .collection("expense-categories")
//       .find({ userId })
//       .toArray();

//     res.status(200).json(categories);
//   } else if (req.method === "PUT") {
//     const { id, name, description } = req.body;

//     if (!id || !name) {
//       return res.status(400).json({ error: "Invalid input" });
//     }

//     try {
//       const result = await db
//         .collection("expense-categories")
//         .updateOne(
//           { _id: new ObjectId(id), userId },
//           { $set: { name, description } }
//         );

//       if (result.matchedCount === 0) {
//         return res.status(404).json({ error: "Category not found" });
//       }

//       res
//         .status(200)
//         .json({ result, message: "Category updated successfully" });
//     } catch (error: any) {
//       res.status(500).json({ error: error.message });
//     }
//   } else if (req.method === "DELETE") {
//     const { id } = req.body;

//     if (!id) {
//       return res.status(400).json({ error: "ID is required" });
//     }

//     try {
//       const result = await db
//         .collection("expense-categories")
//         .deleteOne({ _id: new ObjectId(id), userId });

//       if (result.deletedCount === 0) {
//         return res
//           .status(404)
//           .json({ error: "Category not found or unauthorized" });
//       }

//       res
//         .status(200)
//         .json({ result, message: "Category deleted successfully" });
//     } catch (error: any) {
//       res.status(500).json({ error: error.message });
//     }
//   } else {
//     res.setHeader("Allow", ["POST", "GET", "PUT", "DELETE"]);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// };

// export default ExpenseCategories;

// import { NextApiRequest, NextApiResponse } from "next";
// import clientPromise from "@/lib/db";
// import { getToken } from "next-auth/jwt";
// import { ObjectId } from "mongodb";

// const secret = process.env.JWT_SECRET;

// const getForeignCurrencyTotals = async (
//   req: NextApiRequest,
//   res: NextApiResponse
// ) => {
//   if (req.method !== "GET") {
//     return res.status(405).json({ error: "Method not allowed" });
//   }

//   const token = await getToken({ req, secret });
//   if (!token) {
//     return res.status(401).json({ error: "Unauthorized" });
//   }

//   const userId = new ObjectId(token.sub);

//   try {
//     const client = await clientPromise;
//     const db = client.db("budget-v2");

//     const user = await db.collection("users").findOne({ _id: userId });
//     const userCurrency = user?.currency || "USD*";

//     const incomeByCurrency = await db
//       .collection("income")
//       .aggregate([
//         { $match: { userId, currency: { $ne: userCurrency } } },
//         {
//           $group: {
//             _id: "$currency",
//             total: { $sum: "$amount" },
//           },
//         },
//       ])
//       .toArray();

//     const expenseByCurrency = await db
//       .collection("expense")
//       .aggregate([
//         { $match: { userId, currency: { $ne: userCurrency } } },
//         {
//           $group: {
//             _id: "$currency",
//             total: { $sum: "$amount" },
//           },
//         },
//       ])
//       .toArray();

//     res.status(200).json({
//       incomeByCurrency,
//       expenseByCurrency,
//     });
//   } catch (err) {
//     console.error("Ошибка при получении транзакций по валютам:", err);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

// export default getForeignCurrencyTotals;

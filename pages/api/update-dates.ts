// import { NextApiRequest, NextApiResponse } from "next";
// import clientPromise from "@/lib/db";

// export default async function updateDates(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   const client = await clientPromise;
//   const db = client.db("budget-v2");

//   try {
//     const incomes = await db.collection("income").find({}).toArray();

//     for (const income of incomes) {
//       const dateStr = income.date;
//       if (typeof dateStr === "string") {
//         const dateObj = new Date(dateStr);
//         await db
//           .collection("income")
//           .updateOne({ _id: income._id }, { $set: { date: dateObj } });
//       }
//     }

//     res.status(200).json({ message: "Date fields updated successfully!" });
//   } catch (error) {
//     console.error("Error updating dates:", error);
//     res.status(500).json({ error: "Failed to update dates" });
//   }
// }

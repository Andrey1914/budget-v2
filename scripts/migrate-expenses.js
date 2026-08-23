// import { MongoClient, ObjectId } from "mongodb";

// const migrateExpenses = async (req, res) => {
//   if (req.method !== "POST") {
//     return res.status(405).json({ message: "Method not allowed" });
//   }

//   try {
//     const client = new MongoClient(process.env.MONGODB_URI); // Убедитесь, что MONGODB_URI определен
//     await client.connect();
//     const db = client.db("budget-v2");

//     const expenses = await db.collection("expense").find({}).toArray();

//     for (const expense of expenses) {
//       if (typeof expense.userId === "string") {
//         await db
//           .collection("expense")
//           .updateOne(
//             { _id: expense._id },
//             { $set: { userId: new ObjectId(expense.userId) } }
//           );
//       }
//     }

//     await client.close();

//     res.status(200).json({ message: "Migration completed!" });
//   } catch (error) {
//     console.error("Migration failed:", error);
//     res.status(500).json({ message: "Migration failed" });
//   }
// };

// export default migrateExpenses;

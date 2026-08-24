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
      const { type, startDate, endDate } = req.query;

      if (type !== "income" && type !== "expense") {
        return res.status(400).json({ error: "Invalid transaction type" });
      }

      const start = startDate
        ? new Date(startDate as string)
        : new Date(new Date().getFullYear(), new Date().getMonth(), 1);
      const end = endDate
        ? new Date(endDate as string)
        : new Date(
            new Date().getFullYear(),
            new Date().getMonth() + 1,
            0,
            23,
            59,
            59,
          );

      const transactions = await db
        .collection(type as string)
        .find({
          userId,
          date: { $gte: start, $lte: end },
        })
        .toArray();

      return res.status(200).json(transactions);

    case "POST":
      const {
        type: bodyType,
        amount,
        description,
        category,
        date,
        currency,
      } = req.body;

      if (bodyType !== "income" && bodyType !== "expense") {
        return res.status(400).json({ error: "Invalid transaction type" });
      }

      if (!amount || !category || !date || !currency) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const transactionDate = new Date(date);
      const categoryId =
        typeof category === "string" ? new ObjectId(category) : category;

      const collection = db.collection(bodyType);

      const result = await collection.insertOne({
        userId,
        amount: parseFloat(amount),
        description: description || "",
        category: categoryId,
        date: transactionDate,
        createdAt: new Date(),
        currency,
      });

      return res.status(201).json({
        _id: result.insertedId,
        userId,
        amount: parseFloat(amount),
        description: description || "",
        category: categoryId,
        date: transactionDate,
        currency,
      });

    default:
      res.setHeader("Allow", ["GET", "POST"]);
      return res
        .status(405)
        .json({ error: `Method ${req.method} not allowed` });
  }
});

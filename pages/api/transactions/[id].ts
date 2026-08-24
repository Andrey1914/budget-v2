import { NextApiResponse } from "next";
import { getDb } from "@/lib/db";
import { withAuth, AuthenticatedNextApiRequest } from "@/lib/withAuth";
import { ObjectId } from "mongodb";

export default withAuth(async function handler(
  req: AuthenticatedNextApiRequest,
  res: NextApiResponse,
) {
  const { id, type: queryType } = req.query;

  if (!id || typeof id !== "string" || !ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid transaction ID" });
  }

  const transactionId = new ObjectId(id);
  const userId = new ObjectId(req.user.userId);
  const db = await getDb();

  switch (req.method) {
    case "GET":
      const getTargetType = (queryType as string) || req.body?.type;
      if (getTargetType !== "income" && getTargetType !== "expense") {
        return res.status(400).json({ error: "Invalid transaction type" });
      }

      const transaction = await db.collection(getTargetType).findOne({
        _id: transactionId,
        userId,
      });

      if (!transaction) {
        return res.status(404).json({ error: "Transaction not found" });
      }

      return res.status(200).json(transaction);

    case "PUT":
      const { type: putType, amount, description, category, date } = req.body;

      if (putType !== "income" && putType !== "expense") {
        return res.status(400).json({ error: "Invalid transaction type" });
      }

      if (!amount || !description || !category || !date) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const parsedAmount = parseFloat(amount);
      if (isNaN(parsedAmount)) {
        return res.status(400).json({ error: "Amount must be a number" });
      }

      const categoryId =
        typeof category === "string" ? new ObjectId(category) : category;

      const putResult = await db.collection(putType).updateOne(
        { _id: transactionId, userId },
        {
          $set: {
            amount: parsedAmount,
            description,
            category: categoryId,
            date: new Date(date),
            updatedAt: new Date(),
          },
        },
      );

      if (putResult.matchedCount === 0) {
        return res.status(404).json({ error: "Transaction not found" });
      }

      return res
        .status(200)
        .json({ message: "Transaction updated successfully" });

    case "DELETE":
      const deleteTargetType = (queryType as string) || req.body?.type;

      if (deleteTargetType !== "income" && deleteTargetType !== "expense") {
        return res.status(400).json({ error: "Invalid transaction type" });
      }

      const deleteResult = await db.collection(deleteTargetType).deleteOne({
        _id: transactionId,
        userId,
      });

      if (deleteResult.deletedCount === 0) {
        return res
          .status(404)
          .json({ error: "Transaction not found or not authorized" });
      }

      return res
        .status(200)
        .json({ message: "Transaction deleted successfully" });

    default:
      res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
      return res
        .status(405)
        .json({ error: `Method ${req.method} not allowed` });
  }
});

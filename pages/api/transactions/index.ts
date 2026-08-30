import { NextApiResponse } from "next";
import { withAuth, AuthenticatedNextApiRequest } from "@/lib/withAuth";
import { transactionService } from "@/services/transactionService";

export default withAuth(async function handler(
  req: AuthenticatedNextApiRequest,
  res: NextApiResponse,
) {
  const userId = req.user.userId;

  switch (req.method) {
    case "GET":
      const { type, startDate, endDate } = req.query;

      if (type !== "income" && type !== "expense") {
        return res.status(400).json({ error: "Invalid transaction type" });
      }

      const transactions = await transactionService.getTransactions(
        type,
        userId,
        startDate as string,
        endDate as string,
      );

      return res.status(200).json(transactions);

    case "POST":
      const { type: bodyType, amount, category, date, currency } = req.body;

      if (bodyType !== "income" && bodyType !== "expense") {
        return res.status(400).json({ error: "Invalid transaction type" });
      }

      if (!amount || !category || !date || !currency) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const newTransaction = await transactionService.createTransaction(
        userId,
        req.body,
      );
      return res.status(201).json(newTransaction);

    default:
      res.setHeader("Allow", ["GET", "POST"]);
      return res
        .status(405)
        .json({ error: `Method ${req.method} not allowed` });
  }
});

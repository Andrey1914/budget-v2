import { NextApiResponse } from "next";
import { withAuth, AuthenticatedNextApiRequest } from "@/lib/withAuth";
import { transactionService } from "@/services/transactionService";

export default withAuth(async function handler(
  req: AuthenticatedNextApiRequest,
  res: NextApiResponse,
) {
  const { id, type: queryType } = req.query;

  if (!id || typeof id !== "string") {
    return res.status(400).json({ error: "Invalid transaction ID" });
  }

  const userId = req.user.userId;

  switch (req.method) {
    case "GET":
      const getTargetType = (queryType as string) || req.body?.type;
      if (getTargetType !== "income" && getTargetType !== "expense") {
        return res.status(400).json({ error: "Invalid transaction type" });
      }

      const transaction = await transactionService.getTransactionById(
        getTargetType,
        id,
        userId,
      );

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

      const updated = await transactionService.updateTransaction(
        id,
        userId,
        req.body,
      );
      if (!updated) {
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

      const deleted = await transactionService.deleteTransaction(
        deleteTargetType,
        id,
        userId,
      );

      if (!deleted) {
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

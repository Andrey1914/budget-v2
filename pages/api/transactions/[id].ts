import { NextApiRequest, NextApiResponse } from "next";
import { getTransactionById } from "@/services/transactionService";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  return getTransactionById(req, res);
}

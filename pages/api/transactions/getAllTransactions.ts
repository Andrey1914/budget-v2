import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/lib/db";
import { getToken } from "next-auth/jwt";
import { ObjectId } from "mongodb";

const secret = process.env.JWT_SECRET;

const getAllTransactions = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const token = await getToken({ req, secret });

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const userId = new ObjectId(token.sub);

  try {
    const client = await clientPromise;
    const db = client.db("budget-v2");

    const now = new Date();
    const currentMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const currentMonthEnd = new Date(
      now.getFullYear(),
      now.getMonth() + 1,
      0,
      23,
      59,
      59
    );

    const previousIncomeTotal = await db
      .collection("income")
      .aggregate([
        {
          $match: {
            userId: userId,
            date: { $lt: currentMonthStart },
          },
        },
        { $group: { _id: null, total: { $sum: "$amount" } } },
      ])
      .toArray();

    const previousExpenseTotal = await db
      .collection("expense")
      .aggregate([
        {
          $match: {
            userId: userId,
            date: { $lt: currentMonthStart },
          },
        },
        { $group: { _id: null, total: { $sum: "$amount" } } },
      ])
      .toArray();

    const carryOverBalance =
      (previousIncomeTotal[0]?.total || 0) -
      (previousExpenseTotal[0]?.total || 0);

    const currentIncomeTotal = await db
      .collection("income")
      .aggregate([
        {
          $match: {
            userId: userId,
            date: { $gte: currentMonthStart, $lte: currentMonthEnd },
          },
        },
        { $group: { _id: null, total: { $sum: "$amount" } } },
      ])
      .toArray();

    const currentExpenseTotal = await db
      .collection("expense")
      .aggregate([
        {
          $match: {
            userId: userId,
            date: { $gte: currentMonthStart, $lte: currentMonthEnd },
          },
        },
        { $group: { _id: null, total: { $sum: "$amount" } } },
      ])
      .toArray();

    const totalIncome = currentIncomeTotal[0]?.total || 0;
    const totalExpense = currentExpenseTotal[0]?.total || 0;

    const balance = carryOverBalance + totalIncome - totalExpense;

    res.status(200).json({
      carryOverBalance,
      totalIncome,
      totalExpense,
      balance,
    });
  } catch (error) {
    console.error("Ошибка в обработке данных:", error);
    res.status(500).json({ error: "Failed to fetch transactions" });
  }
};

export default getAllTransactions;

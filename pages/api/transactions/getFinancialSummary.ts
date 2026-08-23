import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/lib/db";
import { getToken } from "next-auth/jwt";
import { ObjectId } from "mongodb";

const secret = process.env.JWT_SECRET;

const getFinancialSummary = async (
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

  try {
    const user = await db.collection("users").findOne({ _id: userId });
    const userCurrency = user?.currency || "USD";

    // Вспомогательная функция: сумма дохода/расхода
    const getTotal = async (
      collection: "income" | "expense",
      dateFilter: any,
      currencyFilter: any
    ) => {
      const [result] = await db
        .collection(collection)
        .aggregate([
          {
            $match: {
              userId,
              date: dateFilter,
              currency: currencyFilter,
            },
          },
          {
            $group: {
              _id: null,
              total: { $sum: "$amount" },
            },
          },
        ])
        .toArray();

      return result?.total || 0;
    };

    // Вспомогательная функция: суммы по валютам
    const getGroupedByCurrency = async (collection: "income" | "expense") => {
      return db
        .collection(collection)
        .aggregate([
          {
            $match: {
              userId,
              currency: { $ne: userCurrency },
              date: { $gte: currentMonthStart, $lte: currentMonthEnd },
            },
          },
          {
            $group: {
              _id: "$currency",
              total: { $sum: "$amount" },
            },
          },
        ])
        .toArray();
    };

    const carryOverIncome = await getTotal(
      "income",
      { $lt: currentMonthStart },
      userCurrency
    );
    const carryOverExpense = await getTotal(
      "expense",
      { $lt: currentMonthStart },
      userCurrency
    );
    const carryOver = carryOverIncome - carryOverExpense;

    const totalIncomeMain = await getTotal(
      "income",
      {
        $gte: currentMonthStart,
        $lte: currentMonthEnd,
      },
      userCurrency
    );

    const totalExpenseMain = await getTotal(
      "expense",
      {
        $gte: currentMonthStart,
        $lte: currentMonthEnd,
      },
      userCurrency
    );

    const foreignIncome = await getGroupedByCurrency("income");
    const foreignExpense = await getGroupedByCurrency("expense");

    const totalBalance = carryOver + totalIncomeMain - totalExpenseMain;

    res.status(200).json({
      currency: userCurrency,
      carryOver,
      totalIncome: totalIncomeMain,
      totalExpense: totalExpenseMain,
      balance: totalBalance,
      incomeByCurrency: foreignIncome,
      expenseByCurrency: foreignExpense,
    });
  } catch (err) {
    console.error("Ошибка в summary API:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default getFinancialSummary;

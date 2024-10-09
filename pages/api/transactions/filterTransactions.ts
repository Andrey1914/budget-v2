import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/lib/db";
import { getToken } from "next-auth/jwt";
import { ObjectId } from "mongodb";

const secret = process.env.JWT_SECRET;

const filterTransactions = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  const token = await getToken({ req, secret });

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { type, month, page = 1, limit = 10 } = req.query;
  console.log("Параметры запроса:", { type, month, page, limit });

  const userId = new ObjectId(token.sub);

  const client = await clientPromise;
  const db = client.db("budget-v2");

  console.log("Параметр month:", month);

  const currentYear = new Date().getFullYear();
  console.log("Исходный параметр month:", month);

  let selectedMonth: number | null = null;
  if (month) {
    if (month === "all") {
      selectedMonth = null;
    } else {
      selectedMonth = parseInt(month as string);
    }
  }
  console.log("Числовое значение month:", selectedMonth);

  const startOfMonth = selectedMonth
    ? new Date(Date.UTC(currentYear, selectedMonth - 1, 1, 0, 0, 0))
    : new Date(0);
  const endOfMonth = selectedMonth
    ? new Date(Date.UTC(currentYear, selectedMonth, 0, 23, 59, 59))
    : new Date();

  // Пагинация
  const skip = (parseInt(page as string) - 1) * parseInt(limit as string);

  // console.log("Фильтр по месяцам:", { startOfMonth, endOfMonth }); // Для отладки

  try {
    let transactions: any = [];
    let totalSum = 0;

    if (type === "income" || type === "both" || !type) {
      const incomeQuery: any = {
        userId: userId,
        ...(selectedMonth && {
          date: { $gte: startOfMonth, $lte: endOfMonth },
        }),
      };

      console.log("Запрос на доходы:", incomeQuery);

      // Фильтруем доходы
      const incomeTransactions = await db
        .collection("income")
        .find(incomeQuery)

        .skip(skip)
        .limit(parseInt(limit as string))
        .toArray();

      const incomeTotal = await db
        .collection("income")
        .aggregate([
          { $match: incomeQuery },

          { $group: { _id: null, total: { $sum: "$amount" } } },
        ])
        .toArray();
      console.log(
        "Итоговая сумма доходов:",
        incomeTotal.length > 0 ? incomeTotal[0].total : 0
      );

      console.log("Найденные доходы:", incomeTransactions);

      transactions = transactions.concat(incomeTransactions);
      totalSum += incomeTotal.length > 0 ? incomeTotal[0].total : 0;

      console.log("Общая сумма:", totalSum);
    }

    if (type === "expense" || type === "both" || !type) {
      const expenseQuery: any = {
        userId: userId,
        ...(selectedMonth && {
          date: { $gte: startOfMonth, $lte: endOfMonth },
        }),
      };

      console.log("Запрос на расходы:", expenseQuery);

      // Фильтруем расходы
      const expenseTransactions = await db
        .collection("expense")
        .find(expenseQuery)

        .skip(skip)
        .limit(parseInt(limit as string))
        .toArray();

      console.log("Найденные расходы:", expenseTransactions);

      const expenseTotal = await db
        .collection("expense")
        .aggregate([
          { $match: expenseQuery },

          { $group: { _id: null, total: { $sum: "$amount" } } },
        ])
        .toArray();

      console.log(
        "Итоговая сумма расходов:",
        expenseTotal.length > 0 ? expenseTotal[0].total : 0
      );

      transactions = transactions.concat(expenseTransactions);

      totalSum += expenseTotal.length > 0 ? expenseTotal[0].total : 0;

      console.log("Общая сумма:", totalSum);
    }

    transactions.sort(
      (a: any, b: any) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    res.status(200).json({
      transactions,
      totalSum,
      currentPage: parseInt(page as string),
      limit: parseInt(limit as string),
    });
  } catch (error) {
    console.error("Ошибка при получении транзакций:", error);
    res.status(500).json({ error: "Failed to fetch transactions" });
  }
};

export default filterTransactions;

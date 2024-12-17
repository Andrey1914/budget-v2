// import { NextApiRequest, NextApiResponse } from "next";
// import clientPromise from "@/lib/db";
// import { getToken } from "next-auth/jwt";
// import { ObjectId } from "mongodb";

// const secret = process.env.JWT_SECRET;

// const filterTransactions = async (
//   req: NextApiRequest,
//   res: NextApiResponse
// ) => {
//   if (req.method !== "GET") {
//     return res.status(405).end();
//   }

//   const token = await getToken({ req, secret });

//   if (!token) {
//     return res.status(401).json({ error: "Unauthorized" });
//   }

//   const { type, year, month, page = 1, limit = 500 } = req.query;
//   const userId = new ObjectId(token.sub);

//   const client = await clientPromise;
//   const db = client.db("budget-v2");

//   let selectedYear: number | null = null;
//   let selectedMonth: number | null = null;

//   if (month) {
//     selectedMonth = month === "all" ? null : parseInt(month as string);
//   }

//   if (year) {
//     selectedYear = year === "all" ? null : parseInt(year as string);
//   }

//   // Условие на временные рамки
//   const startOfMonth =
//     selectedMonth && selectedYear
//       ? new Date(Date.UTC(selectedYear, selectedMonth - 1, 1, 0, 0, 0))
//       : selectedYear
//       ? new Date(Date.UTC(selectedYear, 0, 1, 0, 0, 0))
//       : null;

//   const endOfMonth =
//     selectedMonth && selectedYear
//       ? new Date(Date.UTC(selectedYear, selectedMonth, 0, 23, 59, 59))
//       : selectedYear
//       ? new Date(Date.UTC(selectedYear, 11, 31, 23, 59, 59))
//       : null;

//   const skip = (parseInt(page as string) - 1) * parseInt(limit as string);

//   try {
//     let transactions: any = [];
//     let totalSum = 0;
//     let totalIncome = 0;
//     let totalExpense = 0;

//     // Условие фильтрации по времени
//     const dateCondition =
//       startOfMonth && endOfMonth
//         ? { date: { $gte: startOfMonth, $lte: endOfMonth } }
//         : {};

//     if (type === "income" || type === "both" || !type) {
//       const incomeQuery: any = { userId, ...dateCondition };

//       const incomeTransactions = await db
//         .collection("income")
//         .aggregate([
//           { $match: incomeQuery },
//           {
//             $lookup: {
//               from: "income-categories",
//               localField: "category",
//               foreignField: "_id",
//               as: "categoryDetails",
//             },
//           },
//           { $unwind: "$categoryDetails" },
//           { $skip: skip },
//           { $limit: parseInt(limit as string) },
//         ])
//         .toArray();

//       const incomeTotal = await db
//         .collection("income")
//         .aggregate([
//           { $match: incomeQuery },
//           { $group: { _id: null, total: { $sum: "$amount" } } },
//         ])
//         .toArray();

//       transactions = transactions.concat(incomeTransactions);
//       totalIncome = incomeTotal.length > 0 ? incomeTotal[0].total : 0;
//     }

//     if (type === "expense" || type === "both" || !type) {
//       const expenseQuery: any = { userId, ...dateCondition };

//       const expenseTransactions = await db
//         .collection("expense")
//         .aggregate([
//           { $match: expenseQuery },
//           {
//             $lookup: {
//               from: "expense-categories",
//               localField: "category",
//               foreignField: "_id",
//               as: "categoryDetails",
//             },
//           },
//           { $unwind: "$categoryDetails" },
//           { $skip: skip },
//           { $limit: parseInt(limit as string) },
//         ])
//         .toArray();

//       const expenseTotal = await db
//         .collection("expense")
//         .aggregate([
//           { $match: expenseQuery },
//           { $group: { _id: null, total: { $sum: "$amount" } } },
//         ])
//         .toArray();

//       transactions = transactions.concat(expenseTransactions);
//       totalExpense = expenseTotal.length > 0 ? expenseTotal[0].total : 0;
//     }

//     totalSum = totalIncome - totalExpense;

//     transactions.sort(
//       (a: any, b: any) =>
//         new Date(b.date).getTime() - new Date(a.date).getTime()
//     );

//     res.status(200).json({
//       transactions,
//       totalSum,
//       totalIncome,
//       totalExpense,
//       balance: totalSum,
//       currentPage: parseInt(page as string),
//       limit: parseInt(limit as string),
//     });
//   } catch (error) {
//     console.error("Ошибка при получении транзакций:", error);
//     res.status(500).json({ error: "Failed to fetch transactions" });
//   }
// };

// export default filterTransactions;

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

  const { type, year, month, page = 1, limit = 500 } = req.query;

  // console.log("Параметры запроса:", { type, month, page, limit });

  const userId = new ObjectId(token.sub);

  console.log(userId);

  const client = await clientPromise;
  const db = client.db("budget-v2");

  // console.log("Параметр month:", month);

  const currentYear = new Date().getFullYear();

  // console.log("Исходный параметр month:", month);

  let selectedYear: number | null = null;
  let selectedMonth: number | null = null;
  let totalIncome = 0;
  let totalExpense = 0;

  if (month) {
    selectedMonth = month === "all" ? null : parseInt(month as string);
  }

  if (year) {
    selectedYear = year === "all" ? null : parseInt(year as string);
  }
  // console.log("Числовое значение month:", selectedMonth);

  const startOfMonth =
    selectedMonth && selectedYear
      ? new Date(Date.UTC(selectedYear, selectedMonth - 1, 1, 0, 0, 0))
      : selectedYear
      ? new Date(Date.UTC(selectedYear, 0, 1, 0, 0, 0))
      : new Date(0);

  const endOfMonth =
    selectedMonth && selectedYear
      ? new Date(Date.UTC(selectedYear, selectedMonth, 0, 23, 59, 59))
      : selectedYear
      ? new Date(Date.UTC(selectedYear, 11, 31, 23, 59, 59))
      : new Date();

  const skip = (parseInt(page as string) - 1) * parseInt(limit as string);

  try {
    let transactions: any = [];
    let totalSum = 0;

    if (type === "income" || type === "both" || !type) {
      const incomeQuery: any = {
        userId: userId,
        ...(selectedYear && {
          date: { $gte: startOfMonth, $lte: endOfMonth },
        }),
      };

      // console.log("Запрос на доходы:", incomeQuery);

      const incomeTransactions = await db
        .collection("income")
        .aggregate([
          { $match: incomeQuery },
          {
            $lookup: {
              from: "income-categories",
              localField: "category",
              foreignField: "_id",
              as: "categoryDetails",
            },
          },
          { $unwind: "$categoryDetails" },
          { $skip: skip },
          { $limit: parseInt(limit as string) },
        ])
        .toArray();

      console.log(
        "Результаты запроса с aggregate для доходов:",
        incomeTransactions
      );

      const incomeTotal = await db
        .collection("income")
        .aggregate([
          { $match: incomeQuery },

          { $group: { _id: null, total: { $sum: "$amount" } } },
        ])
        .toArray();

      // console.log(
      //   "Итоговая сумма доходов:",
      //   incomeTotal.length > 0 ? incomeTotal[0].total : 0
      // );

      // console.log("Найденные доходы:", incomeTransactions);

      transactions = transactions.concat(incomeTransactions);

      totalSum += incomeTotal.length > 0 ? incomeTotal[0].total : 0;

      totalIncome = incomeTotal.length > 0 ? incomeTotal[0].total : 0;

      // console.log("Общая сумма:", totalSum);
    }

    if (type === "expense" || type === "both" || !type) {
      const expenseQuery: any = {
        userId: userId,
        ...(selectedYear && {
          date: { $gte: startOfMonth, $lte: endOfMonth },
        }),
      };

      // console.log("Запрос на расходы:", expenseQuery);

      const expenseTransactions = await db
        .collection("expense")
        .aggregate([
          { $match: expenseQuery },
          {
            $lookup: {
              from: "expense-categories",
              localField: "category",
              foreignField: "_id",
              as: "categoryDetails",
            },
          },
          { $unwind: "$categoryDetails" },
          { $skip: skip },
          { $limit: parseInt(limit as string) },
        ])
        .toArray();

      // console.log(
      //   "Результаты запроса с aggregate для расходы:",
      //   expenseTransactions
      // );

      const expenseTotal = await db
        .collection("expense")
        .aggregate([
          { $match: expenseQuery },

          { $group: { _id: null, total: { $sum: "$amount" } } },
        ])
        .toArray();

      // console.log(
      //   "Итоговая сумма расходов:",
      //   expenseTotal.length > 0 ? expenseTotal[0].total : 0
      // );

      transactions = transactions.concat(expenseTransactions);

      totalSum += expenseTotal.length > 0 ? expenseTotal[0].total : 0;

      totalExpense = expenseTotal.length > 0 ? expenseTotal[0].total : 0;
      // console.log("Общая сумма:", totalSum);
    }

    const balance = totalIncome - totalExpense;

    transactions.sort(
      (a: any, b: any) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    res.status(200).json({
      transactions,
      totalSum,
      totalIncome,
      totalExpense,
      balance,
      currentPage: parseInt(page as string),
      limit: parseInt(limit as string),
    });
  } catch (error) {
    console.error("Ошибка при получении транзакций:", error);
    res.status(500).json({ error: "Failed to fetch transactions" });
  }
};

export default filterTransactions;

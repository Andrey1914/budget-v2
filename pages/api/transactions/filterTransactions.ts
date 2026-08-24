import { NextApiRequest, NextApiResponse } from "next";
// import clientPromise from "@/lib/db";
import { getDb } from "@/lib/db";
import { getToken } from "next-auth/jwt";
import { ObjectId } from "mongodb";

const secret = process.env.JWT_SECRET;

const filterTransactions = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const token = await getToken({ req, secret });

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { type = "both", year, month, page = 1 } = req.query;

  const userId = new ObjectId(token.sub);

  const selectedYear = year === "all" ? null : parseInt(year as string);
  const selectedMonth = month === "all" ? null : parseInt(month as string);

  const startOfMonth =
    selectedYear && selectedMonth
      ? new Date(Date.UTC(selectedYear, selectedMonth - 1, 1))
      : selectedYear
        ? new Date(Date.UTC(selectedYear, 0, 1))
        : new Date(0);

  const endOfMonth =
    selectedYear && selectedMonth
      ? new Date(Date.UTC(selectedYear, selectedMonth, 0, 23, 59, 59))
      : selectedYear
        ? new Date(Date.UTC(selectedYear, 11, 31, 23, 59, 59))
        : new Date();

  const skip = (parseInt(page as string) - 1) * 10;

  try {
    // const client = await clientPromise;
    // const db = client.db("budget-v2");
    const db = await getDb();

    const user = await db.collection("users").findOne({ _id: userId });
    const userCurrency = user?.currency || "";

    const queries: { [key: string]: any } = {
      income: {
        collection: "income",
        categoryCollection: "income-categories",
        query: {
          userId,
          ...(selectedYear && {
            date: { $gte: startOfMonth, $lte: endOfMonth },
          }),
        },
      },
      expense: {
        collection: "expense",
        categoryCollection: "expense-categories",
        query: {
          userId,
          ...(selectedYear && {
            date: { $gte: startOfMonth, $lte: endOfMonth },
          }),
        },
      },
    };

    let transactions: any[] = [];
    let totalIncome = 0;
    let totalExpense = 0;

    const fetchTransactions = async (typeKey: "income" | "expense") => {
      const { collection, categoryCollection, query } = queries[typeKey];

      const transactionList = await db
        .collection(collection)
        .aggregate([
          { $match: query },
          {
            $lookup: {
              from: categoryCollection,
              localField: "category",
              foreignField: "_id",
              as: "categoryDetails",
            },
          },
          { $unwind: "$categoryDetails" },
          { $skip: skip },
          { $limit: 10 },
        ])
        .toArray();

      const currencyResult = await db
        .collection(collection)
        .aggregate([
          { $match: query },
          {
            $group: {
              _id: "$currency",
              total: { $sum: "$amount" },
            },
          },
        ])
        .toArray();

      let totalAmount = 0;

      currencyResult.forEach((item) => {
        const transactionCurrency = item._id || userCurrency;

        if (transactionCurrency === userCurrency) {
          totalAmount += item.total;
        }
      });

      return {
        transactions: transactionList,
        totalAmount,
      };
    };

    if (type === "income" || type === "both") {
      const { transactions: incomeTransactions, totalAmount } =
        await fetchTransactions("income");

      transactions = transactions.concat(
        incomeTransactions.map((transaction) => ({
          ...transaction,
          type: "income",
        })),
      );

      totalIncome = totalAmount;
    }

    if (type === "expense" || type === "both") {
      const { transactions: expenseTransactions, totalAmount } =
        await fetchTransactions("expense");

      transactions = transactions.concat(
        expenseTransactions.map((transaction) => ({
          ...transaction,
          type: "expense",
        })),
      );

      totalExpense = totalAmount;
    }

    const currencyTotalsResult = await Promise.all(
      [
        ...(type === "income" || type === "both" ? ["income"] : []),
        ...(type === "expense" || type === "both" ? ["expense"] : []),
      ].map(async (collectionName) => {
        const result = await db
          .collection(collectionName)
          .aggregate([
            {
              $match: queries[collectionName].query,
            },
            {
              $group: {
                _id: "$currency",
                total: { $sum: "$amount" },
              },
            },
          ])
          .toArray();

        return {
          type: collectionName,
          result,
        };
      }),
    );

    const currencyMap: {
      [currency: string]: {
        income: number;
        expense: number;
        balance: number;
      };
    } = {};

    currencyTotalsResult.forEach(({ type: transactionType, result }) => {
      result.forEach((item) => {
        const currency = item._id || userCurrency;

        if (!currencyMap[currency]) {
          currencyMap[currency] = {
            income: 0,
            expense: 0,
            balance: 0,
          };
        }

        if (transactionType === "income") {
          currencyMap[currency].income += item.total;
        }

        if (transactionType === "expense") {
          currencyMap[currency].expense += item.total;
        }
      });
    });

    Object.keys(currencyMap).forEach((currency) => {
      currencyMap[currency].balance =
        currencyMap[currency].income - currencyMap[currency].expense;
    });

    const currencyTotals = Object.entries(currencyMap)
      .filter(([currency]) => currency !== userCurrency)
      .map(([currency, values]) => ({
        currency,
        income: values.income,
        expense: values.expense,
        balance: values.balance,
      }));

    const incomeCount = await db
      .collection("income")
      .countDocuments(queries.income.query);

    const expenseCount = await db
      .collection("expense")
      .countDocuments(queries.expense.query);

    const totalTransactions = incomeCount + expenseCount;

    transactions.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );

    const totalSum = totalIncome - totalExpense;

    res.status(200).json({
      transactions,

      totalSum,
      totalIncome,
      totalExpense,
      balance: totalSum,
      currency: userCurrency,

      currencyTotals,

      currentPage: parseInt(page as string),
      totalTransactions,
    });
  } catch (error) {
    console.error("Ошибка при получении транзакций:", error);

    res.status(500).json({
      error: "Failed to fetch transactions",
    });
  }
};

export default filterTransactions;

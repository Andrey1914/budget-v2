"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import { IIncome, IExpense } from "@/interfaces";

const HistoryPage = () => {
  const searchParams = useSearchParams();

  // const month = searchParams ? searchParams.get("month") || "" : "";
  const month = searchParams?.get("month") || "all";
  const type = searchParams?.get("type") || "both";
  const page = searchParams?.get("page") || "1";

  const query: any = { type, page, month };

  console.log("Параметры запроса:", query);

  const [transactions, setTransactions] = useState<IIncome[] | IExpense[]>([]);
  const [totalSum, setTotalSum] = useState<number>(0);

  useEffect(() => {
    if (!month || !type || !page) {
      console.log("Отсутствуют параметры запроса:", { month, type, page });
      return;
    }

    const fetchTransactions = async () => {
      try {
        const response = await axios.get(
          "/api/transactions/filterTransactions",
          {
            params: { month, type, page },
          }
        );

        console.log("Ответ от сервера:", response.data);

        setTransactions(response.data.transactions);
        setTotalSum(response.data.totalSum);
      } catch (error) {
        console.error("Ошибка при загрузке транзакций:", error);
      }
    };

    if (month || type || page) {
      fetchTransactions();
    }
  }, [month, type, page]);

  return (
    <div>
      <h1>History</h1>
      <p>Total sum: {totalSum}</p>
      <ul>
        {transactions.map((transaction) => (
          <li key={transaction._id.toString()}>
            {transaction.description} - {transaction.amount} (
            {new Date(transaction.date).toLocaleDateString()})
          </li>
        ))}
      </ul>
      <Link href="/dashboard">Back to Dashboard</Link>
    </div>
  );
};

export default HistoryPage;

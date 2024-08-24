"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { handleDelete } from "@/app/dashboard/expense/delete";

type Expense = {
  _id: string;
  amount: number;
  description: string;
  category: string;
  date: string;
};

const ExpensesList: React.FC = () => {
  const { data: session } = useSession();
  const [expense, setExpense] = useState<Expense[]>([]);
  const [totalExpense, setTotalExpense] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (session) {
      const fetchData = async () => {
        try {
          const expenseRes = await fetch("/api/expense/get", {
            headers: {
              Authorization: `Bearer ${session?.token}`,
            },
          });

          if (!expenseRes.ok) {
            throw new Error("Failed to fetch data");
          }

          const expenseData: Expense[] = await expenseRes.json();
          setExpense(expenseData);

          const total = expenseData.reduce(
            (acc: number, item: Expense) => acc + item.amount,
            0
          );
          setTotalExpense(total);
        } catch (err) {
          setError((err as Error).message);
        }
      };

      fetchData();
    }
  }, [session]);

  if (!session) {
    return null;
  }

  return (
    <div>
      <div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <div>
          <h2>Expenses</h2>
          <p>Total Expenses for this month: {totalExpense}</p>{" "}
          <ul>
            {expense.map((item: Expense) => (
              <li key={item._id}>
                {item.amount} - {item.description}
                <button
                  onClick={() =>
                    handleDelete(item._id, expense, setExpense, setTotalExpense)
                  }
                  style={{ marginLeft: "10px", color: "red" }}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ExpensesList;

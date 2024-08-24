"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { handleDelete } from "@/app/dashboard/income/delete";

type Income = {
  _id: string;
  amount: number;
  description: string;
  category: string;
  date: string;
};

const IncomesList: React.FC = () => {
  const { data: session } = useSession();
  const [income, setIncome] = useState<any[]>([]);
  const [totalIncome, setTotalIncome] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (session) {
      const fetchData = async () => {
        try {
          const incomeRes = await fetch("/api/income/get", {
            headers: {
              Authorization: `Bearer ${session?.token}`,
            },
          });

          if (!incomeRes.ok) {
            throw new Error("Failed to fetch data");
          }

          const incomeData: Income[] = await incomeRes.json();
          setIncome(incomeData);

          const total = incomeData.reduce(
            (acc: number, item: Income) => acc + item.amount,
            0
          );
          setTotalIncome(total);
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
          <h2>Incomes</h2>
          <p>Total Incomes for this month: {totalIncome}</p>
          <ul>
            {income.map((item: Income) => (
              <li key={item._id}>
                {item.amount} - {item.description}
                <button
                  onClick={() =>
                    handleDelete(item._id, income, setIncome, setTotalIncome)
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

export default IncomesList;

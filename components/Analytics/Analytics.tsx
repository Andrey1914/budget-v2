import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { CategoryChartProps, ChartData, IIncome, IExpense } from "@/interfaces";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

interface CategoryChartTransaction extends IIncome, IExpense {
  type: "income" | "expense";
}

interface CategoryChartPropsExtended extends Omit<
  CategoryChartProps,
  "transactions"
> {
  transactions: CategoryChartTransaction[];
}

const CategoryChart: React.FC<CategoryChartPropsExtended> = ({
  selectedMonth,
  transactions,
}) => {
  const [chartData, setChartData] = useState<ChartData>({
    labels: [],
    datasets: [
      {
        label: "",
        data: [],
        backgroundColor: "",
        borderColor: "",
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    if (!Array.isArray(transactions)) {
      console.error(
        "analyticsData is not an array or is undefined:",
        transactions,
      );
      return;
    }

    const totals: {
      [key: string]: {
        income: number;
        expense: number;
      };
    } = {};

    transactions.forEach((transaction) => {
      const categoryName = transaction.categoryDetails?.name || "Без категорії";

      const currency = transaction.currency || "N/A";

      const key = `${categoryName} — ${currency}`;

      if (!totals[key]) {
        totals[key] = {
          income: 0,
          expense: 0,
        };
      }

      if (transaction.type === "income") {
        totals[key].income += transaction.amount;
      }

      if (transaction.type === "expense") {
        totals[key].expense += transaction.amount;
      }
    });

    const labels = Object.keys(totals);

    const incomeData = labels.map((label) => totals[label].income);
    const expenseData = labels.map((label) => totals[label].expense);

    setChartData({
      labels,
      datasets: [
        {
          label: "Доход",
          data: incomeData,
          backgroundColor: "rgba(75, 192, 192, 0.5)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
        {
          label: "Расход",
          data: expenseData,
          backgroundColor: "rgba(255, 99, 132, 0.5)",
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 1,
        },
      ],
    });
  }, [transactions, selectedMonth]);

  return (
    <div>
      <h2>Доходы и расходы за месяц {selectedMonth}</h2>

      <Bar
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            legend: {
              position: "top" as const,
            },
            title: {
              display: true,
              text: "График доходов и расходов по категориям и валютам",
            },
            tooltip: {
              callbacks: {
                label: (context) => {
                  const value = context.parsed.y ?? 0;
                  const label = context.dataset.label || "";

                  return `${label}: ${value.toFixed(2)}`;
                },
              },
            },
          },
        }}
      />
    </div>
  );
};

export default CategoryChart;

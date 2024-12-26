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

import { CategoryChartProps, ChartData } from "@/interfaces";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const CategoryChart: React.FC<CategoryChartProps> = ({
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
    const loadData = async () => {
      const categoryTotals: { [key: string]: number } = {};

      if (Array.isArray(transactions)) {
        transactions.forEach((transaction) => {
          const categoryName =
            transaction.categoryDetails?.name || "Без категории";
          categoryTotals[categoryName] =
            (categoryTotals[categoryName] || 0) + transaction.amount;
        });
      } else {
        console.error(
          "analyticsData is not an array or is undefined:",
          transactions
        );
      }

      setChartData({
        labels: Object.keys(categoryTotals),
        datasets: [
          {
            label: `Транзакции за месяц ${selectedMonth}`,
            data: Object.values(categoryTotals),
            backgroundColor: "rgba(75, 192, 192, 0.5)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
        ],
      });
    };

    loadData();
  }, [transactions, selectedMonth]);

  return (
    <div>
      <h2>Расходы по категориям за месяц {selectedMonth}</h2>
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
              text: "График расходов по категориям",
            },
          },
        }}
      />
    </div>
  );
};

export default CategoryChart;

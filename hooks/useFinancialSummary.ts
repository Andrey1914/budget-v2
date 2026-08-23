import { useEffect, useState } from "react";
import axios from "axios";

interface SummaryData {
  currency: string;
  carryOver: number;
  totalIncome: number;
  totalExpense: number;
  balance: number;
  incomeByCurrency: { _id: string; total: number }[];
  expenseByCurrency: { _id: string; total: number }[];
}

export const useFinancialSummary = () => {
  const [data, setData] = useState<SummaryData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const res = await axios.get("/api/transactions/getFinancialSummary");

        if (res.status !== 200)
          throw new Error("Ошибка при загрузке финансовых данных");
        const json = res.data;
        setData(json);
      } catch (err: any) {
        setError(err.message || "Неизвестная ошибка");
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, []);

  return { data, loading, error };
};

import React, { useEffect, useState } from "react";
import { Box, Typography, CircularProgress, Alert } from "@mui/material";
import axios from "axios";

export interface CurrencyTotal {
  _id: string;
  total: number;
}

export type TransactionType = "income" | "expense";

interface ForeignCurrencySummaryProps {
  /** Тип транзакции. Если не указан, отображаются и доходы, и расходы */
  type?: TransactionType;
}

const ForeignCurrency: React.FC<ForeignCurrencySummaryProps> = ({ type }) => {
  const [data, setData] = useState<CurrencyTotal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchForeignCurrencyTotals = async () => {
      try {
        setLoading(true);
        const res = await axios.get("/api/transactions/getFinancialSummary");

        if (type) {
          // Выбираем конкретный массив в зависимости от пропса
          const key =
            type === "income" ? "incomeByCurrency" : "expenseByCurrency";
          setData(res.data[key] || []);
        } else {
          // Если тип не передан, можно объединить или передать всё
          const income: CurrencyTotal[] = res.data.incomeByCurrency || [];
          const expense: CurrencyTotal[] = res.data.expenseByCurrency || [];
          setData([...income, ...expense]);
        }
      } catch (err) {
        console.error("Ошибка при получении валютных данных:", err);
        setError("Не удалось загрузить данные по валютам");
      } finally {
        setLoading(false);
      }
    };

    fetchForeignCurrencyTotals();
  }, [type]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={2}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box mt={2}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  if (data.length === 0) {
    return (
      <Box mt={2}>
        <Typography variant="body1" color="text.secondary">
          У вас нет доходов или расходов в других валютах.
        </Typography>
      </Box>
    );
  }

  return (
    <Box mt={2}>
      <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
        {data.map((item, index) => (
          <Typography key={`${item._id}-${index}`} variant="body1">
            {item.total.toFixed(2)} {item._id}
          </Typography>
        ))}
      </Box>
    </Box>
  );
};

export default ForeignCurrency;

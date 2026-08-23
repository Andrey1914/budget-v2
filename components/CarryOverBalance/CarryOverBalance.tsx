"use client";

import { Box, Typography, Divider } from "@mui/material";
import { useFinancialSummary } from "@/hooks/useFinancialSummary";
import ForeignCurrencySummary from "@/components/Transactions/ForeignCurrencySummary";

const CarryOverBalance: React.FC = () => {
  const { data, loading, error } = useFinancialSummary();

  if (loading) return <p>Загрузка...</p>;
  if (error || !data) return <p>Ошибка: {error}</p>;

  const { carryOver, totalIncome, totalExpense, currency } = data;

  const currentBalance = carryOver + totalIncome - totalExpense;

  return (
    <>
      <Box sx={{ p: 4 }}>
        <Typography variant="h3">Поточний баланс:</Typography>
      </Box>
      <Box sx={{ p: 2 }}>
        <Typography variant="subtitle1">Перенесений залишок:</Typography>
        <Typography variant="body1" color="primary">
          {carryOver} {currency}
        </Typography>
      </Box>
      <Divider />
      <Box sx={{ p: 2 }}>
        <Typography variant="subtitle1">Доходи поточного місяця:</Typography>
        <Typography variant="body1" color="success.main">
          +{totalIncome} {currency}
        </Typography>
      </Box>
      <Divider />
      <Box sx={{ p: 2 }}>
        <Typography variant="subtitle1">Витрати поточного місяця:</Typography>
        <Typography variant="body1" color="error.main">
          -{totalExpense} {currency}
        </Typography>
      </Box>
      <Divider />
      <Box sx={{ p: 2 }}>
        <Typography variant="subtitle1">Загальний баланс:</Typography>
        <Typography
          variant="body1"
          color={currentBalance >= 0 ? "primary" : "error.main"}
        >
          {currentBalance >= 0
            ? currentBalance
            : `-${Math.abs(currentBalance)}`}{" "}
          {currency}
        </Typography>
      </Box>
      <ForeignCurrencySummary />
    </>
  );
};

export default CarryOverBalance;

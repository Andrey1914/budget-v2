"use client";

import { Box, Typography, Divider } from "@mui/material";
import { useCurrentBalance } from "@/hooks/useCurrentBalance";
import ForeignCurrencySummary from "@/components/Transactions/ForeignCurrencySummary";

const CarryOverBalance: React.FC = () => {
  const { data, currentBalance, currency, isLoading, error } =
    useCurrentBalance();

  if (isLoading) return <p>Загрузка...</p>;

  if (error || !data) {
    return <p>Ошибка: {error?.message || "Ошибка загрузки"}</p>;
  }

  const { carryOver, totalIncome, totalExpense } = data;

  return (
    <>
      <Typography variant="h3">Поточний баланс:</Typography>

      <Typography
        variant="h4"
        fontWeight={700}
        color={currentBalance >= 0 ? "primary" : "error.main"}
        mt={0.5}
        mb={2}
      >
        {currentBalance} {currency}
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "space-between", p: 2 }}>
        <Typography variant="subtitle1" color="text.secondary">
          Перенесений залишок:
        </Typography>
        <Typography variant="body1" color="primary">
          {carryOver} {currency}
        </Typography>
      </Box>
      <Divider />
      <Box sx={{ display: "flex", justifyContent: "space-between", p: 2 }}>
        <Typography variant="subtitle1" color="text.secondary">
          Доходи поточного місяця:
        </Typography>
        <Typography variant="body1" color="success.main">
          +{totalIncome} {currency}
        </Typography>
      </Box>
      <Divider />
      <Box sx={{ display: "flex", justifyContent: "space-between", p: 2 }}>
        <Typography variant="subtitle1" color="text.secondary">
          Витрати поточного місяця:
        </Typography>
        <Typography variant="body1" color="error.main">
          -{totalExpense} {currency}
        </Typography>
      </Box>
      <Divider />

      <ForeignCurrencySummary />
    </>
  );
};

export default CarryOverBalance;

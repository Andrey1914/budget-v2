"use client";

import React from "react";
import { Box, Typography, Divider } from "@mui/material";
import { BalanceComparisonProps } from "@/interfaces";

const CarryOverBalance: React.FC<BalanceComparisonProps> = ({
  carryOverBalance = 0,
  totalIncome,
  totalExpense,
}) => {
  const currentBalance = carryOverBalance + totalIncome - totalExpense;

  return (
    <>
      <Box sx={{ p: 4 }}>
        <Typography variant="h3" component="h2">
          Ваш текущий баланс
        </Typography>
      </Box>
      <Box sx={{ p: 3 }}>
        <Typography variant="subtitle1" color="textSecondary">
          Перенесенный остаток:
        </Typography>
        <Typography variant="h6" color="primary">
          {carryOverBalance} PLN
        </Typography>
      </Box>
      <Divider />
      <Box sx={{ my: 2 }}>
        <Typography variant="subtitle1" color="textSecondary">
          Доходы текущего месяца:
        </Typography>
        <Typography variant="h6" color="success.main">
          +{totalIncome} PLN
        </Typography>
      </Box>
      <Divider />
      <Box sx={{ my: 2 }}>
        <Typography variant="subtitle1" color="textSecondary">
          Расходы текущего месяца:
        </Typography>
        <Typography variant="h6" color="error.main">
          -{totalExpense} PLN
        </Typography>
      </Box>
      <Divider />
      <Box sx={{ mt: 3 }}>
        <Typography variant="h6" color="textSecondary">
          Итоговый баланс:
        </Typography>
        <Typography
          variant="h4"
          color={currentBalance >= 0 ? "primary" : "error.main"}
        >
          {currentBalance} PLN
        </Typography>
      </Box>
    </>
  );
};

export default CarryOverBalance;

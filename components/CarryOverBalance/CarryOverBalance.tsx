"use client";

import React from "react";
import { useSession } from "next-auth/react";
import { Box, Typography, Divider } from "@mui/material";
import { Session, BalanceComparisonProps } from "@/interfaces";

const CarryOverBalance: React.FC<BalanceComparisonProps> = ({
  carryOverBalance = 0,
  totalIncome,
  totalExpense,
}) => {
  const { data: session } = useSession() as {
    data: Session | null;
  };
  const currentBalance = carryOverBalance + totalIncome - totalExpense;
  const userCurrency = session?.user?.currency;

  return (
    <>
      <Box sx={{ p: 4 }}>
        <Typography variant="h3" component="h2">
          Поточний баланс:
        </Typography>
      </Box>
      <Box sx={{ p: 2 }}>
        <Typography variant="subtitle1" component="p" color="textSecondary">
          Перенесений залишок:
        </Typography>
        <Typography variant="body1" component="p" color="primary">
          {carryOverBalance} {userCurrency}
        </Typography>
      </Box>
      <Divider />
      <Box sx={{ p: 2 }}>
        <Typography variant="subtitle1" component="p" color="textSecondary">
          Доходи поточного місяця:
        </Typography>
        <Typography variant="body1" component="p" color="success.main">
          +{totalIncome} {userCurrency}
        </Typography>
      </Box>
      <Divider />
      <Box sx={{ p: 2 }}>
        <Typography variant="subtitle1" component="p" color="textSecondary">
          Витрати поточного місяця:
        </Typography>
        <Typography variant="body1" component="p" color="error.main">
          -{totalExpense} {userCurrency}
        </Typography>
      </Box>
      <Divider />
      <Box sx={{ p: 2 }}>
        <Typography variant="subtitle1" component="p" color="textSecondary">
          Загальний баланс:
        </Typography>
        <Typography
          variant="body1"
          component="p"
          color={currentBalance >= 0 ? "primary" : "error.main"}
        >
          {currentBalance >= 0
            ? currentBalance
            : `-${Math.abs(currentBalance)}`}{" "}
          {userCurrency}
        </Typography>
      </Box>
    </>
  );
};

export default CarryOverBalance;

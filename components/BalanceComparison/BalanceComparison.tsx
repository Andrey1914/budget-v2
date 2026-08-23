"use client";

import { Box, Typography } from "@mui/material";

interface CurrencyTotal {
  currency: string;
  income: number;
  expense: number;
  balance: number;
}

interface BalanceComparisonProps {
  totalIncome: number;
  totalExpense: number;
  currency: string;
  currencyTotals: CurrencyTotal[];
}

const BalanceComparison: React.FC<BalanceComparisonProps> = ({
  totalIncome,
  totalExpense,
  currency,
  currencyTotals,
}) => {
  const balance = totalIncome - totalExpense;

  return (
    <Box
      sx={{
        padding: "1rem",
        borderRadius: "0.3rem",
        backgroundColor: balance >= 0 ? "lightgreen" : "lightcoral",
        color: "white",
        textAlign: "center",
        marginTop: "1rem",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h4">
          Доход: {totalIncome.toFixed(2)} {currency}
        </Typography>

        <Typography variant="h4">
          Расход: {totalExpense.toFixed(2)} {currency}
        </Typography>

        <Typography variant="h4">
          {balance >= 0 ? "Баланс" : "Дефицит"}: {balance.toFixed(2)} {currency}
        </Typography>
      </Box>

      {currencyTotals.length > 0 && (
        <Box sx={{ marginTop: "1.5rem" }}>
          <Typography variant="h5" gutterBottom>
            Иностранные валюты
          </Typography>

          {currencyTotals.map((item) => (
            <Box
              key={item.currency}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "0.5rem",
              }}
            >
              <Typography>
                Доход: {item.income.toFixed(2)} {item.currency}
              </Typography>

              {item.expense !== 0 && (
                <Typography>
                  Расход: {item.expense.toFixed(2)} {item.currency}
                </Typography>
              )}

              <Typography>
                {item.balance >= 0 ? "Баланс" : "Дефицит"}:{" "}
                {item.balance.toFixed(2)} {item.currency}
              </Typography>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default BalanceComparison;

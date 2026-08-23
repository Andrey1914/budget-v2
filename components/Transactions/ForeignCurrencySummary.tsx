import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  Alert,
  Divider,
} from "@mui/material";
import axios from "axios";

interface CurrencyTotal {
  _id: string;
  total: number;
}

const ForeignCurrencySummary: React.FC = () => {
  const [incomeByCurrency, setIncomeByCurrency] = useState<CurrencyTotal[]>([]);
  const [expenseByCurrency, setExpenseByCurrency] = useState<CurrencyTotal[]>(
    [],
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchForeignCurrencyTotals = async () => {
      try {
        const res = await axios.get("/api/transactions/getFinancialSummary");

        setIncomeByCurrency(res.data.incomeByCurrency);
        setExpenseByCurrency(res.data.expenseByCurrency);
      } catch (err) {
        console.error("Ошибка при получении валютных данных:", err);
        setError("Не удалось загрузить данные по валютам");
      } finally {
        setLoading(false);
      }
    };

    fetchForeignCurrencyTotals();
  }, []);

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

  const hasForeignIncome = incomeByCurrency.length > 0;
  const hasForeignExpenses = expenseByCurrency.length > 0;

  if (!hasForeignIncome && !hasForeignExpenses) {
    return (
      <Box mt={2}>
        <Typography variant="body1">
          У вас нет доходов или расходов в других валютах.
        </Typography>
      </Box>
    );
  }

  const currencies = new Set([
    ...incomeByCurrency.map((item) => item._id),
    ...expenseByCurrency.map((item) => item._id),
  ]);

  const currencyBalances = Array.from(currencies).map((currency) => {
    const income =
      incomeByCurrency.find((item) => item._id === currency)?.total || 0;

    const expense =
      expenseByCurrency.find((item) => item._id === currency)?.total || 0;

    return {
      currency,
      income,
      expense,
      balance: income - expense,
    };
  });

  return (
    <Box mt={4}>
      <Box sx={{ p: 2 }}>
        <Typography variant="h3" gutterBottom>
          Общий баланс в других валютах:
        </Typography>
      </Box>

      {currencyBalances.map((item) => (
        <Box key={item.currency} mb={2}>
          <Box sx={{ p: 2 }}>
            <Typography variant="subtitle1">
              Доходи поточного місяця в {item.currency}:
              <Typography variant="body1" color="success.main">
                +{item.income.toFixed(2)} {item.currency}
              </Typography>
            </Typography>
          </Box>
          <Divider />

          {item.expense > 0 && (
            <>
              <Box sx={{ p: 2 }}>
                <Typography variant="subtitle1">
                  Расходи поточного місяця в {item.currency}:
                  <Typography variant="body1" color="error.main">
                    -{item.expense.toFixed(2)} {item.currency}
                  </Typography>
                </Typography>
              </Box>
              <Divider />
            </>
          )}

          <Box sx={{ p: 2 }}>
            <Typography variant="subtitle1">
              Загальний баланс в {item.currency}:
              <Typography
                variant="body1"
                color={
                  item.balance > 0
                    ? "primary"
                    : item.balance < 0
                      ? "error.main"
                      : "primary"
                }
              >
                {item.balance.toFixed(2)} {item.currency}
              </Typography>
            </Typography>
          </Box>
          <Divider />
        </Box>
      ))}
    </Box>
  );
};

export default ForeignCurrencySummary;

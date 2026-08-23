import React, { useEffect, useState } from "react";
import { Box, Typography, CircularProgress, Alert } from "@mui/material";
import axios from "axios";

interface CurrencyTotal {
  _id: string;
  total: number;
}

const ForeignCurrencySummary: React.FC = () => {
  const [incomeByCurrency, setIncomeByCurrency] = useState<CurrencyTotal[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchForeignCurrencyTotals = async () => {
      try {
        const res = await axios.get("/api/transactions/getFinancialSummary");
        setIncomeByCurrency(res.data.incomeByCurrency);
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

  if (!hasForeignIncome) {
    return (
      <Box mt={2}>
        <Typography variant="body1">
          У вас нет доходов или расходов в других валютах.
        </Typography>
      </Box>
    );
  }

  return (
    <Box mt={2}>
      {hasForeignIncome && (
        <Box sx={{ display: "flex", gap: 2 }}>
          {incomeByCurrency.map((item) => (
            <Typography key={item._id}>
              {item.total.toFixed(2)} {item._id}
            </Typography>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default ForeignCurrencySummary;

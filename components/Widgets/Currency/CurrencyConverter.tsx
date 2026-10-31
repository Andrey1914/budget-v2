"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  Box,
  Typography,
  IconButton,
  MenuItem,
  Select,
  FormControl,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { StyledTextField } from "@/components/UI";
import { PrimaryButton } from "@/components/UI/Buttons/styles";

interface CurrencyConverterProps {
  open: boolean;
  onClose: () => void;
}

const DEFAULT_RATES: Record<string, number> = {
  UAH: 1.0,
  USD: 41.35,
  EUR: 45.9,
  PLN: 10.8,
};

const CURRENCY_CODES = ["UAH", "USD", "EUR", "PLN"];

export const CurrencyConverter: React.FC<CurrencyConverterProps> = ({
  open,
  onClose,
}) => {
  const [rates, setRates] = useState<Record<string, number>>(DEFAULT_RATES);
  const [amountFrom, setAmountFrom] = useState<string>("100");
  const [amountTo, setAmountTo] = useState<string>("");
  const [currencyFrom, setCurrencyFrom] = useState<string>("USD");
  const [currencyTo, setCurrencyTo] = useState<string>("UAH");

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const res = await fetch(
          "https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json",
        );
        if (res.ok) {
          const data = await res.json();
          const newRates: Record<string, number> = { UAH: 1.0 };
          data.forEach((item: { cc: string; rate: number }) => {
            if (["USD", "EUR", "PLN"].includes(item.cc)) {
              newRates[item.cc] = item.rate;
            }
          });
          setRates((prev) => ({ ...prev, ...newRates }));
        }
      } catch (err) {
        console.warn("Курсы НБУ загружены из резервных данных:", err);
      }
    };

    if (open) {
      fetchRates();
    }
  }, [open]);

  useEffect(() => {
    const val = parseFloat(amountFrom);
    if (isNaN(val) || val <= 0) {
      setAmountTo("");
      return;
    }
    const rateFrom = rates[currencyFrom] || 1;
    const rateTo = rates[currencyTo] || 1;
    const converted = (val * rateFrom) / rateTo;
    setAmountTo(converted.toFixed(2));
  }, [amountFrom, currencyFrom, currencyTo, rates]);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: {
          width: "656px",
          maxWidth: "100%",
          borderRadius: 1,
          p: 0,
          backgroundColor: "background.paper",
        },
      }}
    >
      {/* Шапка с кнопкой закрытия */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        <IconButton onClick={onClose} size="small" sx={{ p: 0.5 }}>
          <CloseIcon sx={{ fontSize: 20 }} />
        </IconButton>
      </Box>

      {/* Контент модального окна */}
      <DialogContent
        sx={{ p: 3, display: "flex", flexDirection: "column", gap: 2.5 }}
      >
        <Box display="flex" flexDirection="column" gap={0.5}>
          <Typography variant="h5" color="text.primary" fontWeight={400}>
            Конвертувати:
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Конвертація здійснюється за курсом НБУ.
          </Typography>
        </Box>

        <Box display="flex" flexDirection="column" gap={1.5}>
          <Box display="flex" gap={1.5} alignItems="center">
            <Box flex={1}>
              <StyledTextField
                placeholder="Сума"
                type="number"
                value={amountFrom}
                onChange={(e) => setAmountFrom(e.target.value)}
                fullWidth
                size="small"
              />
            </Box>
            <FormControl size="small" sx={{ width: 120 }}>
              <Select
                value={currencyFrom}
                onChange={(e) => setCurrencyFrom(e.target.value as string)}
                sx={{ borderRadius: 1, height: "40px" }}
              >
                {CURRENCY_CODES.map((code) => (
                  <MenuItem key={code} value={code}>
                    {code}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Box display="flex" gap={1.5} alignItems="center">
            <Box flex={1}>
              <StyledTextField
                placeholder="Сума"
                type="number"
                value={amountTo}
                InputProps={{ readOnly: true }}
                fullWidth
                size="small"
              />
            </Box>
            <FormControl size="small" sx={{ width: 120 }}>
              <Select
                value={currencyTo}
                onChange={(e) => setCurrencyTo(e.target.value as string)}
                sx={{ borderRadius: 1, height: "40px" }}
              >
                {CURRENCY_CODES.map((code) => (
                  <MenuItem key={code} value={code}>
                    {code}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Box>
      </DialogContent>

      {/* Центрированная кнопка OK по макету */}
      <Box sx={{ py: 2, px: 3, display: "flex", justifyContent: "center" }}>
        <PrimaryButton
          onClick={onClose}
          sx={{
            width: "110px",
            height: "48px",
            fontSize: "24px",
            fontWeight: 300,
          }}
        >
          OK
        </PrimaryButton>
      </Box>
    </Dialog>
  );
};

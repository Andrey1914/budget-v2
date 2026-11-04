"use client";

import React from "react";
import { Box, IconButton } from "@mui/material";
import AutorenewIcon from "@mui/icons-material/Autorenew";

import { Modal } from "@/components/UI";

import { useCurrencyConverter } from "@/hooks/useTransactionHooks";

import {
  CurrencyConverterHeader,
  CurrencyProviderSelector,
  CurrencyAmountField,
  CurrencyConverterFooter,
} from "./CurrencyConverter/index";

import type { CurrencyConverterProps } from "@/components/Widgets/Currency/types";

export const CurrencyConverter: React.FC<CurrencyConverterProps> = ({
  open,
  onClose,
}) => {
  const {
    currencies,
    supportedCurrencies,

    provider,
    amountFrom,
    amountTo,
    currencyFrom,
    currencyTo,

    isLoading,
    error,
    updatedAt,

    setCurrencyFrom,
    setCurrencyTo,

    handleAmountFromChange,
    handleAmountToChange,
    handleSwapCurrencies,
    handleProviderChange,
  } = useCurrencyConverter(open);

  return (
    <Modal open={open} onClose={onClose} maxWidth="sm">
      <Box display="flex" flexDirection="column" gap={2.5}>
        <CurrencyConverterHeader />

        <CurrencyProviderSelector
          provider={provider}
          onChange={handleProviderChange}
        />

        <Box display="flex" flexDirection="column" gap={1}>
          <CurrencyAmountField
            amount={amountFrom}
            currency={currencyFrom}
            currencies={currencies}
            supportedCurrencies={supportedCurrencies}
            loading={isLoading}
            error={error}
            onAmountChange={handleAmountFromChange}
            onCurrencyChange={setCurrencyFrom}
          />

          <Box display="flex" justifyContent="center" p={2}>
            <IconButton
              onClick={handleSwapCurrencies}
              aria-label="Поміняти валюти місцями"
              size="small"
              sx={{
                border: 1,
                borderColor: "divider",
                borderRadius: "50%",
              }}
            >
              <AutorenewIcon />
            </IconButton>
          </Box>

          <CurrencyAmountField
            amount={amountTo}
            currency={currencyTo}
            currencies={currencies}
            supportedCurrencies={supportedCurrencies}
            loading={isLoading}
            error={error}
            onAmountChange={handleAmountToChange}
            onCurrencyChange={setCurrencyTo}
          />
        </Box>

        <CurrencyConverterFooter
          loading={isLoading}
          error={error}
          updatedAt={updatedAt}
          onClose={onClose}
        />
      </Box>
    </Modal>
  );
};

export default CurrencyConverter;

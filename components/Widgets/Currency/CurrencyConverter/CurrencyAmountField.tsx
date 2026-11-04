import React from "react";
import { Box } from "@mui/material";
import { StyledTextField } from "@/components/UI";

import { CurrencySelect } from "./CurrencySelect";
import type { CurrencyAmountFieldProps } from "@/components/Widgets/Currency/types";

export const CurrencyAmountField: React.FC<CurrencyAmountFieldProps> = ({
  amount,
  currency,
  currencies,
  supportedCurrencies,
  loading,
  error,
  onAmountChange,
  onCurrencyChange,
}) => {
  return (
    <Box display="flex" gap={1} alignItems="center">
      <Box flex="1" minWidth={0}>
        <StyledTextField
          placeholder="Сума"
          type="number"
          value={amount}
          onChange={(e) => onAmountChange(e.target.value)}
          fullWidth
          size="small"
        />
      </Box>

      <CurrencySelect
        value={currency}
        currencies={currencies}
        supportedCurrencies={supportedCurrencies}
        loading={loading}
        error={error}
        onChange={onCurrencyChange}
      />
    </Box>
  );
};

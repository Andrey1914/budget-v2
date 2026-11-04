import React from "react";
import { Box, FormControl, MenuItem, Select, Typography } from "@mui/material";

import { CurrencyLabel } from "./CurrencyLabel";
import type { CurrencySelectProps } from "@/components/Widgets/Currency/types";

export const CurrencySelect: React.FC<CurrencySelectProps> = ({
  value,
  currencies,
  supportedCurrencies,
  loading,
  error,
  onChange,
}) => {
  const currenciesByCode = new Map(
    currencies.map((currency) => [currency.code, currency]),
  );

  const renderCurrencyValue = (selected: string) => {
    const currency = currenciesByCode.get(selected);

    return (
      <Box
        display="flex"
        alignItems="center"
        gap={1}
        minWidth={0}
        overflow="hidden"
      >
        <CurrencyLabel currencyCode={selected} />

        {currency && (
          <Typography
            component="span"
            variant="body2"
            color="text.secondary"
            noWrap
          >
            — {currency.name}
          </Typography>
        )}
      </Box>
    );
  };

  const renderOptions = () => {
    if (loading && supportedCurrencies.length === 0) {
      return <MenuItem disabled>Загрузка курсов...</MenuItem>;
    }

    if (supportedCurrencies.length === 0) {
      return <MenuItem disabled>{error || "Валюты недоступны"}</MenuItem>;
    }

    return supportedCurrencies.map((currencyCode) => {
      const currency = currenciesByCode.get(currencyCode);

      return (
        <MenuItem key={currencyCode} value={currencyCode}>
          <Box display="flex" alignItems="center" gap={1}>
            <CurrencyLabel currencyCode={currencyCode} />

            <Typography variant="body2">
              — {currency?.name || currencyCode}
            </Typography>
          </Box>
        </MenuItem>
      );
    });
  };

  return (
    <FormControl size="small" sx={{ flex: 1, minWidth: 0 }}>
      <Select
        value={value}
        onChange={(e) => onChange(e.target.value as string)}
        renderValue={(selected) => renderCurrencyValue(selected as string)}
        sx={{
          borderRadius: 1,
          height: "40px",
        }}
      >
        {renderOptions()}
      </Select>
    </FormControl>
  );
};

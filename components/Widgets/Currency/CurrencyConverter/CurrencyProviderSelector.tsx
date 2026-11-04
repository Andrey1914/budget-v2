import React from "react";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";

import type { ExchangeRateProvider } from "@/hooks/useTransactionHooks";
import type { CurrencyProviderSelectorProps } from "@/components/Widgets/Currency/types";

export const CurrencyProviderSelector: React.FC<
  CurrencyProviderSelectorProps
> = ({ provider, onChange }) => {
  return (
    <ToggleButtonGroup
      value={provider}
      exclusive
      onChange={(_, value: ExchangeRateProvider | null) => onChange(value)}
      size="small"
      fullWidth
    >
      <ToggleButton value="BOC">Bank of Canada</ToggleButton>

      <ToggleButton value="ECB">European Central Bank</ToggleButton>

      <ToggleButton value="NBU">Национальный банк Украины</ToggleButton>
    </ToggleButtonGroup>
  );
};

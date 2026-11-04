import React from "react";
import { Box, Typography } from "@mui/material";
import * as Flags from "country-flag-icons/react/3x2";
import { CURRENCY_FLAGS } from "../currencyFlags";
import { CurrencyLabelProps } from "@/components/Widgets/Currency/types";

type FlagComponent = React.ComponentType<React.SVGProps<SVGSVGElement>>;

export const CurrencyLabel: React.FC<CurrencyLabelProps> = ({
  currencyCode,
}) => {
  const countryCode = CURRENCY_FLAGS[currencyCode];

  const FlagIcon = countryCode
    ? (Flags as unknown as Record<string, FlagComponent>)[countryCode]
    : undefined;

  return (
    <Box display="flex" alignItems="center" gap={1}>
      {FlagIcon && (
        <FlagIcon
          style={{
            width: 24,
            height: 16,
            flexShrink: 0,
          }}
        />
      )}

      <Typography component="span" variant="body2">
        {currencyCode}
      </Typography>
    </Box>
  );
};

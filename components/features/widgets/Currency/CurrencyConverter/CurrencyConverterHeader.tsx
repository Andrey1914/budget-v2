import React from "react";
import { Box, Typography } from "@mui/material";

export const CurrencyConverterHeader: React.FC = () => {
  return (
    <Box display="flex" flexDirection="column" gap={0.5}>
      <Typography variant="h5" color="text.primary" fontWeight={400}>
        Конвертувати:
      </Typography>

      <Typography variant="body1" color="text.secondary">
        Конвертація здійснюється за курсом вибраного банка.
      </Typography>
    </Box>
  );
};

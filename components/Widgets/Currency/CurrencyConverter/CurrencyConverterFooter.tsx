import React from "react";
import { Box, Typography } from "@mui/material";
import { Oval } from "react-loader-spinner";
import { PrimaryButton } from "@/components/UI/Buttons/styles";
import type { CurrencyConverterFooterProps } from "@/components/Widgets/Currency/types";

export const CurrencyConverterFooter: React.FC<
  CurrencyConverterFooterProps
> = ({ loading, error, updatedAt, onClose }) => {
  return (
    <>
      {error && (
        <Typography variant="body2" color="error">
          {error}
        </Typography>
      )}

      {!error && loading && (
        <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
          <Oval
            height="24"
            width="24"
            color="#ffffff"
            secondaryColor="#6fb5e7"
          />

          <Typography variant="body2" color="text.secondary">
            Загрузка данных...
          </Typography>
        </Box>
      )}

      {!loading && !error && updatedAt && (
        <Typography variant="caption" color="text.secondary">
          Дата курса: {updatedAt.toLocaleDateString()}
        </Typography>
      )}

      <Box
        sx={{
          pt: 1,
          display: "flex",
          justifyContent: "center",
        }}
      >
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
    </>
  );
};

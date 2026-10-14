import React from "react";
import { Typography } from "@mui/material";
import { DashboardCard } from "@/components/UI";
import CarryOverBalance from "@/components/CarryOverBalance/CarryOverBalance";

interface BalanceWidgetProps {
  netBalance: number;
}

export const BalanceWidget: React.FC<BalanceWidgetProps> = ({ netBalance }) => {
  return (
    <DashboardCard elevation={0}>
      <Typography variant="caption" color="text.secondary">
        ПОТОЧНИЙ БАЛАНС
      </Typography>

      <Typography
        variant="h4"
        fontWeight={700}
        color="text.primary"
        mt={0.5}
        mb={2}
      >
        {netBalance.toFixed(2)} UAH
      </Typography>

      <CarryOverBalance />
    </DashboardCard>
  );
};

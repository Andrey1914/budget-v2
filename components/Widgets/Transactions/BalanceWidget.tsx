import React from "react";
import { DashboardCard } from "@/components/UI";
import CarryOverBalance from "@/components/CarryOverBalance/CarryOverBalance";

interface BalanceWidgetProps {
  netBalance: number;
}

export const BalanceWidget: React.FC<BalanceWidgetProps> = () => {
  return (
    <DashboardCard elevation={0}>
      <CarryOverBalance />
    </DashboardCard>
  );
};

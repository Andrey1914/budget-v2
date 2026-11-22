import React from "react";
import { DashboardCard } from "@/components/UI";
import { CarryOverBalance } from "@/components/features";
import type { BalanceWidgetProps } from "./types";

export const BalanceWidget: React.FC<BalanceWidgetProps> = () => {
  return (
    <DashboardCard elevation={0}>
      <CarryOverBalance />
    </DashboardCard>
  );
};

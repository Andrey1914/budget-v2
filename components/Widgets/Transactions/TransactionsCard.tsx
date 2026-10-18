import React from "react";
import { useSession } from "next-auth/react";
import { Session } from "@/interfaces";
import { Box, Typography, useTheme } from "@mui/material";
import { DashboardCard, PlusIconButton } from "@/components/UI";
import TransactionsList from "@/components/Transactions/TransactionsList";
import ForeignCurrency from "@/components/Transactions/ForeignCurrency";

interface TransactionsCardProps {
  type: "income" | "expense";
  totalAmount: number;
  onOpenModal: () => void;
  onUpdate: (updatedAmount: number) => void;
}

export const TransactionsCard: React.FC<TransactionsCardProps> = ({
  type,
  totalAmount,
  onOpenModal,
  onUpdate,
}) => {
  const { data: session } = useSession() as {
    data: Session | null;
    status: string;
  };

  const theme = useTheme();
  const userCurrency = session?.user?.currency;
  const isIncome = type === "income";
  const title = isIncome ? "Incomes" : "Expenses";
  const totalLabel = `Total ${isIncome ? "Incomes" : "Expenses"} for this month:`;

  return (
    <DashboardCard elevation={0}>
      <Box>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Typography variant="h3" component="h2">
            {title}
          </Typography>
          <PlusIconButton onClick={onOpenModal} variantType={type} />
        </Box>

        <Box>
          <Typography
            variant="h5"
            component="p"
            sx={{ color: theme.palette.text.primary }}
          >
            {totalLabel}
          </Typography>
          <Typography
            variant="h3"
            color={isIncome ? "primary.main" : "error.main"}
          >
            {totalAmount.toFixed(2)}
            {userCurrency}
          </Typography>
          <ForeignCurrency type={type} />
        </Box>
      </Box>

      <TransactionsList
        type={type}
        totalAmount={totalAmount}
        onUpdate={onUpdate}
      />
    </DashboardCard>
  );
};

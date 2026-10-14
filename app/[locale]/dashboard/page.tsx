"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "@/i18n/navigation";

import { useFinancialSummary } from "@/hooks/useFinancialSummary";
import TransactionModal from "@/components/Transactions/TransactionModal";
import TaskModal from "@/components/Transactions/TaskModal";
import {
  TransactionsCard,
  CurrencyConverter,
  CurrencyWidget,
  BalanceWidget,
  TasksWidget,
} from "@/components/Widgets";

import { Box, Grid2, CircularProgress } from "@mui/material";

const Dashboard: React.FC = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { data: summary, isLoading, refetch } = useFinancialSummary();

  const [totalIncome, setTotalIncome] = useState<number>(0);
  const [totalExpense, setTotalExpense] = useState<number>(0);

  const [refreshKey, setRefreshKey] = useState<number>(0);

  // Modals
  const [currencyModalOpen, setCurrencyModalOpen] = useState(false);
  const [transactionModalOpen, setTransactionModalOpen] = useState(false);
  const [transactionType, setTransactionType] = useState<"income" | "expense">(
    "income",
  );
  const [taskModalOpen, setTaskModalOpen] = useState(false);

  useEffect(() => {
    if (status === "loading") return;
    if (!session) {
      router.push("/auth/login");
    } else if (!session.user.isVerified) {
      router.push("/auth/verify-email");
    }
  }, [session, status, router]);

  useEffect(() => {
    if (summary) {
      setTotalIncome(summary.totalIncome);
      setTotalExpense(summary.totalExpense);
    }
  }, [summary]);

  const handleIncomesUpdate = (updatedIncomes: number) => {
    setTotalIncome(updatedIncomes);
  };

  const handleExpensesUpdate = (updatedExpenses: number) => {
    setTotalExpense(updatedExpenses);
  };

  const handleOpenTransactionModal = (type: "income" | "expense") => {
    setTransactionType(type);
    setTransactionModalOpen(true);
  };

  const handleTransactionSuccess = async () => {
    await refetch();
    setRefreshKey((prev) => prev + 1);
  };

  const handleCreateTask = async (data: any) => {
    try {
      const res = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        refetch();
      }
    } catch (err) {
      console.error("Failed to create task:", err);
    }
  };

  if (!session || !session.user.isVerified) {
    return null;
  }

  const currentDateStr = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });

  const netBalance = totalIncome - totalExpense;

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: "1200px", margin: "0 auto" }}>
      {isLoading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
          <CircularProgress color="primary" />
        </Box>
      ) : (
        <Grid2 container spacing={3}>
          {/* left column */}
          <Grid2 size={{ xs: 12, md: 6 }}>
            <Box display="flex" flexDirection="column" gap={3}>
              {/* Incomes Card */}
              <TransactionsCard
                key={`income-${refreshKey}`}
                type="income"
                totalAmount={totalIncome}
                onOpenModal={() => handleOpenTransactionModal("income")}
                onUpdate={handleIncomesUpdate}
              />

              {/* Expenses Card */}
              <TransactionsCard
                key={`expense-${refreshKey}`}
                type="expense"
                totalAmount={totalExpense}
                onOpenModal={() => handleOpenTransactionModal("expense")}
                onUpdate={handleExpensesUpdate}
              />
            </Box>
          </Grid2>

          {/* Right Column */}
          <Grid2 size={{ xs: 12, md: 6 }}>
            <Box display="flex" flexDirection="column" gap={3}>
              {/* Currency Widget */}
              <CurrencyWidget
                currentDateStr={currentDateStr}
                onOpenConverter={() => setCurrencyModalOpen(true)}
              />

              {/* Balance Widget */}
              <BalanceWidget netBalance={netBalance} />

              {/* Tasks Widget */}
              <TasksWidget onOpenModal={() => setTaskModalOpen(true)} />
            </Box>
          </Grid2>
        </Grid2>
      )}

      {/* Modals */}
      <CurrencyConverter
        open={currencyModalOpen}
        onClose={() => setCurrencyModalOpen(false)}
      />

      <TransactionModal
        open={transactionModalOpen}
        onClose={() => setTransactionModalOpen(false)}
        type={transactionType}
        onSubmit={handleTransactionSuccess}
      />

      <TaskModal
        open={taskModalOpen}
        onClose={() => setTaskModalOpen(false)}
        onSubmit={handleCreateTask}
      />
    </Box>
  );
};

export default Dashboard;

"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import ExpensesList from "@/components/Expense/ExpensesList";
import IncomesList from "@/components/Income/IncomesList";
import TasksList from "@/components/Tasks/TasksList";
import CarryOverBalance from "@/components/CarryOverBalance/CarryOverBalance";

import { Box, Grid2, Typography } from "@mui/material";

// import { Oval } from "react-loader-spinner";

const Dashboard: React.FC = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [carryOverBalance, setCarryOverBalance] = useState<number>(0);
  const [totalIncome, setTotalIncome] = useState<number>(0);
  const [totalExpense, setTotalExpense] = useState<number>(0);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "loading") return;
    if (!session) {
      router.push("/auth/login");
    } else if (!session.user.isVerified) {
      router.push("/auth/verify-email");
    } else {
      fetchCarryOverBalanceData();
    }
  }, [session, status, router]);

  const fetchCarryOverBalanceData = async () => {
    try {
      const response = await fetch(`/api/transactions/getAllTransactions`);
      const data = await response.json();

      setCarryOverBalance(data.carryOverBalance);
      setTotalIncome(data.totalIncome);
      setTotalExpense(data.totalExpense);
    } catch (error) {
      console.error("Ошибка загрузки данных:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleExpensesUpdate = (updatedExpenses: number) => {
    setTotalExpense(updatedExpenses);
  };

  const handleIncomesUpdate = (updatedIncomes: number) => {
    setTotalIncome(updatedIncomes);
  };

  // if (status === "loading") {
  //   return (
  //     <Oval height="80" width="80" color="#1727b7" secondaryColor="#6fb5e7" />
  //   );
  // }

  if (!session || !session.user.isVerified) {
    return null;
  }

  return (
    <>
      <Box sx={{ p: 4 }}>
        <Typography variant="h3" component="h1">
          Welcome to Finance App, {session.user.name}
        </Typography>

        <Grid2 container spacing={4} direction={{ xs: "column", md: "row" }}>
          <Grid2
            container
            size={12}
            direction={{ xs: "column", md: "row" }}
            component="div"
          >
            <Grid2 size={{ xs: 12, md: 6 }} component="div">
              <Grid2 container direction="column" spacing={4}>
                <Grid2 size={6} component="div">
                  <IncomesList
                    totalIncome={totalIncome}
                    onUpdate={handleIncomesUpdate}
                  />
                </Grid2>
                <Grid2 size={6} component="div">
                  <ExpensesList
                    totalExpense={totalExpense}
                    onUpdate={handleExpensesUpdate}
                  />
                </Grid2>
              </Grid2>
            </Grid2>

            <Grid2 size={{ xs: 12, md: 6 }} component="div">
              <Grid2 container direction="column" spacing={4}>
                <Grid2 size={6} component="div">
                  <CarryOverBalance
                    carryOverBalance={carryOverBalance}
                    totalIncome={totalIncome}
                    totalExpense={totalExpense}
                  />
                </Grid2>
                <Grid2 size={6} component="div">
                  <TasksList />
                </Grid2>
              </Grid2>
            </Grid2>
          </Grid2>
        </Grid2>
      </Box>
    </>
  );
};

export default Dashboard;

"use client";

import ExpensesList from "@/components/Expense/ExpensesList";
import IncomesList from "@/components/Income/IncomesList";
import TasksList from "@/components/Tasks/TasksList";
import { Container } from "@mui/material";

import React from "react";
import { SessionProvider } from "next-auth/react";

const Dashboard: React.FC = () => {
  return (
    <SessionProvider>
      <>
        <main>
          <Container maxWidth="sm">
            <h1>Welcome to finance App</h1>

            <IncomesList />
            <ExpensesList />
            <TasksList />
          </Container>
        </main>
      </>
    </SessionProvider>
  );
};

export default Dashboard;

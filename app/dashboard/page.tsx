"use client";

// import Header from "@/components/Header/Header";
// import Navbar from "@/components/Navbar";
import ExpensesList from "@/components/Expense/ExpensesList";
import IncomesList from "@/components/Income/IncomesList";
import TasksList from "@/components/Tasks/TasksList";
import React from "react";

import { SessionProvider } from "next-auth/react";

const Dashboard: React.FC = () => {
  return (
    <SessionProvider>
      <>
        {/* <Header /> */}
        <main>
          <h1>Welcome to finance App</h1>
          {/* Здесь можно добавить компоненты для отображения доходов, расходов и задач */}
          <IncomesList />
          <ExpensesList />
          <TasksList />
        </main>
      </>
    </SessionProvider>
  );
};

export default Dashboard;

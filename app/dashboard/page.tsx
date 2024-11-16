"use client";

import ExpensesList from "@/components/Expense/ExpensesList";
import IncomesList from "@/components/Income/IncomesList";
import TasksList from "@/components/Tasks/TasksList";

import { Box, Container, Typography } from "@mui/material";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Oval } from "react-loader-spinner";

const Dashboard: React.FC = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;
    if (!session) {
      router.push("/auth/login");
    } else if (!session.user.isVerified) {
      router.push("/auth/verify-email");
    }
  }, [session, status, router]);

  if (status === "loading") {
    return (
      <Oval height="80" width="80" color="#1727b7" secondaryColor="#6fb5e7" />
    );
  }

  if (!session || !session.user.isVerified) {
    return null;
  }

  return (
    <main>
      <Box sx={{ p: 4 }}>
        <Typography variant="h4" component="h1">
          Welcome to Finance App, {session.user.name}
        </Typography>

        <IncomesList />
        <ExpensesList />
        <TasksList />
      </Box>
    </main>
  );
};

export default Dashboard;

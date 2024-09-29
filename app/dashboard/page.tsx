"use client";

import ExpensesList from "@/components/Expense/ExpensesList";
import IncomesList from "@/components/Income/IncomesList";
import TasksList from "@/components/Tasks/TasksList";

import { Container } from "@mui/material";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

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
    return <p>Loading...</p>; // Можно улучшить лоадер
  }

  if (!session || !session.user.isVerified) {
    return null;
  }

  return (
    <main>
      <Container maxWidth="sm">
        <h1>Welcome to Finance App, {session.user.name}</h1>

        <IncomesList />
        <ExpensesList />
        <TasksList />
      </Container>
    </main>
  );
};

export default Dashboard;

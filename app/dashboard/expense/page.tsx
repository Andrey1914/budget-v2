"use client";

import React from "react";
// import { SessionProvider } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import ExpenseForm from "@/components/Expense/ExpenseForm";

import { Box, Container, Typography } from "@mui/material";

const AddExpense: React.FC = () => {
  const router = useRouter();

  const handleSubmit = async (data: {
    amount: number;
    description: string;
    category: string;
    date: string;
  }) => {
    const res = await axios.post("/api/expense/add", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.status === 200) {
      router.push("/dashboard");
    } else {
      console.error("Failed to add expense");
    }
  };

  return (
    // <SessionProvider>
    <Box component="section">
      <Container maxWidth="sm">
        <div>
          <Typography variant="h2" component="h1">
            Add Expense
          </Typography>
          <ExpenseForm onSubmit={handleSubmit} />
        </div>
        <Link href="/dashboard">Back to Dashboard</Link>
      </Container>
    </Box>
    // </SessionProvider>
  );
};

export default AddExpense;

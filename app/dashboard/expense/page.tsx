"use client";

import React from "react";

import ExpenseForm from "@/components/Expense/ExpenseForm";
import { SessionProvider } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const AddExpense: React.FC = () => {
  const router = useRouter();

  const handleSubmit = async (data: { amount: number }) => {
    const response = await fetch("/api/expense/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      router.push("/dashboard");
    } else {
      console.error("Failed to add expense");
    }
  };

  return (
    <SessionProvider>
      <div>
        <h1>Add Expense</h1>
        <ExpenseForm onSubmit={handleSubmit} />
      </div>
      <Link href="/dashboard">Back to Dashboard</Link>
    </SessionProvider>
  );
};

export default AddExpense;

"use client";

import React from "react";

import ExpenseForm from "@/components/Expense/ExpenseForm";
// import { useRouter } from "next/router";
import { useRouter } from "next/navigation";

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
    <div>
      <h1>Add Expense</h1>
      <ExpenseForm onSubmit={handleSubmit} />
    </div>
  );
};

export default AddExpense;

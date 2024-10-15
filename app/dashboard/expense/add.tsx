"use client";

import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import ExpenseForm from "@/components/Expense/ExpenseForm";

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
    <div>
      <h1>Add Expense</h1>
      <ExpenseForm onSubmit={handleSubmit} />
    </div>
  );
};

export default AddExpense;

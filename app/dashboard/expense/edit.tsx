"use client";

import React from "react";
import { useRouter } from "next/router";
import ExpenseForm from "@/components/Expense/ExpenseForm";

const EditExpense: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  const handleSubmit = async (data: { amount: number }) => {
    const response = await fetch(`/api/expense/edit?id=${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      router.push("/dashboard");
    } else {
      console.error("Failed to edit expense");
    }
  };

  return (
    <div>
      <h1>Edit Expense</h1>
      <ExpenseForm onSubmit={handleSubmit} />
    </div>
  );
};

export default EditExpense;

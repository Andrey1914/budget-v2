"use client";

import React from "react";
import { useRouter } from "next/router";
import axios from "axios";
import ExpenseForm from "@/components/Expense/ExpenseForm";

const EditExpense: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  const handleSubmit = async (data: { amount: number }) => {
    const res = await axios.put(`/api/expense/edit?id=${id}`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.status === 200) {
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

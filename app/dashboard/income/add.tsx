"use client";

import React from "react";

import IncomeForm from "@/components/Income/IncomeForm";
import { useRouter } from "next/router";

const AddIncome: React.FC = () => {
  const router = useRouter();

  const handleSubmit = async (data: {
    amount: number;
    description: string;
    category: string;
    date: string;
  }) => {
    const response = await fetch("/api/income/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      router.push("/dashboard");
    } else {
      console.error("Failed to add income");
    }
  };

  return (
    <div>
      <h1>Add Income</h1>
      <IncomeForm onSubmit={handleSubmit} />
    </div>
  );
};

export default AddIncome;

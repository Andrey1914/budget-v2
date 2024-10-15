"use client";

import React from "react";
import { useRouter } from "next/router";
import axios from "axios";
import IncomeForm from "@/components/Income/IncomeForm";

const AddIncome: React.FC = () => {
  const router = useRouter();

  const handleSubmit = async (data: {
    amount: number;
    description: string;
    category: string;
    date: string;
  }) => {
    const res = await axios.post("/api/income/add", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.status === 200) {
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

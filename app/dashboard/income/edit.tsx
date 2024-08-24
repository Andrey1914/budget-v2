"use client";

import React from "react";
import { useRouter } from "next/router";

import IncomeForm from "@/components/Income/IncomeForm";

const EditIncome: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  const handleSubmit = async (data: { amount: number }) => {
    const response = await fetch(`/api/income/edit?id=${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      router.push("/dashboard");
    } else {
      console.error("Failed to edit income");
    }
  };

  return (
    <div>
      <h1>Edit Income</h1>
      <IncomeForm onSubmit={handleSubmit} />
    </div>
  );
};

export default EditIncome;

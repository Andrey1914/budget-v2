"use client";

import React from "react";
import { useRouter } from "next/router";
import axios from "axios";
import IncomeForm from "@/components/Income/IncomeForm";

const EditIncome: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  const handleSubmit = async (data: { amount: number }) => {
    const res = await axios.put(`/api/income/edit?id=${id}`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.status === 200) {
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

"use client";

import React from "react";

import IncomeForm from "@/components/Income/IncomeForm";
import { useRouter } from "next/navigation";
import { SessionProvider } from "next-auth/react";
import Link from "next/link";
import { Box, Container, Typography } from "@mui/material";

const AddIncome: React.FC = () => {
  const router = useRouter();

  const handleSubmit = async (data: { amount: number }) => {
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
    <SessionProvider>
      <Box component="section">
        <Container maxWidth="sm">
          <div>
            <Typography variant="h2" component="h1">
              Add Income
            </Typography>
            <IncomeForm onSubmit={handleSubmit} />
          </div>
          <Link href="/dashboard">Back to Dashboard</Link>
        </Container>
      </Box>
    </SessionProvider>
  );
};

export default AddIncome;

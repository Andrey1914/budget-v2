"use client";

import React from "react";
import { useRouter } from "next/navigation";
// import { SessionProvider } from "next-auth/react";
import Link from "next/link";
import IncomeForm from "@/components/Income/IncomeForm";
import axios from "axios";
import { Box, Container, Typography } from "@mui/material";

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
    // <SessionProvider>
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
    // </SessionProvider>
  );
};

export default AddIncome;

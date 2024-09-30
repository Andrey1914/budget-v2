"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { ExpenseFormProps } from "@/interfaces";
import { Box, TextField } from "@mui/material";

const ExpenseForm: React.FC<ExpenseFormProps> = () => {
  const { data: session } = useSession();
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!session) {
      setError("You must be logged in to add expense.");
      return;
    }

    const res = await fetch("/api/expense/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount, description, category, date }),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.error || "Failed to add expense");
    } else {
      setAmount("");
      setDescription("");
      setCategory("");
      setDate("");
      setError("");
    }
  };

  return (
    <Box
      component="form"
      sx={{ "& > :not(style)": { m: 2, width: "25ch" } }}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <div>
        <TextField
          id="amount"
          label="Amount"
          variant="outlined"
          autoFocus={true}
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
      </div>
      <div>
        <TextField
          id="category"
          label="Category"
          variant="outlined"
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />
      </div>
      <div>
        <TextField
          id="description"
          multiline
          rows={4}
          color="primary"
          label="Description"
          variant="outlined"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div>
        <TextField
          id="date"
          variant="outlined"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button type="submit">Add Expense</button>
    </Box>
  );
};

export default ExpenseForm;

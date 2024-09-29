"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { IncomeFormProps } from "@/interfaces";
import SnackbarNotification from "@/components/Notification/Snackbar";

import { Box, TextField } from "@mui/material";

const IncomeForm: React.FC<IncomeFormProps> = () => {
  const { data: session } = useSession();
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [error, setError] = useState("");

  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (!session) {
        setError("You must be logged in to add income.");
        return;
      }

      const res = await fetch("/api/income/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount, description, category, date }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to add income");
      }

      setSnackbarMessage("Income added successfully");
      setSnackbarSeverity("success");
      setShowSnackbar(true);

      setAmount("");
      setDescription("");
      setCategory("");
      setDate("");
      setError("");
    } catch (error: any) {
      setError(error.message || "Failed to add income");

      setSnackbarMessage("Failed to add income");
      setSnackbarSeverity("error");
      setShowSnackbar(true);
    }
  };

  return (
    <>
      <Box
        component="form"
        sx={{ "& > :not(style)": { m: 2, width: "25ch" } }}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <div>
          <TextField
            // id="outlined-basic"
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
            // id="outlined-multiline-static"
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
            // label="Date"
            variant="outlined"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit">Add Income</button>
      </Box>

      {showSnackbar && (
        <SnackbarNotification
          message={snackbarMessage}
          severity={snackbarSeverity}
        />
      )}
    </>
  );
};

export default IncomeForm;

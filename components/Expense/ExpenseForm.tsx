"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { ExpenseFormProps } from "@/interfaces";

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
    <form onSubmit={handleSubmit}>
      <div>
        <label>Amount</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Category</label>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Description</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button type="submit">Add Expense</button>
    </form>
  );
};

export default ExpenseForm;

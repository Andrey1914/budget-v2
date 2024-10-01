import { useState, useEffect } from "react";
import axios from "axios";

import { Box, TextField, Button } from "@mui/material";

const EditIncomeForm = ({
  incomeId,
  refreshIncomes,
  onClose,
}: {
  incomeId: string;
  refreshIncomes: (task: any) => void;
  onClose: (task: any) => void;
}) => {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchIncome = async () => {
      try {
        const response = await axios.get(`/api/income/${incomeId}`);
        const { amount, description, category, date } = response.data;
        setAmount(amount);
        setDescription(description);
        setCategory(category);
        setDate(date);
      } catch (err: any) {
        setError(err.message || "Failed to load income");
      }
    };

    fetchIncome();
  }, [incomeId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.put(`/api/income/edit`, {
        id: incomeId,
        amount,
        description,
        category,
        date,
      });
      alert("Income updated successfully");
      refreshIncomes(response.data);
      onClose(response.data);
    } catch (err: any) {
      setError(err.message || "Failed to update income");
    } finally {
      setLoading(false);
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
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div>
        <TextField
          id="amount"
          label="Amount"
          variant="outlined"
          autoFocus={true}
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
        />
      </div>
      <div>
        <TextField
          id="category"
          color="primary"
          label="Category"
          variant="outlined"
          value={category || ""}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Content"
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
        />
      </div>
      <Button variant="contained" type="submit" disabled={loading}>
        {loading ? "Saving..." : "Save"}
      </Button>
      <Button variant="contained" type="button" onClick={onClose}>
        Cancel
      </Button>
    </Box>
  );
};

export default EditIncomeForm;

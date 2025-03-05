import { useState, useEffect } from "react";
import axios from "axios";
import { editExpense } from "@/app/dashboard/expense/edit";

import { Oval } from "react-loader-spinner";
import { Box, TextField, Button } from "@mui/material";

const EditExpenseForm = ({
  expenseId,
  refreshExpenses,
  onClose,
}: {
  expenseId: string;
  refreshExpenses: (task: any) => void;
  onClose: (task: any) => void;
}) => {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );

  useEffect(() => {
    const getExpenseById = async () => {
      try {
        const response = await axios.get(`/api/expense/${expenseId}`);
        const { amount, description, category, date } = response.data;
        setAmount(amount);
        setDescription(description);
        setCategory(category);
        setDate(date);
      } catch (err: any) {
        setError(err.message || "Failed to load expense");
      }
    };

    getExpenseById();
  }, [expenseId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const result = await editExpense({
        expenseId,
        amount,
        description,
        category,
        date,
      });

      if (result.success) {
        refreshExpenses(result.data);
        onClose(result.data);

        setSnackbarMessage("Expense edited successfully!");
        setSnackbarSeverity("success");
        setShowSnackbar(true);

        console.log("Expense edited successfully");
      } else {
        setError(result.error);
        setSnackbarMessage("Failed to edit Expense");
        setSnackbarSeverity("error");
        setShowSnackbar(true);
      }
    } catch (error: any) {
      setError(error.message || "An unexpected error occurred.");
      setSnackbarMessage("Failed to edit expense");
      setSnackbarSeverity("error");
      setShowSnackbar(true);
      console.error("Error editing expense:", error);
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
      <Button variant="outlined" type="submit" disabled={loading}>
        {loading ? (
          <Oval
            height="30"
            width="30"
            color="#1727b7"
            secondaryColor="#6fb5e7"
          />
        ) : (
          "Save"
        )}
      </Button>
      <Button variant="outlined" type="button" onClick={onClose}>
        Cancel
      </Button>
    </Box>
  );
};

export default EditExpenseForm;

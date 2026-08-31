import { useState, useEffect } from "react";
import apiClient from "@/lib/apiClient";
import { useEditTransaction } from "@/hooks/useTransactions";
import { Oval } from "react-loader-spinner";
import { Box, TextField, Button } from "@mui/material";

interface EditTransactionFormProps {
  transactionId: string;
  type: "income" | "expense";
  refreshData?: (data: any) => void;
  onClose: (data?: any) => void;
}

const EditTransactionForm = ({
  transactionId,
  type,
  refreshData,
  onClose,
}: EditTransactionFormProps) => {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [error, setError] = useState<string | null>(null);

  const editTransactionMutation = useEditTransaction();

  useEffect(() => {
    const getTransactionById = async () => {
      try {
        const response = await apiClient.get(
          `/api/transactions/${transactionId}?type=${type}`,
        );

        const { amount, description, category, date } = response.data;
        setAmount(amount);
        setDescription(description);
        setCategory(category);
        setDate(date);
      } catch (err: any) {
        setError(err.message || `Failed to load ${type}`);
      }
    };

    getTransactionById();
  }, [transactionId, type]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    editTransactionMutation.mutate(
      {
        id: transactionId,
        type,
        amount,
        description,
        category,
        date,
      },
      {
        onSuccess: (data) => {
          if (refreshData) refreshData(data);
          onClose(data);
        },
        onError: (err: any) => {
          setError(err.message || `Failed to edit ${type}`);
        },
      },
    );
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
      <Button
        variant="outlined"
        type="submit"
        disabled={editTransactionMutation.isPending}
      >
        {editTransactionMutation.isPending ? (
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
      <Button variant="outlined" type="button" onClick={() => onClose()}>
        Cancel
      </Button>
    </Box>
  );
};

export default EditTransactionForm;

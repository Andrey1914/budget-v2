"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { ExpenseFormProps, Category } from "@/interfaces";
import SnackbarNotification from "@/components/Notification/Snackbar";
import {
  fetchCategories,
  AddCategory,
  EditCategory,
  DeleteCategory,
} from "@/app/dashboard/expense/handlers";

import addExpense from "@/app/dashboard/expense/add";
import { Oval } from "react-loader-spinner";

import {
  Box,
  TextField,
  Select,
  MenuItem,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

const ExpenseForm: React.FC<ExpenseFormProps> = ({ initialData }) => {
  const { data: session } = useSession();

  const [amount, setAmount] = useState<number | string>(
    initialData?.amount || ""
  );
  const [description, setDescription] = useState(
    initialData?.description || ""
  );

  const [category, setCategory] = useState<string>("");
  const [date, setDate] = useState(initialData?.date || "");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [categories, setCategories] = useState<Category[]>([]);

  const [newCategory, setNewCategory] = useState("");
  const [newCategoryDescription, setNewCategoryDescription] = useState("");
  const [open, setOpen] = useState(false);

  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);

  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (error) {
        console.error("Failed to load categories", error);
      }
    };

    loadCategories();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!session) {
        setError("You must be logged in to add expense.");
        return;
      }

      if (!amount || isNaN(Number(amount))) {
        setError("Amount must be a valid number.");
        return;
      }

      const parsedAmount = parseFloat(amount as string);

      const res = await addExpense({
        amount: parsedAmount,
        description,
        category,
        date,
      });

      if (res.success) {
        setSnackbarMessage(res.message);
        setSnackbarSeverity("success");
        setShowSnackbar(true);

        setAmount("");
        setDescription("");
        setCategory("");
        setDate("");
        setError("");
      } else {
        throw new Error(res.message);
      }
      setLoading(false);
    } catch (error: any) {
      setError(error.message || "Failed to add expense");
      setSnackbarMessage("Failed to add expense");
      setSnackbarSeverity("error");
      setShowSnackbar(true);
    }
  };

  const handleAddCategory = async () => {
    await AddCategory(
      newCategory,
      newCategoryDescription,
      setCategories,
      setNewCategory,
      setNewCategoryDescription,
      setOpen,
      fetchCategories
    );
  };

  const handleEditCategory = async () => {
    await EditCategory(
      editingCategory,
      newCategory,
      newCategoryDescription,
      setCategories,
      setSnackbarMessage,
      setSnackbarSeverity,
      setShowSnackbar,
      handleCloseEditDialog
    );
  };

  const handleDeleteCategory = async () => {
    await DeleteCategory(
      category,
      category,
      setCategory,
      setCategories,
      setSnackbarMessage,
      setSnackbarSeverity,
      setShowSnackbar
    );
  };

  const handleOpenEditDialog = (category: Category) => {
    if (!category) {
      console.error("Selected category not found");
      return;
    }
    setEditingCategory(category);
    setNewCategory(category.name);
    setNewCategoryDescription(category.description || "");
    setOpenEditDialog(true);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
    setNewCategory("");
    setNewCategoryDescription("");
    setEditingCategory(null);
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
            id="expense-amount"
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
          <Select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value as string)}
            required
            displayEmpty
          >
            <MenuItem value="" disabled>
              Select Category
            </MenuItem>
            {categories?.map((category) => (
              <MenuItem key={category._id} value={category._id}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
          <Button variant="outlined" onClick={() => setOpen(true)}>
            Add New Category
          </Button>
          <div>
            {category && (
              <div style={{ marginTop: 16 }}>
                <Button
                  variant="outlined"
                  onClick={() =>
                    handleOpenEditDialog(
                      categories.find((cat) => cat._id === category)!
                    )
                  }
                >
                  Edit Category
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => {
                    handleDeleteCategory();
                    setCategory("");
                  }}
                >
                  Delete Category
                </Button>
              </div>
            )}
          </div>
        </div>

        <div>
          <TextField
            id="expense-description"
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
            id="expense-date"
            variant="outlined"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <Button variant="outlined" type="submit" disabled={loading}>
          {loading ? (
            <Oval
              height="30"
              width="30"
              color="#1727b7"
              secondaryColor="#6fb5e7"
            />
          ) : (
            "Add Expense"
          )}
        </Button>
      </Box>

      {showSnackbar && (
        <SnackbarNotification
          message={snackbarMessage}
          severity={snackbarSeverity}
        />
      )}

      <div aria-hidden="false">
        <Dialog open={open} onClose={() => setOpen(false)}>
          <DialogTitle>Add New Category</DialogTitle>
          <DialogContent>
            <TextField
              id="new-category"
              label="Category Name"
              variant="outlined"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              required
            />
            <TextField
              id="new-category-description"
              label="Category Description"
              variant="outlined"
              value={newCategoryDescription}
              onChange={(e) => setNewCategoryDescription(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button variant="outlined" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button variant="outlined" onClick={handleAddCategory}>
              Add Category
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog open={openEditDialog} onClose={handleCloseEditDialog}>
          <DialogTitle>Edit Category</DialogTitle>
          <DialogContent>
            <TextField
              id="edit-category"
              label="Category Name"
              variant="outlined"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              required
            />
            <TextField
              id="edit-category-description"
              label="Category Description"
              variant="outlined"
              value={newCategoryDescription}
              onChange={(e) => setNewCategoryDescription(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button variant="outlined" onClick={handleCloseEditDialog}>
              Cancel
            </Button>
            <Button variant="outlined" onClick={handleEditCategory}>
              Save Changes
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
};

export default ExpenseForm;

"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { IncomeFormProps, Category } from "@/interfaces";
import SnackbarNotification from "@/components/Notification/Snackbar";
import {
  fetchCategories,
  AddCategory,
  EditCategory,
  DeleteCategory,
} from "@/app/dashboard/income/handlers";

import addIncome from "@/app/dashboard/income/add";

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

const IncomeForm: React.FC<IncomeFormProps> = ({ initialData }) => {
  const { data: session } = useSession();

  const [amount, setAmount] = useState(initialData?.amount || "");
  const [description, setDescription] = useState(
    initialData?.description || ""
  );

  const [category, setCategory] = useState<string>("");
  const [date, setDate] = useState(initialData?.date || "");
  const [error, setError] = useState("");

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

  // Загрузка категорий из базы данных
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

    try {
      if (!session) {
        setError("You must be logged in to add income.");
        return;
      }

      if (!amount || isNaN(Number(amount))) {
        setError("Amount must be a valid number.");
        return;
      }

      const parsedAmount = parseFloat(amount as string);

      const res = await addIncome({
        amount: parsedAmount,
        description,
        category,
        date,
      });

      if (res.success) {
        setSnackbarMessage("Income added successfully");
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
    } catch (error: any) {
      setError(error.message || "Failed to add income");

      setSnackbarMessage("Failed to add income");
      setSnackbarSeverity("error");
      setShowSnackbar(true);
    }
  };

  // Add function
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

  // Функция для редактирования категории
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

  // Функция для удаления категории
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

  // Обработчик для открытия диалогового окна редактирования
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

  // Обработчик для закрытия диалогового окна редактирования
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
            id="income-amount"
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
          {/* Кнопки редактирования и удаления */}
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
            id="income-description"
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
            id="income-date"
            variant="outlined"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <Button variant="outlined" type="submit">
          Add Income
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

        {/* Диалог для редактирования категории */}
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

export default IncomeForm;

"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { ExpenseFormProps, ICategory } from "@/interfaces";
import SnackbarNotification from "@/components/Notification/Snackbar";
import { validateFormsTransactions } from "@/utils/validators/validateFormTransactions";
import TransactionForm from "@/components/TransactionForm/TransactionForm";
import apiClient from "@/lib/apiClient";

const ExpenseForm: React.FC<ExpenseFormProps> = ({ initialData }) => {
  const { data: session } = useSession();

  const [amount, setAmount] = useState<number | string>(
    initialData?.amount || "",
  );
  const [description, setDescription] = useState(
    initialData?.description || "",
  );

  const [type] = useState<string>("expense");
  const [category, setCategory] = useState<string>("");
  const [date, setDate] = useState(initialData?.date || "");
  const [loading, setLoading] = useState(false);
  const [currency, setCurrency] = useState<string>(
    session?.user.currency || "USD",
  );
  const [currencies] = useState<{ code: string; name: string }[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);

  const [newCategory, setNewCategory] = useState("");
  const [newCategoryDescription, setNewCategoryDescription] = useState("");
  const [open, setOpen] = useState(false);

  const [editingCategory, setEditingCategory] = useState<ICategory | null>(
    null,
  );
  const [openEditDialog, setOpenEditDialog] = useState(false);

  const [popoverMessage, setPopoverMessage] = useState("");
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success",
  );

  const loadCategories = async () => {
    try {
      const res = await apiClient.get(
        "/api/transactions/categories?type=expense",
      );
      setCategories(res.data);
    } catch (error) {
      console.error("Failed to load categories", error);
    }
  };

  useEffect(() => {
    if (session?.user?.currency) {
      setCurrency(session.user.currency);
    }
    loadCategories();
  }, [session]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!session) {
      setSnackbarMessage("You must be logged in to add expense.");
      setSnackbarSeverity("error");
      setShowSnackbar(true);
      return;
    }

    if (
      !validateFormsTransactions(
        amount,
        description,
        category,
        date,
        setPopoverMessage,
        setAnchorEl,
      )
    ) {
      return;
    }

    setLoading(true);
    setPopoverMessage("");
    setAnchorEl(null);

    const parsedAmount = parseFloat(amount as string);

    try {
      await apiClient.post("/api/transactions", {
        type: "expense",
        amount: parsedAmount,
        description,
        category,
        currency,
        date,
      });

      setSnackbarMessage("Expense added successfully");
      setSnackbarSeverity("success");
      setShowSnackbar(true);

      setAmount("");
      setDescription("");
      setCategory("");
      setDate("");
    } catch (error: any) {
      setSnackbarMessage(error.message || "Failed to add expense");
      setSnackbarSeverity("error");
      setShowSnackbar(true);
    } finally {
      setLoading(false);
    }
  };

  const handleAddCategory = async () => {
    if (!newCategory.trim()) return;
    try {
      await apiClient.post("/api/transactions/categories?type=expense", {
        name: newCategory,
        description: newCategoryDescription,
      });
      setNewCategory("");
      setNewCategoryDescription("");
      setOpen(false);
      await loadCategories();
    } catch (err: any) {
      console.error("Failed to add category", err);
    }
  };

  const handleEditCategory = async () => {
    if (!editingCategory || !newCategory.trim()) return;
    try {
      await apiClient.put("/api/transactions/categories?type=expense", {
        id: editingCategory._id,
        name: newCategory,
        description: newCategoryDescription,
      });
      setSnackbarMessage("Category updated successfully");
      setSnackbarSeverity("success");
      setShowSnackbar(true);
      handleCloseEditDialog();
      await loadCategories();
    } catch (err: any) {
      setSnackbarMessage("Failed to update category");
      setSnackbarSeverity("error");
      setShowSnackbar(true);
    }
  };

  const handleDeleteCategory = async () => {
    if (!category) return;
    try {
      await apiClient.delete("/api/transactions/categories?type=expense", {
        data: { id: category },
      });
      setCategory("");
      setSnackbarMessage("Category deleted successfully");
      setSnackbarSeverity("success");
      setShowSnackbar(true);
      await loadCategories();
    } catch (err: any) {
      setSnackbarMessage("Failed to delete category");
      setSnackbarSeverity("error");
      setShowSnackbar(true);
    }
  };

  const handleOpenEditDialog = (cat: ICategory) => {
    if (!cat) return;
    setEditingCategory(cat);
    setNewCategory(cat.name);
    setNewCategoryDescription(cat.description || "");
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
      <TransactionForm
        type="expense"
        amount={amount}
        setAmount={setAmount}
        category={category}
        setCategory={setCategory}
        description={description}
        setDescription={setDescription}
        date={date}
        currency={currency}
        setCurrency={setCurrency}
        currencies={currencies}
        setDate={setDate}
        loading={loading}
        onSubmit={handleSubmit}
        categories={categories}
        newCategory={newCategory}
        newCategoryDescription={newCategoryDescription}
        setNewCategory={setNewCategory}
        setNewCategoryDescription={setNewCategoryDescription}
        handleAddCategory={handleAddCategory}
        handleEditCategory={handleEditCategory}
        handleOpenEditDialog={handleOpenEditDialog}
        handleDeleteCategory={handleDeleteCategory}
        openAddDialog={open}
        setOpenAddDialog={setOpen}
        openEditDialog={openEditDialog}
        setOpenEditDialog={setOpenEditDialog}
        editingCategory={editingCategory}
        handleCloseEditDialog={handleCloseEditDialog}
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        message={popoverMessage}
        onClose={() => setAnchorEl(null)}
      />

      {showSnackbar && (
        <SnackbarNotification
          message={snackbarMessage}
          severity={snackbarSeverity}
        />
      )}
    </>
  );
};

export default ExpenseForm;

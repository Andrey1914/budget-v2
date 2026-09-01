"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import { ICategory } from "@/interfaces";
import SnackbarNotification from "@/components/Notification/Snackbar";
import { validateFormsTransactions } from "@/utils/validators/validateFormTransactions";
import TransactionForm from "@/components/Transactions/TransactionForm";
import apiClient from "@/lib/apiClient";

interface TransactionFormWrapperProps {
  type: "income" | "expense";
  initialData?: any;
}

const TransactionFormWrapper: React.FC<TransactionFormWrapperProps> = ({
  type,
  initialData,
}) => {
  const { data: session } = useSession();

  const [amount, setAmount] = useState<number | string>(
    initialData?.amount || "",
  );
  const [description, setDescription] = useState(
    initialData?.description || "",
  );

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

  const loadCategories = useCallback(async () => {
    try {
      const res = await apiClient.get(
        `/api/transactions/categories?type=${type}`,
      );
      setCategories(res.data);
    } catch (error) {
      console.error("Failed to load categories", error);
    }
  }, [type]);

  useEffect(() => {
    if (session?.user?.currency) {
      setCurrency(session.user.currency);
    }
    loadCategories();
  }, [session, loadCategories]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!session) {
      setSnackbarMessage(`You must be logged in to add ${type}.`);
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
        type,
        amount: parsedAmount,
        description,
        category,
        currency,
        date,
      });

      setSnackbarMessage(
        `${type === "income" ? "Income" : "Expense"} added successfully`,
      );
      setSnackbarSeverity("success");
      setShowSnackbar(true);

      setAmount("");
      setDescription("");
      setCategory("");
      setDate("");
    } catch (error: any) {
      setSnackbarMessage(error.message || `Failed to add ${type}`);
      setSnackbarSeverity("error");
      setShowSnackbar(true);
    } finally {
      setLoading(false);
    }
  };

  const handleAddCategory = async () => {
    if (!newCategory.trim()) return;
    try {
      await apiClient.post(`/api/transactions/categories?type=${type}`, {
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
      await apiClient.put(`/api/transactions/categories?type=${type}`, {
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
      await apiClient.delete(`/api/transactions/categories?type=${type}`, {
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
        type={type}
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

export default TransactionFormWrapper;

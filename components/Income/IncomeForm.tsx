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

import { validateFormsTransactions } from "@/utils/validateForm";

import addIncome from "@/app/dashboard/income/add";
import TransactionForm from "@/components/TransactionForm/TransactionForm";

const IncomeForm: React.FC<IncomeFormProps> = ({ initialData }) => {
  const { data: session } = useSession();

  const [amount, setAmount] = useState(initialData?.amount || "");
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

  const [popoverMessage, setPopoverMessage] = useState("");
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

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
        setError("You must be logged in to add income.");
        return;
      }

      if (
        !validateFormsTransactions(
          amount,
          description,
          category,
          date,
          setPopoverMessage,
          setAnchorEl
        )
      ) {
        return;
      }

      setLoading(true);

      setPopoverMessage("");
      setAnchorEl(null);

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
      } else {
        throw new Error(res.message);
      }
    } catch (error: any) {
      setError(error.message || "Failed to add income");

      setSnackbarMessage("Failed to add income");
      setSnackbarSeverity("error");
      setShowSnackbar(true);
    } finally {
      setLoading(false);
    }
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
      <TransactionForm
        amount={amount}
        setAmount={setAmount}
        category={category}
        setCategory={setCategory}
        description={description}
        setDescription={setDescription}
        date={date}
        setDate={setDate}
        loading={loading}
        onSubmit={handleSubmit}
        categories={categories}
        newCategory={newCategory}
        newCategoryDescription={newCategoryDescription}
        setNewCategory={setNewCategory}
        setNewCategoryDescription={setNewCategoryDescription}
        handleAddCategory={() =>
          AddCategory(
            newCategory,
            newCategoryDescription,
            setCategories,
            setNewCategory,
            setNewCategoryDescription,
            setOpen,
            fetchCategories
          )
        }
        handleEditCategory={() =>
          EditCategory(
            editingCategory,
            newCategory,
            newCategoryDescription,
            setCategories,
            setSnackbarMessage,
            setSnackbarSeverity,
            setShowSnackbar,
            handleCloseEditDialog
          )
        }
        handleOpenEditDialog={handleOpenEditDialog}
        handleDeleteCategory={async () =>
          await DeleteCategory(
            category,
            category,
            setCategory,
            setCategories,
            setSnackbarMessage,
            setSnackbarSeverity,
            setShowSnackbar
          )
        }
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

export default IncomeForm;

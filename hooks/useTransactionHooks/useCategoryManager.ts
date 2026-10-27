import { useState, useEffect, useCallback } from "react";
import apiClient from "@/lib/apiClient";
import { ICategory } from "@/interfaces";

interface UseCategoryManagerProps {
  type: "income" | "expense";
  onNotification?: (message: string, severity: "success" | "error") => void;
}

export const useCategoryManager = ({
  type,
  onNotification,
}: UseCategoryManagerProps) => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [newCategory, setNewCategory] = useState("");
  const [newCategoryDescription, setNewCategoryDescription] = useState("");
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [editingCategory, setEditingCategory] = useState<ICategory | null>(
    null,
  );
  const [openEditDialog, setOpenEditDialog] = useState(false);

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
    loadCategories();
  }, [loadCategories]);

  const handleAddCategory = async () => {
    if (!newCategory.trim()) return;
    try {
      await apiClient.post(`/api/transactions/categories?type=${type}`, {
        name: newCategory,
        description: newCategoryDescription,
      });
      setNewCategory("");
      setNewCategoryDescription("");
      setOpenAddDialog(false);
      await loadCategories();
    } catch (err) {
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
      onNotification?.("Category updated successfully", "success");
      handleCloseEditDialog();
      await loadCategories();
    } catch (err) {
      onNotification?.("Failed to update category", "error");
    }
  };

  const handleDeleteCategory = async (
    currentCategoryId: string,
    onDeleted?: () => void,
  ) => {
    if (!currentCategoryId) return;
    try {
      await apiClient.delete(`/api/transactions/categories?type=${type}`, {
        data: { id: currentCategoryId },
      });
      onDeleted?.();
      onNotification?.("Category deleted successfully", "success");
      await loadCategories();
    } catch (err) {
      onNotification?.("Failed to delete category", "error");
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

  return {
    categories,
    newCategory,
    setNewCategory,
    newCategoryDescription,
    setNewCategoryDescription,
    openAddDialog,
    setOpenAddDialog,
    openEditDialog,
    setOpenEditDialog,
    editingCategory,
    handleAddCategory,
    handleEditCategory,
    handleDeleteCategory,
    handleOpenEditDialog,
    handleCloseEditDialog,
    loadCategories,
  };
};

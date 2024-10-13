import { Category } from "@/interfaces";

export const EditCategory = async (
  editingCategory: Category | null,
  newCategory: string,
  newCategoryDescription: string,
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>,
  setSnackbarMessage: React.Dispatch<React.SetStateAction<string>>,
  setSnackbarSeverity: React.Dispatch<
    React.SetStateAction<"success" | "error">
  >,
  setShowSnackbar: React.Dispatch<React.SetStateAction<boolean>>,
  handleCloseEditDialog: () => void
) => {
  if (!editingCategory) return;

  try {
    const res = await fetch("/api/income/categories", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: editingCategory._id,
        name: newCategory,
        description: newCategoryDescription,
      }),
    });

    if (!res.ok) {
      throw new Error("Failed to edit category");
    }

    setCategories((prev) =>
      prev.map((cat) =>
        cat._id === editingCategory._id
          ? { ...cat, name: newCategory, description: newCategoryDescription }
          : cat
      )
    );

    setSnackbarMessage("Category updated successfully");
    setSnackbarSeverity("success");
    setShowSnackbar(true);
    handleCloseEditDialog();
  } catch (error) {
    console.error("Error editing category:", error);
    setSnackbarMessage("Failed to edit category");
    setSnackbarSeverity("error");
    setShowSnackbar(true);
  }
};

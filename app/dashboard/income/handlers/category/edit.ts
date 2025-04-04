import { ICategory } from "@/interfaces";
import axios from "axios";

export const EditCategory = async (
  editingCategory: ICategory | null,
  newCategory: string,
  newCategoryDescription: string,
  setCategories: React.Dispatch<React.SetStateAction<ICategory[]>>,
  setSnackbarMessage: React.Dispatch<React.SetStateAction<string>>,
  setSnackbarSeverity: React.Dispatch<
    React.SetStateAction<"success" | "error">
  >,
  setShowSnackbar: React.Dispatch<React.SetStateAction<boolean>>,
  handleCloseEditDialog: () => void
) => {
  if (!editingCategory) return;

  try {
    const res = await axios.put("/api/transactions/categories?type=income", {
      id: editingCategory._id,
      name: newCategory,
      description: newCategoryDescription,
    });

    if (res.status !== 200) {
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

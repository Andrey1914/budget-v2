import { ICategory } from "@/interfaces";
import axios from "axios";

export const DeleteCategory = async (
  id: string,
  category: string,
  setCategory: React.Dispatch<React.SetStateAction<string>>,
  setCategories: React.Dispatch<React.SetStateAction<ICategory[]>>,
  setSnackbarMessage: React.Dispatch<React.SetStateAction<string>>,
  setSnackbarSeverity: React.Dispatch<
    React.SetStateAction<"success" | "error">
  >,
  setShowSnackbar: React.Dispatch<React.SetStateAction<boolean>>
) => {
  try {
    const res = await axios.delete("/api/income/categories", {
      data: { id },
    });

    if (res.status !== 200) {
      throw new Error("Failed to delete category");
    }

    setCategories((prev) => {
      const updatedCategories = prev.filter((cat) => cat._id !== id);

      if (category === id) {
        setCategory("");
      }
      return updatedCategories;
    });

    setSnackbarMessage("Category deleted successfully");
    setSnackbarSeverity("success");
    setShowSnackbar(true);
  } catch (error) {
    console.error("Error deleting category:", error);
    setSnackbarMessage("Failed to delete category");
    setSnackbarSeverity("error");
    setShowSnackbar(true);
  }
};

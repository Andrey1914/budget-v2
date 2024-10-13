import { Category } from "@/interfaces";

export const DeleteCategory = async (
  id: string,
  category: string,
  setCategory: React.Dispatch<React.SetStateAction<string>>,
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>,
  setSnackbarMessage: React.Dispatch<React.SetStateAction<string>>,
  setSnackbarSeverity: React.Dispatch<
    React.SetStateAction<"success" | "error">
  >,
  setShowSnackbar: React.Dispatch<React.SetStateAction<boolean>>
) => {
  try {
    const res = await fetch("/api/expense/categories", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    if (!res.ok) {
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

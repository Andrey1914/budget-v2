import { ICategory } from "@/interfaces";
import axios from "axios";

export const AddCategory = async (
  newCategory: string,
  newCategoryDescription: string,
  setCategories: React.Dispatch<React.SetStateAction<ICategory[]>>,
  setNewCategory: React.Dispatch<React.SetStateAction<string>>,
  setNewCategoryDescription: React.Dispatch<React.SetStateAction<string>>,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>,
  fetchCategories: () => Promise<void>
) => {
  try {
    // const res = await axios.post("/api/expense/categories", {
    const res = await axios.post(`/api/transactions/categories?type=expense`, {
      name: newCategory,
      description: newCategoryDescription,
    });

    if (res.status !== 201) {
      throw new Error("Failed to add category");
    }

    const newCategoryData = res.data;
    console.log(newCategoryData);

    setCategories((prev) => [...prev, newCategoryData.category]);

    await fetchCategories();

    setNewCategory("");
    setNewCategoryDescription("");
    setOpen(false);
  } catch (error) {
    console.error("Error adding category:", error);
  }
};

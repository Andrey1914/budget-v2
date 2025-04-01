import axios from "axios";
import { ICategory } from "@/interfaces";

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
    const res = await axios.post("/api/income/categories", {
      name: newCategory,
      description: newCategoryDescription,
    });

    if (res.status !== 201) {
      throw new Error("Failed to add category");
    }

    const newCategoryData = await res.data;
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

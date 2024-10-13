import { Category } from "@/interfaces";

export const AddCategory = async (
  newCategory: string,
  newCategoryDescription: string,
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>,
  setNewCategory: React.Dispatch<React.SetStateAction<string>>,
  setNewCategoryDescription: React.Dispatch<React.SetStateAction<string>>,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>,
  fetchCategories: () => Promise<void>
) => {
  try {
    const res = await fetch("/api/income/categories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: newCategory,
        description: newCategoryDescription,
      }),
    });

    if (!res.ok) {
      throw new Error("Failed to add category");
    }

    const newCategoryData = await res.json();
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

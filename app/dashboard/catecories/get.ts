export const fetchCategories = async () => {
  try {
    const res = await fetch("/api/income/categories");
    if (!res.ok) throw new Error("Failed to fetch categories");
    const data = await res.json();
    return data || [];
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

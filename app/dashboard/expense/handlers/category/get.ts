import axios from "axios";

export const fetchCategories = async () => {
  try {
    const res = await axios.get("/api/expense/categories");

    return res.data || [];
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

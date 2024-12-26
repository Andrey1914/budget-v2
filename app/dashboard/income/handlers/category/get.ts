import axios from "axios";

export const getCategories = async () => {
  try {
    const res = await axios.get("/api/income/categories");

    return res.data || [];
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

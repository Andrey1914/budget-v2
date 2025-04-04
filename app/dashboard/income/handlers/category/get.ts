import axios from "axios";

export const getCategories = async (type: "income" | "expense") => {
  try {
    const res = await axios.get(`/api/transactions/categories?type=${type}`);

    return res.data || [];
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

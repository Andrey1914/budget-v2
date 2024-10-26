import axios from "axios";

export const editIncome = async ({
  incomeId,
  amount,
  description,
  category,
  date,
}: {
  incomeId: string;
  amount: string;
  description: string;
  category: string;
  date: string;
}) => {
  try {
    const response = await axios.put(`/api/income/edit`, {
      id: incomeId,
      amount,
      description,
      category,
      date,
    });
    return { success: true, data: response.data };
  } catch (err: any) {
    console.error("Failed to update income:", err);
    return { success: false, error: err.message || "Failed to update income" };
  }
};

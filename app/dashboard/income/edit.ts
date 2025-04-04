import axios from "axios";

export const editIncome = async ({
  incomeId,
  amount,
  description,
  category,
  date,
  type,
}: {
  incomeId: string;
  amount: string;
  description: string;
  category: string;
  date: string;
  type: string;
}) => {
  try {
    const response = await axios.put(`/api/transactions/edit`, {
      id: incomeId,
      amount,
      description,
      category,
      date,
      type,
    });
    return { success: true, data: response.data };
  } catch (err: any) {
    console.error("Failed to update income:", err);
    return { success: false, error: err.message || "Failed to update income" };
  }
};

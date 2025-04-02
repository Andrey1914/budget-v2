import axios from "axios";

export const editExpense = async ({
  expenseId,
  amount,
  description,
  category,
  date,
  type,
}: {
  expenseId: string;
  amount: string;
  description: string;
  category: string;
  date: string;
  type: string;
}) => {
  try {
    // const response = await axios.put(`/api/expense/edit`, {
    const response = await axios.put(`/api/transactions/edit`, {
      id: expenseId,
      amount,
      description,
      category,
      date,
      type,
    });
    return { success: true, data: response.data };
  } catch (err: any) {
    console.error("Failed to update expense:", err);
    return { success: false, error: err.message || "Failed to update expense" };
  }
};

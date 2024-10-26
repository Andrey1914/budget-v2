import axios from "axios";

export const editExpense = async ({
  expenseId,
  amount,
  description,
  category,
  date,
}: {
  expenseId: string;
  amount: string;
  description: string;
  category: string;
  date: string;
}) => {
  try {
    const response = await axios.put(`/api/expense/edit`, {
      id: expenseId,
      amount,
      description,
      category,
      date,
    });
    return { success: true, data: response.data };
  } catch (err: any) {
    console.error("Failed to update expense:", err);
    return { success: false, error: err.message || "Failed to update expense" };
  }
};

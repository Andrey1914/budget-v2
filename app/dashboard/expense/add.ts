import axios from "axios";

interface SubmitExpenseData {
  amount: number;
  description: string;
  category: string;
  date: string;
}

const addExpense = async (data: SubmitExpenseData) => {
  try {
    const res = await axios.post("/api/expense/add", data);

    if (res.status !== 201) {
      const responseData = await res.data;
      throw new Error(responseData.error || "Failed to add expense");
    }

    return { success: true, message: "Expense added successfully" };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Failed to add expense",
    };
  }
};

export default addExpense;

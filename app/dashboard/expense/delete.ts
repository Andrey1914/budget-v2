import axios from "axios";
import { getSession } from "next-auth/react";

export const deleteExpense = async (id: string) => {
  try {
    const session = await getSession();
    if (!session) {
      throw new Error("No session available");
    }

    const res = await axios.delete("/api/transactions/delete", {
      headers: {
        "Content-Type": "application/json",
      },
      data: { id, type: "expense" },
    });

    if (res.status !== 200) {
      throw new Error("Failed to delete expense");
    }

    return res.status;
  } catch (err) {
    console.error("Error during deletion:", err);
    throw err;
  }
};

export const handleDelete = async (
  id: string,
  expenses: any[],
  setExpenses: React.Dispatch<React.SetStateAction<any[]>>,
  setTotalExpense: React.Dispatch<React.SetStateAction<number>>
) => {
  try {
    const success = await deleteExpense(id);

    if (success) {
      setExpenses(expenses.filter((expense) => expense._id !== id));

      const totalRes = await axios.get("/api/expense/total");

      if (totalRes.status === 200) {
        const totalData = totalRes.data;
        setTotalExpense(totalData.total);
      } else {
        throw new Error("Failed to fetch total expenses");
      }
    }
  } catch (err) {
    console.error("Failed to delete expense", err);
    alert("Failed to delete expense. Please try again.");
  }
};

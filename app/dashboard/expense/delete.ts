import { getSession } from "next-auth/react";

export const deleteExpense = async (id: string) => {
  try {
    const session = await getSession();
    console.log("Session:", session);

    if (!session || !session.token) {
      throw new Error("No session available");
    }

    const response = await fetch("/api/expense/delete", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.token}`,
      },
      body: JSON.stringify({ id }),
    });

    if (!response.ok) {
      throw new Error("Failed to delete expense");
    }

    return response.ok;
  } catch (err) {
    console.error("Error during deletion:", err);
    throw err;
  }
};

// Функция для обработки удаления и обновления состояния
export const handleDelete = async (
  id: string,
  expenses: any[],
  setExpenses: React.Dispatch<React.SetStateAction<any[]>>,
  setTotalExpense: React.Dispatch<React.SetStateAction<number>>
) => {
  try {
    const success = await deleteExpense(id);

    if (success) {
      // Remove the deleted expense from the state
      setExpenses(expenses.filter((expense) => expense._id !== id));

      // Optionally update total expenses
      const totalRes = await fetch("/api/expense/total");
      const totalData = await totalRes.json();
      setTotalExpense(totalData.total);
    }
  } catch (err) {
    console.error("Failed to delete expense", err);
    alert("Failed to delete expense. Please try again.");
  }
};

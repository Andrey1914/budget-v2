import { getSession } from "next-auth/react";

export const deleteIncome = async (id: string) => {
  try {
    const session = await getSession();
    if (!session) {
      throw new Error("No session available");
    }

    const response = await fetch("/api/income/delete", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    if (!response.ok) {
      throw new Error("Failed to delete Income");
    }

    return response.ok;
  } catch (err) {
    console.error("Error during deletion:", err);
    throw err;
  }
};

export const handleDelete = async (
  id: string,
  incomes: any[],
  setIncomes: React.Dispatch<React.SetStateAction<any[]>>,
  setTotalIncome: React.Dispatch<React.SetStateAction<number>>
) => {
  try {
    const success = await deleteIncome(id);

    if (success) {
      // Remove the deleted income from the state
      setIncomes(incomes.filter((income) => income._id !== id));

      // Optionally update total income
      const totalRes = await fetch("/api/income/total");
      const totalData = await totalRes.json();
      setTotalIncome(totalData.total);
    }
  } catch (err) {
    console.error("Failed to delete income", err);
    alert("Failed to delete income. Please try again.");
  }
};

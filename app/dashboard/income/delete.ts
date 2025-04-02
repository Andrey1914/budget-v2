import axios from "axios";
import { getSession } from "next-auth/react";

export const deleteIncome = async (id: string) => {
  try {
    const session = await getSession();
    if (!session) {
      throw new Error("No session available");
    }

    // const res = await axios.delete("/api/income/delete", {
    const res = await axios.delete("/api/transactions/delete", {
      headers: {
        "Content-Type": "application/json",
      },
      data: { id, type: "income" },
    });

    if (res.status !== 200) {
      throw new Error("Failed to delete Income");
    }

    return res.status;
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
      setIncomes(incomes.filter((income) => income._id !== id));

      const totalRes = await axios.get("/api/income/total");

      if (totalRes.status === 200) {
        const totalData = await totalRes.data;
        setTotalIncome(totalData.total);
      } else {
        throw new Error("Failed to fetch total incomes");
      }
    }
  } catch (err) {
    console.error("Failed to delete income", err);
    alert("Failed to delete income. Please try again.");
  }
};

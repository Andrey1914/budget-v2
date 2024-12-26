import axios from "axios";
// import { Expense } from "@/types";
import { Session, IExpense } from "@/interfaces";

export const refreshExpenses = async (
  session: Session
): Promise<IExpense[]> => {
  try {
    if (!session || !session.user) {
      throw new Error("Session or token is not available");
    }

    const token = session.user;

    if (!token) {
      throw new Error("Token is not available");
    }

    const res = await axios.get("/api/expense/get", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.status !== 200) {
      throw new Error("Failed to fetch expenses");
    }

    return res.data;
  } catch (error) {
    console.error("Failed to refresh expenses", error);
    throw error;
  }
};

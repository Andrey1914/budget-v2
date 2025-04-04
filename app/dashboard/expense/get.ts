import axios from "axios";
import { Session, IExpense } from "@/interfaces";

export const getExpenses = async (session: Session): Promise<IExpense[]> => {
  try {
    if (!session || !session.user) {
      throw new Error("Session or token is not available");
    }

    const token = session.user;

    if (!token) {
      throw new Error("Token is not available");
    }

    const res = await axios.get("/api/transactions/get", {
      params: { type: "expense" },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.status !== 200) {
      throw new Error("Failed to fetch expenses");
    }

    return res.data;
  } catch (error) {
    throw error;
  }
};

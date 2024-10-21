import axios from "axios";
import { Expense } from "@/types";
import { Session } from "@/interfaces";

export const fetchExpenses = async (session: Session): Promise<Expense[]> => {
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
    throw error;
  }
};

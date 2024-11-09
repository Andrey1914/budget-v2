import axios from "axios";
import { Income } from "@/types";
import { Session } from "@/interfaces";

export const refreshIncomes = async (session: Session): Promise<Income[]> => {
  try {
    if (!session || !session.user) {
      throw new Error("Session or token is not available");
    }

    const token = session.user;

    if (!token) {
      throw new Error("Token is not available");
    }

    const res = await axios.get("/api/income/get", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.status !== 200) {
      throw new Error("Failed to fetch incomes");
    }

    return res.data;
  } catch (error) {
    console.error("Failed to refresh incomes", error);
    throw error;
  }
};
import axios from "axios";
// import { Income } from "@/types";
import { Session, IIncome } from "@/interfaces";

export const getIncomes = async (session: Session): Promise<IIncome[]> => {
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
    throw error;
  }
};

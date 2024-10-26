import axios from "axios";
import { Session } from "@/interfaces";

export const deleteTask = async (
  id: string,
  session: Session
): Promise<void> => {
  try {
    if (!session || !session.user) {
      throw new Error("Session or token is not available");
    }

    const token = session.user;

    if (!token) {
      throw new Error("Token is not available");
    }

    const res = await axios.delete(`/api/tasks/delete?id=${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.status !== 200) {
      throw new Error("Failed to delete task");
    }
  } catch (error) {
    throw error;
  }
};

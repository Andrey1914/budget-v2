import axios from "axios";
import { Task } from "@/types";
import { Session } from "@/interfaces";

export const updateTaskStatus = async (
  id: string,
  completed: boolean,
  session: Session
): Promise<Task[]> => {
  try {
    if (!session || !session.user) {
      throw new Error("Session or token is not available");
    }

    const token = session.user;

    if (!token) {
      throw new Error("Token is not available");
    }
    const res = await axios.patch(
      "/api/tasks/update",
      { id, completed: !completed },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (res.status !== 200) {
      throw new Error("Failed to update task");
    }

    return res.data;
  } catch (error) {
    throw error;
  }
};

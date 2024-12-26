import axios from "axios";
// import { Task } from "@/types";
import { Session, ITask } from "@/interfaces";

export const getTasks = async (session: Session): Promise<ITask[]> => {
  try {
    if (!session || !session.user) {
      throw new Error("Session or token is not available");
    }

    const token = session.user;

    if (!token) {
      throw new Error("Token is not available");
    }

    const res = await axios.get("/api/tasks/get", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.status !== 200) {
      throw new Error("Failed to fetch tasks");
    }

    return res.data;
  } catch (error) {
    throw error;
  }
};

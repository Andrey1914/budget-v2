import axios from "axios";
import { Task } from "@/types";

export const addTask = async (
  title: string,
  content: string
): Promise<Task> => {
  try {
    const res = await axios.post(
      "/api/tasks/add",
      { title, content },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (res.status !== 201) {
      throw new Error("Failed to add task");
    }

    return res.data;
  } catch (error) {
    throw new Error((error as Error).message || "An unexpected error occurred");
  }
};

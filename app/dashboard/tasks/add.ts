import axios from "axios";
// import { Task } from "@/types";
import { ITask } from "@/interfaces";

export const addTask = async (
  title: string,
  content: string
): Promise<ITask> => {
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

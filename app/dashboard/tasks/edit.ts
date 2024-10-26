import axios from "axios";

export const editTask = async (
  taskId: string,
  title: string,
  content: string,
  date: string
) => {
  try {
    const response = await axios.put(`/api/tasks/edit`, {
      id: taskId,
      title,
      content,
      date,
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.message || "Failed to update task");
  }
};

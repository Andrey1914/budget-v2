import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useRefreshTasks = () => {
  const queryClient = useQueryClient();

  return async () => {
    try {
      const res = await axios.get("/api/tasks");
      queryClient.setQueryData(["tasks"], res.data);
    } catch (error) {
      console.error("Failed to refresh tasks:", error);
    }
  };
};

import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useEditTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      taskId,
      title,
      content,
      date,
    }: {
      taskId: string;
      title: string;
      content: string;
      date: string;
    }) => {
      const res = await axios.put(`/api/tasks/edit`, {
        id: taskId,
        title,
        content,
        date,
      });

      if (res.status !== 200) {
        throw new Error("Failed to update task");
      }

      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
};

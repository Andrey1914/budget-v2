import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useAddTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      title,
      content,
    }: {
      title: string;
      content: string;
    }) => {
      const res = await axios.post(
        "/api/tasks/add",
        { title, content },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (res.status !== 201) {
        throw new Error("Failed to add task");
      }
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
};

import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Session } from "@/interfaces";

export const useDeleteTask = (session: Session | null) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      if (!session || !session.user) {
        throw new Error("Session or token is not available");
      }

      const res = await axios.delete(`/api/tasks/delete?id=${id}`, {
        headers: {
          Authorization: `Bearer ${session.user}`,
        },
      });

      if (res.status !== 200) {
        throw new Error("Failed to delete task");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
};

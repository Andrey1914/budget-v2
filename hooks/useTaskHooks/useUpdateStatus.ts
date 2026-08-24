import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Session } from "@/interfaces";

export const useUpdateTaskStatus = (session: Session | null) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      completed,
    }: {
      id: string;
      completed: boolean;
    }) => {
      if (!session || !session.user) {
        throw new Error("Session or token is not available");
      }

      const res = await axios.patch(`/api/tasks/${id}`, {
        completed: !completed,
      });

      if (res.status !== 200) {
        throw new Error("Failed to update task status");
      }

      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
};

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

      const res = await axios.patch(
        "/api/tasks/update",
        { id, completed: !completed },
        {
          headers: {
            Authorization: `Bearer ${session.user}`,
          },
        }
      );

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

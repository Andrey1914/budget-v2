import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Session } from "@/interfaces";

export const useRefreshTasksList = (session: Session | null) => {
  return useQuery({
    queryKey: ["refreshTasks"],
    queryFn: async () => {
      if (!session || !session.user) {
        throw new Error("Session or token is not available");
      }

      const res = await axios.get("/api/tasks/get", {
        headers: {
          Authorization: `Bearer ${session.user}`,
        },
      });

      if (res.status !== 200) {
        throw new Error("Failed to fetch tasks");
      }

      return res.data;
    },
    enabled: false,
  });
};

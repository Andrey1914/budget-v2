import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ITask, Session } from "@/interfaces";

export const useGetTasks = (session: Session | null) => {
  return useQuery<ITask[], Error>({
    queryKey: ["tasks"],
    queryFn: async () => {
      if (!session || !session.user) {
        throw new Error("Session or token is not available");
      }

      const token = session.user;

      const res = await axios.get("/api/tasks/get", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status !== 200) {
        throw new Error("Failed to fetch tasks");
      }

      return res.data;
    },
    enabled: !!session?.user,
  });
};

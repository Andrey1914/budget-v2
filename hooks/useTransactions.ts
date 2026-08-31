import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "@/lib/apiClient";
import { CreateTransactionDto } from "@/lib/validators";

export const useTransactions = (
  type: "income" | "expense",
  startDate?: string,
  endDate?: string,
) => {
  return useQuery({
    queryKey: ["transactions", type, startDate, endDate],
    queryFn: async () => {
      const res = await apiClient.get("/api/transactions", {
        params: { type, startDate, endDate },
      });
      return res.data;
    },
  });
};

export const useAddTransaction = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: CreateTransactionDto) => {
      const res = await apiClient.post("/api/transactions", data);
      return res.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["transactions", variables.type],
      });
      queryClient.invalidateQueries({ queryKey: ["financialSummary"] });
    },
  });
};

export const useEditTransaction = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      type,
      amount,
      description,
      category,
      date,
    }: {
      id: string;
      type: "income" | "expense";
      amount: number | string;
      description: string;
      category: string;
      date: string;
    }) => {
      const res = await apiClient.put(`/api/transactions/${id}`, {
        type,
        amount,
        description,
        category,
        date,
      });
      return res.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["transactions", variables.type],
      });
      queryClient.invalidateQueries({ queryKey: ["financialSummary"] });
    },
  });
};

export const useDeleteTransaction = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      type,
    }: {
      id: string;
      type: "income" | "expense";
    }) => {
      const res = await apiClient.delete(
        `/api/transactions/${id}?type=${type}`,
      );
      return res.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["transactions", variables.type],
      });
      queryClient.invalidateQueries({ queryKey: ["financialSummary"] });
    },
  });
};

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "@/lib/apiClient";

export interface Category {
  _id: string;
  name: string;
  description?: string;
}

export const useCategories = (type: "income" | "expense") => {
  return useQuery<Category[], Error>({
    queryKey: ["categories", type],
    queryFn: async () => {
      const res = await apiClient.get(
        `/api/transactions/categories?type=${type}`,
      );
      return res.data;
    },
  });
};

export const useAddCategory = (type: "income" | "expense") => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      name,
      description,
    }: {
      name: string;
      description?: string;
    }) => {
      const res = await apiClient.post(
        `/api/transactions/categories?type=${type}`,
        {
          name,
          description,
        },
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories", type] });
    },
  });
};

export const useEditCategory = (type: "income" | "expense") => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      name,
      description,
    }: {
      id: string;
      name: string;
      description?: string;
    }) => {
      const res = await apiClient.put(
        `/api/transactions/categories?type=${type}`,
        {
          id,
          name,
          description,
        },
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories", type] });
    },
  });
};

export const useDeleteCategory = (type: "income" | "expense") => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await apiClient.delete(
        `/api/transactions/categories?type=${type}`,
        {
          data: { id },
        },
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories", type] });
    },
  });
};

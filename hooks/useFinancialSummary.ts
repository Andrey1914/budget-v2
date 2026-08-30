import { useQuery } from "@tanstack/react-query";
import apiClient from "@/lib/apiClient";

export interface SummaryData {
  currency: string;
  carryOver: number;
  totalIncome: number;
  totalExpense: number;
  balance: number;
  incomeByCurrency: { _id: string; total: number }[];
  expenseByCurrency: { _id: string; total: number }[];
}

export const useFinancialSummary = () => {
  return useQuery<SummaryData, Error>({
    queryKey: ["financialSummary"],
    queryFn: async () => {
      const response = await apiClient.get<SummaryData>(
        "/api/transactions/getFinancialSummary",
      );
      return response.data;
    },
    staleTime: 60 * 1000,
  });
};

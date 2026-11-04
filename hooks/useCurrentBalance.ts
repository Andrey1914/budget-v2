import { useFinancialSummary } from "@/hooks/useFinancialSummary";

export const useCurrentBalance = () => {
  const { data, isLoading, error } = useFinancialSummary();

  const currentBalance = data
    ? data.carryOver + data.totalIncome - data.totalExpense
    : 0;

  return {
    data,
    currentBalance,
    currency: data?.currency,
    isLoading,
    error,
  };
};

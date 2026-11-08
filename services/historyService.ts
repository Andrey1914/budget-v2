import apiClient from "@/lib/apiClient";
import { IIncome, IExpense, FilterParams } from "@/interfaces";

export interface HistoryTransactionsResponse {
  transactions: IIncome[] | IExpense[];
  totalSum: number;
  totalTransactions: number;
}

export const historyService = {
  async fetchTransactions(
    filters: FilterParams,
  ): Promise<HistoryTransactionsResponse> {
    const { year, month, type, page } = filters;

    try {
      const res = await apiClient.get<HistoryTransactionsResponse>(
        "/api/transactions/filterTransactions",
        {
          params: {
            year: year !== "" ? year : undefined,
            month: month !== "" ? month : undefined,
            type: type !== "all" ? type : undefined,
            page,
          },
        },
      );

      return {
        transactions: res.data.transactions,
        totalSum: res.data.totalSum,
        totalTransactions: res.data.totalTransactions,
      };
    } catch (error) {
      console.error("Failed to fetch history transactions:", error);
      throw error;
    }
  },
};

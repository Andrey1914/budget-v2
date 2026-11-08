import apiClient from "@/lib/apiClient";
import { AnalyticsTransaction, FilterParams } from "@/interfaces";

export interface CurrencyTotal {
  currency: string;
  income: number;
  expense: number;
  balance: number;
}

export interface AnalyticsResponse {
  transactions: AnalyticsTransaction[];
  totalSum: number;
  totalIncome: number;
  totalExpense: number;
  currency: string;
  currencyTotals: CurrencyTotal[];
}

export const analyticsService = {
  async getAnalyticsData(filters: FilterParams): Promise<AnalyticsResponse> {
    const { year, month, type } = filters;

    try {
      const res = await apiClient.get<AnalyticsResponse>(
        "/api/transactions/filterTransactions",
        {
          params: {
            year: year !== "" ? year : undefined,
            month: month !== "" ? month : undefined,
            type: type !== "all" ? type : undefined,
          },
        },
      );

      if (!res.data || !res.data.transactions) {
        return {
          transactions: [],
          totalSum: 0,
          totalIncome: 0,
          totalExpense: 0,
          currency: "",
          currencyTotals: [],
        };
      }

      return {
        transactions: res.data.transactions,
        totalSum: res.data.totalSum,
        totalIncome: res.data.totalIncome,
        totalExpense: res.data.totalExpense,
        currency: res.data.currency,
        currencyTotals: res.data.currencyTotals || [],
      };
    } catch (error) {
      console.error("Failed to fetch analytics data:", error);
      throw error;
    }
  },
};

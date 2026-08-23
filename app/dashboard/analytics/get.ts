import axios from "axios";
import { AnalyticsTransaction, FilterParams } from "@/interfaces";

interface CurrencyTotal {
  currency: string;
  income: number;
  expense: number;
  balance: number;
}

export const getAnalyticsData = async (filters: FilterParams) => {
  const { year, month, type } = filters;

  try {
    const res = await axios.get<{
      transactions: AnalyticsTransaction[];

      totalSum: number;
      totalIncome: number;
      totalExpense: number;
      currency: string;
      currencyTotals: CurrencyTotal[];
    }>("/api/transactions/filterTransactions", {
      params: {
        year: year !== "" ? year : undefined,
        month: month !== "" ? month : undefined,
        type: type !== "all" ? type : undefined,
      },
    });

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
    console.error("Ошибка при загрузке аналитических данных:", error);
    throw error;
  }
};

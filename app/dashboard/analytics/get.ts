import axios from "axios";
import { IIncome, IExpense, FilterParams } from "@/interfaces";

export const fetchAnalyticsData = async (filters: FilterParams) => {
  const { year, month, type } = filters;

  try {
    const res = await axios.get<{
      transactions: IIncome[] | IExpense[];
      totalSum: number;
      totalIncome: number;
      totalExpense: number;
    }>("/api/transactions/filterTransactions", {
      params: {
        year: year !== "" ? year : undefined,
        month: month !== "" ? month : undefined,
        type: type !== "all" ? type : undefined,
      },
    });

    console.log("Ответ от сервера по аналитике:", res.data);

    if (!res.data || !res.data.transactions) {
      return { transactions: [], totalSum: 0, totalIncome: 0, totalExpense: 0 };
    }

    return {
      transactions: res.data.transactions,
      totalSum: res.data.totalSum,
      totalIncome: res.data.totalIncome,
      totalExpense: res.data.totalExpense,
    };
  } catch (error) {
    console.error("Ошибка при загрузке аналитических данных:", error);
    throw error;
  }
};

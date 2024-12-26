import axios from "axios";
import { IIncome, IExpense, FilterParams } from "@/interfaces";

export const fetchTransactions = async (filters: FilterParams) => {
  // const { year, month, type, page, limit } = filters;
  const { year, month, type, page } = filters;

  try {
    const res = await axios.get<{
      transactions: IIncome[] | IExpense[];
      totalSum: number;
      totalTransactions: number;
    }>("/api/transactions/filterTransactions", {
      params: {
        year: year !== "" ? year : undefined,
        month: month !== "" ? month : undefined,
        type: type !== "all" ? type : undefined,
        page,
        // limit,
      },
    });

    // console.log("Ответ от сервера:", res.data);

    return {
      transactions: res.data.transactions,
      totalSum: res.data.totalSum,
      totalTransactions: res.data.totalTransactions,
    };
  } catch (error) {
    console.error("Ошибка при загрузке транзакций:", error);
    throw error;
  }
};

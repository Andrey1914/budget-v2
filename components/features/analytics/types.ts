import { CategoryChartProps, IIncome, IExpense } from "@/interfaces";

export interface CategoryChartTransaction extends IIncome, IExpense {
  type: "income" | "expense";
}

export interface CategoryChartPropsExtended extends Omit<
  CategoryChartProps,
  "transactions"
> {
  transactions: CategoryChartTransaction[];
}

export interface BalanceComparisonProps {
  totalIncome: number;
  totalExpense: number;
  currency: string;
  currencyTotals: CurrencyTotal[];
}

export interface CurrencyTotal {
  currency: string;
  income: number;
  expense: number;
  balance: number;
}

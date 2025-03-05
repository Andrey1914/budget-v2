import { IBaseTransaction } from "./transactions";
import { BaseFormProps, BaseEditFormProps } from "./form";

export interface IExpense extends IBaseTransaction {}

export interface ExpenseFormProps extends BaseFormProps {}

export interface EditExpenseFormProps extends BaseEditFormProps {
  expenseId: string;
}

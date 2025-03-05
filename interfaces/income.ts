import { IBaseTransaction } from "./transactions";
import { BaseFormProps, BaseEditFormProps } from "./form";

export interface IIncome extends IBaseTransaction {}

export interface IncomeFormProps extends BaseFormProps {}

export interface EditIncomeFormProps extends BaseEditFormProps {
  incomeId: string;
}

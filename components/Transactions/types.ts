import { IBaseTransaction } from "@/interfaces";

export type TransactionType = "income" | "expense";

export interface WithClose {
  onClose: () => void;
}

export interface WithModalState extends WithClose {
  open: boolean;
}

export interface WithTransactionType {
  type: TransactionType;
}

export interface TransactionModalBaseProps
  extends WithModalState, WithTransactionType {}

export interface DetailedTransactionsListProps extends TransactionModalBaseProps {
  totalAmount: number;
  transactions: IBaseTransaction[];
  categoryMap: Record<string, string>;
  onItemClick?: (transaction: IBaseTransaction) => void;
}

export interface DetailedTransactionsListItemProps extends TransactionModalBaseProps {
  transaction: IBaseTransaction | null;
  categoryName: string;
  onEdit: () => void;
  onDelete: () => void;
}

export interface EditTransactionFormProps
  extends WithClose, WithTransactionType {
  transactionId: string;
}

export interface CurrencyTotal {
  _id: string;
  total: number;
}

export interface ForeignCurrencySummaryProps extends WithTransactionType {}

type TransactionListItemVariant = "compact" | "detailed";

export interface TransactionListItemProps extends WithTransactionType {
  transaction: IBaseTransaction;
  categoryName: string;
  variant: TransactionListItemVariant;
  isLast?: boolean;
  onClick?: () => void;
}

export interface TransactionModalProps extends TransactionModalBaseProps {
  onSubmit?: () => void | Promise<void>;
  title?: string;
}

export interface TransactionsListProps extends WithTransactionType {
  totalAmount: number;
  onUpdate: (updatedAmount: number) => void;
  expandableInline?: boolean;
}

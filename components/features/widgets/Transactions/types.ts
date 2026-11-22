export interface BalanceWidgetProps {
  netBalance: number;
}

export interface TransactionsCardProps {
  type: "income" | "expense";
  totalAmount: number;
  onOpenModal: () => void;
  onUpdate: (updatedAmount: number) => void;
}

"use client";

import React, { useMemo } from "react";
import { List, Typography } from "@mui/material";
import { useSession } from "next-auth/react";
import { Session, IBaseTransaction } from "@/interfaces";
import { Modal } from "@/components/UI";
import { TransactionListItem } from "@/components/Transactions/TransactionListItem";
import { getTransactionCategoryName } from "@/components/Transactions/transactionUtils";
import {
  ModalScrollContainer,
  ModalHeading,
  TotalLabelText,
  TotalAmountText,
  EmptyStateBoxDetailed,
} from "./styles";

interface DetailedTransactionsListProps {
  open: boolean;
  onClose: () => void;
  totalAmount: number;
  transactions: IBaseTransaction[];
  categoryMap: Record<string, string>;
  type: "income" | "expense";
  onItemClick?: (transaction: IBaseTransaction) => void;
}

export const DetailedTransactionsList: React.FC<
  DetailedTransactionsListProps
> = ({
  open,
  onClose,
  totalAmount,
  transactions,
  categoryMap,
  type,
  onItemClick,
}) => {
  const { data: session } = useSession() as {
    data: Session | null;
    status: string;
  };

  const isIncome = type === "income";
  const title = isIncome ? "Incomes" : "Expenses";
  const userCurrency = session?.user?.currency ?? "";
  const totalLabel = `Total ${title} for this month:`;
  const emptyText = isIncome ? "No incomes yet" : "No expenses to show";

  const sortedTransactions = useMemo(() => {
    return [...transactions].sort((a, b) => {
      const timeA = new Date(a.date).getTime();
      const timeB = new Date(b.date).getTime();
      if (timeB !== timeA) {
        return timeB - timeA;
      }
      return String(b._id).localeCompare(String(a._id));
    });
  }, [transactions]);

  return (
    <Modal open={open} onClose={onClose} maxWidth="sm">
      <ModalScrollContainer>
        <ModalHeading variant="h3">{title}</ModalHeading>

        <TotalLabelText variant="h5">{totalLabel}</TotalLabelText>

        <TotalAmountText variant="h4" isIncome={isIncome}>
          {totalAmount.toFixed(2)}
          {userCurrency}
        </TotalAmountText>

        {sortedTransactions.length === 0 ? (
          <EmptyStateBoxDetailed>
            <Typography variant="body1" color="text.secondary">
              {emptyText}
            </Typography>
          </EmptyStateBoxDetailed>
        ) : (
          <List disablePadding>
            {sortedTransactions.map((transaction, index) => (
              <TransactionListItem
                key={transaction._id.toString()}
                transaction={transaction}
                categoryName={getTransactionCategoryName(
                  transaction,
                  categoryMap,
                  "Без категорії",
                )}
                type={type}
                variant="detailed"
                isLast={index === sortedTransactions.length - 1}
                onClick={
                  onItemClick ? () => onItemClick(transaction) : undefined
                }
              />
            ))}
          </List>
        )}
      </ModalScrollContainer>
    </Modal>
  );
};

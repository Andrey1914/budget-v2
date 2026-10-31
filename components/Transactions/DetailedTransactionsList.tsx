"use client";

import React, { useMemo } from "react";
import { List, Typography } from "@mui/material";
import { useSession } from "next-auth/react";
import { Session } from "@/interfaces";
import { DetailedTransactionsListProps } from "./types";
import { Modal } from "@/components/UI";
import { TransactionListItem } from "@/components/Transactions/TransactionListItem";
import {
  getTransactionCategoryName,
  sortTransactionsByDate,
} from "@/components/Transactions/utils";

import {
  ModalScrollContainer,
  ModalHeading,
  TotalLabelText,
  TotalAmountText,
  EmptyStateBoxDetailed,
} from "./styles";

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

  const sortedTransactions = useMemo(
    () => sortTransactionsByDate(transactions),
    [transactions],
  );

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

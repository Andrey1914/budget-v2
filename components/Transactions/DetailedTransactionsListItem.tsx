"use client";

import React from "react";
import { Typography } from "@mui/material";
import { DetailedTransactionsListItemProps } from "./types";
import { Modal } from "@/components/UI";
import { ActionButtons } from "@/components/UI/Buttons/ActionButtons";
import { formatTransactionDate } from "@/components/Transactions/utils";

import {
  DetailsContainer,
  DetailRow,
  DetailValue,
  TransactionAmount,
  TransactionDate,
} from "./styles";

export const DetailedTransactionsListItem: React.FC<
  DetailedTransactionsListItemProps
> = ({ open, onClose, transaction, type, categoryName, onEdit, onDelete }) => {
  if (!transaction) {
    return null;
  }

  const isIncome = type === "income";
  const title = isIncome ? "Income" : "Expense";

  const formattedDate = formatTransactionDate(transaction.date);

  const description = transaction.description?.trim();

  return (
    <Modal open={open} onClose={onClose} maxWidth="xs">
      <Typography variant="h4">{title}</Typography>

      <DetailsContainer>
        <DetailRow>
          {/* <DetailLabel>Category</DetailLabel> */}
          <DetailValue variant="h6">{categoryName}</DetailValue>
        </DetailRow>

        {description && (
          <DetailRow>
            {/* <DetailLabel>Description</DetailLabel> */}
            <DetailValue variant="h6">{description}</DetailValue>
          </DetailRow>
        )}

        <TransactionAmount variant="h6" isIncome={isIncome}>
          {transaction.amount.toFixed(2)} {transaction.currency ?? ""}
        </TransactionAmount>

        <TransactionDate>
          {/* <DetailLabel>Date</DetailLabel> */}
          <DetailValue variant="h6">{formattedDate}</DetailValue>
        </TransactionDate>
      </DetailsContainer>
      <ActionButtons onEdit={onEdit} onDelete={onDelete} />
    </Modal>
  );
};

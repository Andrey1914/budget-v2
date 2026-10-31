"use client";

import React, { useEffect, useState, useCallback, useMemo } from "react";

import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { Session, IBaseTransaction, ICategory } from "@/interfaces";
import { TransactionsListProps } from "./types";
import EditTransactionForm from "@/components/Transactions/EditTransactionForm";
import { DetailedTransactionsList } from "@/components/Transactions/DetailedTransactionsList";
import { TransactionListItem } from "@/components/Transactions/TransactionListItem";
import { Modal } from "@/components/UI";

import { DetailedTransactionsListItem } from "@/components/Transactions/DetailedTransactionsListItem";
import { ConfirmModal } from "@/components/UI/Modal";

import { useTransactions, useDeleteTransaction } from "@/hooks/useTransactions";

import {
  getTransactionCategoryName,
  getTransactionTotal,
} from "@/components/Transactions/utils";
import { Typography } from "@mui/material";
import {
  TransactionsListWrapper,
  ErrorText,
  EmptyStateBox,
  ListContainer,
  StyledMuiList,
  FadingShadowOverlay,
  ShowMoreWrapper,
  InlineShowMoreButton,
  ShowMoreActionText,
} from "./styles";

const TransactionsList: React.FC<TransactionsListProps> = ({
  type,
  totalAmount,
  onUpdate,
  expandableInline = false,
}) => {
  const { data: session } = useSession() as {
    data: Session | null;
    status: string;
  };

  const isIncome = type === "income";
  const emptyText = isIncome ? "No incomes yet" : "No expenses to show";
  const showMoreText = useTranslations("common.buttons")("showMore");

  const { data: transactionsData, error } = useTransactions(type);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [categoryMap, setCategoryMap] = useState<Record<string, string>>({});
  const [isDetailedModalOpen, setIsDetailedModalOpen] = useState(false);

  const [selectedTransaction, setSelectedTransaction] =
    useState<IBaseTransaction | null>(null);

  const [isTransactionDetailsOpen, setIsTransactionDetailsOpen] =
    useState(false);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const deleteTransactionMutation = useDeleteTransaction();

  const loadCategories = useCallback(async () => {
    try {
      const response = await fetch(`/api/transactions/categories?type=${type}`);

      if (!response.ok) {
        return;
      }

      const categories: ICategory[] = await response.json();
      const map: Record<string, string> = {};

      categories.forEach((category) => {
        if (category._id) {
          map[category._id.toString()] = category.name;
        }
      });

      setCategoryMap(map);
    } catch (error) {
      console.error("Failed to load categories", error);
    }
  }, [type]);

  useEffect(() => {
    void loadCategories();
  }, [loadCategories]);

  useEffect(() => {
    if (!transactionsData || !session?.user?.currency) {
      return;
    }

    const total = getTransactionTotal(
      transactionsData as IBaseTransaction[],
      session.user.currency,
    );

    onUpdate(total);
  }, [transactionsData, session?.user?.currency, onUpdate]);

  const items = useMemo(() => {
    const rawItems = (transactionsData || []) as IBaseTransaction[];
    return [...rawItems].sort((a, b) => {
      const timeA = new Date(a.date).getTime();
      const timeB = new Date(b.date).getTime();
      if (timeB !== timeA) {
        return timeB - timeA;
      }
      return String(b._id).localeCompare(String(a._id));
    });
  }, [transactionsData]);

  if (!session) {
    return null;
  }

  const hasMoreThanThree = items.length > 3;

  const handleTransactionClick = (transaction: IBaseTransaction) => {
    setIsDetailedModalOpen(false);
    setSelectedTransaction(transaction);
    setIsTransactionDetailsOpen(true);
  };

  const handleEditSelectedTransaction = () => {
    if (!selectedTransaction) {
      return;
    }

    setEditingId(selectedTransaction._id.toString());
    setIsTransactionDetailsOpen(false);
    setIsEditModalOpen(true);
  };

  const handleDeleteSelectedTransaction = () => {
    setIsTransactionDetailsOpen(false);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedTransaction) {
      return;
    }

    try {
      await deleteTransactionMutation.mutateAsync({
        id: selectedTransaction._id.toString(),
        type,
      });

      setIsDeleteModalOpen(false);
      setSelectedTransaction(null);
    } catch (error) {
      console.error("Failed to delete transaction:", error);
    }
  };

  const handleEditClose = () => {
    setIsEditModalOpen(false);
    setEditingId(null);
    setSelectedTransaction(null);
  };

  return (
    <TransactionsListWrapper>
      {error && <ErrorText>{(error as Error).message}</ErrorText>}

      {items.length === 0 ? (
        <EmptyStateBox>
          <Typography variant="body1" color="text.secondary" component="p">
            {emptyText}
          </Typography>
        </EmptyStateBox>
      ) : (
        <>
          <ListContainer
            isExpanded={isExpanded}
            hasMoreThanThree={hasMoreThanThree}
          >
            <StyledMuiList>
              {items.map((transaction, index) => (
                <TransactionListItem
                  key={transaction._id.toString()}
                  transaction={transaction}
                  categoryName={getTransactionCategoryName(
                    transaction,
                    categoryMap,
                  )}
                  type={type}
                  variant="compact"
                  isLast={index === items.length - 1}
                  onClick={() => setIsDetailedModalOpen(true)}
                />
              ))}
            </StyledMuiList>

            {hasMoreThanThree && !isExpanded && (
              <FadingShadowOverlay aria-hidden="true" />
            )}
          </ListContainer>

          {hasMoreThanThree && (
            <ShowMoreWrapper>
              {expandableInline ? (
                <InlineShowMoreButton
                  onClick={() => setIsExpanded((previous) => !previous)}
                >
                  {isExpanded ? "Show less" : showMoreText}
                </InlineShowMoreButton>
              ) : (
                <ShowMoreActionText
                  onClick={() => setIsDetailedModalOpen(true)}
                >
                  {showMoreText}
                </ShowMoreActionText>
              )}
            </ShowMoreWrapper>
          )}
        </>
      )}

      <DetailedTransactionsList
        open={isDetailedModalOpen}
        onClose={() => setIsDetailedModalOpen(false)}
        totalAmount={totalAmount}
        transactions={items}
        categoryMap={categoryMap}
        type={type}
        onItemClick={handleTransactionClick}
      />

      <DetailedTransactionsListItem
        open={isTransactionDetailsOpen}
        onClose={() => {
          setIsTransactionDetailsOpen(false);
          setSelectedTransaction(null);
        }}
        transaction={selectedTransaction}
        type={type}
        categoryName={
          selectedTransaction
            ? getTransactionCategoryName(
                selectedTransaction,
                categoryMap,
                "Без категорії",
              )
            : ""
        }
        onEdit={handleEditSelectedTransaction}
        onDelete={handleDeleteSelectedTransaction}
      />

      <Modal open={isEditModalOpen} onClose={handleEditClose} maxWidth="sm">
        {editingId && (
          <EditTransactionForm
            transactionId={editingId}
            type={type}
            onClose={handleEditClose}
          />
        )}
      </Modal>

      <ConfirmModal
        message="Ви впевнені, що хочете видалити цю транзакцію? Цю дію неможливо скасувати."
        title="Видалити транзакцію"
        confirmText="Видалити"
        cancelText="Скасувати"
        open={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedTransaction(null);
        }}
        onConfirm={handleConfirmDelete}
        loading={deleteTransactionMutation.isPending}
      />
    </TransactionsListWrapper>
  );
};

export default TransactionsList;

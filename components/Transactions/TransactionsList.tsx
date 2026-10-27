"use client";

import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useTransactions } from "@/hooks/useTransactions";
import { Session, IBaseTransaction, ICategory } from "@/interfaces";
import EditTransactionForm from "@/components/Transactions/EditTransactionForm";
import { DetailedTransactionsList } from "@/components/Transactions/DetailedTransactionsList";
import { TransactionListItem } from "@/components/Transactions/TransactionListItem";
import {
  getTransactionCategoryName,
  getTransactionTotal,
} from "@/components/Transactions/transactionUtils";
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

interface TransactionsListProps {
  type: "income" | "expense";
  totalAmount: number;
  onUpdate: (updatedAmount: number) => void;
  expandableInline?: boolean;
}

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

  const { data: transactionsData, error, refetch } = useTransactions(type);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [categoryMap, setCategoryMap] = useState<Record<string, string>>({});
  const [isDetailedModalOpen, setIsDetailedModalOpen] = useState(false);

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

      {editingId && (
        <EditTransactionForm
          transactionId={editingId}
          type={type}
          refreshData={refetch}
          onClose={() => setEditingId(null)}
        />
      )}

      <DetailedTransactionsList
        open={isDetailedModalOpen}
        onClose={() => setIsDetailedModalOpen(false)}
        totalAmount={totalAmount}
        transactions={items}
        categoryMap={categoryMap}
        type={type}
        onItemClick={(transaction) => {
          setIsDetailedModalOpen(false);
          setEditingId(transaction._id.toString());
        }}
      />
    </TransactionsListWrapper>
  );
};

export default TransactionsList;

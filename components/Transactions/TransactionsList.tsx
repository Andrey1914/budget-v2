"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useSession } from "next-auth/react";

import { useTransactions, useDeleteTransaction } from "@/hooks/useTransactions";
import { Session, IBaseTransaction, ICategory } from "@/interfaces";
import EditTransactionForm from "@/components/Transactions/EditTransactionForm";
import { Delete, Edit } from "@mui/icons-material";

import { Box, List, ListItem, Typography, Divider } from "@mui/material";

interface TransactionsListProps {
  type: "income" | "expense";
  totalAmount: number;
  onUpdate: (updatedAmount: number) => void;
}

const TransactionsList: React.FC<TransactionsListProps> = ({
  type,
  onUpdate,
}) => {
  const { data: session } = useSession() as {
    data: Session | null;
    status: string;
  };

  const isIncome = type === "income";
  const emptyText = isIncome ? "No incomes yet" : "No expenses to show";

  const { data: transactionsData, error, refetch } = useTransactions(type);
  const deleteTransactionMutation = useDeleteTransaction();
  const [editingId, setEditingId] = useState<string | null>(null);

  const [categoryMap, setCategoryMap] = useState<Record<string, string>>({});

  const loadCategories = useCallback(async () => {
    try {
      const res = await fetch(`/api/transactions/categories?type=${type}`);
      if (res.ok) {
        const categories: ICategory[] = await res.json();
        const map: Record<string, string> = {};
        categories.forEach((cat) => {
          if (cat._id) {
            map[cat._id.toString()] = cat.name;
          }
        });
        setCategoryMap(map);
      }
    } catch (err) {
      console.error("Failed to load categories", err);
    }
  }, [type]);

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  useEffect(() => {
    if (transactionsData && session?.user?.currency) {
      const total = (transactionsData as IBaseTransaction[])
        .filter((item) => item.currency === session.user.currency)
        .reduce((acc: number, item: IBaseTransaction) => acc + item.amount, 0);

      onUpdate(total);
    }
  }, [transactionsData, session, onUpdate]);

  const handleEdit = (id: string) => {
    setEditingId(id);
  };

  const handleDeleteItem = (id: string) => {
    deleteTransactionMutation.mutate({ id, type });
  };

  if (!session) {
    return null;
  }

  const items = (transactionsData || []) as IBaseTransaction[];

  return (
    <>
      {error && <p style={{ color: "red" }}>{(error as Error).message}</p>}

      <List
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: 1,
          minHeight: "320px",
        }}
      >
        {items.length === 0 ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <Typography variant="h6" component="p">
              {emptyText}
            </Typography>
          </Box>
        ) : (
          items.map((item: IBaseTransaction) => {
            const categoryIdStr = item.category?.toString();
            const categoryName = categoryIdStr
              ? categoryMap[categoryIdStr]
              : "";

            return (
              <React.Fragment key={item._id.toString()}>
                <ListItem
                  sx={{
                    p: 3,
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
                    backgroundColor: "transparent",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "100%",
                    }}
                  >
                    <Typography variant="body1" component="p">
                      {categoryName}
                    </Typography>
                    <Typography
                      variant="body1"
                      component="p"
                      sx={{ color: isIncome ? "primary.main" : "error.main" }}
                    >
                      {item.amount} {item.currency}
                    </Typography>
                  </Box>

                  {/* <Box sx={{ display: "flex", gap: 3 }}>
                    <Edit
                      sx={{ cursor: "pointer" }}
                      onClick={() => handleEdit(item._id.toString())}
                    />

                    <Delete
                      sx={{ cursor: "pointer" }}
                      onClick={() => handleDeleteItem(item._id.toString())}
                    />
                  </Box> */}
                </ListItem>
                <Divider />
              </React.Fragment>
            );
          })
        )}
      </List>

      {editingId && (
        <EditTransactionForm
          transactionId={editingId}
          type={type}
          refreshData={refetch}
          onClose={() => setEditingId(null)}
        />
      )}
    </>
  );
};

export default TransactionsList;

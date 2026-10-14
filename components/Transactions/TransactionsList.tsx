"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

import { useTransactions, useDeleteTransaction } from "@/hooks/useTransactions";
import { Session, IBaseTransaction } from "@/interfaces";
import EditTransactionForm from "@/components/Transactions/EditTransactionForm";
import { Delete, Edit } from "@mui/icons-material";

import { Box, List, ListItem, Paper, Typography } from "@mui/material";

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
          items.map((item: IBaseTransaction) => (
            <ListItem key={item._id.toString()} sx={{ p: 0 }}>
              <Paper
                sx={{
                  p: 3,
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <Typography variant="h6" component="p">
                  {item.amount} {item.currency} - {item.description}
                </Typography>
                <Box sx={{ display: "flex", gap: 3 }}>
                  <Edit
                    sx={{ cursor: "pointer" }}
                    onClick={() => handleEdit(item._id.toString())}
                  />

                  <Delete
                    sx={{ cursor: "pointer" }}
                    onClick={() => handleDeleteItem(item._id.toString())}
                  />
                </Box>
              </Paper>
            </ListItem>
          ))
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

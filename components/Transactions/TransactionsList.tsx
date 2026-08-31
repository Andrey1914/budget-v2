"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import { useTransactions, useDeleteTransaction } from "@/hooks/useTransactions";
import { Session, IBaseTransaction } from "@/interfaces";
import EditTransactionForm from "@/components/Transactions/EditTransactionForm";
import emptyList from "@/public/empty-list.webp";
import { Delete, Edit, Add } from "@mui/icons-material";
import ForeignCurrency from "@/components/Transactions/ForeignCurrency";

import {
  Box,
  List,
  ListItem,
  Paper,
  Typography,
  Fab,
  useTheme,
} from "@mui/material";
import Image from "next/image";

interface TransactionsListProps {
  type: "income" | "expense";
  totalAmount: number;
  onUpdate: (updatedAmount: number) => void;
}

const TransactionsList: React.FC<TransactionsListProps> = ({
  type,
  totalAmount,
  onUpdate,
}) => {
  const { data: session } = useSession() as {
    data: Session | null;
    status: string;
  };
  const router = useRouter();
  const theme = useTheme();

  const isIncome = type === "income";
  const title = isIncome ? "Incomes" : "Expenses";
  const totalLabel = isIncome
    ? "Total Incomes for this month:"
    : "Total Expenses for this month:";
  const emptyText = isIncome ? "No incomes yet" : "No expenses to show";

  const { data: transactionsData, error, refetch } = useTransactions(type);
  const deleteTransactionMutation = useDeleteTransaction();
  const [editingId, setEditingId] = useState<string | null>(null);

  const userCurrency = session?.user?.currency;

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

  const reloadData = () => {
    refetch();
  };

  const handleAddClick = () => {
    router.push(`/dashboard/${type}`);
  };

  if (!session) {
    return null;
  }

  const items = (transactionsData || []) as IBaseTransaction[];

  return (
    <>
      {error && <p style={{ color: "red" }}>{(error as Error).message}</p>}
      <Box sx={{ p: 4 }}>
        <Typography variant="h3" component="h2">
          {title}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 3,
          backgroundColor: theme.palette.background.totalSum,
          borderRadius: 1,
          border: "1px solid #FEA362",
        }}
      >
        <Box>
          <Typography
            variant="h5"
            component="p"
            sx={{ color: theme.palette.text.primary }}
          >
            {totalLabel} {totalAmount} {userCurrency}
          </Typography>
          <ForeignCurrency type={type} />
        </Box>
        <Box>
          <Fab color="primary" aria-label="add" onClick={handleAddClick}>
            <Add />
          </Fab>
        </Box>
      </Box>

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
            <Image
              src={emptyList}
              alt="Empty list image"
              style={{ width: "100%" }}
            />
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

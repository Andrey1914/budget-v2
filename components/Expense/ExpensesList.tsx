"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import { useTransactions, useDeleteTransaction } from "@/hooks/useTransactions";
import { Session, IExpense } from "@/interfaces";
import EditExpenseForm from "@/components/Expense/EditExpenseForm";
import emptyList from "@/public/empty-list.webp";
import { Delete, Edit, Add } from "@mui/icons-material";
import ForeignCurrencySummary from "@/components/Expense/ForeignCurrency";

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

const ExpensesList: React.FC<{
  totalExpense: number;
  onUpdate: (updatedExpenses: number) => void;
}> = ({ totalExpense, onUpdate }) => {
  const { data: session } = useSession() as {
    data: Session | null;
    status: string;
  };
  const router = useRouter();
  const theme = useTheme();

  const { data: expensesData, error, refetch } = useTransactions("expense");
  const deleteTransactionMutation = useDeleteTransaction();
  const [editingExpenseId, setEditingExpenseId] = useState<string | null>(null);

  const userCurrency = session?.user?.currency;

  useEffect(() => {
    if (expensesData && session?.user?.currency) {
      const total = (expensesData as IExpense[])
        .filter((item) => item.currency === session.user.currency)
        .reduce((acc: number, item: IExpense) => acc + item.amount, 0);

      onUpdate(total);
    }
  }, [expensesData, session, onUpdate]);

  const handleEdit = (id: string) => {
    setEditingExpenseId(id);
  };

  const handleDeleteExpense = (id: string) => {
    deleteTransactionMutation.mutate({ id, type: "expense" });
  };

  const reloadData = () => {
    refetch();
  };

  const hendleAddClick = () => {
    router.push("/dashboard/expense");
  };

  if (!session) {
    return null;
  }

  const expense = (expensesData || []) as IExpense[];

  return (
    <>
      {error && <p style={{ color: "red" }}>{(error as Error).message}</p>}
      <Box sx={{ p: 4 }}>
        <Typography variant="h3" component="h2">
          Expenses
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
            Total Expenses for this month: {totalExpense} {userCurrency}
          </Typography>
          <ForeignCurrencySummary />
        </Box>
        <Box>
          <Fab color="primary" aria-label="add" onClick={hendleAddClick}>
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
        {expense.length === 0 ? (
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
              No expenses to show
            </Typography>
          </Box>
        ) : (
          expense.map((item: IExpense) => (
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
                    onClick={() => handleDeleteExpense(item._id.toString())}
                  />
                </Box>
              </Paper>
            </ListItem>
          ))
        )}
      </List>

      {editingExpenseId && (
        <EditExpenseForm
          expenseId={editingExpenseId}
          refreshExpenses={reloadData}
          onClose={() => setEditingExpenseId(null)}
        />
      )}
    </>
  );
};

export default ExpensesList;

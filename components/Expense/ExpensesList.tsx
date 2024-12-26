"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { handleDelete } from "@/app/dashboard/expense/delete";
import { getExpenses } from "@/app/dashboard/expense/get";
import { refreshExpenses } from "@/app/dashboard/expense/refresh";
import { Expense } from "@/types";
import { Session } from "@/interfaces";
import EditExpenseForm from "@/components/Expense/EditExpenseForm";

import { Delete, Edit } from "@mui/icons-material";
import { Box, List, ListItem, Paper, Typography } from "@mui/material";

const ExpensesList: React.FC<{
  totalExpense: number;
  onUpdate: (updatedExpenses: number) => void;
}> = ({ totalExpense, onUpdate }) => {
  const { data: session, status } = useSession() as {
    data: Session | null;
    status: string;
  };
  const [expense, setExpense] = useState<Expense[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [editingExpenseId, setEditingExpenseId] = useState<string | null>(null);

  const userCurrency = session?.user?.currency;

  useEffect(() => {
    if (session) {
      const getExpensesData = async () => {
        try {
          const expensesData = await getExpenses(session);

          setExpense(expensesData);

          const total = expensesData.reduce(
            (acc: number, item: Expense) => acc + item.amount,
            0
          );
          onUpdate(total);
        } catch (err) {
          console.error("Error fetching expenses:", err);
          setError((err as Error).message);
        }
      };

      if (session) {
        getExpensesData();
      }
    }
  }, [session, status, onUpdate]);

  const handleEdit = (id: string) => {
    setEditingExpenseId(id);
  };

  const reloadData = async () => {
    if (!session) {
      setError("Session or token is not available");
      return;
    }

    try {
      const expensesData = await refreshExpenses(session);

      setExpense(expensesData);

      const total = expensesData.reduce(
        (acc: number, item: Expense) => acc + item.amount,
        0
      );

      onUpdate(total);
    } catch (err) {
      setError((err as Error).message);
    }
  };

  if (!session) {
    return null;
  }

  return (
    <>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <Box sx={{ p: 4 }}>
        <Typography variant="h3" component="h2">
          Expenses
        </Typography>
      </Box>
      <Box
        sx={{
          p: 3,
          backgroundColor: "orange",
          borderRadius: "0.3rem",
          color: "#000",
        }}
      >
        <Typography variant="h4" component="p">
          Total Expenses for this month: {totalExpense} {userCurrency}
        </Typography>
      </Box>

      <List
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: 4,
        }}
      >
        {expense.map((item: Expense) => (
          <ListItem key={item._id} style={{ padding: 0 }}>
            <Paper
              style={{
                padding: 9,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Typography variant="h6" component="p">
                {item.amount} {userCurrency} - {item.description}
              </Typography>
              <Box sx={{ display: "flex", gap: 3 }}>
                <Edit onClick={() => handleEdit(item._id)} />

                <Delete
                  onClick={() =>
                    handleDelete(item._id, expense, setExpense, reloadData)
                  }
                />
              </Box>
            </Paper>
          </ListItem>
        ))}
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

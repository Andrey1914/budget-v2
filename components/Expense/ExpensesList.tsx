"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { handleDelete } from "@/app/dashboard/expense/delete";
import { fetchExpenses } from "@/app/dashboard/expense/get";
import { refreshExpenses } from "@/app/dashboard/expense/refresh";
import { Expense } from "@/types";
import { Session } from "@/interfaces";
import EditExpenseForm from "@/components/Expense/EditExpenseForm";

import { Delete, Edit } from "@mui/icons-material";
import { Box, Fab, List, ListItem, Paper, Typography } from "@mui/material";

const ExpensesList: React.FC = () => {
  const { data: session, status } = useSession() as {
    data: Session | null;
    status: string;
  };
  const [expense, setExpense] = useState<Expense[]>([]);
  const [totalExpense, setTotalExpense] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [editingExpenseId, setEditingExpenseId] = useState<string | null>(null);

  useEffect(() => {
    if (session) {
      const loadData = async () => {
        try {
          const expensesData = await fetchExpenses(session);

          setExpense(expensesData);

          const total = expensesData.reduce(
            (acc: number, item: Expense) => acc + item.amount,
            0
          );
          setTotalExpense(total);
        } catch (err) {
          console.error("Error fetching expenses:", err);
          setError((err as Error).message);
        }
      };

      if (session) {
        loadData();
      }
    }
  }, [session, status]);

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
    } catch (err) {
      setError((err as Error).message);
    }
  };

  if (!session) {
    return null;
  }

  return (
    <div>
      <div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <div>
          <Box>
            <Typography variant="h2" component="h1">
              Expenses
            </Typography>
            <Typography
              variant="h4"
              component="p"
              style={{
                padding: "0.8rem",
                color: "white",
                backgroundColor: "orange",
                borderRadius: "0.3rem",
              }}
            >
              Total Expenses for this month: {totalExpense} PLN
            </Typography>{" "}
          </Box>
          <List style={{ width: "100%" }}>
            {expense.map((item: Expense) => (
              <ListItem key={item._id}>
                <Paper
                  style={{
                    padding: "1rem",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <p>
                    {item.amount} - {item.description}
                  </p>
                  <div>
                    <Fab
                      aria-label="edit"
                      onClick={() => handleEdit(item._id)}
                      style={{ marginLeft: "10px" }}
                    >
                      <Edit />
                    </Fab>
                    <Fab
                      aria-label="delete"
                      onClick={() =>
                        handleDelete(
                          item._id,
                          expense,
                          setExpense,
                          setTotalExpense
                        )
                      }
                      style={{ marginLeft: "10px" }}
                    >
                      <Delete />
                    </Fab>
                  </div>
                </Paper>
              </ListItem>
            ))}
          </List>
        </div>
      </div>
      {editingExpenseId && (
        <EditExpenseForm
          expenseId={editingExpenseId}
          refreshExpenses={reloadData}
          onClose={() => setEditingExpenseId(null)}
        />
      )}
    </div>
  );
};

export default ExpensesList;

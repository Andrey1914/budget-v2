"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import { handleDelete } from "@/app/dashboard/expense/delete";
import { getExpenses } from "@/app/dashboard/expense/get";
import { refreshExpenses } from "@/app/dashboard/expense/refresh";
import { Session, IExpense } from "@/interfaces";
import EditExpenseForm from "@/components/Expense/EditExpenseForm";
import emptyList from "@/public/empty-list.webp";
import { Delete, Edit, Add } from "@mui/icons-material";

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
  const { data: session, status } = useSession() as {
    data: Session | null;
    status: string;
  };
  const router = useRouter();
  const theme = useTheme();

  const [expense, setExpense] = useState<IExpense[]>([]);
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
            (acc: number, item: IExpense) => acc + item.amount,
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
        (acc: number, item: IExpense) => acc + item.amount,
        0
      );

      onUpdate(total);
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const hendleAddClick = () => {
    router.push("/dashboard/expense");
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
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 3,
          backgroundColor: theme.palette.background.totalSum,
          borderRadius: 1,
          border: "1px solid #FEA362",
        }}
      >
        <Typography
          variant="h5"
          component="p"
          sx={{ color: theme.palette.text.primary }}
        >
          Total Expenses for this month: {totalExpense} {userCurrency}
        </Typography>
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
                  {item.amount} {userCurrency} - {item.description}
                </Typography>
                <Box sx={{ display: "flex", gap: 3 }}>
                  <Edit onClick={() => handleEdit(item._id.toString())} />

                  <Delete
                    onClick={() =>
                      handleDelete(
                        item._id.toString(),
                        expense,
                        setExpense,
                        reloadData
                      )
                    }
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

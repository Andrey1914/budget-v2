"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { handleDelete } from "@/app/dashboard/income/delete";
import { getIncomes } from "@/app/dashboard/income/get";
import { refreshIncomes } from "@/app/dashboard/income/refresh";
import { Income } from "@/types";
import { Session } from "@/interfaces";
import EditIncomeForm from "@/components/Income/EditIncomeForm";

import { Delete, Edit } from "@mui/icons-material";
import { Box, Fab, List, ListItem, Paper, Typography } from "@mui/material";

const IncomesList: React.FC = () => {
  const { data: session, status } = useSession() as {
    data: Session | null;
    status: string;
  };

  const [income, setIncome] = useState<any[]>([]);
  const [totalIncome, setTotalIncome] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [editingIncomeId, setEditingIncomeId] = useState<string | null>(null);

  useEffect(() => {
    if (session) {
      const getIncomesData = async () => {
        try {
          const incomesData = await getIncomes(session);

          setIncome(incomesData);

          const total = incomesData.reduce(
            (acc: number, item: Income) => acc + item.amount,
            0
          );
          setTotalIncome(total);
        } catch (err) {
          console.error("Error fetching expenses:", err);
          setError((err as Error).message);
        }
      };

      if (session) {
        getIncomesData();
      }
    }
  }, [session, status]);

  const handleEdit = (id: string) => {
    setEditingIncomeId(id);
  };

  const reloadData = async () => {
    if (!session) {
      setError("Session or token is not available");
      return;
    }

    try {
      const incomesData = await refreshIncomes(session);

      setIncome(incomesData);
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
              Incomes
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
              Total Incomes for this month: {totalIncome} PLN
            </Typography>
          </Box>
          <List style={{ width: "100%" }}>
            {income.map((item: Income) => (
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
                          income,
                          setIncome,
                          setTotalIncome
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

      {editingIncomeId && (
        <EditIncomeForm
          incomeId={editingIncomeId}
          refreshIncomes={reloadData}
          onClose={() => setEditingIncomeId(null)}
        />
      )}
    </div>
  );
};

export default IncomesList;

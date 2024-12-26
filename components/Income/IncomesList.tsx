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
import { Box, List, ListItem, Paper, Typography } from "@mui/material";

const IncomesList: React.FC<{
  totalIncome: number;
  onUpdate: (updatedIncomes: number) => void;
}> = ({ totalIncome, onUpdate }) => {
  const { data: session, status } = useSession() as {
    data: Session | null;
    status: string;
  };

  const [income, setIncome] = useState<Income[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [editingIncomeId, setEditingIncomeId] = useState<string | null>(null);

  const userCurrency = session?.user?.currency;

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
          onUpdate(total);
        } catch (err) {
          console.error("Error fetching incomes:", err);
          setError((err as Error).message);
        }
      };

      if (session) {
        getIncomesData();
      }
    }
  }, [session, status, onUpdate]);

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

      const total = incomesData.reduce(
        (acc: number, item: Income) => acc + item.amount,
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
          Incomes
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
          Total Incomes for this month: {totalIncome} {userCurrency}
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
        {income.map((item: Income) => (
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
                    handleDelete(item._id, income, setIncome, reloadData)
                  }
                />
              </Box>
            </Paper>
          </ListItem>
        ))}
      </List>
      {editingIncomeId && (
        <EditIncomeForm
          incomeId={editingIncomeId}
          refreshIncomes={reloadData}
          onClose={() => setEditingIncomeId(null)}
        />
      )}
    </>
  );
};

export default IncomesList;

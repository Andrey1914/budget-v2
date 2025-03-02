"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import { handleDelete } from "@/app/dashboard/income/delete";
import { getIncomes } from "@/app/dashboard/income/get";
import { refreshIncomes } from "@/app/dashboard/income/refresh";
import { Session, IIncome } from "@/interfaces";
import EditIncomeForm from "@/components/Income/EditIncomeForm";

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

const IncomesList: React.FC<{
  totalIncome: number;
  onUpdate: (updatedIncomes: number) => void;
}> = ({ totalIncome, onUpdate }) => {
  const { data: session, status } = useSession() as {
    data: Session | null;
    status: string;
  };
  const router = useRouter();
  const theme = useTheme();

  const [income, setIncome] = useState<IIncome[]>([]);
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
            (acc: number, item: IIncome) => acc + item.amount,
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
        (acc: number, item: IIncome) => acc + item.amount,
        0
      );

      onUpdate(total);
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const hendleAddClick = () => {
    router.push("/dashboard/income");
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
          Total Incomes for this month: {totalIncome} {userCurrency}
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
          gap: 4,
        }}
      >
        {income.map((item: IIncome) => (
          <ListItem key={item._id.toString()} sx={{ p: 0 }}>
            <Paper
              sx={{
                p: 9,
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
                      income,
                      setIncome,
                      reloadData
                    )
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

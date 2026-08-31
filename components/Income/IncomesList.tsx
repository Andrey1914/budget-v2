"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import { useTransactions, useDeleteTransaction } from "@/hooks/useTransactions";
import { Session, IIncome } from "@/interfaces";
import EditIncomeForm from "@/components/Income/EditIncomeForm";
import emptyList from "@/public/empty-list.webp";
import { Delete, Edit, Add } from "@mui/icons-material";
import ForeignCurrencySummary from "@/components/Income/ForeignCorrency";
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

const IncomesList: React.FC<{
  totalIncome: number;
  onUpdate: (updatedIncomes: number) => void;
}> = ({ totalIncome, onUpdate }) => {
  const { data: session } = useSession() as {
    data: Session | null;
    status: string;
  };
  const router = useRouter();
  const theme = useTheme();

  const { data: incomesData, error, refetch } = useTransactions("income");
  const deleteTransactionMutation = useDeleteTransaction();
  const [editingIncomeId, setEditingIncomeId] = useState<string | null>(null);

  const userCurrency = session?.user?.currency;

  useEffect(() => {
    if (incomesData && session?.user?.currency) {
      const total = (incomesData as IIncome[])
        .filter((item) => item.currency === session.user.currency)
        .reduce((acc: number, item: IIncome) => acc + item.amount, 0);

      onUpdate(total);
    }
  }, [incomesData, session, onUpdate]);

  const handleEdit = (id: string) => {
    setEditingIncomeId(id);
  };

  const handleDeleteIncome = (id: string) => {
    deleteTransactionMutation.mutate({ id, type: "income" });
  };

  const reloadData = () => {
    refetch();
  };

  const hendleAddClick = () => {
    router.push("/dashboard/income");
  };

  if (!session) {
    return null;
  }

  const income = (incomesData || []) as IIncome[];

  return (
    <>
      {error && <p style={{ color: "red" }}>{(error as Error).message}</p>}
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
        <Box>
          <Typography
            variant="h5"
            component="p"
            sx={{ color: theme.palette.text.primary }}
          >
            Total Incomes for this month: {totalIncome} {userCurrency}
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
        {income.length === 0 ? (
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
              No incomes yet
            </Typography>
          </Box>
        ) : (
          income.map((item: IIncome) => (
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
                    onClick={() => handleDeleteIncome(item._id.toString())}
                  />
                </Box>
              </Paper>
            </ListItem>
          ))
        )}
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

"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { handleDelete } from "@/app/dashboard/income/delete";
import { Income } from "@/types";
import EditIncomeForm from "@/components/Income/EditIncomeForm";

import { Delete, Edit } from "@mui/icons-material";
import { Fab, List, ListItem, Paper } from "@mui/material";

const IncomesList: React.FC = () => {
  const { data: session } = useSession();
  const [income, setIncome] = useState<any[]>([]);
  const [totalIncome, setTotalIncome] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [editingIncomeId, setEditingIncomeId] = useState<string | null>(null);

  useEffect(() => {
    if (session) {
      const fetchData = async () => {
        try {
          const incomeRes = await fetch("/api/income/get", {
            headers: {
              Authorization: `Bearer ${session?.token}`,
            },
          });

          if (!incomeRes.ok) {
            throw new Error("Failed to fetch data");
          }

          const incomeData: Income[] = await incomeRes.json();
          setIncome(incomeData);

          const total = incomeData.reduce(
            (acc: number, item: Income) => acc + item.amount,
            0
          );
          setTotalIncome(total);
        } catch (err) {
          setError((err as Error).message);
        }
      };

      fetchData();
    }
  }, [session]);

  const handleEdit = (id: string) => {
    setEditingIncomeId(id);
  };

  const refreshIncomes = async () => {
    if (session) {
      const incomeRes = await fetch("/api/income/get", {
        headers: {
          Authorization: `Bearer ${session?.token}`,
        },
      });

      const incomesData: Income[] = await incomeRes.json();
      setIncome(incomesData);
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
          <h2>Incomes</h2>
          <p>Total Incomes for this month: {totalIncome}</p>
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
          refreshIncomes={refreshIncomes}
          onClose={() => setEditingIncomeId(null)}
        />
      )}
    </div>
  );
};

export default IncomesList;

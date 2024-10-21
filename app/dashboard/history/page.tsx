"use client";

import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { IIncome, IExpense } from "@/interfaces";
import {
  Container,
  Box,
  List,
  ListItem,
  Paper,
  Typography,
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import Link from "next/link";

import FilterPanel from "@/components/FilterPanel/FilterPanel";

const HistoryPage = () => {
  const [selectedMonth, setSelectedMonth] = useState<number | "">(
    new Date().getMonth() + 1
  );
  const [selectedType, setSelectedType] = useState<string>("all");

  const [transactions, setTransactions] = useState<IIncome[] | IExpense[]>([]);
  const [totalSum, setTotalSum] = useState<number>(0);

  const isFirstRender = useRef(true);

  const fetchTransactions = async (filters: {
    month: number | "";
    type: string;
  }) => {
    try {
      const { month, type } = filters;

      const response = await axios.get("/api/transactions/filterTransactions", {
        params: {
          month: month !== "" ? month : undefined,
          type: type !== "all" ? type : undefined,
        },
      });

      console.log("Ответ от сервера:", response.data);

      setTransactions(response.data.transactions);
      setTotalSum(response.data.totalSum);
    } catch (error) {
      console.error("Ошибка при загрузке транзакций:", error);
    }
  };

  const handleFilterSubmit = () => {
    console.log(`Фильтрация по месяцу: ${selectedMonth}, тип: ${selectedType}`);

    fetchTransactions({ month: selectedMonth, type: selectedType });
  };

  useEffect(() => {
    if (isFirstRender.current) {
      fetchTransactions({ month: selectedMonth, type: selectedType });
      isFirstRender.current = false;
    }
  });

  return (
    <main>
      <Container maxWidth="sm">
        <div>
          <FilterPanel
            selectedMonth={selectedMonth}
            selectedType={selectedType}
            onMonthChange={setSelectedMonth}
            onTypeChange={setSelectedType}
            onApplyFilters={handleFilterSubmit}
          />
        </div>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h2" component="h1">
            History
          </Typography>
          <Typography
            variant="h4"
            component="p"
            style={{
              padding: "0.8rem",
              color: "white",
              backgroundColor: "orange",
              borderRadius: "0.5rem",
            }}
          >
            Total sum: {totalSum}
          </Typography>
        </Box>
        <List style={{ width: "100%" }}>
          {transactions.map((transaction) => (
            <ListItem key={transaction._id.toString()}>
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
                  {transaction.description} - {transaction.amount} (
                  {new Date(transaction.date).toLocaleDateString()})
                </p>
              </Paper>
            </ListItem>
          ))}
        </List>
        <Link href="/dashboard">
          <ArrowBack /> Back to Dashboard
        </Link>
      </Container>
    </main>
  );
};

export default HistoryPage;

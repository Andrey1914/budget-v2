"use client";

import { useState, useEffect, useRef } from "react";
import { IIncome, IExpense } from "@/interfaces";
import {
  Container,
  Box,
  List,
  ListItem,
  Paper,
  Typography,
  Button,
  Select,
  MenuItem,
} from "@mui/material";

import FilterPanel from "@/components/FilterPanel/FilterPanel";
import { fetchTransactions } from "@/app/dashboard/history/get";

const HistoryPage = () => {
  const [selectedMonth, setSelectedMonth] = useState<number | "">(
    new Date().getMonth() + 1
  );
  const [selectedType, setSelectedType] = useState<string>("all");

  const [transactions, setTransactions] = useState<IIncome[] | IExpense[]>([]);
  const [totalSum, setTotalSum] = useState<number>(0);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [totalTransactions, setTotalTransactions] = useState<number>(0);

  const isFirstRender = useRef(true);

  const handleFilterSubmit = async () => {
    try {
      const data = await fetchTransactions({
        month: selectedMonth,
        type: selectedType,
        page: currentPage,
        limit: limit,
      });

      setTransactions(data.transactions);
      setTotalSum(data.totalSum);
      setTotalTransactions(data.transactions.length);
    } catch (error) {
      console.error("Ошибка при загрузке транзакций:", error);
    }
  };

  useEffect(() => {
    if (isFirstRender.current) {
      handleFilterSubmit();

      isFirstRender.current = false;
    }
  }, [currentPage, limit, selectedMonth, selectedType]);

  const paginatedTransactions = transactions.slice(
    (currentPage - 1) * limit,
    currentPage * limit
  );

  const totalPages = Math.ceil(totalTransactions / limit);

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
              borderRadius: "0.3rem",
            }}
          >
            Total sum: {totalSum}
          </Typography>
        </Box>

        <List style={{ width: "100%" }}>
          {paginatedTransactions.map((transaction) => (
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

        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
          <Button
            variant="contained"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Назад
          </Button>
          <Typography>
            Страница {currentPage} из {totalPages}
          </Typography>
          <Button
            variant="contained"
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            Вперед
          </Button>
        </Box>

        <Box sx={{ mt: 2 }}>
          <label>Записей на страницу: </label>
          <Select
            value={limit}
            onChange={(e) => setLimit(Number(e.target.value))}
          >
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={20}>20</MenuItem>
          </Select>
        </Box>
      </Container>
    </main>
  );
};

export default HistoryPage;

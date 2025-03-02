"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { Session, IIncome, IExpense } from "@/interfaces";
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
  useTheme,
  useMediaQuery,
  Theme,
} from "@mui/material";

import FilterPanel from "@/components/FilterPanel/FilterPanel";
import { fetchTransactions } from "@/app/dashboard/history/get";
import emptyHistory from "@/public/empty-history.webp";

const HistoryPage = () => {
  const { data: session } = useSession() as {
    data: Session | null;
  };

  const theme = useTheme();
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm")
  );

  const userCurrency = session?.user?.currency;

  const [selectedYear, setSelectedYear] = useState<number | "">(
    new Date().getFullYear()
  );
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

  const handleFilterSubmit = useCallback(async () => {
    try {
      const data = await fetchTransactions({
        year: selectedYear,
        month: selectedMonth,
        type: selectedType,
        page: currentPage,
        // limit: limit,
      });
      // console.log("Transactions received:", data.transactions);

      setTransactions(data.transactions);
      setTotalSum(data.totalSum);
      setTotalTransactions(data.totalTransactions);
    } catch (error) {
      console.error("Ошибка при загрузке транзакций:", error);
    }
  }, [selectedYear, selectedMonth, selectedType, currentPage]);

  useEffect(() => {
    if (isFirstRender.current) {
      handleFilterSubmit();

      isFirstRender.current = false;
    }
  }, [handleFilterSubmit]);

  const paginatedTransactions = transactions.slice(
    (currentPage - 1) * limit,
    currentPage * limit
  );

  const totalPages = Math.ceil(totalTransactions / limit);

  return (
    <main>
      <Container maxWidth="sm">
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: isMobile ? "column" : "row",
            p: theme.spacing(2),
          }}
        >
          <Typography
            variant="h2"
            component="h1"
            sx={{
              fontSize: isMobile ? theme.spacing(5) : theme.spacing(6),
              textAlign: isMobile ? "center" : "left",
              paddingBottom: isMobile ? theme.spacing(3) : 0,
            }}
          >
            History
          </Typography>
          <Typography
            variant="h4"
            component="p"
            sx={{
              p: 3,
              color: theme.palette.text.primary,
              backgroundColor: theme.palette.background.totalSum,
              borderRadius: 1,
              border: "1px solid #FEA362",
            }}
          >
            Total sum: {totalSum} {userCurrency}
          </Typography>
        </Box>

        <FilterPanel
          selectedYear={selectedYear}
          selectedMonth={selectedMonth}
          selectedType={selectedType}
          onYearChange={setSelectedYear}
          onMonthChange={setSelectedMonth}
          onTypeChange={setSelectedType}
          onApplyFilters={handleFilterSubmit}
        />

        <Box sx={{ p: 2 }}>
          <List sx={{ width: "100%" }}>
            {paginatedTransactions.length === 0 ? (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                  p: 5,
                }}
              >
                <Typography variant="h6" color="textSecondary" mt={2}>
                  Your history is empty
                </Typography>

                <Image
                  src={emptyHistory}
                  alt="Нет данных"
                  style={{ width: "100%" }}
                />
              </Box>
            ) : (
              paginatedTransactions.map((transaction) => (
                <ListItem key={transaction._id.toString()}>
                  <Paper
                    sx={{
                      padding: "1rem",
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      width: "100%",
                    }}
                  >
                    <p>
                      {transaction.description} - {transaction.amount}{" "}
                      {userCurrency} (
                      {new Date(transaction.date).toLocaleDateString()})
                    </p>
                  </Paper>
                </ListItem>
              ))
            )}
          </List>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mt: 2,
              }}
            >
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
            <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
              <Typography>Записей на страницу:</Typography>

              <Select
                value={limit}
                onChange={(e) => setLimit(Number(e.target.value))}
              >
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={20}>20</MenuItem>
              </Select>
            </Box>
          </Box>
        </Box>
      </Container>
    </main>
  );
};

export default HistoryPage;

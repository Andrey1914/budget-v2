"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";

import { Session, AnalyticsTransaction } from "@/interfaces";

import { getAnalyticsData } from "@/app/[locale]/dashboard/analytics/get";

import BalanceComparison from "@/components/BalanceComparison/BalanceComparison";
import CategoryChart from "@/components/Analytics/Analytics";
import FilterPanel from "@/components/FilterPanel/FilterPanel";

import { Box, Container, Typography } from "@mui/material";

interface CurrencyTotal {
  currency: string;
  income: number;
  expense: number;
  balance: number;
}

const AnalyticsPage: React.FC = () => {
  const { data: session } = useSession();

  const userCurrency = session?.user?.currency;

  const [selectedYear, setSelectedYear] = useState<number | "">(
    new Date().getFullYear(),
  );

  const [selectedMonth, setSelectedMonth] = useState<number | "">(
    new Date().getMonth() + 1,
  );

  const [selectedType, setSelectedType] = useState<string>("all");

  const [currentPage, setCurrentPage] = useState<number>(1);

  const [transactions, setTransactions] = useState<AnalyticsTransaction[]>([]);

  const [totalSum, setTotalSum] = useState<number>(0);

  const [totalIncome, setTotalIncome] = useState<number>(0);

  const [totalExpense, setTotalExpense] = useState<number>(0);

  const [currencyTotals, setCurrencyTotals] = useState<CurrencyTotal[]>([]);

  const handleFilterSubmit = useCallback(async () => {
    try {
      const data = await getAnalyticsData({
        year: selectedYear,
        month: selectedMonth,
        type: selectedType,
        page: currentPage,
      });

      setTransactions(data.transactions);
      setTotalSum(data.totalSum);
      setTotalIncome(data.totalIncome);
      setTotalExpense(data.totalExpense);
      setCurrencyTotals(data.currencyTotals);
    } catch (error) {
      console.error("Ошибка при загрузке аналитических данных:", error);
    }
  }, [selectedYear, selectedMonth, selectedType, currentPage]);

  useEffect(() => {
    if (session) {
      handleFilterSubmit();
    }
  }, [session, handleFilterSubmit]);

  if (!session) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Box component="section">
        <Container maxWidth="lg">
          <h1>Аналитика расходов и доходов</h1>

          <BalanceComparison
            totalIncome={totalIncome}
            totalExpense={totalExpense}
            currency={userCurrency || ""}
            currencyTotals={currencyTotals}
          />

          <FilterPanel
            selectedYear={selectedYear}
            selectedMonth={selectedMonth}
            selectedType={selectedType}
            onYearChange={setSelectedYear}
            onMonthChange={setSelectedMonth}
            onTypeChange={setSelectedType}
            onApplyFilters={handleFilterSubmit}
          />

          <div style={{ marginTop: "20px" }}>
            <CategoryChart
              session={session as Session}
              selectedMonth={selectedMonth}
              selectedType={selectedType}
              transactions={transactions}
              currencyTotals={currencyTotals}
            />
          </div>

          <Box sx={{ marginTop: "2rem" }}>
            <Typography variant="h5">Итоговый баланс</Typography>

            <Typography variant="h6">
              {totalSum.toFixed(2)} {userCurrency}
            </Typography>

            {currencyTotals.length > 0 && (
              <Box sx={{ marginTop: "1rem" }}>
                <Typography variant="subtitle1">
                  Балансы в других валютах:
                </Typography>

                {currencyTotals.map((item) => (
                  <Typography key={item.currency} variant="body1">
                    {item.balance >= 0 ? "Баланс" : "Дефицит"}:{" "}
                    {item.balance.toFixed(2)} {item.currency}
                  </Typography>
                ))}
              </Box>
            )}
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default AnalyticsPage;

"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";

import { Session, IExpense, IIncome } from "@/interfaces";

import { fetchAnalyticsData } from "@/app/dashboard/analytics/get";

import BalanceComparison from "@/components/BalanceComparison/BalanceComparison";
import CategoryChart from "@/components/Analytics/Analytics";
import FilterPanel from "@/components/FilterPanel/FilterPanel";

import { Box, Container } from "@mui/material";

const AnalyticsPage: React.FC = () => {
  const { data: session } = useSession();

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

  const [totalIncome, setTotalIncome] = useState<number>(0);
  const [totalExpense, setTotalExpense] = useState<number>(0);

  const handleFilterSubmit = useCallback(async () => {
    try {
      const data = await fetchAnalyticsData({
        year: selectedYear,
        month: selectedMonth,
        type: selectedType,
      });
      console.log("Data in page analytics:", data);

      setTransactions(data.transactions);
      setTotalSum(data.totalSum);
      setTotalIncome(data.totalIncome);
      setTotalExpense(data.totalExpense);
    } catch (error) {
      console.error("Ошибка при загрузке аналитических данных:", error);
    }
  }, [selectedYear, selectedMonth, selectedType]);

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
            />
          </div>

          <div>
            <p>
              Total sum: {totalSum} {userCurrency}
            </p>
          </div>
        </Container>
      </Box>
    </>
  );
};

export default AnalyticsPage;

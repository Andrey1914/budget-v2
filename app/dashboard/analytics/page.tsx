"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";

import { Session, IExpense, IIncome } from "@/interfaces";

import { fetchAnalyticsData } from "@/app/dashboard/analytics/get";

import BalanceComparison from "@/components/BalanceComparison/BalanceComparison";
import CategoryChart from "@/components/Analytics/Analytics";
import FilterPanel from "@/components/FilterPanel/FilterPanel";

import { ArrowBack } from "@mui/icons-material";
import { Box, Container, Typography } from "@mui/material";

const AnalyticsPage: React.FC = () => {
  const { data: session } = useSession();

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
  }, [selectedMonth, selectedType]);

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
            selectedMonth={selectedMonth}
            selectedType={selectedType}
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
            <p>Total sum: {totalSum}</p>
          </div>
          <Link href="/dashboard">
            <ArrowBack /> Back to Dashboard
          </Link>
        </Container>
      </Box>
    </>
  );
};

export default AnalyticsPage;

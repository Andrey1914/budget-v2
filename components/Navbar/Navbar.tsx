"use client";

import { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Box, Select, MenuItem, Button } from "@mui/material";
import theme from "@/app/styles/theme";

const Navbar: React.FC = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [month, setMonth] = useState<number | "">(new Date().getMonth() + 1); // Текущий месяц по умолчанию
  const [type, setType] = useState<string>("all");

  console.log("Session:", session);
  console.log("Status:", status);

  const handleFilterSubmit = () => {
    console.log(`Фильтрация по месяцу: ${month}, тип: ${type}`);
    const query = new URLSearchParams();

    if (month !== "") query.append("month", month.toString());
    if (type !== "all") query.append("type", type);
    query.append("page", "1");

    router.push(`/dashboard/history?${query.toString()}`);
  };

  useEffect(() => {
    if (status === "loading") return;
  }, [session, status]);

  if (status === "loading") return <p>Loading...</p>;

  if (!session || !session.user.isVerified) {
    return (
      <Box
        component="nav"
        style={{ display: "flex", flexDirection: "row", gap: "1rem" }}
      >
        <Link href="/auth/login">Login</Link>
        <Link href="/auth/register">Register</Link>
      </Box>
    );
  }

  return (
    <Box
      component="nav"
      style={{ display: "flex", flexDirection: "row", gap: "1rem" }}
    >
      <Link href="/dashboard/income">Incomes</Link>
      <Link href="/dashboard/expense">Expenses</Link>
      <Link href="/dashboard/tasks">Tasks</Link>
      <Select
        value={month}
        onChange={(e) => setMonth(e.target.value as number)}
        displayEmpty
        sx={{ minWidth: 120 }}
      >
        <MenuItem value="">Все месяцы</MenuItem>
        <MenuItem value={1}>Январь</MenuItem>
        <MenuItem value={2}>Февраль</MenuItem>
        <MenuItem value={3}>Март</MenuItem>
        <MenuItem value={4}>Апрель</MenuItem>
        <MenuItem value={5}>Май</MenuItem>
        <MenuItem value={6}>Июнь</MenuItem>
        <MenuItem value={7}>Июль</MenuItem>
        <MenuItem value={8}>Август</MenuItem>
        <MenuItem value={9}>Сентябрь</MenuItem>
        <MenuItem value={10}>Октябрь</MenuItem>
        <MenuItem value={11}>Ноябрь</MenuItem>
        <MenuItem value={12}>Декабрь</MenuItem>
      </Select>

      <Select
        value={type}
        onChange={(e) => setType(e.target.value)}
        displayEmpty
        sx={{ minWidth: 120 }}
      >
        <MenuItem value="all">Все</MenuItem>
        <MenuItem value="income">Доходы</MenuItem>
        <MenuItem value="expense">Расходы</MenuItem>
      </Select>

      <Button variant="contained" onClick={handleFilterSubmit}>
        Применить фильтр
      </Button>
      <h3>{session.user.name}</h3>
      <button onClick={() => signOut()}>Sign Out</button>
    </Box>
  );
};

export default Navbar;

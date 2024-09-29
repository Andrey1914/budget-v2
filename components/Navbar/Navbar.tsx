"use client";

import { useEffect } from "react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { Box } from "@mui/material";
import theme from "@/app/styles/theme";

const Navbar: React.FC = () => {
  const { data: session, status } = useSession();

  console.log("Session:", session);
  console.log("Status:", status);

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
      <h3>{session.user.name}</h3>
      <button onClick={() => signOut()}>Sign Out</button>
    </Box>
  );
};

export default Navbar;

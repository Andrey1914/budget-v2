"use client";

import { useEffect } from "react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Oval } from "react-loader-spinner";

import { Box, Fab } from "@mui/material";
import { Logout, Login, AppRegistration } from "@mui/icons-material";
import theme from "@/app/styles/theme";

const Navbar: React.FC = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  console.log("Session:", session);
  console.log("Status:", status);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login");
    }
  }, [status, router]);

  useEffect(() => {
    if (status === "loading") return;
  }, [session, status]);

  if (status === "loading")
    return (
      <Oval
        visible={true}
        height="80"
        width="80"
        color="#1727b7"
        secondaryColor="#6fb5e7"
        ariaLabel="oval-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    );

  if (!session || !session.user.isVerified) {
    return (
      <Box
        component="nav"
        style={{ display: "flex", flexDirection: "row", gap: "2rem" }}
      >
        <Link href="/auth/login" style={{ display: "flex", gap: "0.5rem" }}>
          <Login />
          Login
        </Link>
        <Link href="/auth/register" style={{ display: "flex", gap: "0.5rem" }}>
          <AppRegistration />
          Registration
        </Link>
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
      <Link href="/dashboard/history">History</Link>

      <h3>{session.user.name}</h3>
      <Fab
        color="primary"
        onClick={() => signOut({ callbackUrl: "/auth/login" })}
      >
        <Logout />
      </Fab>
    </Box>
  );
};

export default Navbar;

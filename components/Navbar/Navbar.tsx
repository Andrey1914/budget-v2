"use client";

import { useEffect } from "react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Oval } from "react-loader-spinner";

import { Box, Container, Fab, Typography } from "@mui/material";
import { Logout, Login, AppRegistration } from "@mui/icons-material";
import theme from "@/app/styles/theme";

const Navbar: React.FC = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  console.log("Session:", session);
  console.log("Status:", status);

  useEffect(() => {
    if (status === "unauthenticated") {
      // router.push("/auth/login");
      router.push("/landing");
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
    <>
      <Container
        component="nav"
        maxWidth="md"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",

            gap: "1rem",
          }}
        >
          <Link href="/landing">Home</Link>
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/dashboard/income">Incomes</Link>
          <Link href="/dashboard/expense">Expenses</Link>
          <Link href="/dashboard/tasks">Tasks</Link>
          <Link href="/dashboard/history">History</Link>
          <Link href="/dashboard/analytics">Analytics</Link>
          <Link href="/dashboard/reviews">Reviews</Link>
        </Box>
        <Box
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",

            gap: "2rem",
          }}
        >
          <Typography variant="h6" component="p">
            {session.user.name}
          </Typography>
          <Fab
            color="primary"
            onClick={() => signOut({ callbackUrl: "/auth/login" })}
          >
            <Logout />
          </Fab>
        </Box>
      </Container>
    </>
  );
};

export default Navbar;

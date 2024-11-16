"use client";

import React from "react";
import { useSession } from "next-auth/react";
import Dashboard from "@/app/dashboard/page";
import Landing from "@/app/landing/page";
import { Container } from "@mui/material";

const Home: React.FC = () => {
  const { data: session } = useSession();

  return (
    <Container maxWidth="lg">{session ? <Dashboard /> : <Landing />}</Container>
  );
};

export default Home;

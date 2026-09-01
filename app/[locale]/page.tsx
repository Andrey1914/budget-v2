"use client";

import React from "react";
import { useSession } from "next-auth/react";
import Dashboard from "@/app/[locale]/dashboard/page";
import Landing from "@/app/[locale]/landing/page";
import { Container } from "@mui/material";

const Home: React.FC = () => {
  const { data: session } = useSession();

  return (
    <Container maxWidth="md">{session ? <Dashboard /> : <Landing />}</Container>
  );
};

export default Home;

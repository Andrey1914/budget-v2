"use client";

import React from "react";

import Dashboard from "@/app/dashboard/page";
import { Container } from "@mui/material";

const Home: React.FC = () => {
  return (
    <Container maxWidth="sm">
      <Dashboard />
    </Container>
  );
};

export default Home;

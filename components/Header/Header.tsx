"use client";

import React from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";

import Navbar from "@/components/Navbar/Navbar";
import { SavingsTwoTone } from "@mui/icons-material";

import { ContainerNavLinks } from "@/components/Header/Header.styled";

const Header: React.FC = () => {
  const { data: session } = useSession();

  return (
    <header style={{ padding: "1rem 0", borderBottom: "1px solid #000" }}>
      <ContainerNavLinks maxWidth="lg">
        <Link
          href={session ? "/dashboard" : "/landing"}
          style={{
            display: "inline-flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.1rem",
            padding: "0.5rem",
          }}
        >
          <SavingsTwoTone fontSize="large" />
          Finance App
        </Link>{" "}
        <Navbar />
      </ContainerNavLinks>
    </header>
  );
};

export default Header;

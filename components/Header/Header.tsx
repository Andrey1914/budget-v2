"use client";

import React from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";

import Navbar from "@/components/Navbar/Navbar";
import { useMediaQuery, useTheme } from "@mui/material";

import { ContainerNavLinks } from "@/components/Header/Header.styled";

const Header: React.FC = () => {
  const { data: session } = useSession();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <header style={{ padding: "1rem 0" }}>
      <ContainerNavLinks maxWidth="lg">
        {!isMobile && (
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
            Finance App
          </Link>
        )}

        <Navbar />
      </ContainerNavLinks>
    </header>
  );
};

export default Header;

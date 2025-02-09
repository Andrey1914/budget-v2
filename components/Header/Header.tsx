"use client";

import React from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { SwitcherProps } from "@/interfaces";
import Navbar from "@/components/Navbar/Navbar";
import { useMediaQuery, useTheme } from "@mui/material";

import { ContainerNavLinks } from "@/components/Header/Header.styled";

const Header: React.FC<SwitcherProps> = ({ toggleTheme, isDarkMode }) => {
  const { data: session } = useSession();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <header
      style={{
        padding: "1rem 0",
        minHeight: "90px",
      }}
    >
      <ContainerNavLinks maxWidth="lg">
        {!isMobile && (
          <Link
            href={session ? "/dashboard" : "/landing"}
            style={{
              // display: "inline-flex",
              // flexDirection: "column",
              // alignItems: "center",
              // gap: "0.1rem",
              padding: "0.5rem",
            }}
          >
            Finance App
          </Link>
        )}

        <Navbar toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
      </ContainerNavLinks>
    </header>
  );
};

export default Header;

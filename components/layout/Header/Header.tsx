"use client";

import React from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { SwitcherProps } from "@/interfaces";
import { Navbar, Logo } from "@/components/layout";
import { useMediaQuery, useTheme } from "@mui/material";

import { ContainerNavLinks } from "./styles";

export const Header: React.FC<SwitcherProps> = ({
  toggleTheme,
  isDarkMode,
}) => {
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
              padding: "0.5rem",
            }}
          >
            <Logo text="My-Finance-App-" />
          </Link>
        )}
        <Navbar toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
      </ContainerNavLinks>
    </header>
  );
};

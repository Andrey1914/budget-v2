"use client";

import React from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar/Navbar";
import { SessionProvider } from "next-auth/react";

import { ContainerNavLinks } from "@/components/Header/Header.styled";

const Header: React.FC = () => {
  return (
    <SessionProvider>
      <header style={{ padding: "2rem 0" }}>
        <ContainerNavLinks maxWidth="sm">
          <Link href="/">Finance App</Link>
          <Navbar />
        </ContainerNavLinks>
      </header>
    </SessionProvider>
  );
};

export default Header;

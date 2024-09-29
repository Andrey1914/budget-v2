"use client";

import React from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar/Navbar";

import { ContainerNavLinks } from "@/components/Header/Header.styled";

const Header: React.FC = () => {
  return (
    <header style={{ padding: "2rem 0", borderBottom: "1px solid #000" }}>
      <ContainerNavLinks maxWidth="sm">
        <Link href="/dashboard">Finance App</Link>
        <Navbar />
      </ContainerNavLinks>
    </header>
  );
};

export default Header;

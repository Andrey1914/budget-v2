"use client";

import React from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { SessionProvider } from "next-auth/react";

const Header: React.FC = () => {
  return (
    <SessionProvider>
      <header>
        <Link href="/">My Finance App</Link>
        <Navbar />
      </header>
    </SessionProvider>
  );
};

export default Header;

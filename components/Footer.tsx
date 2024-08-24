"use client";

import React from "react";
import Link from "next/link";

import { SessionProvider } from "next-auth/react";

const Footer: React.FC = () => {
  return (
    <SessionProvider>
      <footer>
        <h2>Footer</h2>
        <Link href="/">My Finance App</Link>
      </footer>
    </SessionProvider>
  );
};

export default Footer;

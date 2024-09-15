"use client";

import React from "react";
import Link from "next/link";
import { SessionProvider } from "next-auth/react";
import { Container } from "@mui/material";

const Footer: React.FC = () => {
  return (
    <SessionProvider>
      <footer style={{ padding: "2rem 0" }}>
        <Container maxWidth="sm">
          <h2>Footer</h2>
          <Link href="/">My Finance App</Link>
        </Container>
      </footer>
    </SessionProvider>
  );
};

export default Footer;

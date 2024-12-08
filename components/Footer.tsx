"use client";

import React from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";

import { Container } from "@mui/material";

const Footer: React.FC = () => {
  const { data: session } = useSession();

  return (
    <footer style={{ padding: "2rem 0", borderTop: "1px solid #000" }}>
      <Container maxWidth="lg">
        <h2>Footer</h2>
        <Link href={session ? "/dashboard" : "/landing"}>Finance App</Link>
      </Container>
    </footer>
  );
};

export default Footer;

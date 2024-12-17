"use client";

import React from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";

import { Container } from "@mui/material";
import LegalInformation from "@/components/LegalInformation/LegalInformation";

const Footer: React.FC = () => {
  const { data: session } = useSession();

  return (
    <footer style={{ padding: "2rem 0", backgroundColor: "#000" }}>
      <Container maxWidth="lg">
        <Link
          href={session ? "/dashboard" : "/landing"}
          style={{ color: "#fff" }}
        >
          Finance App
        </Link>
        <LegalInformation />
      </Container>
    </footer>
  );
};

export default Footer;

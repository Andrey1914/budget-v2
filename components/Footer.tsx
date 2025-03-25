"use client";

import React from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";

import { Box, Container } from "@mui/material";
import LegalInformation from "@/components/LegalInformation/LegalInformation";
import Logo from "@/components/Logo/Logo";

const Footer: React.FC = () => {
  const { data: session } = useSession();

  return (
    <footer style={{ padding: "2rem 0", minHeight: "310px" }}>
      <Container maxWidth="lg">
        <Box sx={{ p: 4 }}>
          <Link
            href={session ? "/dashboard" : "/landing"}
            style={{ color: "#fff" }}
          >
            <Logo text="My-Finance-App-" />
          </Link>
          <LegalInformation />
        </Box>
      </Container>
    </footer>
  );
};

export default Footer;

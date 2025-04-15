"use client";

import React from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";

import { Box, Container, useTheme } from "@mui/material";
import LegalInformation from "@/components/LegalInformation/LegalInformation";
import Logo from "@/components/Logo/Logo";

const Footer: React.FC = () => {
  const { data: session } = useSession();
  const theme = useTheme();

  return (
    <Box component="footer" sx={{ py: theme.spacing(4), px: theme.spacing(5) }}>
      <Container maxWidth="lg">
        <Box sx={{ p: 2, display: "flex", gap: theme.spacing(6) }}>
          <Link
            href={session ? "/dashboard" : "/landing"}
            style={{ color: "#fff" }}
          >
            <Logo text="My-Finance-App-" />
          </Link>
          <LegalInformation />
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;

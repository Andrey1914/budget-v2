"use client";

import React from "react";
import { Container, Typography, Button, Box } from "@mui/material";
import Link from "next/link";
import hero from "../../public/finance-background.png";

const Hero: React.FC = () => {
  return (
    <Box
      component="section"
      style={{
        backgroundImage: `url(${hero.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "75vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        textAlign: "center",
        padding: "2rem",
      }}
    >
      <Container style={{ position: "relative", top: "190px" }}>
        <Box
          sx={{
            padding: "2rem",
            backdropFilter: "blur(10px)",
            backgroundColor: "rgba(0, 0, 0, 0.3)",
            boxShadow: 3,
          }}
        >
          <Typography
            variant="h2"
            component="h1"
            style={{
              fontWeight: "bold",
              marginBottom: "1rem",
              color: "#eaeaea",
            }}
          >
            Manage your finances easily and simply!
          </Typography>
          <Typography
            variant="h4"
            component="h2"
            style={{ marginBottom: "2rem", color: "#e2e2e2" }}
          >
            Use our app to track your incomes and expenses. An easy way to
            control your budget.
          </Typography>
          <Link href="/auth/register" passHref>
            <Button variant="contained" size="large" color="primary">
              Get Started
            </Button>
          </Link>
        </Box>
      </Container>
    </Box>
  );
};

export default Hero;

"use client";

import React from "react";
import { useRouter } from "next/navigation";

import { Button } from "@mui/material";
import {
  HeroSection,
  HeroContainer,
  HeroTitle,
  HeroBackdrop,
  HeroSubTitle,
} from "@/components/Hero/Hero.styled";

const Hero: React.FC = () => {
  const router = useRouter();

  const handleNavigation = () => {
    router.push("/auth/register");
  };

  return (
    <HeroSection>
      <HeroContainer>
        <HeroBackdrop
          sx={{
            boxShadow: 3,
          }}
        >
          <HeroTitle variant="h1">
            Manage your finances easily and simply!
          </HeroTitle>
          <HeroSubTitle variant="h2">
            Use our app to track your incomes and expenses. An easy way to
            control your budget.
          </HeroSubTitle>
          <Button
            variant="contained"
            size="large"
            color="primary"
            onClick={handleNavigation}
          >
            Get Started
          </Button>
        </HeroBackdrop>
      </HeroContainer>
    </HeroSection>
  );
};

export default Hero;

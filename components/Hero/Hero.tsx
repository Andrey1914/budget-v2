"use client";

import React, { useState } from "react";

import { Button } from "@mui/material";
import {
  HeroSection,
  HeroContainer,
  HeroTitle,
  HeroBackdrop,
  HeroSubTitle,
} from "@/components/Hero/Hero.styled";

import AuthTabsModal from "@/components/Auth/AuthModal";

const Hero: React.FC = () => {
  const [authModalOpen, setAuthModalOpen] = useState(false);

  const handleOpenAuthModal = () => setAuthModalOpen(true);
  const handleCloseAuthModal = () => setAuthModalOpen(false);

  return (
    <>
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
              onClick={handleOpenAuthModal}
            >
              Get Started
            </Button>
          </HeroBackdrop>
        </HeroContainer>
      </HeroSection>
      <AuthTabsModal
        open={authModalOpen}
        onClose={handleCloseAuthModal}
        initialTab={0}
      />
    </>
  );
};

export default Hero;

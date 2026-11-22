"use client";

import React, { useState } from "react";

import { Button } from "@mui/material";
import {
  HeroSection,
  HeroContainer,
  HeroTitle,
  HeroBackdrop,
  HeroSubTitle,
} from "./styles";

import { AuthTabsModal } from "@/components/features/auth";
import { useTranslations } from "next-intl";

export const Hero: React.FC = () => {
  const t = useTranslations("landing.hero");
  const tCommon = useTranslations("common.buttons");
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
            <HeroTitle variant="h1">{t("title")}</HeroTitle>
            <HeroSubTitle variant="h2">{t("subtitle")}</HeroSubTitle>
            <Button
              variant="contained"
              size="large"
              color="primary"
              onClick={handleOpenAuthModal}
              suppressHydrationWarning
            >
              {tCommon("getStarted")}
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

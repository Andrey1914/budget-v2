"use client";

import React, { useState } from "react";
// import { useRouter } from "next/navigation";
import { useRouter } from "@/i18n/navigation";
import { useSession } from "next-auth/react";
import axios from "axios";
import { useTranslations } from "next-intl";

import Link from "next/link";
import { Box, Typography, Button, useTheme, Container } from "@mui/material";
import { Send } from "@mui/icons-material";
import { MainContainer } from "@/app/[locale]/styles/Container";
import Hero from "@/components/Hero/Hero";
import AdvantagesCarousel from "@/components/Advantages/AdvantagesCarousel";
import Advantages from "@/components/Advantages/Advantages";
import ReviewsCarousel from "@/components/ReviewsCarousel/ReviewsCarousel";
import FAQ from "@/components/faq/FAQ";
// import AverageRating from "@/components/Review/AverageRating";
import Feature from "@/components/Features/Features";
import { GetStartedButton } from "@/app/[locale]/styles/Buttons";
import FeedbackSection from "@/components/ReviewsCarousel/FeedbackSection";
import AuthTabsModal from "@/components/Auth/AuthModal";
import { IReview } from "@/interfaces";

const Landing: React.FC = () => {
  const t = useTranslations("common.buttons");

  const { data: session, status } = useSession();
  const router = useRouter();

  const [authModalOpen, setAuthModalOpen] = useState(false);
  const handleOpenAuthModal = () => setAuthModalOpen(true);
  const handleCloseAuthModal = () => setAuthModalOpen(false);

  const [reviews, setReviews] = useState<IReview[]>([]);

  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success",
  );

  const theme = useTheme();

  const handleAddReview = async (newReview: {
    rating: number | null;
    text: string;
  }) => {
    try {
      const response = await axios.post("/api/review", newReview);

      if (response.data) {
        setReviews((prevReviews) => [...prevReviews, response.data]);

        setSnackbarMessage("Отзыв успешно добавлен");
        setSnackbarSeverity("success");
        setShowSnackbar(true);
      } else {
        throw new Error("Отзыв не был добавлен");
      }
    } catch (error) {
      console.error("Ошибка при добавлении отзыва:", error);
      setSnackbarMessage("Не удалось добавить отзыв");
      setSnackbarSeverity("error");
      setShowSnackbar(true);
    }
  };

  // const handleReviewClick = () => {
  //   if (status === "authenticated") {
  //     router.push("/dashboard/reviews");
  //   } else {
  //     setAuthModalOpen(true);
  //   }
  // };

  const handleReviewClick = () => {
    setAuthModalOpen(true);
  };

  return (
    <>
      <MainContainer>
        <Box component="section" title="hero">
          <Hero />
        </Box>

        <Box component="section" title="advantages">
          <Advantages />
          <AdvantagesCarousel />
        </Box>

        {/* Основные функции */}
        <Box component="section" title="main-features">
          <Feature />
        </Box>

        {/* Отзывы и кейсы успеха */}
        <Box
          component="section"
          title="reviews"
          sx={{
            py: 6,
            px: 2,
          }}
        >
          <Container maxWidth="lg">
            <Box sx={{ display: "flex", gap: "52px" }}>
              <Box>
                <ReviewsCarousel />
              </Box>

              <FeedbackSection
                session={session}
                handleAddReview={handleAddReview}
                handleReviewClick={handleReviewClick}
              />
            </Box>
          </Container>
        </Box>

        {/* FAQ */}
        <Container maxWidth="md">
          <Box component="section" title="FAQ" sx={{ p: 4 }}>
            <Typography variant="h4">FAQs</Typography>
            <Box sx={{ pt: 4 }}>
              <FAQ />
            </Box>
          </Box>

          {/* Призыв к действию */}
          <Box component="section" sx={{ p: 4 }}>
            <GetStartedButton
              colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
              onClick={handleOpenAuthModal}
              suppressHydrationWarning
            >
              <span className="text-content">{t("getStarted")}</span>
              <span className="gradient-overlay"></span>
            </GetStartedButton>
          </Box>
        </Container>
      </MainContainer>

      <AuthTabsModal
        open={authModalOpen}
        onClose={handleCloseAuthModal}
        initialTab={0}
      />
    </>
  );
};

export default Landing;

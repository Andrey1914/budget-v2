"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import axios from "axios";

import Link from "next/link";
import { Box, Typography, Button, useTheme, Container } from "@mui/material";
import { Send } from "@mui/icons-material";
import { MainContainer } from "@/app/styles/Container";
import Hero from "@/components/Hero/Hero";
import AdvantagesCarousel from "@/components/Advantages/AdvantagesCarousel";
import Advantages from "@/components/Advantages/Advantages";
import ReviewsCarousel from "@/components/ReviewsCarousel/ReviewsCarousel";
import FAQ from "@/components/faq/FAQ";
// import AverageRating from "@/components/Review/AverageRating";
import Feature from "@/components/Features/Features";
import { GetStartedButton, MainButton } from "@/app/styles/Buttons";

import AuthTabsModal from "@/components/Auth/AuthModal";
import ReviewForm from "@/components/Review/ReviewForm";
import { IReview } from "@/interfaces";

const Landing: React.FC = () => {
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
      const response = await axios.post("/api/review/add", newReview);

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
            // background: theme.palette.gradients.reviews,
          }}
        >
          <Container maxWidth="lg">
            <Box sx={{ display: "flex", gap: "52px" }}>
              <Box>
                <ReviewsCarousel />
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <Typography
                  variant="h2"
                  component="h2"
                  gutterBottom
                  sx={{
                    fontSize: theme.typography.fontSizes[5],
                    fontWeight: theme.typography.fontWeightRegular,
                    lineHeight: "40px",
                  }}
                >
                  We hope you enjoy our app!
                </Typography>

                {session && session.user.isVerified ? (
                  <Box>
                    <Typography
                      variant="h4"
                      component="p"
                      gutterBottom
                      sx={{
                        fontSize: theme.typography.fontSizes[4],
                        fontWeight: theme.typography.fontWeightRegular,
                        lineHeight: "32px",
                        mb: theme.spacing(5),
                      }}
                    >
                      Leave your feedback. It helps us to became better!{" "}
                    </Typography>
                    <ReviewForm onAddReview={handleAddReview} />
                    <Link
                      href="reviews"
                      style={{ display: "flex", textDecoration: "none" }}
                    >
                      <Typography
                        variant="body2"
                        sx={{
                          fontSize: "14px",
                          p: 1,
                          color: theme.palette.text.secondary,
                          border: `2px solid ${theme.palette.text.secondary}`,
                          borderRadius: theme.spacing(1),
                        }}
                      >
                        All reviews
                      </Typography>
                    </Link>
                  </Box>
                ) : (
                  <>
                    <Typography
                      variant="h4"
                      component="p"
                      gutterBottom
                      sx={{
                        fontSize: theme.typography.fontSizes[4],
                        fontWeight: theme.typography.fontWeightRegular,
                        lineHeight: "32px",
                        mb: theme.spacing(5),
                      }}
                    >
                      Sign in and leave your feedback. It helps us to became
                      better!
                    </Typography>
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                      <MainButton
                        variant="contained"
                        color="primary"
                        onClick={handleReviewClick}
                      >
                        {/* <Send sx={{ mr: 2 }} /> */}
                        Get started
                      </MainButton>
                    </Box>
                  </>
                )}

                {/* <AverageRating /> */}
              </Box>
            </Box>

            {/* <Box sx={{ py: 4 }}>
              <Box
                component="div"
                sx={{
                  display: "flex",
                  ml: "auto",
                  alignItems: "end",
                  flexDirection: "column",
                  gap: "1rem",
                  maxWidth: "200px",
                }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleReviewClick}
                >
                  <Send sx={{ mr: 2 }} />
                  Send feedback
                </Button>

                <Link
                  href="reviews"
                  style={{ display: "flex", textDecoration: "none" }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: "14px",
                      p: 1,
                      color: theme.palette.text.secondary,
                      border: `2px solid ${theme.palette.text.secondary}`,
                      borderRadius: theme.spacing(1),
                    }}
                  >
                    All reviews
                  </Typography>
                </Link>
              </Box>
            </Box> */}
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
            >
              <span className="text-content">Get Started</span>
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

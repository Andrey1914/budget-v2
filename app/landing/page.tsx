"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Box, Typography, Button, useTheme, Container } from "@mui/material";
import { Send } from "@mui/icons-material";
import { MainContainer } from "@/app/styles/Container";
import Hero from "@/components/Hero/Hero";
import AdvantagesCarousel from "@/components/Advantages/AdvantagesCarousel";
// import Advantages from "@/components/Advantages/Advantages";
import ReviewsCarousel from "@/components/ReviewsCarousel/ReviewsCarousel";
import FAQ from "@/components/faq/FAQ";
// import AverageRating from "@/components/Review/AverageRating";
import Feature from "@/components/Features/Features";
import { GetStartedButton } from "@/app/styles/Buttons";

const Landing: React.FC = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const theme = useTheme();

  const handleReviewClick = () => {
    if (status === "authenticated") {
      router.push("/dashboard/reviews");
    } else {
      router.push("/auth/register");
    }
  };

  const handleNavigation = () => {
    router.push("/auth/register");
  };

  return (
    <MainContainer>
      <Box component="section" title="hero">
        <Hero />
      </Box>

      <Box component="section" title="advantages" sx={{ py: "72px" }}>
        {/* <Advantages /> */}
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
          background: theme.palette.gradients.reviews,
        }}
      >
        <Container maxWidth="md">
          <Box sx={{ py: 4 }}>
            <Typography
              variant="h2"
              component="h2"
              gutterBottom
              sx={{
                fontSize: theme.typography.fontSizes[6],
                fontWeight: theme.typography.fontWeightLight,
              }}
            >
              We hope you enjoy our app!
            </Typography>
            <Typography
              variant="h4"
              component="p"
              gutterBottom
              sx={{ fontSize: theme.typography.fontSizes[4] }}
            >
              Sign in and leave your feedback. It helps us to became better!
            </Typography>
            {/* <AverageRating /> */}
          </Box>

          <Box sx={{ py: 4, width: "750px" }}>
            <ReviewsCarousel />
          </Box>

          <Box sx={{ py: 4 }}>
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
            onClick={handleNavigation}
          >
            <span className="text-content">Get Started</span>
            <span className="gradient-overlay"></span>
          </GetStartedButton>
        </Box>
      </Container>
    </MainContainer>
  );
};

export default Landing;

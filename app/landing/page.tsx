"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Box, Typography, Button } from "@mui/material";
import { Send } from "@mui/icons-material";
import { MainContainer } from "@/app/styles/Container";
import Hero from "@/components/Hero/Hero";
import Advantages from "@/components/Advantages/Advantages";
import ReviewsCarousel from "@/components/ReviewsCarousel/ReviewsCarousel";
import FAQ from "@/components/faq/FAQ";
import AverageRating from "@/components/Review/AverageRating";
import Feature from "@/components/Features/Features";

const Landing: React.FC = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const handleReviewClick = () => {
    if (status === "authenticated") {
      router.push("/dashboard/reviews");
    } else {
      router.push("/auth/register");
    }
  };

  return (
    <MainContainer>
      <Box component="section" title="hero">
        <Hero />
      </Box>

      <Box component="section" title="advantages">
        <Advantages />
      </Box>

      {/* Основные функции */}
      <Box component="section" title="main-features">
        <Feature />
      </Box>

      {/* Отзывы и кейсы успеха */}
      <Box
        component="section"
        title="reviews"
        sx={{ py: 6, backgroundColor: "#f7f7f7" }}
      >
        <Box sx={{ p: 4 }}>
          <Typography variant="h2" gutterBottom>
            We hope you enjoy our app!
          </Typography>
          <Typography variant="h4" gutterBottom>
            Leave your feedback and help us become better!{" "}
          </Typography>
          <AverageRating />
        </Box>

        <Box>
          <ReviewsCarousel />
        </Box>

        <Box sx={{ p: 4 }}>
          <Box
            component="div"
            sx={{
              pt: 3,
              display: "flex",

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

            <Link href="reviews">All reviews.</Link>
          </Box>
        </Box>
      </Box>

      {/* FAQ */}
      <Box component="section" title="FAQ" sx={{ p: 4 }}>
        <Typography variant="h4">FAQs</Typography>
        <Box sx={{ pt: 4 }}>
          <FAQ />
        </Box>
      </Box>

      {/* Призыв к действию */}
      <Box component="section" sx={{ p: 4 }}>
        <Link href="/auth/register" passHref>
          <Button variant="contained" size="large" color="primary">
            Ready to start?
          </Button>
        </Link>
      </Box>
    </MainContainer>
  );
};

export default Landing;

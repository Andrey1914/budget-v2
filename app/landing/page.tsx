"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";
import {
  Container,
  Box,
  Typography,
  Button,
  Paper,
  Grid2,
} from "@mui/material";
import { MainContainer } from "@/app/styles/Container";
import Hero from "@/components/Hero/Hero";
import Advantages from "@/components/Advantages/Advantages";
import ReviewsCarousel from "@/components/ReviewsCarousel/ReviewsCarousel";
import FAQ from "@/components/faq/FAQ";

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
      <Hero />

      <Box>
        <Advantages />
      </Box>

      {/* Основные функции */}
      <Box sx={{ p: 4 }}>
        <Grid2 container spacing={3}>
          <Grid2 sx={{ width: { xs: "100%", sm: "33%" } }} component="div">
            <Paper elevation={3} sx={{ padding: 3 }}>
              <Typography variant="h6">Функция 1</Typography>
              <Typography>Описание функции 1</Typography>
            </Paper>
          </Grid2>
          <Grid2 sx={{ width: { xs: "100%", sm: "33%" } }} component="div">
            <Paper elevation={3} sx={{ padding: 3 }}>
              <Typography variant="h6">Функция 2</Typography>
              <Typography>Описание функции 2</Typography>
            </Paper>
          </Grid2>
          <Grid2 sx={{ width: { xs: "100%", sm: "33%" } }} component="div">
            <Paper elevation={3} sx={{ padding: 3 }}>
              <Typography variant="h6">Функция 3</Typography>
              <Typography>Описание функции 3</Typography>
            </Paper>
          </Grid2>
        </Grid2>
      </Box>

      {/* Отзывы и кейсы успеха */}
      <Box>
        <Box sx={{ p: 4 }}>
          <Typography variant="h4" gutterBottom>
            We hope you enjoy our app!
          </Typography>
          <Typography variant="body1" gutterBottom>
            Leave your feedback and help us become better!{" "}
          </Typography>
        </Box>

        <Container maxWidth="md" style={{ backgroundColor: "#dcdbdb" }}>
          <ReviewsCarousel />
        </Container>

        <Box sx={{ p: 4 }}>
          <Box
            component="div"
            sx={{
              pt: 3,
              display: "flex",

              flexDirection: "column",
              gap: "0.7rem",
              maxWidth: "150px",
            }}
          >
            <Button
              variant="outlined"
              color="primary"
              onClick={handleReviewClick}
            >
              send feedback
            </Button>

            <Link href="reviews">all reviews</Link>
          </Box>
        </Box>
      </Box>

      {/* FAQ */}
      <Box sx={{ p: 4 }}>
        <Typography variant="h5">FAQ</Typography>
        {/* <Typography variant="body1">Часто задаваемые вопросы</Typography> */}
        <Box sx={{ pt: 4 }}>
          <FAQ />
        </Box>
      </Box>

      {/* Призыв к действию */}
      <Box sx={{ p: 4 }}>
        <Link href="/auth/register" passHref>
          <Button variant="contained" size="large" color="primary">
            Ready to start?
          </Button>
        </Link>
      </Box>

      {/* Футер */}
      <Box sx={{ p: 4 }}>
        <Typography>Юридическая информация</Typography>
        <Typography>
          Ссылки на условия использования, политику конфиденциальности и т.д.
        </Typography>
      </Box>
    </MainContainer>
  );
};

export default Landing;

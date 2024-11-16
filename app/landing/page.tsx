"use client";

import React, { useEffect, useState } from "react";
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
import Hero from "@/components/Hero/Hero";
import Advantages from "@/components/Advantages/Advantages";
// import ReviewsList from "@/components/Review/ReviewsList";
import ReviewsCarousel from "@/components/ReviewsCarousel/ReviewsCarousel";
// import axios from "axios";
// import { IReview } from "@/interfaces";

const Landing: React.FC = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  // const [reviews, setReviews] = useState<IReview[]>([]);

  const handleReviewClick = () => {
    if (status === "authenticated") {
      router.push("/dashboard/reviews");
    } else {
      router.push("/auth/register");
    }
  };

  // useEffect(() => {
  //   const fetchReviews = async () => {
  //     try {
  //       const response = await axios.get<IReview[]>("/api/review/getAll");
  //       setReviews(response.data);
  //     } catch (error) {
  //       console.error("Ошибка при получении отзывов:", error);
  //     }
  //   };
  //   fetchReviews();
  // }, []);

  return (
    <Container maxWidth="lg">
      <Box>
        <Hero />

        <Box sx={{ mt: 5 }}>
          <Advantages />
        </Box>

        {/* Основные функции */}
        <Grid2 container spacing={3} sx={{ mt: 5 }}>
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

        {/* Отзывы и кейсы успеха */}
        <Box sx={{ mt: 5 }}>
          <Box sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom>
              Добро пожаловать в наше приложение!
            </Typography>
            <Typography variant="body1" gutterBottom>
              Оставьте свой отзыв и помогите нам стать лучше!
            </Typography>

            <Container maxWidth="md" style={{ backgroundColor: "#dcdbdb" }}>
              <ReviewsCarousel />
            </Container>

            {/* <ReviewsList reviews={reviews} /> */}
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
                Оставить отзыв
              </Button>

              <Link href="reviews">all reviews</Link>
            </Box>
          </Box>
        </Box>

        {/* FAQ */}
        <Box sx={{ mt: 5 }}>
          <Typography variant="h5">FAQ</Typography>
          <Typography>Часто задаваемые вопросы</Typography>
        </Box>

        {/* Призыв к действию */}
        <Box sx={{ mt: 5 }}>
          <Link href="/auth/register" passHref>
            <Button variant="contained" size="large" color="primary">
              Ready to start?
            </Button>
          </Link>
        </Box>

        {/* Футер */}
        <Box sx={{ mt: 5, pb: 5 }}>
          <Typography>Юридическая информация</Typography>
          <Typography>
            Ссылки на условия использования, политику конфиденциальности и т.д.
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default Landing;

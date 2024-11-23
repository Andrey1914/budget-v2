"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

import { Box, Container } from "@mui/material";
import ReviewForm from "@/components/Review/ReviewForm";
import ReviewsList from "@/components/Review/ReviewsList";
import { IReview } from "@/interfaces";

const Review: React.FC = () => {
  const [reviews, setReviews] = useState<IReview[]>([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get<IReview[]>("/api/review/getAll");
        setReviews(response.data);
      } catch (error) {
        console.error("Ошибка при получении отзывов:", error);
      }
    };
    fetchReviews();
  }, []);

  return (
    <Container maxWidth="md">
      <Box>
        <ReviewForm />
      </Box>
      <Box>
        <ReviewsList reviews={reviews} />
      </Box>
    </Container>
  );
};

export default Review;

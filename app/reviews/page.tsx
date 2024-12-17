"use client";

import React, { useEffect, useState } from "react";

import ReviewsList from "@/components/Review/ReviewsList";
import axios from "axios";
import { IReview } from "@/interfaces";
import { Typography, Box, Container } from "@mui/material";
import AverageRating from "@/components/Review/AverageRating";

const AllReviewsPage: React.FC = () => {
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
      <Box sx={{ py: 4 }}>
        <Box sx={{ p: 2, backgroundColor: "#dcdbdb" }}>
          <Typography variant="h5" gutterBottom>
            All reviews.
          </Typography>
          <AverageRating />
          <ReviewsList reviews={reviews} />
        </Box>
      </Box>
    </Container>
  );
};
export default AllReviewsPage;

"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";

import { Box, Container, Typography } from "@mui/material";
import ReviewForm from "@/components/Review/ReviewForm";
import ReviewsList from "@/components/Review/ReviewsList";
import { IReview } from "@/interfaces";
import SnackbarNotification from "@/components/Notification/Snackbar";

const Review: React.FC = () => {
  const [reviews, setReviews] = useState<IReview[]>([]);

  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );

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

  const handleEditReview = async (
    id: string,
    updatedData: { rating: number; text: string }
  ) => {
    try {
      const response = await axios.put(`/api/review/edit`, {
        id,
        ...updatedData,
      });

      if (response.status === 200) {
        setReviews((prevReviews) =>
          prevReviews.map((review) =>
            review._id.toString() === id
              ? ({ ...review, ...updatedData } as IReview)
              : review
          )
        );
        console.log("Отзыв успешно обновлен");
      }
    } catch (error) {
      console.error("Ошибка при редактировании отзыва:", error);
    }
  };

  const handleDeleteReview = async (id: string) => {
    try {
      const response = await axios.delete("/api/review/delete", {
        data: { id },
      });

      if (response.status === 200) {
        setReviews((prevReviews) =>
          prevReviews.filter((review) => review._id.toString() !== id)
        );
        console.log("Отзыв успешно удален");
      }
    } catch (error) {
      console.error("Ошибка при удалении отзыва:", error);
    }
  };

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get<IReview[]>("/api/review/get");
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
        <ReviewForm onAddReview={handleAddReview} />
      </Box>
      <Box sx={{ py: 4 }}>
        <Box sx={{ p: 2, mb: 2, backgroundColor: "#dcdbdb" }}>
          <Typography variant="h5" gutterBottom>
            Мои отзывы.
          </Typography>
          <ReviewsList
            reviews={reviews}
            onEditReview={handleEditReview}
            onDeleteReview={handleDeleteReview}
          />
        </Box>
        <Link href="/reviews">all reviews</Link>
      </Box>

      {showSnackbar && (
        <SnackbarNotification
          message={snackbarMessage}
          severity={snackbarSeverity}
        />
      )}
    </Container>
  );
};

export default Review;

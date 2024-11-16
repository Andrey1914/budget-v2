import React from "react";
import { Box, Typography, Rating } from "@mui/material";
import { IReview } from "@/interfaces";

interface ReviewListProps {
  reviews: IReview[];
}

const ReviewsList: React.FC<ReviewListProps> = ({ reviews }) => {
  return (
    <Box sx={{ mt: 4, p: 2, backgroundColor: "#dcdbdb" }}>
      <Typography variant="h5" gutterBottom>
        Отзывы пользователей
      </Typography>
      {reviews.map((review) => (
        <Box key={review._id.toString()} sx={{ mb: 2 }}>
          <Typography variant="subtitle1">{review.username}</Typography>
          <Rating value={review.rating} readOnly />
          <Typography variant="body1">{review.text}</Typography>
        </Box>
      ))}
    </Box>
  );
};

export default ReviewsList;

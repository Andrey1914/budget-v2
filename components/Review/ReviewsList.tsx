import React, { useState } from "react";
import {
  Box,
  Typography,
  Rating,
  Avatar,
  Button,
  TextField,
} from "@mui/material";
import { IReview } from "@/interfaces";

interface ReviewListProps {
  reviews: IReview[];
  onEditReview?: (
    id: string,
    updatedData: { rating: number; text: string }
  ) => void;
  onDeleteReview?: (id: string) => void;
}

const ReviewsList: React.FC<ReviewListProps> = ({
  reviews,
  onEditReview,
  onDeleteReview,
}) => {
  const [editingReviewId, setEditingReviewId] = useState<string | null>(null);
  const [editedText, setEditedText] = useState<string>("");
  const [editedRating, setEditedRating] = useState<number | null>(null);

  const handleEditClick = (review: IReview) => {
    setEditingReviewId(review._id.toString());
    setEditedText(review.text);
    setEditedRating(review.rating);
  };

  const handleDeleteClick = (id: string) => {
    if (onDeleteReview) {
      onDeleteReview(id);
    }
  };

  const handleSaveClick = (id: string) => {
    if (onEditReview && editedRating !== null && editedText.trim() !== "") {
      onEditReview(id, { rating: editedRating, text: editedText });
      setEditingReviewId(null);
    }
  };

  const handleCancelClick = () => {
    setEditingReviewId(null);
  };

  return (
    <>
      {reviews.map((review, index) => (
        <Box
          key={review._id.toString()}
          sx={{
            py: 1,
            p: 2,
            backgroundColor: index % 2 === 0 ? "grey.100" : "#dcdbdb",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Avatar
              src={review.avatar}
              alt={review.username}
              sx={{ width: 30, height: 30, marginRight: 2 }}
            />
            <Typography variant="subtitle1">{review.username}</Typography>
          </Box>
          <Rating value={review.rating} readOnly />
          <Typography variant="body1">{review.text}</Typography>

          {onEditReview && editingReviewId === review._id.toString() ? (
            <>
              <Rating
                name={`edit-rating-${review._id}`}
                value={editedRating}
                onChange={(event, newValue) => setEditedRating(newValue)}
              />
              <TextField
                value={editedText}
                onChange={(e) => setEditedText(e.target.value)}
                fullWidth
                multiline
                rows={3}
                sx={{ mt: 1 }}
              />
              <Box sx={{ mt: 2, display: "flex", gap: 1 }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleSaveClick(review._id.toString())}
                >
                  Сохранить
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={handleCancelClick}
                >
                  Отменить
                </Button>
              </Box>
            </>
          ) : (
            <>
              {onEditReview && (
                <Button
                  variant="text"
                  color="primary"
                  onClick={() => handleEditClick(review)}
                >
                  Редактировать
                </Button>
              )}
              {onDeleteReview && (
                <Button
                  variant="text"
                  color="error"
                  onClick={() => handleDeleteClick(review._id.toString())}
                >
                  Удалить
                </Button>
              )}
            </>
          )}
        </Box>
      ))}
    </>
  );
};

export default ReviewsList;

import React, { useState } from "react";
import { Box, TextField, Button, Rating, Typography } from "@mui/material";
import { Send } from "@mui/icons-material";
import SnackbarNotification from "@/components/Notification/Snackbar";
import { ReviewFormProps } from "@/interfaces";

const ReviewForm: React.FC<ReviewFormProps> = ({ onAddReview }) => {
  const [rating, setRating] = useState<number | null>(3);
  const [text, setText] = useState<string>("");
  const [error, setError] = useState<string>("");

  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newReview = { rating, text };

    try {
      onAddReview(newReview);

      setRating(3);
      setText("");
      setError("");

      setSnackbarMessage("Отзыв успешно добавлен");
      setSnackbarSeverity("success");
      setShowSnackbar(true);
    } catch (error) {
      const errorMessage =
        (error as Error).message || "Не удалось добавить отзыв";
      setSnackbarMessage(errorMessage);
      setSnackbarSeverity("error");
      setShowSnackbar(true);
    }
  };

  return (
    <>
      <Box component="form">
        <Typography variant="h6">Please, rate our app.</Typography>
        <Rating
          name="rating"
          value={rating}
          onChange={(event, newValue) => setRating(newValue)}
        />
        <TextField
          label="Type your feedback here..."
          multiline
          rows={4}
          value={text}
          onChange={(e) => setText(e.target.value)}
          fullWidth
          sx={{ mt: 2 }}
        />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          sx={{ mt: 2 }}
        >
          <Send sx={{ mr: 2 }} />
          Send feedback
        </Button>
      </Box>

      {showSnackbar && (
        <SnackbarNotification
          message={snackbarMessage}
          severity={snackbarSeverity}
        />
      )}
    </>
  );
};

export default ReviewForm;

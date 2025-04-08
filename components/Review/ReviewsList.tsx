import React, { useState } from "react";
import {
  Box,
  Typography,
  Rating,
  Avatar,
  Button,
  TextField,
  useTheme,
} from "@mui/material";

import { IReview, ReviewListProps } from "@/interfaces";

const ReviewsList: React.FC<ReviewListProps> = ({
  reviews,
  onEditReview,
  onDeleteReview,
}) => {
  const [editingReviewId, setEditingReviewId] = useState<string | null>(null);
  const [editedText, setEditedText] = useState<string>("");
  const [editedRating, setEditedRating] = useState<number | null>(null);

  const theme = useTheme();

  const handleEditClick = (review: IReview, reviewId: string) => {
    setEditingReviewId(reviewId);
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

  const getReviewId = (review: IReview | any, index: number) => {
    if (review._id && typeof review._id.toString === "function") {
      return review._id.toString();
    } else if (typeof review._id === "string") {
      return review._id;
    } else {
      return `fallback-id-${index}`;
    }
  };

  return (
    <>
      {reviews.map((review, index) => {
        const reviewId = getReviewId(review, index);

        return (
          <Box
            key={reviewId}
            sx={{
              py: 1,
              p: 2,
              backgroundColor:
                index % 2 === 0
                  ? theme.palette.background.reviewsListItems
                  : theme.palette.background.reviewsList,
              borderRadius: 1,
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
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Rating value={review.rating} readOnly />
              <Typography variant="body2" sx={{ fontSize: "14px" }}>
                {review.rating.toFixed(1)}
              </Typography>
            </Box>
            <Typography variant="body1">{review.text}</Typography>

            {onEditReview && editingReviewId === reviewId ? (
              <Box
                sx={{
                  p: 2,
                  backgroundColor:
                    index % 2 === 0
                      ? theme.palette.background.reviewsList
                      : theme.palette.background.reviewsListItems,
                  borderRadius: 1,
                }}
              >
                <Rating
                  name={`edit-rating-${reviewId}`}
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
                    onClick={() => handleSaveClick(reviewId)}
                  >
                    Save
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={handleCancelClick}
                  >
                    Cancel
                  </Button>
                </Box>
              </Box>
            ) : (
              <Box sx={{ mt: 2, display: "flex", gap: 1 }}>
                {onEditReview && (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleEditClick(review, reviewId)}
                  >
                    Edit
                  </Button>
                )}
                {onDeleteReview && (
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleDeleteClick(reviewId)}
                  >
                    Delete
                  </Button>
                )}
              </Box>
            )}
          </Box>
        );
      })}
    </>
    // <>
    //   {reviews.map((review, index) => (
    //     <Box
    //       // key={review._id.toString()}
    //       key={getReviewId(review, index)}
    //       sx={{
    //         py: 1,
    //         p: 2,
    //         backgroundColor:
    //           index % 2 === 0
    //             ? theme.palette.background.reviewsListItems
    //             : theme.palette.background.reviewsList,
    //         borderRadius: 1,
    //       }}
    //     >
    //       <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
    //         <Avatar
    //           src={review.avatar}
    //           alt={review.username}
    //           sx={{ width: 30, height: 30, marginRight: 2 }}
    //         />
    //         <Typography variant="subtitle1">{review.username}</Typography>
    //       </Box>
    //       <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
    //         <Rating value={review.rating} readOnly />
    //         <Typography variant="body2" sx={{ fontSize: "14px" }}>
    //           {review.rating.toFixed(1)}
    //         </Typography>
    //       </Box>
    //       <Typography variant="body1">{review.text}</Typography>

    //       {onEditReview && editingReviewId === review._id.toString() ? (
    //         <Box
    //           sx={{
    //             p: 2,
    //             backgroundColor:
    //               index % 2 === 0
    //                 ? theme.palette.background.reviewsList
    //                 : theme.palette.background.reviewsListItems,
    //             borderRadius: 1,
    //           }}
    //         >
    //           <Rating
    //             name={`edit-rating-${review._id}`}
    //             value={editedRating}
    //             onChange={(event, newValue) => setEditedRating(newValue)}
    //           />
    //           <TextField
    //             value={editedText}
    //             onChange={(e) => setEditedText(e.target.value)}
    //             fullWidth
    //             multiline
    //             rows={3}
    //             sx={{ mt: 1 }}
    //           />
    //           <Box sx={{ mt: 2, display: "flex", gap: 1 }}>
    //             <Button
    //               variant="contained"
    //               color="primary"
    //               onClick={() => handleSaveClick(review._id.toString())}
    //             >
    //               Save
    //             </Button>
    //             <Button
    //               variant="outlined"
    //               color="secondary"
    //               onClick={handleCancelClick}
    //             >
    //               Cancel
    //             </Button>
    //           </Box>
    //         </Box>
    //       ) : (
    //         <Box sx={{ mt: 2, display: "flex", gap: 1 }}>
    //           {onEditReview && (
    //             <Button
    //               variant="contained"
    //               color="primary"
    //               onClick={() => handleEditClick(review)}
    //             >
    //               Edit
    //             </Button>
    //           )}
    //           {onDeleteReview && (
    //             <Button
    //               variant="outlined"
    //               color="error"
    //               onClick={() => handleDeleteClick(review._id.toString())}
    //             >
    //               Delete
    //             </Button>
    //           )}
    //         </Box>
    //       )}
    //     </Box>
    //   ))}
    // </>
  );
};

export default ReviewsList;

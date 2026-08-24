import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Rating,
  Avatar,
  useTheme,
  useMediaQuery,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { IReview, IClientReview } from "@/interfaces";
import placeholderReviews from "@/components/ReviewsCarousel/PlaceholderReviews";

const ReviewsCarousel: React.FC = () => {
  const [latestReviews, setLatestReviews] = useState<IClientReview[]>([]);
  const [selectedReview, setSelectedReview] = useState<IClientReview | null>(
    null,
  );
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const reviewsToShow = useMemo(() => {
    return latestReviews.length < 5
      ? [
          ...latestReviews,
          ...placeholderReviews.slice(0, 5 - latestReviews.length),
        ]
      : latestReviews;
  }, [latestReviews]);

  useEffect(() => {
    const fetchLatestReviews = async () => {
      const response = await axios.get<IReview[]>("/api/review?all=true");
      const transformed = response.data.map((review) => ({
        _id: {
          toString: () => review._id.toString(),
        },
        username: review.username,
        avatar: review.avatar,
        rating: review.rating,
        text: review.text,
      }));
      setLatestReviews(transformed);
    };
    fetchLatestReviews();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % reviewsToShow.length);
    }, 3500); // 3.5 секунды

    return () => clearInterval(interval);
  }, [reviewsToShow]);

  const handleOpen = (review: IClientReview) => {
    setSelectedReview(review);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedReview(null);
  };

  const getSlide = (index: number) => {
    const review = reviewsToShow[index % reviewsToShow.length];

    const isActive = index === activeIndex;
    const isAbove =
      index === (activeIndex - 1 + reviewsToShow.length) % reviewsToShow.length;
    const isBelow = index === (activeIndex + 1) % reviewsToShow.length;

    // const opacity = isActive ? 1 : 0.5;
    const scale = isActive ? 1 : 0.95;
    const gradient = isAbove
      ? "linear-gradient(to top, rgba(38, 51, 42, 0.9), rgba(38, 51, 42, 0.1))"
      : isBelow
        ? "linear-gradient(to bottom, rgba(38, 51, 42, 0.9), rgba(38, 51, 42, 0.1))"
        : "#26332A";

    const width = isActive
      ? isMobile
        ? "90%"
        : "530px"
      : isMobile
        ? "95%"
        : "545px";

    return (
      <Box
        key={review._id.toString()}
        sx={{
          position: "absolute",
          top: isActive ? "50%" : isAbove ? "7%" : "93%",
          left: "50%",
          transform: `translate(-50%, -50%) scale(${scale})`,
          width: width,
          // minHeight: "180px",
          height: "192px",
          borderRadius: 2,
          p: "6px",
          background: isActive ? "#26332A" : gradient,
          color: "#fff",
          // opacity,
          transition: "all 0.5s ease-in-out",
          cursor: "pointer",
        }}
        onClick={() => !isActive && setActiveIndex(index)}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}>
          <Avatar
            src={review.avatar}
            alt={review.username}
            sx={{ width: 72, height: 72, borderRadius: 0 }}
          />
          <Box>
            <Typography variant="subtitle1" fontSize="32px">
              {review.username}
            </Typography>
            <Box display="flex" alignItems="center">
              <Rating value={review.rating} readOnly size="small" />
              <Typography
                variant="body2"
                sx={{ ml: 1, fontSize: "12px", color: "#fff" }}
              >
                {review.rating.toFixed(1)}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Typography
          variant="body2"
          sx={{
            fontSize: "14px",
            textAlign: "left",
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {review.text}
        </Typography>
        {review.text.length > 150 && isActive && (
          <Typography
            variant="body1"
            sx={{ color: "blue", cursor: "pointer", mt: 1 }}
            onClick={(e) => {
              e.stopPropagation();
              handleOpen(review);
            }}
          >
            Читати більше...
          </Typography>
        )}
      </Box>
    );
  };

  return (
    <>
      <Box
        sx={{
          position: "relative",
          width: isMobile ? "100%" : "530px",
          height: "464px",
          overflow: "hidden",
          display: "flex",
          justifyContent: "center",
        }}
      >
        {[
          (activeIndex - 1 + reviewsToShow.length) % reviewsToShow.length,
          activeIndex,
          (activeIndex + 1) % reviewsToShow.length,
        ].map(getSlide)}
      </Box>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{selectedReview?.username}</DialogTitle>
        <DialogContent>
          <Typography>{selectedReview?.text}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Закрити
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ReviewsCarousel;

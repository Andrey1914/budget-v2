import { useState, useEffect } from "react";
import SwiperCore from "swiper";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";

import { IReview } from "@/interfaces";

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

SwiperCore.use([Autoplay, EffectCoverflow, Navigation]);

const ReviewsCarousel: React.FC = () => {
  const [latestReviews, setLatestReviews] = useState<IReview[]>([]);
  const [selectedReview, setSelectedReview] = useState<IReview | null>(null);
  const [open, setOpen] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    const fetchLatestReviews = async () => {
      const response = await axios.get<IReview[]>("/api/review/getAll");

      setLatestReviews(response.data);
    };
    fetchLatestReviews();
  }, []);

  const handleOpen = (review: IReview) => {
    setSelectedReview(review);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedReview(null);
  };

  return (
    <>
      <Swiper
        navigation
        effect="coverflow"
        coverflowEffect={{
          rotate: 0,
          depth: 200,
          stretch: 30,

          modifier: 1,
          slideShadows: true,
        }}
        centeredSlides={true}
        slidesPerView={2}
        spaceBetween={30}
        modules={[Autoplay, EffectCoverflow, Navigation]}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
        initialSlide={3}
        style={{
          height: isMobile ? "auto" : "170px",
          overflow: "hidden",
        }}
      >
        {latestReviews.map((review) => (
          <SwiperSlide key={review._id.toString()}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                color: "#571862",
                backgroundColor: theme.palette.background.swiperSlide,

                boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.1)",
                borderRadius: 1,
                height: isMobile ? "90%" : "100%",
                margin: isMobile ? "0 auto" : "unset",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: isMobile ? "column" : "row",
                  padding: 2,

                  alignItems: isMobile ? "center" : "flex-start",
                  textAlign: isMobile ? "center" : "left",
                }}
              >
                <Avatar
                  src={review.avatar}
                  alt={review.username}
                  sx={{
                    width: isMobile ? 40 : 50,
                    height: isMobile ? 40 : 50,
                    marginBottom: isMobile ? 1 : 0,
                    marginRight: isMobile ? 0 : 4,
                  }}
                />
                <Box>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      textAlign: isMobile ? "center" : "left",
                      fontSize: isMobile ? "14px" : "16px",
                    }}
                  >
                    {review.username}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: isMobile ? "center" : "flex-start",
                    }}
                  >
                    <Rating value={review.rating} readOnly size="small" />
                    <Typography
                      variant="body2"
                      sx={{
                        marginLeft: "4px",
                        fontSize: "12px",
                        color: "#571862",
                      }}
                    >
                      {review.rating.toFixed(1)}
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Box
                sx={{
                  paddingBottom: 2,
                  textAlign: "left",
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    overflow: "hidden",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                    fontSize: isMobile ? "12px" : "14px",
                    display: "-webkit-box",
                  }}
                >
                  {review.text}
                </Typography>
                {review.text.length > 150 && (
                  <Typography
                    variant="body1"
                    sx={{
                      color: "blue",
                      cursor: "pointer",
                    }}
                    onClick={() => handleOpen(review)}
                  >
                    Читать дальше...
                  </Typography>
                )}
              </Box>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{selectedReview?.username}</DialogTitle>
        <DialogContent>
          <Typography>{selectedReview?.text}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Закрыть
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ReviewsCarousel;

import SwiperCore from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import { IReview } from "@/interfaces";
import "swiper/css/effect-coverflow";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Rating,
  Avatar,
  useTheme,
  useMediaQuery,
} from "@mui/material";

SwiperCore.use([Autoplay, EffectCoverflow]);

const ReviewsCarousel: React.FC = () => {
  const [latestReviews, setLatestReviews] = useState<IReview[]>([]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    const fetchLatestReviews = async () => {
      const response = await axios.get<IReview[]>("/api/review/getAll");

      setLatestReviews(response.data);
    };
    fetchLatestReviews();
  }, []);

  return (
    <Swiper
      effect="coverflow" // Включаем эффект coverflow
      coverflowEffect={{
        rotate: 0, // Поворот вокруг оси (не нужен для текста)
        depth: 200, // Глубина: определяет удаление соседних слайдов
        stretch: isMobile ? 10 : 50, // Расстояние между слайдами
        modifier: 1, // Увеличение эффекта
        slideShadows: true, // Тени (можно оставить false для минимализма)
      }}
      centeredSlides={true}
      slidesPerView={isMobile ? 2 : 3}
      spaceBetween={10}
      modules={[Autoplay]}
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      loop={true}
      style={{
        height: isMobile ? "auto" : "130px",
        overflow: "hidden",
      }}
    >
      {latestReviews.map((review) => (
        <SwiperSlide key={review._id.toString()}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              alignItems: "center",
              textAlign: "center",
              color: "#571862",
              backgroundColor: "rgb(198, 198, 198)",

              boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.1)",
              borderRadius: 4,
              height: isMobile ? "90%" : "100%",
              margin: isMobile ? "0 auto" : "unset",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: isMobile ? "column" : "row",
                p: 2,
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
                  marginRight: isMobile ? 0 : 2,
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
                  <Rating value={review.rating} readOnly />
                  <Typography
                    variant="body2"
                    sx={{
                      marginLeft: "8px",
                      fontSize: "14px",
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
                p: 2,
                textAlign: "center",
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  overflow: "hidden",
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: "vertical",
                  fontSize: isMobile ? "12px" : "14px",
                }}
              >
                {review.text}
              </Typography>
            </Box>
          </Box>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ReviewsCarousel;

import SwiperCore from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import { IReview } from "@/interfaces";
import "swiper/css/effect-coverflow";
import { useEffect, useState } from "react";
import axios from "axios";
import { Box, Typography, Rating, Avatar } from "@mui/material";

SwiperCore.use([Autoplay, EffectCoverflow]);

const ReviewsCarousel: React.FC = () => {
  const [latestReviews, setLatestReviews] = useState<IReview[]>([]);

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
        stretch: 50, // Расстояние между слайдами
        modifier: 1, // Увеличение эффекта
        slideShadows: true, // Тени (можно оставить false для минимализма)
      }}
      centeredSlides={true}
      slidesPerView={3}
      spaceBetween={10}
      modules={[Autoplay]}
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      loop={true}
      style={{
        height: "130px",
        overflow: "visible",
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
              height: "100%",
            }}
          >
            <Box sx={{ display: "flex", p: 2 }}>
              <Avatar
                src={review.avatar}
                alt={review.username}
                sx={{
                  width: 50,
                  height: 50,
                  marginRight: 2,
                }}
              />
              <Box>
                <Typography variant="subtitle1" sx={{ textAlign: "left" }}>
                  {review.username}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
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

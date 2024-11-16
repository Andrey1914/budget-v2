import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import { IReview } from "@/interfaces";
import { useEffect, useState } from "react";
import axios from "axios";
import { Box, Typography, Rating } from "@mui/material";

const ReviewsCarousel: React.FC = () => {
  const [latestReviews, setLatestReviews] = useState<IReview[]>([]);

  useEffect(() => {
    const fetchLatestReviews = async () => {
      const response = await axios.get<IReview[]>("/api/review/getAll?limit=5");
      console.log(response);

      setLatestReviews(response.data);
    };
    fetchLatestReviews();
  }, []);

  return (
    <Swiper
      slidesPerView={3}
      modules={[Autoplay]}
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      loop={true}
    >
      {latestReviews.map((review) => (
        <SwiperSlide key={review._id.toString()}>
          <Box sx={{ p: 3, textAlign: "center" }}>
            <Typography variant="subtitle1">{review.username}</Typography>
            <Rating value={review.rating} readOnly />
            <Typography variant="body1">{review.text}</Typography>
          </Box>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ReviewsCarousel;

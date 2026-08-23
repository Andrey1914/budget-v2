import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import type { Swiper as SwiperClass } from "swiper";

import "swiper/css";

import { textData } from "./AdvantagesData";
import { Box, Typography, IconButton, useTheme } from "@mui/material";
import {
  ArrowBackIosRounded,
  ArrowForwardIosRounded,
} from "@mui/icons-material";

import { StyledImage } from "./AdvantagesCarousel.styled";

const AdvantagesCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef<SwiperClass | null>(null);

  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        position: "relative",
        px: theme.spacing(3),
        py: theme.spacing(6),
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 700,
          margin: "0 auto",
        }}
      >
        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 10000, disableOnInteraction: false }}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          slidesPerView={1}
          loop
          onSwiper={(swiperInstance) => {
            swiperRef.current = swiperInstance;
          }}
        >
          {textData.map((item, index) => (
            <SwiperSlide key={index}>
              <Box>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{
                    m: 0,
                    fontSize: theme.typography.fontSizes[5],
                    fontWeight: theme.typography.fontWeightRegular,
                    textAlign: "center",
                  }}
                >
                  {item.title}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    py: theme.spacing(4),
                    fontSize: theme.typography.fontSizes[4],
                    fontWeight: theme.typography.fontWeightRegular,
                  }}
                >
                  {item.text}
                </Typography>
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: theme.spacing(1),
          }}
        >
          <IconButton onClick={() => swiperRef.current?.slidePrev()}>
            <ArrowBackIosRounded fontSize="large" sx={{ color: "#7d7d7d" }} />
          </IconButton>
          <Typography
            style={{
              fontSize: theme.typography.fontSizes[4],
              fontWeight: theme.typography.fontWeightRegular,
              color: "#7d7d7d",
            }}
          >
            {activeIndex + 1} / {textData.length}
          </Typography>
          <IconButton onClick={() => swiperRef.current?.slideNext()}>
            <ArrowForwardIosRounded
              fontSize="large"
              sx={{ color: "#7d7d7d" }}
            />
          </IconButton>
        </Box>
      </Box>

      <StyledImage
        src="/hand-with-money.png"
        alt="Hand with money"
        width={398}
        height={280}
      />
    </Box>
  );
};

export default AdvantagesCarousel;

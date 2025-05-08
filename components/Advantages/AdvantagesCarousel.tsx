import { useRef, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import SwiperCore, { Swiper as SwiperClass } from "swiper";
import "swiper/css";
import "swiper/css/navigation";

import { textData } from "./AdvantagesData";
import { Box, Typography, IconButton, useTheme } from "@mui/material";
import {
  ChevronLeft,
  ChevronRight,
  ArrowBackIosRounded,
  ArrowForwardIosRounded,
} from "@mui/icons-material";

const AdvantagesCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef<SwiperClass | null>(null);

  const theme = useTheme();

  return (
    <Box sx={{ display: "flex" }}>
      <Box
        sx={{
          width: "100%",
          maxWidth: 700,
          margin: "0 auto",
        }}
      >
        <Swiper
          modules={[Autoplay, Navigation]}
          autoplay={{ delay: 30000, disableOnInteraction: false }}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          slidesPerView={1}
          loop
          onSwiper={(swiperInstance) => {
            swiperRef.current = swiperInstance;
          }}
        >
          {textData.map((item, index) => (
            <SwiperSlide key={index}>
              <Box sx={{ textAlign: "center" }}>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{
                    m: 0,
                    fontSize: theme.typography.fontSizes[5],
                    fontWeight: theme.typography.fontWeightRegular,
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

        {/* Навигация */}
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
      <Image
        src="/hand-with-money.jpg"
        alt="Hand with money"
        width={398}
        height={280}
      />
    </Box>
  );
};

export default AdvantagesCarousel;

// import { useState } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Autoplay } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/navigation";

// import { textData } from "./AdvantagesData"; // путь подкорректируй под свой проект
// import { Box, Typography, IconButton } from "@mui/material";
// import { ChevronLeft, ChevronRight } from "@mui/icons-material";

// const AdvantagesCarousel = () => {
//   const [activeIndex, setActiveIndex] = useState(0);

//   return (
//     <Box
//       sx={{
//         position: "relative",
//         width: "100%",
//         maxWidth: 700,
//         margin: "0 auto",
//       }}
//     >
//       <Swiper
//         modules={[Autoplay, Navigation]}
//         autoplay={{ delay: 30000, disableOnInteraction: false }}
//         onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
//         slidesPerView={1}
//         loop
//       >
//         {textData.map((item, index) => (
//           <SwiperSlide key={index}>
//             <Box sx={{ padding: 4, textAlign: "center" }}>
//               <Typography variant="h6" gutterBottom>
//                 {item.title}
//               </Typography>
//               <Typography variant="body1" sx={{ color: "text.secondary" }}>
//                 {item.text}
//               </Typography>
//             </Box>
//           </SwiperSlide>
//         ))}
//       </Swiper>

//       {/* Навигация */}
//       <Box
//         sx={{
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           gap: 2,
//           position: "absolute",
//           bottom: 16,
//           left: "50%",
//           transform: "translateX(-50%)",
//         }}
//       >
//         <IconButton
//           onClick={() => {
//             const swiper = document.querySelector(".swiper")?.swiper;
//             swiper?.slidePrev();
//           }}
//         >
//           <ChevronLeft />
//         </IconButton>
//         <Typography variant="body2">
//           {activeIndex + 1} / {textData.length}
//         </Typography>
//         <IconButton
//           onClick={() => {
//             const swiper = document.querySelector(".swiper")?.swiper;
//             swiper?.slideNext();
//           }}
//         >
//           <ChevronRight />
//         </IconButton>
//       </Box>
//     </Box>
//   );
// };

// export default AdvantagesCarousel;

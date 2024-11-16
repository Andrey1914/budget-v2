"use client";

import React, { useEffect, useState } from "react";

import ReviewsList from "@/components/Review/ReviewsList";
import axios from "axios";
import { IReview } from "@/interfaces";

const AllReviewsPage: React.FC = () => {
  const [reviews, setReviews] = useState<IReview[]>([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get<IReview[]>("/api/review/getAll");
        setReviews(response.data);
      } catch (error) {
        console.error("Ошибка при получении отзывов:", error);
      }
    };
    fetchReviews();
  }, []);

  return (
    <>
      <ReviewsList reviews={reviews} />
    </>
  );
};
export default AllReviewsPage;
// import React from "react";
// import { useInfiniteQuery } from "@tanstack/react-query";
// import { Box, Typography, Rating } from "@mui/material";
// import { IReview } from "@/interfaces";
// import { useInView } from "react-intersection-observer";

// import axios from "axios";

// const fetchReviews = async ({ pageParam = 1 }: { pageParam?: number }) => {
//   const response = await axios.get(`/api/review/getAll?page=${pageParam}`);
//   console.log(response);
//   return response.data;
// };

// const AllReviewsPage: React.FC = () => {
//   const { ref, inView } = useInView({
//     triggerOnce: false,
//     threshold: 1.0,
//   });

//     // const { ref, inView } = useInView();

//   const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
//     useInfiniteQuery({
//       queryKey: ["reviews"],
//       initialPageParam: 1,
//       queryFn: fetchReviews,
//       getNextPageParam: (lastPage, allPages) =>
//         lastPage.length ? allPages.length + 1 : undefined,
//     });

//   React.useEffect(() => {
//     if (inView && hasNextPage) {
//       fetchNextPage();
//     }
//   }, [inView, hasNextPage, fetchNextPage]);

//   return (
//     <Box sx={{ mt: 4 }}>
//       <Typography variant="h5" gutterBottom>
//         Все отзывы
//       </Typography>
//       {data?.pages.map((page) =>
//         page.map((review: IReview) => (
//           <Box key={review._id.toString()} sx={{ mb: 2 }}>
//             <Typography variant="subtitle1">{review.username}</Typography>
//             <Rating value={review.rating} readOnly />
//             <Typography variant="body1">{review.text}</Typography>
//           </Box>
//         ))
//       )}
//       <div ref={ref}>
//         {isFetchingNextPage && <Typography>Загрузка...</Typography>}
//         {!hasNextPage && <Typography>Все отзывы загружены</Typography>}
//       </div>
//     </Box>
//   );
// };

// export default AllReviewsPage;

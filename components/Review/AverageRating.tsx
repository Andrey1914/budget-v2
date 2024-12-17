import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Rating, Typography } from "@mui/material";
import { Oval } from "react-loader-spinner";

const AverageRating: React.FC = () => {
  const [averageRating, setAverageRating] = useState<number | null>(null);

  useEffect(() => {
    const fetchAverageRating = async () => {
      try {
        const response = await axios.get("/api/review/average-rating");
        setAverageRating(response.data.averageRating);
      } catch (error) {
        console.error("Ошибка при получении средней оценки:", error);
      }
    };

    fetchAverageRating();
  }, []);

  return (
    <>
      {averageRating !== null ? (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Rating
            name="average-rating"
            value={averageRating}
            precision={0.1}
            readOnly
          />
          <Typography
            variant="h4"
            style={{
              marginLeft: "8px",
              fontSize: "32px",
              color: "rgba(0, 0, 0, 0.26)",
            }}
          >
            {averageRating.toFixed(1)}
          </Typography>
        </Box>
      ) : (
        <Oval height="20" width="20" color="#1727b7" secondaryColor="#6fb5e7" />
      )}
    </>
  );
};

export default AverageRating;

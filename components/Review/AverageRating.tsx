import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Rating, Typography, useTheme } from "@mui/material";
import { Oval } from "react-loader-spinner";

const AverageRating: React.FC = () => {
  const [averageRating, setAverageRating] = useState<number | null>(null);

  const theme = useTheme();

  useEffect(() => {
    const getAverageRating = async () => {
      try {
        const response = await axios.get("/api/review/average-rating");
        setAverageRating(response.data.averageRating);
      } catch (error) {
        console.error("Ошибка при получении средней оценки:", error);
      }
    };

    getAverageRating();
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
            sx={{
              marginLeft: theme.spacing(2),
              fontSize: theme.spacing(5),
              color: theme.palette.text.secondary,
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

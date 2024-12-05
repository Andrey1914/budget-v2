import React, { useEffect, useState } from "react";
import axios from "axios";
import { Rating } from "@mui/material";
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
        <Rating
          name="average-rating"
          value={averageRating}
          precision={0.1}
          readOnly
        />
      ) : (
        <Oval height="20" width="20" color="#1727b7" secondaryColor="#6fb5e7" />
      )}
    </>
  );
};

export default AverageRating;

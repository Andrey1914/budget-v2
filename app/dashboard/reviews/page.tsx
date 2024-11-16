"use client";

import React from "react";

import { Box, Container } from "@mui/material";
import ReviewForm from "@/components/Review/ReviewForm";

const Review: React.FC = () => {
  return (
    <Container maxWidth="md">
      <Box>
        <ReviewForm />
      </Box>
    </Container>
  );
};

export default Review;

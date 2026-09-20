"use client";

import React from "react";
import Link from "next/link";
import { Box, Typography, useTheme } from "@mui/material";
import { useTranslations } from "next-intl";
import { Session } from "next-auth";
import ReviewForm from "@/components/Review/ReviewForm";
import { MainButton } from "@/app/[locale]/styles/Buttons";

interface FeedbackSectionProps {
  session: Session | null;
  handleAddReview: (review: any) => void;
  handleReviewClick: () => void;
}

const FeedbackSection: React.FC<FeedbackSectionProps> = ({
  session,
  handleAddReview,
  handleReviewClick,
}) => {
  const theme = useTheme();
  const t = useTranslations("landing.feedback");
  const tCommon = useTranslations("common.buttons");

  return (
    <Box
      suppressHydrationWarning
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Typography
        variant="h2"
        component="h2"
        gutterBottom
        sx={{
          fontSize: theme.typography.fontSizes[5],
          fontWeight: theme.typography.fontWeightRegular,
          lineHeight: "40px",
        }}
      >
        {t("title")}
      </Typography>

      {session && session.user?.isVerified ? (
        <Box>
          <Typography
            variant="h4"
            component="p"
            gutterBottom
            sx={{
              fontSize: theme.typography.fontSizes[4],
              fontWeight: theme.typography.fontWeightRegular,
              lineHeight: "32px",
              mb: theme.spacing(5),
            }}
          >
            {t("verifiedSubtitle")}
          </Typography>
          <ReviewForm onAddReview={handleAddReview} />
          <Link
            href="reviews"
            style={{ display: "flex", textDecoration: "none" }}
          >
            <Typography
              variant="body2"
              sx={{
                fontSize: "14px",
                p: 1,
                color: theme.palette.text.secondary,
                border: `2px solid ${theme.palette.text.secondary}`,
                borderRadius: theme.spacing(1),
              }}
            >
              {tCommon("allReviews")}
            </Typography>
          </Link>
        </Box>
      ) : (
        <>
          <Typography
            variant="h4"
            component="p"
            gutterBottom
            sx={{
              fontSize: theme.typography.fontSizes[4],
              fontWeight: theme.typography.fontWeightRegular,
              lineHeight: "32px",
              mb: theme.spacing(5),
            }}
          >
            {t("unverifiedSubtitle")}
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <MainButton
              variant="contained"
              color="primary"
              onClick={handleReviewClick}
              suppressHydrationWarning
            >
              {tCommon("getStarted")}
            </MainButton>
          </Box>
        </>
      )}
    </Box>
  );
};

export default FeedbackSection;

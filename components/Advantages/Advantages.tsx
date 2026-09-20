import React from "react";
import { Typography, Box, Grid2, useTheme } from "@mui/material";
import { AdvantagesText } from "@/components/Advantages/Advantages.styled";
import { useTranslations } from "next-intl";

const Advantages: React.FC = () => {
  const t = useTranslations("landing.advantages");
  const theme = useTheme();

  return (
    <Box
      sx={{
        py: theme.spacing(6),
        px: theme.spacing(3),
        [theme.breakpoints.up("sm")]: {
          px: theme.spacing(5),
        },
      }}
    >
      <Typography
        variant="h4"
        component="h2"
        sx={{
          textAlign: "center",
          p: theme.spacing(4),
          fontWeight: theme.typography.fontWeightRegular,
          fontSize: theme.typography.fontSizes[5],
        }}
      >
        {t("title")}
      </Typography>

      <Typography
        variant="h5"
        component="p"
        sx={{
          paddingBottom: theme.spacing(4),
          fontWeight: theme.typography.fontWeightRegular,
          fontSize: theme.typography.fontSizes[4],
        }}
      >
        {t("description")}
      </Typography>
    </Box>
  );
};

export default Advantages;

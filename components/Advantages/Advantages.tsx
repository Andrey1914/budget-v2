import React, { useState } from "react";
import { Typography, Box, Grid2, useTheme } from "@mui/material";
import { AdvantagesText } from "@/components/Advantages/Advantages.styled";
import { textData } from "@/components/Advantages/AdvantagesData";

const Advantages: React.FC = () => {
  const theme = useTheme();

  const [expandedStates, setExpandedStates] = useState<boolean[]>(
    Array(textData.length).fill(false),
  );

  const toggleText = (index: number) => {
    setExpandedStates((prevStates) => {
      const newStates = [...prevStates];
      newStates[index] = !newStates[index];
      return newStates;
    });
  };

  return (
    <Box
      sx={{
        py: theme.spacing(6),
        px: theme.spacing(3),
        // backgroundColor: theme.palette.background.advantages,
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
        Control your finances with a new level of convenience.
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
        Our financial and transaction management app is a convenient tool for
        those who strive to keep their expenses and income under control.
        We&apos;ve carefully considered every detail to make the process of
        planning, analyzing, and managing money as simple and efficient as
        possible.
      </Typography>
    </Box>
  );
};

export default Advantages;

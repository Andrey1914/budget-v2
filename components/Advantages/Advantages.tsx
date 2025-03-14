import React, { useState } from "react";
import { Typography, Box, Grid2, useTheme } from "@mui/material";
import { AdvantagesText } from "@/components/Advantages/Advantages.styled";
import { textData } from "@/components/Advantages/AdvantagesData";

const Advantages: React.FC = () => {
  const theme = useTheme();

  const [expandedStates, setExpandedStates] = useState<boolean[]>(
    Array(textData.length).fill(false)
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
        py: theme.spacing(4),
        backgroundColor: theme.palette.background.advantages,
      }}
    >
      <Typography
        variant="h4"
        component="h2"
        sx={{
          textAlign: "center",
          p: theme.spacing(5),
          fontWeight: theme.typography.fontWeightLight,
        }}
      >
        Control your finances with a new level of convenience.
      </Typography>

      <Typography
        variant="h5"
        component="p"
        sx={{
          textAlign: "center",
          p: theme.spacing(3),
          fontWeight: theme.typography.fontWeightRegular,
        }}
      >
        Our financial and transaction management app is a convenient tool for
        those who strive to keep their expenses and income under control.
        We&apos;ve carefully considered every detail to make the process of
        planning, analyzing, and managing money as simple and efficient as
        possible.
      </Typography>

      <Grid2
        container
        spacing={4}
        direction="column"
        sx={{ p: theme.spacing(4) }}
      >
        {textData.map((item, index) => (
          <Grid2
            key={index}
            sx={{
              width: "100%",
              paddingLeft: { xs: 0, sm: index % 2 === 0 ? 2 : 6 },
              paddingRight: { xs: 0, sm: index % 2 === 0 ? 6 : 2 },
            }}
            component="div"
          >
            <Box>
              <Typography
                variant="h5"
                component="p"
                sx={{
                  py: theme.spacing(2),
                  fontWeight: theme.typography.fontWeightMedium,
                }}
              >
                {item.title}
              </Typography>
              <AdvantagesText
                color="text.secondary"
                isExpanded={expandedStates[index]}
                onClick={() => toggleText(index)}
              >
                {item.text}
              </AdvantagesText>
            </Box>
          </Grid2>
        ))}
      </Grid2>
    </Box>
  );
};

export default Advantages;

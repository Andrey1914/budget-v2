"use client";

import React from "react";
import { Parallax } from "react-parallax";
import {
  Box,
  Typography,
  Paper,
  Grid2,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import financeAnalysis from "../../public/financial-analysis.png";
import { features } from "@/components/Features/FeaturesData";

const Feature = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Parallax
      bgImage={financeAnalysis.src}
      bgImageAlt="Financial Analysis Background"
      strength={300}
      bgImageStyle={{ objectFit: "cover" }}
    >
      <Box
        sx={{
          display: "flex",
          p: 3,
          background: `linear-gradient(to left, rgba(0, 0, 0, 1) 10%, rgba(0, 0, 0, 0) 100%)`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          minWidth: "150px",
          minHeight: "100%",
        }}
      >
        <Grid2
          container
          spacing={3}
          justifyContent="end"
          sx={{
            maxWidth: { xs: "450px", md: "100%" },
            ml: "auto",
          }}
        >
          {features.map((feature, index) => (
            <Grid2
              key={index}
              sx={{
                width: { xs: "100%", md: "350px" },
                pl: isMobile && index % 2 !== 0 ? "32px" : 0,
                display: "flex",
              }}
              component="div"
            >
              <Paper
                elevation={4}
                sx={{
                  display: "flex",
                  backgroundColor: "#000",
                  color: "#fff",
                  p: 3,
                  flex: 1,
                }}
              >
                <Box sx={{ p: 2, flex: 1 }}>
                  <Typography variant="h6">{feature.title}</Typography>
                  <Typography
                    sx={{
                      fontWeight: theme.typography.fontWeightLight,
                      fontSize: theme.typography.fontSizes[2],
                    }}
                  >
                    {feature.description}
                  </Typography>
                </Box>
              </Paper>
            </Grid2>
          ))}
        </Grid2>
      </Box>
    </Parallax>
  );
};

export default Feature;

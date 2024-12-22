"use client";

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
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        display: "flex",
        p: 3,
        background: `linear-gradient(to left, rgba(0, 0, 0, 1) 10%, rgba(0, 0, 0, 0) 100%), url(${financeAnalysis.src})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        minWidth: "150px",
        minHeight: "100%",
      }}
    >
      <Grid2 container spacing={3} justifyContent="end">
        {features.map((feature, index) => (
          <Grid2
            key={index}
            sx={{
              width: { xs: "100%", sm: "33%" },
              pl: isMobile && index % 2 !== 0 ? "32px" : 0,
            }}
            component="div"
          >
            <Paper
              elevation={3}
              sx={{
                display: "flex",
                backgroundColor: "#000",
                color: "#fff",
              }}
            >
              <Box sx={{ p: 3 }}>
                <Typography variant="h6">{feature.title}</Typography>
                <Typography>{feature.description}</Typography>
              </Box>
            </Paper>
          </Grid2>
        ))}
      </Grid2>
    </Box>
  );
};

export default Feature;

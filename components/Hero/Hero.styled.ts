import { styled, Box, Container, Typography, Button } from "@mui/material";
import hero from "../../public/finance-background.png";

export const HeroContainer = styled(Container)(({ theme }) => ({
  position: "relative",
  padding: 0,
  top: theme.spacing(7),

  [theme.breakpoints.up("sm")]: {
    top: theme.spacing(8),
  },
}));

export const HeroSection = styled("div")(({ theme }) => ({
  backgroundImage: `url(${hero.src})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  height: "75vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: "white",
  textAlign: "center",

  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(4),
  },
}));

export const HeroBackdrop = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  backdropFilter: "blur(15px)",
  backgroundColor: "rgba(0, 0, 0, 0.4)",

  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(4),
  },
}));

export const HeroTitle = styled(Typography)(({ theme }) => ({
  fontWeight: theme.typography.fontWeightBold,
  fontSize: theme.spacing(5),
  paddingBottom: theme.spacing(3),
  color: "#b5b5b5a4",

  background:
    "linear-gradient(120deg, rgba(255, 255, 255, 0) 40%, rgba(255, 255, 255, 0.8) 50%, rgba(255, 255, 255, 0) 60%)",
  backgroundSize: "200% 100%",
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  display: "inline-block",
  animation: "shine 5s linear infinite",

  [theme.breakpoints.up("sm")]: {
    paddingBottom: theme.spacing(4),
    fontSize: theme.spacing(6),
  },

  "@keyframes shine": {
    "0%": {
      backgroundPosition: "100%",
    },
    "100%": {
      backgroundPosition: "-100%",
    },
  },
}));

export const HeroSubTitle = styled(Typography)(({ theme }) => ({
  paddingBottom: theme.spacing(3),
  fontSize: theme.spacing(4),
  color: "#eaeaea",

  [theme.breakpoints.up("sm")]: {
    paddingBottom: theme.spacing(4),
    fontSize: theme.spacing(5),
  },
}));

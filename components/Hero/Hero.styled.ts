import { styled, Box, Container, Typography } from "@mui/material";
// import hero from "../../public/finance-background.png";
import hero from "@/public/hero.jpg";

export const HeroSection = styled("div")(({ theme }) => ({
  backgroundImage: `url(${hero.src})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: "white",
  textAlign: "center",

  [theme.breakpoints.up("sm")]: {
    height: "auto",
    minHeight: "500px",
  },
}));

export const HeroContainer = styled(Container)(({ theme }) => ({
  position: "relative",
  width: "100%",
  minHeight: "500px",
  bottom: 0,
  paddingLeft: theme.spacing(3),
  paddingRight: theme.spacing(3),

  [theme.breakpoints.up("sm")]: {
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
  },
}));

export const HeroBackdrop = styled(Box)(({ theme }) => ({
  position: "absolute",
  bottom: theme.spacing(-4),
  left: "50%",
  transform: "translateX(-50%)",
  width: "90%",
  maxWidth: "600px",
  minHeight: "100px",
  padding: theme.spacing(3),
  backdropFilter: "blur(15px)",
  backgroundColor: "rgba(0, 0, 0, 0.4)",
  borderRadius: "4px",

  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(4),
    maxWidth: "700px",
  },

  [theme.breakpoints.up("md")]: {
    padding: theme.spacing(5),
  },
}));

export const HeroTitle = styled(Typography)(({ theme }) => ({
  fontWeight: theme.typography.fontWeightBold,
  fontSize: theme.typography.fontSizes[5],
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
  },

  [theme.breakpoints.up("md")]: {
    fontSize: theme.typography.fontSizes[6],
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
  fontSize: theme.typography.fontSizes[4],
  color: "#eaeaea",

  [theme.breakpoints.up("sm")]: {
    paddingBottom: theme.spacing(4),
    fontSize: theme.typography.fontSizes[4],
  },

  [theme.breakpoints.up("md")]: {
    fontSize: theme.typography.fontSizes[5],
  },
}));

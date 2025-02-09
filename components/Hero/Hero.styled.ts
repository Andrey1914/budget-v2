import { styled, Box, Container, Typography, Button } from "@mui/material";
import hero from "../../public/finance-background.png";

interface GetStartedButtonProps {
  colors: string[];
}

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

export const GetStartedButton = styled(Button)<GetStartedButtonProps>(
  ({ theme, colors }) => ({
    position: "relative",
    display: "flex",
    maxWidth: "fit-content",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "1.25rem",
    fontWeight: 500,
    backdropFilter: "blur(10px)",
    transition: "box-shadow 0.5s ease-out",
    overflow: "hidden",
    cursor: "pointer",
    padding: theme.spacing(2, 5),

    "& .text-content": {
      display: "inline-block",
      position: "relative",
      zIndex: 2,
      backgroundSize: "300% 100%",
      backgroundClip: "text",
      WebkitBackgroundClip: "text",
      color: "transparent",
      animation: "gradientText 5s linear infinite",
      backgroundImage: `linear-gradient(45deg, ${colors.join(", ")})`,
    },

    "& .gradient-overlay": {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundSize: "300% 100%",
      animation: "gradientBorder 5s linear infinite",
      borderRadius: "inherit",
      zIndex: -1,
      pointerEvents: "none",
      backgroundImage: `linear-gradient(45deg, ${colors.join(", ")})`,
    },

    "& .gradient-overlay::before": {
      content: '""',
      position: "absolute",
      borderRadius: "inherit",
      width: "calc(100% - 4px)",
      height: "calc(100% - 4px)",
      backgroundColor: "#060606",
      zIndex: -1,
      left: "50%",
      top: "50%",
      transform: "translate(-50%, -50%)",
    },

    "@keyframes gradientText": {
      "0%": {
        backgroundPosition: "0% 50%",
      },
      "50%": {
        backgroundPosition: "100% 50%",
      },
      "100%": {
        backgroundPosition: "0% 50%",
      },
    },

    "@keyframes gradientBorder": {
      "0%": {
        backgroundPosition: "0% 50%",
      },
      "50%": {
        backgroundPosition: "100% 50%",
      },
      "100%": {
        backgroundPosition: "0% 50%",
      },
    },
  })
);

import { styled, Button } from "@mui/material";

import { GetStartedButtonProps } from "@/interfaces";

export const GetStartedButton = styled(Button)<GetStartedButtonProps>(
  ({ theme, colors }) => ({
    position: "relative",
    display: "flex",
    maxWidth: "fit-content",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: theme.spacing(1),
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
      backgroundColor: theme.palette.background.default,

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

"use client";

import { createTheme } from "@mui/material";

const theme = createTheme({
  //   fonts: {
  //     montserrat: "'Montserrat', sans-serif",
  //     cardo: "'Cardo', serif",
  //   },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontSize: 12,
    fontWeightBold: 700,
    fontWeightRegular: 400,
  },
  //   transitions: {
  //     easing: {
  //       // This is the most common easing curve.
  //       easeInOut: "width cubic-bezier(0.4, 0, 0.2, 1)",
  //       // Objects enter the screen at full velocity from off-screen and
  //       // slowly decelerate to a resting point.
  //       easeOut: "cubic-bezier(0.0, 0, 0.2, 1)",
  //       // Objects leave the screen at full velocity. They do not decelerate when off-screen.
  //       easeIn: "cubic-bezier(0.4, 0, 1, 1)",
  //       // The sharp curve is used by objects that may return to the screen at any time.
  //       sharp: "cubic-bezier(0.4, 0, 0.6, 1)",
  //     },
  //     all: "all 0.4s ease-in-out",
  //     opacity: "opacity 250ms ease-in-out",
  //     width: "width 0.3s ease-in-out",
  //   },

  spacing: [0, 4, 8, 16, 32, 64, 128, 256, 300],
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  //   palette: {
  //     primary: {
  //       main: "#1976d2",
  //     },
  //     secondary: {
  //       main: "#dc004e",
  //     },
  //   },
  //   typography: {
  //     fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  //   },
});

export default theme;

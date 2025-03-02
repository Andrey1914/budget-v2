"use client";

import { createTheme } from "@mui/material";

declare module "@mui/material/styles" {
  interface TypeBackground {
    advantages?: string;
    primary?: string;
    secondary?: string;
    tertiary?: string;
    totalSum?: string;
  }
}

export const lightTheme = createTheme({
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontSize: 12,
    fontWeightBold: 700,
    fontWeightRegular: 400,
  },
  spacing: [0, 4, 8, 16, 24, 32, 64, 128, 190, 256, 300],
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },

  palette: {
    mode: "light",
    common: {
      black: "#000",
      white: "#fff",
    },
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },

    background: {
      default: "#ffffff",
      paper: "#f4f4f4",
      advantages: "#fefae0",
      primary: "#fefae0",
      secondary: "#e0f7fa",
      tertiary: "#ede7f6",
      totalSum: "#F38A3F",
    },

    text: {
      primary: "#000000",
    },
  },
});

export const darkTheme = createTheme({
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontSize: 12,
    fontWeightBold: 700,
    fontWeightRegular: 400,
  },
  spacing: [0, 4, 8, 16, 24, 32, 64, 128, 190, 256, 300],
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  palette: {
    mode: "dark",
    primary: {
      main: "#90caf9",
    },
    secondary: {
      main: "#f48fb1",
    },
    background: {
      default: "#121212",
      paper: "#1d1d1d",
      advantages: "#164555",
      totalSum: "#E56910",
    },
    text: {
      primary: "#ffffff",
    },
  },
});

const theme = {
  light: lightTheme,
  dark: darkTheme,
};

export default theme;

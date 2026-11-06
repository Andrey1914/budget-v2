"use client";

import { createTheme } from "@mui/material";

declare module "@mui/material/styles" {
  interface Palette {
    gradients: {
      reviews: string;
      primary: string;
    };
  }
  interface PaletteOptions {
    gradients?: {
      reviews?: string;
      primary?: string;
    };
  }
  interface TypeBackground {
    primary?: string;
    secondary?: string;
    tertiary?: string;
    advantages?: string;
    reviews?: string;
    reviewsList?: string;
    reviewsListItems?: string;
    swiperSlide?: string;
    totalSum?: string;
  }

  interface TypographyVariants {
    fontSizes: number[];
  }

  interface TypographyVariantsOptions {
    fontSizes?: number[];
  }
}

const primaryFont =
  '"Roboto", "Montserrat", "IBM Plex Sans", "Arial", sans-serif';

const spacingArray = [0, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 96, 128];

const customSpacing = (factor: number) => {
  if (Number.isInteger(factor) && factor >= 0 && factor < spacingArray.length) {
    return `${spacingArray[factor]}px`;
  }
  return `${factor * 8}px`;
};

export const lightTheme = createTheme({
  typography: {
    fontFamily: primaryFont,
    fontSize: 14,
    fontSizes: [11, 12, 14, 16, 18, 20, 22, 24, 26, 32, 36, 44, 48, 64],
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
  },
  spacing: customSpacing,
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 980,
      lg: 1200,
      xl: 1536,
    },
  },
  palette: {
    mode: "light",
    common: {
      black: "#000000",
      white: "#ffffff",
    },
    primary: {
      main: "#007826",
      light: "#32a14e",
      dark: "#003b10",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#ff8800",
      light: "#ff9d14",
      dark: "#dc851f",
      contrastText: "#ffffff",
    },
    error: {
      main: "#ff4a40",
      light: "#ff453a",
      dark: "#ec221f",
    },
    warning: {
      main: "#ff8800",
      light: "#ff9d14",
      dark: "#f29d38",
    },
    success: {
      main: "#30d158",
    },
    gradients: {
      reviews: "linear-gradient(to top, #26793b 0%, #ffffff 100%)",
      primary: "linear-gradient(180deg, #007826 0%, #004d18 100%)",
    },
    background: {
      default: "#fcfcfc",
      paper: "#ffffff",
      primary: "#f8fcf9",
      secondary: "#f1f1f1",
      tertiary: "#eaeeeb",
      advantages: "rgba(0, 120, 38, 0.05)",
      reviews: "#f8fcf9",
      reviewsList: "#f1f1f1",
      reviewsListItems: "#ffffff",
      swiperSlide: "#f8fcf9",
      totalSum: "#ff9d14",
    },
    text: {
      primary: "#000f05",
      secondary: "#757575",
      disabled: "#a2abab",
    },
  },
  shape: {
    borderRadius: 4,
  },
});

export const darkTheme = createTheme({
  typography: {
    fontFamily: primaryFont,
    fontSize: 14,
    fontSizes: [11, 12, 14, 16, 18, 20, 22, 24, 26, 32, 36, 44, 48, 64],
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
  },
  spacing: customSpacing,
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
    common: {
      black: "#000000",
      white: "#ffffff",
    },
    primary: {
      main: "#3abb5a",
      light: "#8bb596",
      dark: "#007826",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#ff9d14",
      light: "#ffae4c",
      dark: "#eb8914",
      contrastText: "#ffffff",
    },
    error: {
      main: "#ff4a40",
      light: "#ff453a",
      dark: "#ec221f",
    },
    warning: {
      main: "#ffae4c",
    },
    success: {
      main: "#30d158",
    },
    gradients: {
      reviews: "linear-gradient(to top, #16271b 0%, #1e1e1e 100%)",
      primary: "linear-gradient(180deg, #3abb5a 0%, #007826 100%)",
    },
    background: {
      default: "#16271b",
      paper: "#26332a",
      primary: "#1e1e1e",
      secondary: "#252527",
      tertiary: "#304037",
      advantages: "#304037",
      reviews: "#26332a",
      reviewsList: "#1e1e1e",
      reviewsListItems: "#252527",
      swiperSlide: "#304037",
      totalSum: "#eb8914",
    },
    text: {
      primary: "#fefefe",
      secondary: "#a2abab",
      disabled: "#757575",
    },
  },
  shape: {
    borderRadius: 4,
  },
});

const theme = {
  light: lightTheme,
  dark: darkTheme,
};

export default theme;

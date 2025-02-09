"use client";

import { createTheme } from "@mui/material";

declare module "@mui/material/styles" {
  interface TypeBackground {
    advantages?: string;
    primary?: string;
    secondary?: string;
    tertiary?: string;
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
      // advantages: "#9b880b",
      advantages: "#164555",
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

// "use client";

// import { createTheme } from "@mui/material";

// const theme = createTheme({
//   //   fonts: {
//   //     montserrat: "'Montserrat', sans-serif",
//   //     cardo: "'Cardo', serif",
//   //   },
//   typography: {
//     fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
//     fontSize: 12,
//     fontWeightBold: 700,
//     fontWeightRegular: 400,
//   },
//   //   transitions: {
//   //     easing: {
//   //       // This is the most common easing curve.
//   //       easeInOut: "width cubic-bezier(0.4, 0, 0.2, 1)",
//   //       // Objects enter the screen at full velocity from off-screen and
//   //       // slowly decelerate to a resting point.
//   //       easeOut: "cubic-bezier(0.0, 0, 0.2, 1)",
//   //       // Objects leave the screen at full velocity. They do not decelerate when off-screen.
//   //       easeIn: "cubic-bezier(0.4, 0, 1, 1)",
//   //       // The sharp curve is used by objects that may return to the screen at any time.
//   //       sharp: "cubic-bezier(0.4, 0, 0.6, 1)",
//   //     },
//   //     all: "all 0.4s ease-in-out",
//   //     opacity: "opacity 250ms ease-in-out",
//   //     width: "width 0.3s ease-in-out",
//   //   },

//   spacing: [0, 4, 8, 16, 24, 32, 64, 128, 190, 256, 300],
//   breakpoints: {
//     values: {
//       xs: 0,
//       sm: 600,
//       md: 900,
//       lg: 1200,
//       xl: 1536,
//     },
//   },
//   //   palette: {
//   //     primary: {
//   //       main: "#1976d2",
//   //     },
//   //     secondary: {
//   //       main: "#dc004e",
//   //     },
//   //   },
//   //   typography: {
//   //     fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
//   //   },
// });

// export default theme;

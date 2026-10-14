import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";

export const PrimaryButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  borderRadius: "4px",
  textTransform: "uppercase",
  fontFamily: '"IBM Plex Sans", "Roboto", sans-serif',
  fontWeight: 400,
  padding: "12px 30px",
  fontSize: "16px",
  letterSpacing: "0.5px",
  boxShadow:
    theme.palette.mode === "light"
      ? "0px 7px 21px rgba(37, 44, 97, 0.20), 0px 3px 8px rgba(136, 144, 194, 0.25)"
      : "0px 7px 21px rgba(0, 0, 0, 0.40)",
  transition: theme.transitions.create([
    "background-color",
    "box-shadow",
    "transform",
  ]),

  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
    boxShadow:
      theme.palette.mode === "light"
        ? "0px 9px 24px rgba(37, 44, 97, 0.28)"
        : "0px 9px 24px rgba(0, 0, 0, 0.55)",
  },
  "&:active": {
    transform: "translateY(1px)",
  },
  "&:disabled": {
    backgroundColor:
      theme.palette.mode === "light" ? "#e0e0e0" : "rgba(255, 255, 255, 0.12)",
    color: theme.palette.text.disabled,
  },
}));

export const SharpButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  borderRadius: "0px",
  textTransform: "none",
  fontFamily: '"Roboto", sans-serif',
  fontWeight: 500,
  padding: "8px 16px",
  fontSize: "14px",
  transition: theme.transitions.create(["background-color"]),

  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
  },
}));

export const GoogleButton = styled(Button)(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "light"
      ? "#f6f6f6"
      : theme.palette.background.secondary,
  color: theme.palette.text.primary,
  border:
    theme.palette.mode === "light"
      ? "1px solid rgba(0, 59, 16, 0.10)"
      : "1px solid rgba(255, 255, 255, 0.12)",
  borderRadius: "4px",
  textTransform: "none",
  fontFamily: '"Roboto", sans-serif',
  fontWeight: 400,
  padding: "12px 24px",
  fontSize: "16px",
  gap: "10px",

  "&:hover": {
    backgroundColor:
      theme.palette.mode === "light"
        ? "#eeeeee"
        : theme.palette.background.tertiary,
  },
}));

// import { Button } from "@mui/material";
// import { styled } from "@mui/material/styles";

// export const PrimaryButton = styled(Button)(({ theme }) => ({
//   backgroundColor: theme.palette.primary.main,
//   color: theme.palette.primary.contrastText,
//   borderRadius: "4px",
//   textTransform: "uppercase",
//   fontFamily: '"IBM Plex Sans", "Roboto", sans-serif',
//   fontWeight: 400,
//   padding: "12px 30px",
//   fontSize: "16px",
//   letterSpacing: "0.5px",
//   boxShadow:
//     theme.palette.mode === "light"
//       ? "0px 7px 21px rgba(37, 44, 97, 0.20), 0px 3px 8px rgba(136, 144, 194, 0.25)"
//       : "0px 7px 21px rgba(0, 0, 0, 0.40)",
//   transition: theme.transitions.create([
//     "background-color",
//     "box-shadow",
//     "transform",
//   ]),

//   "&:hover": {
//     backgroundColor: theme.palette.primary.dark,
//     boxShadow:
//       theme.palette.mode === "light"
//         ? "0px 9px 24px rgba(37, 44, 97, 0.28)"
//         : "0px 9px 24px rgba(0, 0, 0, 0.55)",
//   },
//   "&:active": {
//     transform: "translateY(1px)",
//   },
//   "&:disabled": {
//     backgroundColor:
//       theme.palette.mode === "light" ? "#e0e0e0" : "rgba(255, 255, 255, 0.12)",
//     color: theme.palette.text.disabled,
//   },
// }));

// export const SharpButton = styled(Button)(({ theme }) => ({
//   backgroundColor: theme.palette.primary.main,
//   color: theme.palette.primary.contrastText,
//   borderRadius: "0px",
//   textTransform: "none",
//   fontFamily: '"Roboto", sans-serif',
//   fontWeight: 500,
//   padding: "8px 16px",
//   fontSize: "14px",
//   transition: theme.transitions.create(["background-color"]),

//   "&:hover": {
//     backgroundColor: theme.palette.primary.dark,
//   },
// }));

// export const GoogleButton = styled(Button)(({ theme }) => ({
//   backgroundColor:
//     theme.palette.mode === "light"
//       ? "#f6f6f6"
//       : theme.palette.background.secondary,
//   color: theme.palette.text.primary,
//   border:
//     theme.palette.mode === "light"
//       ? "1px solid rgba(0, 59, 16, 0.10)"
//       : "1px solid rgba(255, 255, 255, 0.12)",
//   borderRadius: "4px",
//   textTransform: "none",
//   fontFamily: '"Roboto", sans-serif',
//   fontWeight: 400,
//   padding: "12px 24px",
//   fontSize: "16px",
//   gap: "10px",

//   "&:hover": {
//     backgroundColor:
//       theme.palette.mode === "light"
//         ? "#eeeeee"
//         : theme.palette.background.tertiary,
//   },
// }));

import { styled, Box, TextField, Select, Button } from "@mui/material";

export const FormContainer = styled("form")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2), // 8px из Figma (Frame 2608834)
}));

export const ThreeColumnsRow = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  gap: theme.spacing(2), // 8px
  width: "100%",

  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
  },
}));

export const FormTextField = styled(TextField)(({ theme }) => ({
  width: "100%",

  "& .MuiOutlinedInput-root": {
    height: "40px",
    borderRadius: theme.shape.borderRadius,
    backgroundColor:
      theme.palette.mode === "light"
        ? "#fdfdfd"
        : theme.palette.background.secondary,
    fontSize: "16px",
    fontFamily: theme.typography.fontFamily,
    color: theme.palette.text.primary,

    "& fieldset": {
      borderColor:
        theme.palette.mode === "light"
          ? "rgba(0, 59, 16, 0.20)"
          : theme.palette.mode === "dark"
            ? "#48484b"
            : theme.palette.divider,
      borderWidth: "1px",
    },
    "&:hover fieldset": {
      borderColor: theme.palette.primary.main,
    },
    "&.Mui-focused fieldset": {
      borderColor: theme.palette.primary.main,
      borderWidth: "1px",
    },
  },
  "& .MuiOutlinedInput-input": {
    padding: `${theme.spacing(2)} ${theme.spacing(3)}`, // 8px 12px
    height: "24px",
    boxSizing: "border-box",
    fontFamily: theme.typography.fontFamily,
    fontSize: "16px",
    color: theme.palette.text.primary,
    "&::placeholder": {
      color: theme.palette.text.secondary,
      opacity: 1,
    },
  },
}));

export const FormSelectField = styled(Select)(({ theme }) => ({
  height: "40px",
  borderRadius: theme.shape.borderRadius,
  backgroundColor:
    theme.palette.mode === "light"
      ? "#fdfdfd"
      : theme.palette.background.secondary,
  fontSize: "16px",
  fontFamily: theme.typography.fontFamily,
  color: theme.palette.text.primary,

  "& .MuiOutlinedInput-notchedOutline": {
    borderColor:
      theme.palette.mode === "light"
        ? "rgba(0, 59, 16, 0.20)"
        : theme.palette.mode === "dark"
          ? "#48484b"
          : theme.palette.divider,
    borderWidth: "1px",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: theme.palette.primary.main,
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: theme.palette.primary.main,
    borderWidth: "1px",
  },
  "& .MuiSelect-select": {
    padding: `${theme.spacing(2)} ${theme.spacing(3)} !important`,
    height: "24px !important",
    display: "flex",
    alignItems: "center",
    boxSizing: "border-box",
    fontFamily: theme.typography.fontFamily,
    fontSize: "16px",
    color: theme.palette.text.primary,
  },
  "& .MuiSelect-icon": {
    color: theme.palette.primary.main,
    right: "8px",
  },
}));

export const ButtonContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  paddingTop: theme.spacing(4), // 16px
  paddingBottom: theme.spacing(1), // 4px
}));

export const ConfirmSubmitButton = styled(Button)(({ theme }) => ({
  width: "204px",
  height: "48px",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  fontFamily: '"IBM Plex Sans", "Roboto", sans-serif',
  fontWeight: theme.typography.fontWeightRegular,
  fontSize: "20px",
  letterSpacing: "0.5px",
  textTransform: "uppercase",
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

  [theme.breakpoints.down("sm")]: {
    width: "100%",
  },
}));

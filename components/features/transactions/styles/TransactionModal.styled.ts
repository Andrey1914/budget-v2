import {
  styled,
  Dialog,
  DialogContent,
  IconButton,
  Box,
  Typography,
  Divider,
} from "@mui/material";

export const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    maxWidth: "656px",
    width: "100%",
    borderRadius: theme.shape.borderRadius, // 4px
    backgroundColor:
      theme.palette.mode === "light"
        ? theme.palette.background.default // #fcfcfc из Figma / theme.ts
        : theme.palette.background.primary, // #1e1e1e из Figma / theme.ts
    boxShadow:
      theme.palette.mode === "light"
        ? "0px 8px 32px rgba(0, 59, 16, 0.12)"
        : "0px 8px 32px rgba(0, 0, 0, 0.60)",
    margin: theme.spacing(2),

    [theme.breakpoints.down("sm")]: {
      maxWidth: "356px",
      margin: theme.spacing(1),
    },
  },
}));

//  (Frame "xmark-large", высота 32px)
export const ModalTopBar = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
  backgroundColor:
    theme.palette.mode === "light"
      ? theme.palette.background.default
      : theme.palette.background.primary,
}));

export const ModalCloseButton = styled(IconButton)(({ theme }) => ({
  padding: 0,
  color: theme.palette.primary.main, // (#007826 light / #3abb5a dark)
  transition: theme.transitions.create(["opacity"]),
  "&:hover": {
    opacity: 0.8,
  },
}));

export const ModalDivider = styled(Divider)(({ theme }) => ({
  borderColor:
    theme.palette.mode === "light"
      ? "rgba(0, 59, 16, 0.12)"
      : theme.palette.mode === "dark"
        ? "#48484b"
        : theme.palette.divider,
}));

export const ModalBody = styled(DialogContent)(({ theme }) => ({
  padding: `${theme.spacing(4)} ${theme.spacing(5)} ${theme.spacing(5)} ${theme.spacing(5)}`, // 16px 20px 20px 20px

  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(4),
  },
}));

export const ModalTitle = styled(Typography)(({ theme }) => ({
  fontFamily: theme.typography.fontFamily,
  fontSize: "22px",
  fontWeight: theme.typography.fontWeightRegular, // 400
  lineHeight: "32px",
  color: theme.palette.text.primary,
  marginBottom: theme.spacing(3), // 12px
}));

import { styled, Box, Select, IconButton } from "@mui/material";

export const CategoryRow = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(2), // 8px из Figma / customSpacing(2)
  width: "100%",
}));

export const CategorySelectInput = styled(Select)(({ theme }) => ({
  height: "40px",
  borderRadius: theme.shape.borderRadius,
  backgroundColor:
    theme.palette.mode === "light"
      ? "#fdfdfd"
      : theme.palette.background.secondary, // #252527 в dark theme
  fontFamily: theme.typography.fontFamily,
  fontSize: "16px",
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
    padding: `${theme.spacing(2)} ${theme.spacing(3)} !important`, // 8px 12px
    height: "24px !important",
    display: "flex",
    alignItems: "center",
    boxSizing: "border-box",
  },
  "& .MuiSelect-icon": {
    color: theme.palette.primary.main,
    right: "8px",
  },
}));

export const CategoryActionsWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(2), // 8px
  flexShrink: 0,
}));

export const AddCategoryButton = styled(IconButton)(({ theme }) => ({
  padding: "4px",
  color: theme.palette.primary.main,
  transition: theme.transitions.create(["opacity"]),
  "&:hover": {
    opacity: 0.8,
  },
}));

interface ActionButtonsWrapperProps {
  active?: boolean;
}

export const ActionButtonsWrapper = styled(Box, {
  shouldForwardProp: (prop) => prop !== "active",
})<ActionButtonsWrapperProps>(({ theme, active }) => ({
  display: "flex",
  alignItems: "center",
  opacity: active ? 1 : 0.35,
  pointerEvents: active ? "auto" : "none",
  transition: theme.transitions.create(["opacity"]),

  "& .MuiSvgIcon-root": {
    fontSize: "22px",
    color: theme.palette.primary.main,
    transition: theme.transitions.create(["opacity"]),
    "&:hover": {
      opacity: 0.8,
    },
  },
}));

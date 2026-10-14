import { IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";

export const StyledPlusIconButton = styled(IconButton)(({ theme }) => ({
  width: "52px",
  height: "52px",
  borderRadius: "50%",
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  boxShadow: "0px 2px 12px rgba(0, 0, 0, 0.20)",
  transition: theme.transitions.create([
    "background-color",
    "box-shadow",
    "transform",
  ]),

  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
    boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.30)",
  },
  "&:active": {
    transform: "scale(0.96)",
  },
}));

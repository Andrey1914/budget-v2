import { styled, IconButton } from "@mui/material";

export const StyledActionButtons = styled(IconButton)(({ theme }) => ({
  padding: "4px",
  color: theme.palette.primary.main, // (#007826 light / #3abb5a dark)
  transition: theme.transitions.create(["opacity"]),
  "&:hover": {
    opacity: 0.8,
  },
}));

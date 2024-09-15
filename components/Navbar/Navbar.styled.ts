import { styled, Box } from "@mui/material";

export const BoxNavLinks = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  gap: theme.spacing(2),

  [theme.breakpoints.down("md")]: {
    flexDirection: "column-reverse",
    gap: theme.spacing(3),
  },
}));

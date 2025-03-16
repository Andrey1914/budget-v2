import { styled, Container } from "@mui/material";

export const ContainerNavLinks = styled(Container)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",

  [theme.breakpoints.down("md")]: {
    gap: theme.spacing(1),
  },

  [theme.breakpoints.up("md")]: {
    gap: theme.spacing(4),
  },
}));

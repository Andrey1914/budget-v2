import { styled, Container } from "@mui/material";

export const ContainerNavLinks = styled(Container)(({ theme }) => ({
  display: "flex",

  [theme.breakpoints.down("md")]: {
    flexDirection: "column-reverse",
    gap: theme.spacing(3),
  },

  [theme.breakpoints.up("md")]: {
    // flexDirection: "row-reverse",
    gap: theme.spacing(4),
  },
}));

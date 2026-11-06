import { Container, styled } from "@mui/material";

export const MainContainer = styled(Container)(({ theme }) => ({
  width: "100%",
  paddingLeft: theme.spacing(3),
  paddingRight: theme.spacing(3),
  margin: "0 auto",
  maxWidth: 1280,
  [theme.breakpoints.down("sm")]: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

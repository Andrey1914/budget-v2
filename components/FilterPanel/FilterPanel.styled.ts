import { styled, Select, Button, Box } from "@mui/material";

export const FilterContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  gap: theme.spacing(3),
  padding: theme.spacing(5),
  alignItems: "center",

  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    padding: theme.spacing(2),
    alignItems: "stretch",
  },
}));

export const StyledSelect = styled(Select)(({ theme }) => ({
  minWidth: 100,

  [theme.breakpoints.down("sm")]: {
    width: "100%",
  },
}));

export const StyledButton = styled(Button)(({ theme }) => ({
  minWidth: 120,

  [theme.breakpoints.down("sm")]: {
    width: "100%",
  },
}));

import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

export const DetailsContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  // justifyContent: "space-between",
  // gap: theme.spacing(3),
  padding: theme.spacing(6, 4),
}));

export const DetailRow = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(0.5),
}));

export const DetailLabel = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: "0.875rem",
}));

export const DetailValue = styled(Typography)(() => ({
  overflowWrap: "anywhere",
}));

export const TransactionAmount = styled(Typography, {
  shouldForwardProp: (prop) => prop !== "isIncome",
})<{ isIncome: boolean }>(({ theme, isIncome }) => ({
  color: isIncome ? theme.palette.success.main : theme.palette.error.main,
  marginLeft: "auto",
}));

export const TransactionDate = styled(Box)(({ theme }) => ({
  paddingLeft: theme.spacing(7),
}));

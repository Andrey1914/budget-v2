import { styled, Box, Typography } from "@mui/material";

export const ModalScrollContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  maxHeight: "60vh",
  overflowY: "auto",
}));

export const ModalHeading = styled(Typography)(({ theme }) => ({
  fontFamily: theme.typography.fontFamily,
  color: theme.palette.text.primary,
}));

export const TotalLabelText = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
  paddingTop: theme.spacing(2),
  paddingBottom: theme.spacing(2),
  fontFamily: theme.typography.fontFamily,
}));

interface TotalAmountProps {
  isIncome?: boolean;
}

export const TotalAmountText = styled(Typography, {
  shouldForwardProp: (prop) => prop !== "isIncome",
})<TotalAmountProps>(({ theme, isIncome }) => ({
  fontFamily: theme.typography.fontFamily,
  color: isIncome ? theme.palette.primary.main : theme.palette.error.main,
  paddingTop: theme.spacing(3),
  paddingBottom: theme.spacing(3),
}));

export const EmptyStateBoxDetailed = styled(Box)(({ theme }) => ({
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(4),
  textAlign: "center",
}));

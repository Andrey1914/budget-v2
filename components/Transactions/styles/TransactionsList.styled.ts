import { styled, Box, Typography, List } from "@mui/material";

export const TransactionsListWrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  marginTop: theme.spacing(1), // 4px
}));

export const ErrorText = styled(Typography)(({ theme }) => ({
  color: theme.palette.error.main,
}));

export const EmptyStateBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  height: "180px",

  [theme.breakpoints.down("sm")]: {
    height: "105px",
  },
}));

interface ListContainerProps {
  isExpanded?: boolean;
  hasMoreThanThree?: boolean;
}

export const ListContainer = styled(Box, {
  shouldForwardProp: (prop) =>
    prop !== "isExpanded" && prop !== "hasMoreThanThree",
})<ListContainerProps>(({ isExpanded, hasMoreThanThree }) => ({
  position: "relative",
  width: "100%",
  maxHeight: isExpanded ? "400px" : undefined,
  overflow: hasMoreThanThree && !isExpanded ? "hidden" : "auto",
  maskImage:
    hasMoreThanThree && !isExpanded
      ? "linear-gradient(to bottom, black 0%, black calc(100% - 32px), rgba(0, 0, 0, 0.25) 100%)"
      : "none",
  WebkitMaskImage:
    hasMoreThanThree && !isExpanded
      ? "linear-gradient(to bottom, black 0%, black calc(100% - 32px), rgba(0, 0, 0, 0.25) 100%)"
      : "none",
}));

export const StyledMuiList = styled(List)({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  padding: 0,
});

export const FadingShadowOverlay = styled(Box)(({ theme }) => ({
  position: "absolute",
  bottom: -5,
  left: 0,
  right: 0,
  height: "60px",
  pointerEvents: "none",
  background:
    theme.palette.mode === "dark"
      ? "linear-gradient(0deg, rgba(38, 51, 42, 0.95) 0%, rgba(39, 39, 39, 0.70) 50%, rgba(38, 51, 42, 0) 100%)"
      : "linear-gradient(0deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.70) 50%, rgba(255, 255, 255, 0) 100%)",

  [theme.breakpoints.down("sm")]: {
    height: "75px",
  },
}));

export const ShowMoreWrapper = styled(Box)({
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

export const InlineShowMoreButton = styled("button")(({ theme }) => ({
  background: "none",
  border: "none",
  padding: 0,
  cursor: "pointer",
  fontFamily: theme.typography.fontFamily,
  fontSize: "16px",
  fontWeight: theme.typography.fontWeightRegular,
  color:
    theme.palette.mode === "dark"
      ? theme.palette.success.main // #30d158 из theme.ts
      : "#3abb5a", // зеленый акцент из Figma
  transition: theme.transitions.create(["text-decoration"]),
  "&:hover": {
    textDecoration: "underline",
  },
}));

export const ShowMoreActionText = styled(Typography)(({ theme }) => ({
  fontFamily: theme.typography.fontFamily,
  fontSize: "16px",
  fontWeight: theme.typography.fontWeightRegular,
  color: theme.palette.mode === "dark" ? theme.palette.success.main : "#3abb5a",
  cursor: "pointer",
  transition: theme.transitions.create(["text-decoration"]),
  "&:hover": {
    textDecoration: "underline",
  },
}));

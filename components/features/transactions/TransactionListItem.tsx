import React from "react";
import { Box, ListItem, Typography, useTheme } from "@mui/material";
import { TransactionListItemProps } from "./types";

export const TransactionListItem: React.FC<TransactionListItemProps> = ({
  transaction,
  categoryName,
  type,
  variant,
  isLast = false,
  onClick,
}) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const isIncome = type === "income";
  const isDetailed = variant === "detailed";

  const amountColor = isIncome
    ? isDark
      ? "#30d158"
      : "#3abb5a"
    : theme.palette.error.main;

  const itemBorderColor = isDark ? "#48484b" : "rgba(0, 59, 16, 0.12)";

  const formatDate = (dateInput: Date | string) =>
    new Date(dateInput).toLocaleDateString("uk-UA", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

  return (
    <ListItem
      disableGutters
      onClick={onClick}
      sx={{
        px: isDetailed ? 4 : { xs: "4px", sm: "12px" },
        py: isDetailed ? 4 : 3,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottom: isLast ? "none" : `1px solid ${itemBorderColor}`,
        backgroundColor: "transparent",
        boxSizing: "border-box",
        cursor: onClick ? "pointer" : "default",
        ...(isDetailed && onClick
          ? {
              "&:hover": {
                backgroundColor: isDark
                  ? "rgba(255, 255, 255, 0.03)"
                  : "rgba(0, 0, 0, 0.02)",
              },
            }
          : {}),
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          minWidth: 0,
          pr: isDetailed ? 2 : 1,
        }}
      >
        <Typography
          variant="body1"
          component="p"
          noWrap
          sx={{
            fontFamily: "Roboto, sans-serif",
            fontSize: isDetailed
              ? { xs: "16px", sm: "18px" }
              : { xs: "16px", sm: "20px" },
            color: isDetailed ? "text.primary" : "text.secondary",
            fontWeight: 400,
          }}
        >
          {categoryName}
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: isDetailed ? 6 : "4px",
          flexShrink: 0,
        }}
      >
        <Typography
          variant="body1"
          component="p"
          sx={{
            fontFamily: "Roboto, sans-serif",
            fontSize: { xs: "16px", sm: "18px" },
            color: amountColor,
            fontWeight: isDetailed ? 500 : 400,
            whiteSpace: "nowrap",
          }}
        >
          {isDetailed
            ? `${transaction.amount} ${transaction.currency}`
            : transaction.amount}
        </Typography>

        {!isDetailed && (
          <Typography
            variant="body1"
            component="p"
            sx={{
              fontFamily: "Roboto, sans-serif",
              fontSize: { xs: "16px", sm: "20px" },
              color: amountColor,
              fontWeight: 400,
              whiteSpace: "nowrap",
            }}
          >
            {transaction.currency}
          </Typography>
        )}

        {isDetailed && transaction.date && (
          <Typography
            variant="body1"
            component="p"
            sx={{
              fontFamily: "Roboto, sans-serif",
              fontSize: { xs: "16px", sm: "18px" },
              color: "text.primary",
              fontWeight: 400,
              whiteSpace: "nowrap",
            }}
          >
            {formatDate(transaction.date)}
          </Typography>
        )}
      </Box>
    </ListItem>
  );
};

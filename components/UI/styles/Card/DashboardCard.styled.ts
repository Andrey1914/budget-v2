import { Paper } from "@mui/material";
import { styled } from "@mui/material/styles";

export const DashboardCard = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: "8px",
  padding: "20px",
  border: "none",
  boxShadow:
    theme.palette.mode === "light"
      ? "0px 1px 16px rgba(0, 59, 16, 0.08)"
      : "0px 1px 16px rgba(0, 0, 0, 0.35)",
  transition: theme.transitions.create(["box-shadow", "background-color"]),
}));

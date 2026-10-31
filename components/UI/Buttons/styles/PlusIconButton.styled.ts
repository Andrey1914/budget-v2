import { IconButton, IconButtonProps } from "@mui/material";
import { styled } from "@mui/material/styles";

interface StyledPlusIconButtonProps extends IconButtonProps {
  varianttype?: "income" | "expense" | "task";
}

export const StyledPlusIconButton = styled(IconButton, {
  shouldForwardProp: (prop) => prop !== "varianttype",
})<StyledPlusIconButtonProps>(({ theme, varianttype = "income" }) => {
  const colorMap = {
    income: {
      main: theme.palette.primary.main,
      dark: theme.palette.primary.dark,
    },
    expense: {
      main: theme.palette.error.main,
      dark: theme.palette.error.dark || theme.palette.error.main,
    },
    task: {
      main: theme.palette.secondary.main,
      dark: theme.palette.secondary.dark,
    },
  };

  const colors = colorMap[varianttype] || colorMap.income;

  return {
    width: "52px",
    height: "52px",
    borderRadius: "50%",
    backgroundColor: colors.main,
    color: theme.palette.common.white,
    boxShadow: "0px 2px 12px rgba(0, 0, 0, 0.20)",
    transition: theme.transitions.create([
      "background-color",
      "box-shadow",
      "transform",
    ]),

    "&:hover": {
      backgroundColor: colors.dark,
      boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.30)",
    },
    "&:active": {
      transform: "scale(0.96)",
    },
  };
});

// import { IconButton } from "@mui/material";
// import { styled } from "@mui/material/styles";

// export const StyledPlusIconButton = styled(IconButton)(({ theme }) => ({
//   width: "52px",
//   height: "52px",
//   borderRadius: "50%",
//   backgroundColor: theme.palette.primary.main,
//   color: theme.palette.primary.contrastText,
//   boxShadow: "0px 2px 12px rgba(0, 0, 0, 0.20)",
//   transition: theme.transitions.create([
//     "background-color",
//     "box-shadow",
//     "transform",
//   ]),

//   "&:hover": {
//     backgroundColor: theme.palette.primary.dark,
//     boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.30)",
//   },
//   "&:active": {
//     transform: "scale(0.96)",
//   },
// }));

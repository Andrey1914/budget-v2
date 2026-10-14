import { TextField } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledTextField = styled(TextField)(({ theme }) => ({
  width: "100%",
  "& .MuiOutlinedInput-root": {
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    fontSize: "14px",
    color: theme.palette.text.primary,
    transition: theme.transitions.create([
      "border-color",
      "box-shadow",
      "background-color",
    ]),
    boxShadow:
      theme.palette.mode === "light"
        ? "0px 2px 6px rgba(0, 0, 0, 0.04)"
        : "0px 2px 6px rgba(0, 0, 0, 0.25)",

    "& fieldset": {
      borderColor:
        theme.palette.mode === "light"
          ? "rgba(0, 22, 6, 0.24)"
          : "rgba(255, 255, 255, 0.24)",
      borderWidth: "1px",
    },
    "&:hover fieldset": {
      borderColor: theme.palette.primary.main,
    },
    "&.Mui-focused fieldset": {
      borderColor: theme.palette.primary.main,
      borderWidth: "2px",
    },
    "&.Mui-error fieldset": {
      borderColor: theme.palette.error.main,
    },
  },
  "& input": {
    padding: "10px 14px",
    height: "20px",
    color: theme.palette.text.primary,
    "&::placeholder": {
      color: theme.palette.text.secondary,
      opacity: 0.8,
    },
  },
  "& label": {
    color: theme.palette.text.secondary,
    fontSize: "14px",
  },
  "& label.Mui-focused": {
    color: theme.palette.primary.main,
  },
  "& label.Mui-error": {
    color: theme.palette.error.main,
  },
  "& .MuiFormHelperText-root": {
    marginLeft: "4px",
    marginTop: "4px",
    fontSize: "12px",
  },
}));

export default StyledTextField;

// import { TextField } from "@mui/material";
// import { styled } from "@mui/material/styles";

// const StyledTextField = styled(TextField)(({ theme }) => ({
//   height: "40px",
//   "& input": {
//     color: "#000",
//     backgroundColor: "#fff",
//     padding: "12px",
//     borderRadius: "4px",
//   },
//   "& label": {
//     color: "#26793B",
//   },
//   "& label.Mui-focused": {
//     color: "#3A9A5B",
//   },
//   "& .MuiOutlinedInput-root": {
//     backgroundColor: "#fff",
//     borderRadius: "4px",
//     boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",

//     "& fieldset": {
//       borderColor: "#ccc",
//     },
//     "&:hover fieldset": {
//       borderColor: "#3A9A5B",
//     },
//     "&.Mui-focused fieldset": {
//       borderColor: "#3A9A5B",
//     },
//   },
// }));

// export default StyledTextField;

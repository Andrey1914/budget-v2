import { TextField } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledTextField = styled(TextField)(({ theme }) => ({
  height: "40px",
  "& input": {
    color: "#000",
    backgroundColor: "#fff",
    padding: "12px",
    borderRadius: "4px",
  },
  "& label": {
    color: "#26793B",
  },
  "& label.Mui-focused": {
    color: "#3A9A5B",
  },
  "& .MuiOutlinedInput-root": {
    backgroundColor: "#fff",
    borderRadius: "4px",
    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",

    "& fieldset": {
      borderColor: "#ccc",
    },
    "&:hover fieldset": {
      borderColor: "#3A9A5B",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#3A9A5B",
    },
  },
}));

export default StyledTextField;

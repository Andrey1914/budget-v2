import { styled } from "@mui/material/styles";
import Image from "next/image";

export const StyledImage = styled(Image)(({ theme }) => ({
  position: "absolute",
  width: 293,
  height: 228,
  bottom: -78,
  right: -137,

  [theme.breakpoints.up("sm")]: {
    width: 300,
    bottom: 0,
    right: 0,
  },

  [theme.breakpoints.up("md")]: {
    width: 398,
    bottom: 0,
    right: 0,
  },
}));

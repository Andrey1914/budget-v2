import { styled, Typography } from "@mui/material";

interface AdvantagesTextProps {
  isExpanded: boolean;
}

export const AdvantagesText = styled(Typography, {
  shouldForwardProp: (prop) => prop !== "isExpanded",
})<AdvantagesTextProps>(({ theme, isExpanded }) => ({
  maxHeight: isExpanded ? "none" : "3em",
  position: "relative",
  overflow: "hidden",
  lineHeight: 1.5,
  textOverflow: "ellipsis",
  transition: "max-height 0.3s ease",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "#fefae0",
  },
  "&:hover, &:focus": {
    cursor: "pointer",
  },
  "&::after": {
    content: '""',
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "2em",
    background:
      "linear-gradient(to bottom, rgba(254, 250, 224, 0) 0%, rgba(254, 250, 224, 1) 100%)",
    pointerEvents: "none",
    opacity: isExpanded ? 0 : 1,
  },
}));

import { styled, Typography } from "@mui/material";

interface AdvantagesTextProps {
  isExpanded: boolean;
}

export const AdvantagesText = styled(Typography, {
  shouldForwardProp: (prop) => prop !== "isExpanded",
})<AdvantagesTextProps>(({ theme, isExpanded }) => ({
  maxHeight: isExpanded ? "none" : "3em",

  opacity: isExpanded ? 1 : 0.7,
  position: "relative",
  overflow: "hidden",
  lineHeight: 1.5,
  fontSize: "1rem",
  textOverflow: "ellipsis",
  transition: `
    max-height 0.6s cubic-bezier(0.4, 0, 0.2, 1),
    opacity 0.6s ease-in-out,
    transform 0.6s cubic-bezier(0.4, 0, 0.2, 1),
    mask-image 1.2s ease-in-out
  `,

  maskImage: isExpanded
    ? "none"
    : "linear-gradient(to bottom, rgba(0,0,0,1) 50%, rgba(0,0,0,0.3) 80%, rgba(0,0,0,0) 100%)",

  cursor: "pointer",
  "&:hover": {
    backgroundColor: theme.palette.background.advantages,
  },
  "&:hover, &:focus": {
    backgroundColor: theme.palette.background.advantages,
    transform: "scale(1.01)",
    transition: "transform 0.3s ease-in-out",
    cursor: "pointer",
  },
  "&::after": {
    content: '""',
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "2em",
    background: `linear-gradient(to bottom, rgba(${theme.palette.background.advantages}00) 0%, rgba(${theme.palette.background.advantages} 1) 100%)`,
    pointerEvents: "none",
    opacity: isExpanded ? 0 : 1,
    transition: "opacity 1s ease-in-out",
  },
}));

import { styled, keyframes } from "@mui/material";

const rotateNormal = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const rotateFast = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

export const CircularContainer = styled("div")<{ $isHovered: boolean }>(
  ({ $isHovered }) => ({
    width: "80px",
    height: "80px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    borderRadius: "50%",
    animation: `${$isHovered ? rotateFast : rotateNormal} ${
      $isHovered ? "3s" : "15s"
    } linear infinite`,
  })
);

export const SvgContainer = styled("svg")(() => ({
  width: "100%",
  height: "100%",
  position: "absolute",
}));

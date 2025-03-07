import React, { useState } from "react";
import { CircularContainer, SvgContainer } from "./Logo.styled";
import { useTheme } from "@mui/material";

interface CircularTextProps {
  text: string;
  radius?: number;
}

const Logo: React.FC<CircularTextProps> = ({ text, radius = 80 }) => {
  const theme = useTheme();
  const chars = text.split("");
  const charAngle = 360 / chars.length;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <CircularContainer
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      $isHovered={isHovered}
    >
      <SvgContainer viewBox="0 0 200 200">
        {chars.map((char, i) => {
          const angle = i * charAngle - 90;
          const x = 100 + radius * Math.cos((angle * Math.PI) / 180);
          const y = 100 + radius * Math.sin((angle * Math.PI) / 180);

          return (
            <text
              key={i}
              x={x}
              y={y}
              fill={theme.palette.text.primary}
              fontSize="32"
              fontWeight="regular"
              textAnchor="middle"
              dominantBaseline="middle"
              transform={`rotate(${angle + 90}, ${x}, ${y})`}
            >
              {char}
            </text>
          );
        })}
      </SvgContainer>
    </CircularContainer>
  );
};

export default Logo;

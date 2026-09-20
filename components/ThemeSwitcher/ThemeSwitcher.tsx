"use client";

import React, { useEffect, useState } from "react";
import { FormControlLabel, Switch } from "@mui/material";
import { SwitcherProps } from "@/interfaces";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import DarkModeIcon from "@mui/icons-material/DarkMode";

const ThemeSwitcher: React.FC<SwitcherProps> = ({
  toggleTheme,
  isDarkMode,
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const label = isDarkMode ? (
    <WbSunnyIcon
      sx={{ display: "flex", alignItems: "center", color: "#fcfcfc" }}
    />
  ) : (
    <DarkModeIcon
      sx={{ display: "flex", alignItems: "center", color: "#8d8d8d" }}
    />
  );

  return (
    <FormControlLabel
      sx={{ gap: 2 }}
      control={
        <Switch
          checked={isDarkMode}
          onChange={toggleTheme}
          color="primary"
          size="small"
        />
      }
      label={label}
    />
  );
};

export default ThemeSwitcher;

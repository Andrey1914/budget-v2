"use client";

import React, { useEffect, useState } from "react";
import { FormControlLabel, Switch } from "@mui/material";
import { SwitcherProps } from "@/interfaces";

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
      label={isDarkMode ? "Dark mode" : "Light mode"}
    />
  );
};

export default ThemeSwitcher;

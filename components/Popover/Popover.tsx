import React from "react";
import { Popover, Typography } from "@mui/material";

interface PopoverProps {
  open: boolean;
  anchorEl: HTMLElement | null;
  message: string;
  onClose: () => void;
}

const CustomPopover: React.FC<PopoverProps> = ({
  open,
  anchorEl,
  message,
  onClose,
}) => {
  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
    >
      <Typography sx={{ p: 2, color: "orange" }}>{message}</Typography>
    </Popover>
  );
};

export default CustomPopover;

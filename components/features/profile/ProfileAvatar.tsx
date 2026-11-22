import React from "react";
import { Box, Button, Avatar } from "@mui/material";
import { CloudUpload } from "@mui/icons-material";
import { Oval } from "react-loader-spinner";
import { ProfileAvatarProps } from "./types";
import { VisuallyHiddenInput } from "./styles";

export const ProfileAvatar: React.FC<ProfileAvatarProps> = ({
  avatarUrl,
  isLoading,
  onUpload,
  onDelete,
}) => {
  return (
    <>
      <Box sx={{ py: 5 }}>
        <Avatar
          src={avatarUrl || ""}
          alt="User Avatar"
          sx={{ width: 300, height: 300, margin: "0 auto" }}
        />
      </Box>

      <Box sx={{ display: "flex", justifyContent: "center", pb: 5 }}>
        <Button
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          disabled={isLoading}
        >
          {isLoading ? (
            <Box sx={{ pr: 2 }}>
              <Oval
                height="20"
                width="20"
                color="#1727b7"
                secondaryColor="#6fb5e7"
              />
            </Box>
          ) : (
            <Box sx={{ pr: 2 }}>
              <CloudUpload />
            </Box>
          )}
          Upload files
          <VisuallyHiddenInput
            type="file"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files?.[0]) onUpload(e.target.files[0]);
            }}
          />
        </Button>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "center", pb: 5 }}>
        <Button
          variant="outlined"
          color="error"
          onClick={onDelete}
          disabled={isLoading}
        >
          {isLoading ? (
            <Oval
              height="20"
              width="20"
              color="#1727b7"
              secondaryColor="#6fb5e7"
            />
          ) : (
            "Delete Avatar"
          )}
        </Button>
      </Box>
    </>
  );
};

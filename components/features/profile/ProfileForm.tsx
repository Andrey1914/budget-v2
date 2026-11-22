import React from "react";
import { Box, TextField, Button, Container, Typography } from "@mui/material";
import { Oval } from "react-loader-spinner";
import { CurrencySelector } from "./CurrencySelector";
import { DangerZone } from "./DangerZone";
import { ProfileFormProps } from "./types";

export const ProfileForm: React.FC<ProfileFormProps> = ({
  name,
  onNameChange,
  email,
  createdAt,
  selectedCurrency,
  onCurrencyChange,
  loadingSave,
  onSubmit,
  onChangePassword,
}) => {
  return (
    <Container maxWidth="xs">
      <TextField
        label="Name"
        value={name}
        onChange={(e) => onNameChange(e.target.value)}
        fullWidth
        margin="normal"
      />

      <TextField
        label="Email"
        value={email}
        fullWidth
        margin="normal"
        disabled
      />

      <Typography variant="body1" sx={{ mt: 2 }}>
        Profile created on: <strong>{createdAt || "Loading..."}</strong>
      </Typography>

      <CurrencySelector
        selectedCurrency={selectedCurrency}
        onCurrencyChange={onCurrencyChange}
      />

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "1rem",
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={onSubmit}
          disabled={loadingSave}
        >
          {loadingSave && (
            <Box sx={{ pr: 2 }}>
              <Oval
                height="20"
                width="20"
                color="#1727b7"
                secondaryColor="#6fb5e7"
              />
            </Box>
          )}
          Save Changes
        </Button>

        <Button variant="outlined" color="secondary" onClick={onChangePassword}>
          Change Password
        </Button>
      </Box>

      <Box>
        <DangerZone />
      </Box>
    </Container>
  );
};

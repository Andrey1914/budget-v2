"use client";

import { useRouter } from "next/navigation";
import { Box, Container, Typography } from "@mui/material";

import { ProfileAvatar } from "@/components/Profile/ProfileAvatar";
import { ProfileForm } from "@/components/Profile/ProfileForm";
import { ConfirmModal } from "@/components/UI/Modal";
import SnackbarNotification from "@/components/Notification/Snackbar";
import { useProfile } from "@/hooks/useProfile";

const ProfilePage = () => {
  const router = useRouter();

  const {
    name,
    setName,
    email,
    avatar,
    createdAt,
    selectedCurrency,
    setSelectedCurrency,
    loadingSave,
    loadingAvatar,
    isConfirmOpen,
    setIsConfirmOpen,
    snackbar,
    handleCloseSnackbar,
    handleAvatarUpload,
    handleDeleteAvatar,
    handleSaveChanges,
  } = useProfile();

  return (
    <main>
      <Container maxWidth="md">
        <Box sx={{ py: 4 }}>
          <Typography variant="h2" component="h1" sx={{ textAlign: "center" }}>
            Profile Settings
          </Typography>

          <ProfileAvatar
            avatarUrl={avatar}
            isLoading={loadingAvatar}
            onUpload={handleAvatarUpload}
            onDelete={handleDeleteAvatar}
          />

          <ProfileForm
            name={name}
            onNameChange={setName}
            email={email}
            createdAt={createdAt}
            selectedCurrency={selectedCurrency}
            onCurrencyChange={setSelectedCurrency}
            loadingSave={loadingSave}
            onSubmit={() => setIsConfirmOpen(true)}
            onChangePassword={() => router.push("/auth/reset-password")}
          />
        </Box>
      </Container>

      <ConfirmModal
        open={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleSaveChanges}
        title="Сохранение изменений"
        message="Вы уверены, что хотите сохранить изменения в профиле?"
        confirmText="Сохранить"
        cancelText="Отмена"
      />

      <SnackbarNotification
        open={snackbar.open}
        onClose={handleCloseSnackbar}
        message={snackbar.message}
        severity={snackbar.severity}
      />
    </main>
  );
};

export default ProfilePage;

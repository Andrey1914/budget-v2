export interface RegisterTabProps {
  onSuccessRegistration: () => void;
}

export interface VerifyEmailProps {
  onVerified: () => void;
  onCancel: () => void;
}

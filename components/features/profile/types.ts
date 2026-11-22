export interface ProfileFormProps {
  name: string;
  onNameChange: (value: string) => void;
  email: string;
  createdAt: string;
  selectedCurrency: string;
  onCurrencyChange: (currency: string) => void;
  loadingSave: boolean;
  onSubmit: () => void;
  onChangePassword: () => void;
}

export interface ProfileAvatarProps {
  avatarUrl: string;
  isLoading: boolean;
  onUpload: (file: File) => void;
  onDelete: () => void;
}

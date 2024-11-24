const validateFieldPasswordsMatch = (
  password: string,
  confirmPassword: string,
  setPopoverMessage: (message: string) => void,
  setAnchorEl: (element: HTMLElement | null) => void
): boolean => {
  if (password !== confirmPassword) {
    setPopoverMessage("Passwords do not match.");
    setAnchorEl(document.getElementById("confirm-password"));
    return false;
  }
  return true;
};

export default validateFieldPasswordsMatch;

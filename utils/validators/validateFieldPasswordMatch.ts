// import validator from "validator";

const validateFieldPasswordsMatch = (
  password: string,
  confirmPassword: string,
  setPopoverMessage: (message: string) => void,
  setAnchorEl: (element: HTMLElement | null) => void
): boolean => {
  if (password !== confirmPassword) {
    setPopoverMessage("Passwords do not match.");
    setAnchorEl(document.getElementById("confirmPassword"));
    return false;
  }
  return true;
};

export default validateFieldPasswordsMatch;

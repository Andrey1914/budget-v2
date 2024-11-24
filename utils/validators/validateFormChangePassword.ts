import validateFieldEmail from "@/utils/validators/validateFieldEmail";
import validateFieldPassword from "@/utils/validators/validateFieldPassword";
import validateFieldPasswordsMatch from "@/utils/validators/validateFieldPasswordMatch";

export const validateFormChangePassword = (
  email: string,
  newPassword: string,
  confirmPassword: string,
  setPopoverMessage: (message: string) => void,
  setAnchorEl: (element: HTMLElement | null) => void
): boolean => {
  if (
    !validateFieldEmail(email, setPopoverMessage, setAnchorEl) ||
    !validateFieldPassword(newPassword, setPopoverMessage, setAnchorEl) ||
    !validateFieldPasswordsMatch(
      newPassword,
      confirmPassword,
      setPopoverMessage,
      setAnchorEl
    )
  ) {
    return false;
  }
  setPopoverMessage("");
  setAnchorEl(null);
  return true;
};

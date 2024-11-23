import validateFieldPassword from "@/utils/validators/validateFieldPassword";
import validateFieldPasswordsMatch from "@/utils/validators/validateFieldPasswordMatch";

export const validateFormChangePassword = (
  newPassword: string,
  confirmPassword: string,
  setPopoverMessage: (message: string) => void,
  setAnchorEl: (element: HTMLElement | null) => void
): boolean => {
  if (
    !validateFieldPassword(
      newPassword,
      setPopoverMessage,
      setAnchorEl,
      "newPassword"
    ) ||
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

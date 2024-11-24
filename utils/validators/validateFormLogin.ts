import validateFieldEmail from "@/utils/validators/validateFieldEmail";
// import validateFieldPassword from "@/utils/validators/validateFieldPassword";

export const validateFormLogin = (
  email: string,
  // password: string,
  setPopoverMessage: (message: string) => void,
  setAnchorEl: (element: HTMLElement | null) => void
): boolean => {
  if (
    !validateFieldEmail(email, setPopoverMessage, setAnchorEl)
    // ||
    // !validateFieldPassword(password, setPopoverMessage, setAnchorEl)
  ) {
    return false;
  }
  setPopoverMessage("");
  setAnchorEl(null);
  return true;
};

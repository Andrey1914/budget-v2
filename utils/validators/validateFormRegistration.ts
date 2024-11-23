import validateFieldEmail from "@/utils/validators/validateFieldEmail";
import validateFieldPassword from "@/utils/validators/validateFieldPassword";
import { validateFieldName } from "@/utils/validators/validateFieldName";

export const validateFormRegistration = (
  name: string,
  email: string,
  password: string,
  setPopoverMessage: (message: string) => void,
  setAnchorEl: (element: HTMLElement | null) => void
): boolean => {
  if (
    !validateFieldName(name, setPopoverMessage, setAnchorEl) ||
    !validateFieldEmail(email, setPopoverMessage, setAnchorEl) ||
    !validateFieldPassword(password, setPopoverMessage, setAnchorEl)
  ) {
    return false;
  }
  setPopoverMessage("");
  setAnchorEl(null);
  return true;
};

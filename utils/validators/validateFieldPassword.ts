import validator from "validator";

const validateFieldPassword = (
  password: string,
  setPopoverMessage: (message: string) => void,
  setAnchorEl: (element: HTMLElement | null) => void,
  fieldId?: string
): boolean => {
  if (password && password.length < 8) {
    setPopoverMessage("Password must be at least 8 characters long.");
    setAnchorEl(document.getElementById(fieldId || "password"));
    return false;
  }

  if (password && !validator.isLength(password, { min: 8 })) {
    setPopoverMessage("Password must be at least 8 characters.");
    setAnchorEl(document.getElementById(fieldId || "password"));
    return false;
  }

  if (password && !/(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])/.test(password)) {
    setPopoverMessage(
      "Password must contain at least one digit, one lowercase and one uppercase letter."
    );
    setAnchorEl(document.getElementById(fieldId || "password"));
    return false;
  }

  setPopoverMessage("");
  setAnchorEl(null);
  return true;
};

export default validateFieldPassword;

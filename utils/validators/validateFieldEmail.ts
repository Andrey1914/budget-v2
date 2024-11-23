import validator from "validator";

const validateFieldEmail = (
  email: string,
  setPopoverMessage: (message: string) => void,
  setAnchorEl: (element: HTMLElement | null) => void
): boolean => {
  if (email && !validator.isEmail(email)) {
    setPopoverMessage("Please enter a valid email.");
    setAnchorEl(document.getElementById("email"));
    return false;
  }

  setPopoverMessage("");
  setAnchorEl(null);
  return true;
};

export default validateFieldEmail;

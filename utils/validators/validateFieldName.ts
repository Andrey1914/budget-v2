export const validateFieldName = (
  name: string,
  setPopoverMessage: (message: string) => void,
  setAnchorEl: (element: HTMLElement | null) => void
): boolean => {
  if (name === "") {
    setPopoverMessage("");
    setAnchorEl(null);
    return true;
  }

  if (/\d/.test(name)) {
    setPopoverMessage("Имя не должно содержать цифры.");
    setAnchorEl(document.getElementById("name"));
    return false;
  }

  setPopoverMessage("");
  setAnchorEl(null);
  return true;
};

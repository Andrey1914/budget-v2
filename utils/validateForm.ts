import validator from "validator";

export const validateFormsTransactions = (
  amount: number | string,
  description: string,
  category: string,
  date: string,
  setPopoverMessage: (message: string) => void,
  setAnchorEl: (element: HTMLElement | null) => void
): boolean => {
  if (!amount || isNaN(Number(amount))) {
    setPopoverMessage("Amount is required.");
    setAnchorEl(document.getElementById("amount"));
    return false;
  }

  if (!category) {
    setPopoverMessage("Category is required.");
    setAnchorEl(document.getElementById("category"));
    return false;
  }

  if (!date) {
    setPopoverMessage("Date is required.");
    setAnchorEl(document.getElementById("date"));
    return false;
  }

  if (description && !validator.isLength(description, { min: 1 })) {
    setPopoverMessage("Description must be at least 1 character.");
    setAnchorEl(document.getElementById("description"));
    return false;
  }

  setPopoverMessage("");
  setAnchorEl(null);
  return true;
};

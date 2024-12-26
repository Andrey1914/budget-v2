export interface PopoverProps {
  open: boolean;
  anchorEl: HTMLElement | null;
  message: string;
  onClose: () => void;
}

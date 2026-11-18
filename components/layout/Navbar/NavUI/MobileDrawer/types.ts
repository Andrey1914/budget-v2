import { Session } from "next-auth";
import { NavLinkItem } from "../NavLinks/types";

export interface MobileDrawerProps {
  open: boolean;
  onClose: () => void;
  session: Session | null;
  links: NavLinkItem[];
  mobileLinks: NavLinkItem[];
  isDarkMode: boolean;
  toggleTheme: () => void;
  onOpenAuthModal: () => void;
}

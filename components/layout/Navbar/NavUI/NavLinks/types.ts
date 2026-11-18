export interface NavLinkItem {
  href: string;
  label: string;
}

export interface NavLinksProps {
  items: NavLinkItem[];
  isMobileList?: boolean;
}

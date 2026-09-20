import { useState } from "react";
import { useRouter } from "@/i18n/navigation";
import { signOut } from "next-auth/react";
import { useTranslations } from "next-intl";

import {
  Menu,
  MenuItem,
  Avatar,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  Logout,
  Settings,
  BarChart,
  RateReview,
  History,
} from "@mui/icons-material";
import { LanguageSwitcher } from "@/components/LanguageSelector/LanguageSwitcher";

import { UserMenuProps } from "@/interfaces";

const UserMenu: React.FC<UserMenuProps> = ({ userName, userImage }) => {
  const tLinks = useTranslations("common.links");
  const tCommon = useTranslations("common.buttons");

  const router = useRouter();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const userInitial = userName?.charAt(0).toUpperCase() || "?";

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAnalytics = () => {
    handleClose();
    router.push("/dashboard/analytics");
  };

  const handleReviews = () => {
    handleClose();
    router.push("/dashboard/reviews");
  };

  const handleHistory = () => {
    handleClose();
    router.push("/dashboard/history");
  };

  const handleProfile = () => {
    handleClose();
    router.push("/dashboard/profile");
  };

  return (
    <>
      <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }}>
        <Avatar src={userImage || undefined} alt={userName || "User"}>
          {!userImage && userInitial}
        </Avatar>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        onClick={handleClose}
        autoFocus={false}
        disableAutoFocusItem
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 2,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -4,
                mr: 1,
              },
              "&:before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleProfile}>
          <Settings sx={{ mr: 1 }} /> {tLinks("profile")}
        </MenuItem>
        <MenuItem onClick={handleHistory}>
          <History sx={{ mr: 1 }} /> {tLinks("history")}
        </MenuItem>
        <MenuItem onClick={handleAnalytics}>
          <BarChart sx={{ mr: 1 }} /> {tLinks("analytics")}
        </MenuItem>
        <MenuItem onClick={handleReviews}>
          <RateReview sx={{ mr: 1 }} /> {tLinks("reviews")}
        </MenuItem>
        <MenuItem onClick={() => signOut()}>
          <Logout sx={{ mr: 1 }} /> {tCommon("logout")}
        </MenuItem>

        {isMobile && (
          <MenuItem>
            <LanguageSwitcher />
          </MenuItem>
        )}
      </Menu>
    </>
  );
};

export default UserMenu;

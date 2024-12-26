import { useState } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  Menu,
  MenuItem,
  Avatar,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import {
  Logout,
  Settings,
  BarChart,
  RateReview,
  History,
} from "@mui/icons-material";

import theme from "@/app/styles/theme";

import { UserMenuProps } from "@/interfaces";

const UserMenu: React.FC<UserMenuProps> = ({ userName, userImage }) => {
  const router = useRouter();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const userInitial = userName?.charAt(0).toUpperCase() || "?";

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  if (isMobile) {
    return (
      <Avatar src={userImage || undefined} alt={userName || "User"}>
        {!userImage && userInitial}
      </Avatar>
    );
  }

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleAnalytics = () => {
    handleMenuClose();
    router.push("/dashboard/analytics");
  };

  const handleReviews = () => {
    handleMenuClose();
    router.push("/dashboard/reviews");
  };

  const handleHistory = () => {
    handleMenuClose();
    router.push("/dashboard/history");
  };

  const handleProfileSettings = () => {
    handleMenuClose();
    router.push("/dashboard/profile");
  };

  const handleLogout = () => {
    handleMenuClose();
    signOut({ callbackUrl: "/landing" });
  };

  return (
    <>
      <IconButton onClick={handleMenuOpen}>
        <Avatar src={userImage || undefined} alt={userName || "User"}>
          {!userImage && userInitial}
        </Avatar>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleAnalytics} sx={{ gap: 2 }}>
          <BarChart />
          Analytics
        </MenuItem>
        <MenuItem onClick={handleReviews} sx={{ gap: 2 }}>
          <RateReview />
          Reviews
        </MenuItem>
        <MenuItem onClick={handleHistory} sx={{ gap: 2 }}>
          <History />
          History
        </MenuItem>
        <MenuItem onClick={handleProfileSettings} sx={{ gap: 2 }}>
          <Settings />
          Settings
        </MenuItem>
        <MenuItem onClick={handleLogout} sx={{ gap: 2 }}>
          <Logout />
          LogOut
        </MenuItem>
      </Menu>
    </>
  );
};

export default UserMenu;

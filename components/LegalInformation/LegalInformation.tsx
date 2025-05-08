"use client";

import { useRouter } from "next/navigation";
import { Link, List, ListItem, useTheme } from "@mui/material";

const LegalInformation: React.FC = () => {
  const router = useRouter();

  const theme = useTheme();

  const handleLinkAgreement = () => {
    router.push("/landing/user-agreement");
  };

  const handleLinkPrivacy = () => {
    router.push("/landing/privacy");
  };

  const handleLinkCookie = () => {
    router.push("/landing/cookie");
  };

  const handleLinkLicense = () => {
    router.push("/landing/license");
  };

  const links = [
    {
      text: "Умови використання",
      handler: () => handleLinkAgreement(),
    },
    {
      text: "Політика конфіденційності",
      handler: () => handleLinkPrivacy(),
    },
    {
      text: "cookie",
      handler: () => handleLinkCookie(),
    },
    {
      text: "Ліцензійна угода",
      handler: () => handleLinkLicense(),
    },
  ];

  return (
    <List
      sx={{
        display: "flex",
        flexDirection: "row",
        gap: theme.spacing(6),
      }}
    >
      {links.map((link, index) => (
        <ListItem key={index} sx={{ p: 0, whiteSpace: "nowrap" }}>
          <Link
            onClick={link.handler}
            underline="hover"
            target="_blank"
            sx={{
              cursor: "pointer",
              whiteSpace: "nowrap",
            }}
          >
            {link.text}
          </Link>
        </ListItem>
      ))}
    </List>
  );
};

export default LegalInformation;

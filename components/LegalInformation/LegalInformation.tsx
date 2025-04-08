"use client";

import { useRouter } from "next/navigation";
import { Box, Link, List, ListItem } from "@mui/material";

const LegalInformation: React.FC = () => {
  const router = useRouter();

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
      text: "Політика в отношении файлов cookie",
      handler: () => handleLinkCookie(),
    },
    {
      text: "Ліцензійна угода",
      handler: () => handleLinkLicense(),
    },
  ];

  return (
    <Box>
      <List sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        {links.map((link, index) => (
          <ListItem key={index}>
            <Link onClick={link.handler} underline="hover" target="_blank">
              {link.text}
            </Link>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default LegalInformation;

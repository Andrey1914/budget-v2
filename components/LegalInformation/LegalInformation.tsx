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

  return (
    <Box>
      <List sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <ListItem>
          <Link
            onClick={() => handleLinkAgreement()}
            underline="hover"
            target="_blank"
          >
            Условия использования
          </Link>
        </ListItem>
        <ListItem>
          <Link
            onClick={() => handleLinkPrivacy()}
            underline="hover"
            target="_blank"
          >
            Политика конфиденциальности
          </Link>
        </ListItem>
        <ListItem>
          <Link
            onClick={() => handleLinkCookie()}
            underline="hover"
            target="_blank"
          >
            Политика в отношении файлов cookie
          </Link>
        </ListItem>
        <ListItem>
          <Link
            onClick={() => handleLinkLicense()}
            underline="hover"
            target="_blank"
          >
            Лицензионное соглашение
          </Link>
        </ListItem>
      </List>
    </Box>
  );
};

export default LegalInformation;

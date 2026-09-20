import { Link, List, ListItem, useTheme } from "@mui/material";
import { useLegalLinks } from "@/hooks/useLegalLinks";

const LegalInformation: React.FC = () => {
  const links = useLegalLinks();
  const theme = useTheme();

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

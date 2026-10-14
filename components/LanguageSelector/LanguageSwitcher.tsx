// "use client";

import React, { useTransition } from "react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { GB, UA, RU } from "country-flag-icons/react/3x2";
import {
  Box,
  Typography,
  MenuItem,
  Select,
  SelectChangeEvent,
  FormControl,
} from "@mui/material";

export const LanguageSwitcher: React.FC = () => {
  const t = useTranslations("common.switcher");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const handleLanguageChange = (e: SelectChangeEvent<string>) => {
    const nextLocale = e.target.value;
    if (nextLocale === locale) return;

    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }

    document.cookie = `NEXT_LOCALE=${nextLocale}; path=/; max-age=31536000; SameSite=Lax`;

    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  };

  return (
    <FormControl size="small" variant="outlined">
      <Select
        value={locale}
        onChange={handleLanguageChange}
        disabled={isPending}
        sx={{ minWidth: 120 }}
        MenuProps={{
          disableScrollLock: true,
          disableAutoFocusItem: true,
          disableRestoreFocus: true,
        }}
      >
        <MenuItem value="en">
          <Box display="flex" alignItems="center" gap={1}>
            <GB title={t("english")} style={{ width: 20, borderRadius: 2 }} />
            <Typography variant="body2">{t("english")}</Typography>
          </Box>
        </MenuItem>

        <MenuItem value="uk">
          <Box display="flex" alignItems="center" gap={1}>
            <UA title={t("ukrainian")} style={{ width: 20, borderRadius: 2 }} />
            <Typography variant="body2">{t("ukrainian")}</Typography>
          </Box>
        </MenuItem>

        <MenuItem value="ru">
          <Box display="flex" alignItems="center" gap={1}>
            <RU title={t("russian")} style={{ width: 20, borderRadius: 2 }} />
            <Typography variant="body2">{t("russian")}</Typography>
          </Box>
        </MenuItem>
      </Select>
    </FormControl>
  );
};

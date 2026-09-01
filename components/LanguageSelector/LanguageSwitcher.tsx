"use client";

import React, { useTransition } from "react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import {
  MenuItem,
  Select,
  SelectChangeEvent,
  FormControl,
} from "@mui/material";

export const LanguageSwitcher: React.FC = () => {
  const t = useTranslations("Common");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const handleLanguageChange = (event: SelectChangeEvent<string>) => {
    const nextLocale = event.target.value;

    startTransition(() => {
      const currentPath = pathname ?? `/${locale}`;
      const segments = currentPath.split("/");

      if (segments.length > 1) {
        segments[1] = nextLocale;
      } else {
        segments.push(nextLocale);
      }

      const newPathname = segments.join("/");
      router.push(newPathname);
    });
  };

  return (
    <FormControl size="small" variant="outlined">
      <Select
        value={locale}
        onChange={handleLanguageChange}
        disabled={isPending}
        sx={{ minWidth: 120 }}
      >
        <MenuItem value="uk">{t("ukrainian")}</MenuItem>
        <MenuItem value="en">{t("english")}</MenuItem>
        <MenuItem value="ru">{t("russian")}</MenuItem>
      </Select>
    </FormControl>
  );
};

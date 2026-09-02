"use client";

import React, { useTransition } from "react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "@/i18n/navigation";
import {
  MenuItem,
  Select,
  SelectChangeEvent,
  FormControl,
} from "@mui/material";

export const LanguageSwitcher: React.FC = () => {
  const t = useTranslations("Common");
  const locale = useLocale();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const handleLanguageChange = (event: SelectChangeEvent<string>) => {
    const nextLocale = event.target.value;

    startTransition(() => {
      // Build the public URL explicitly. This avoids the router briefly using
      // the old locale before middleware resolves the new request.
      const path = pathname ?? "/landing";
      const normalizedPath = path.startsWith("/") ? path : `/${path}`;
      const pathWithoutLocale = normalizedPath.replace(
        /^\/(en|uk|ru)(?=\/|$)/,
        "",
      ) || "/landing";
      window.location.assign(`/${nextLocale}${pathWithoutLocale}`);
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

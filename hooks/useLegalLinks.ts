import { useRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

export interface LegalLink {
  text: string;
  handler: () => void;
}

export const useLegalLinks = (): LegalLink[] => {
  const tLinks = useTranslations("common.links");
  const router = useRouter();

  return [
    {
      text: tLinks("terms"),
      handler: () => router.push("/landing/user-agreement"),
    },
    {
      text: tLinks("privacy"),
      handler: () => router.push("/landing/privacy"),
    },
    {
      text: tLinks("cookie"),
      handler: () => router.push("/landing/cookie"),
    },
    {
      text: tLinks("license"),
      handler: () => router.push("/landing/license"),
    },
  ];
};

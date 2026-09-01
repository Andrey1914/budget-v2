import { useTranslations } from "next-intl";

export default function NotFound() {
  const t = useTranslations("Common");
  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h1>404 - Page Not Found</h1>
    </div>
  );
}

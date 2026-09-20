import { Locale } from "./request";

export async function getMessagesForLocale(locale: Locale) {
  const files = ["common", "landing", "auth", "dashboard"];

  const modules = await Promise.all(
    files.map(async (file) => {
      try {
        const content = await import(`@/messages/${locale}/${file}.json`);
        return { [file]: content.default };
      } catch {
        return {};
      }
    }),
  );

  return Object.assign({}, ...modules);
}

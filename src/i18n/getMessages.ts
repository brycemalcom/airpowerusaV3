import type { Locale } from "./locales";

export async function getMessages(locale: Locale) {
  switch (locale) {
    case "es":
      return (await import("../../messages/es.json")).default;
    case "en":
    default:
      return (await import("../../messages/en.json")).default;
  }
}



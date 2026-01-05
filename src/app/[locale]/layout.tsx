import { NextIntlClientProvider } from "next-intl";
import type { AbstractIntlMessages } from "next-intl";
import { getMessages } from "@/i18n/getMessages";
import { locales, type Locale, defaultLocale } from "@/i18n/locales";
import type { ReactNode } from "react";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params
}: any) {
  // Support Next typed routes that may pass params as a Promise or a plain object
  const resolved = typeof params?.then === "function" ? await params : params;
  const rawLocale = resolved?.locale as string | undefined;
  const locale = (rawLocale && (locales as readonly string[]).includes(rawLocale))
    ? (rawLocale as Locale)
    : defaultLocale;
  if (!locales.includes(locale)) {
    // Fallback to default if an unsupported locale is accessed
    return children;
  }

  const messages: AbstractIntlMessages = await getMessages(locale);
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}



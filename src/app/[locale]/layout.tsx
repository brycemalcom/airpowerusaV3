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
}: {
  children: ReactNode;
  params: Promise<{ locale: Locale }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = (rawLocale && locales.includes(rawLocale)) ? rawLocale : defaultLocale;
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



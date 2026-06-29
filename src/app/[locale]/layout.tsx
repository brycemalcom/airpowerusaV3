import { NextIntlClientProvider } from "next-intl";
import type { AbstractIntlMessages } from "next-intl";
import { getMessages } from "@/i18n/getMessages";
import { locales, type Locale, defaultLocale } from "@/i18n/locales";
import type { ReactNode } from "react";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

// Next 15 typed routes pass params as a Promise<any>. Use string for raw locale then validate.
type RouteParams = Promise<{ locale: string }>;

export default async function LocaleLayout({
  children,
  params
}: {
  children: ReactNode;
  params: RouteParams;
}) {
  const { locale: raw } = await params;
  const locale = (locales as readonly string[]).includes(raw) ? (raw as Locale) : defaultLocale;
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



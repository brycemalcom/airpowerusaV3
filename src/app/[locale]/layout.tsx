import { NextIntlClientProvider } from "next-intl";
import type { AbstractIntlMessages } from "next-intl";
import { getMessages } from "@/i18n/getMessages";
import { locales, type Locale, defaultLocale } from "@/i18n/locales";
import type { ReactNode } from "react";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

type Params = { locale: Locale } | Promise<{ locale: Locale }>;

function isPromise<T>(value: T | Promise<T>): value is Promise<T> {
  // Narrow using existence of 'then' without using 'any'
  return typeof (value as Promise<T>).then === "function";
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: ReactNode;
  params: Params;
}) {
  const resolved = isPromise(params) ? await params : params;
  const raw = resolved.locale as string;
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



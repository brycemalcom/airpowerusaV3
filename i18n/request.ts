import { getRequestConfig } from 'next-intl/server';
import { defaultLocale, locales } from '../i18n';

export default getRequestConfig(async ({ requestLocale }) => {
  const candidate = requestLocale as (typeof locales)[number] | undefined;
  const locale = candidate && (locales as readonly string[]).includes(candidate) ? candidate : defaultLocale;
  const messages = (await import(`../messages/${locale}.json`)).default;
  return {
    locale,
    messages,
    timeZone: 'UTC'
  };
});



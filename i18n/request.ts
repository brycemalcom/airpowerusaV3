import { getRequestConfig } from 'next-intl/server';
import { defaultLocale, locales } from '../i18n';

export default getRequestConfig(async ({ requestLocale }) => {
  const resolved = typeof requestLocale === 'string' ? requestLocale : await requestLocale;
  const candidate = resolved && (locales as readonly string[]).includes(resolved)
    ? (resolved as (typeof locales)[number])
    : undefined;
  const locale = candidate ?? defaultLocale;
  const messages = (await import(`../messages/${locale}.json`)).default;
  return {
    locale,
    messages,
    timeZone: 'UTC'
  };
});



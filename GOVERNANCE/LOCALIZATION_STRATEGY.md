# Localization Strategy

Last updated: 2026-05-08

Purpose: capture the current i18n state and guide the path toward a mature international site.

## Current State

Spanish is active in production and should not be treated as parked.

Current locale setup:

- Locales: `en`, `es`
- Default locale: `en`
- Message files: `messages/en.json`, `messages/es.json`
- Locale-prefixed routes exist under `src/app/[locale]`.
- Root routes use `DefaultIntlProvider` so English messages work on non-locale routes.
- Header language switcher links between `/en/...` and `/es/...`.

Current limitation:

- The implementation should be audited for completeness, route parity, SEO behavior, metadata, and translation quality.

## Long-Term Goal

The company is international. The ideal future state is broad multilingual support for global audiences.

Practical target:

- Keep approved English source copy canonical.
- Add reviewed translations for priority languages.
- Avoid uncontrolled machine translation for investor, public-company, or technical claims.
- Make route, metadata, and SEO behavior intentional for each supported locale.

## Review Rules

Higher-review translation categories:

- Investor/offering copy.
- CETI/public-company copy.
- Technical performance claims.
- Press releases.
- Legal disclaimers.
- QR and print materials.

These require controlled translation and approval, not casual rewrite.

## Next Audit

Audit:

- Which routes have `/en` and `/es` versions.
- Whether root routes and locale routes show consistent content.
- Whether Spanish translations are complete.
- Whether language switcher preserves paths correctly.
- Whether metadata/canonical URLs use `airpowerusa.net`.
- Whether future language additions should use message files, CMS/content files, or a translation pipeline.

## Future Language Expansion

Recommended path:

1. Finish English source cleanup.
2. Audit Spanish.
3. Decide priority languages by business need.
4. Add structured translation workflow.
5. Add locale-aware metadata and sitemap strategy.
6. Keep investor/public-company/technical translations review-gated.

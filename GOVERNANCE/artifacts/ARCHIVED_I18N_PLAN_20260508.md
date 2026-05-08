# Internationalization (i18n) Rollout Plan

Goal: Add Spanish (and future French) versions of the existing site without risking the current English production experience.

## Approach
- Framework: Next.js App Router + next-intl
- Locales: en (default), es (phase 1), fr (future)
- Routing: locale subpaths → /en/..., /es/... (SEO‑friendly, hreflang ready)
- Toggle: Language switcher in header that preserves the current path
- Middleware: Optional auto‑redirect of / to preferred locale (can be enabled later)

## Non‑Disruptive Rollout
- Work happens on a feature branch; production (master) remains unchanged until approved.
- Phase 1: Scaffold i18n provider and messages, migrate only Header/Footer/Home.
- Phase 2: Migrate remaining sections incrementally (Videos, Newsroom, etc.).
- Fallbacks: If a key is missing in es, default to en to avoid broken UI.

## File/Dir Changes (scaffold)
- src/app/[locale]/layout.tsx wraps the app with NextIntlClientProvider.
- Move current routes under [locale] group with default en mapping.
- Messages: messages/en.json, messages/es.json.
- Header toggle: updates locale in the URL and preserves pathname (/newsroom ↔ /es/newsroom).

## Content Strategy
- Static copy → translation keys in messages.
- Dynamic content:
  - Press Releases: keep current English HTML; add localized HTML under public/press/es/... when available; select file by locale.
  - Video titles/descriptions: per‑locale keys or small override map.
- Dates/numbers: use next-intl formatting.

## SEO
- Add hreflang for /en/*, /es/* and canonical URLs.
- Optional: sitemap entries per locale.

## Rollback Plan
- Revert the feature branch merge (no migrations alter data or API contracts).
- If middleware redirect is enabled later, it can be toggled off by removing the rule.

## Testing Checklist
- /en and /es both render; header/footer/home text translated.
- Language switcher preserves the current path.
- Fallback to English when a key is missing.
- No CLS/layout shifts; Lighthouse within baseline.
- Newsroom/videos pages still work; deep links remain functional across locales.

## Estimated Effort (Phase 1)
- Scaffold + provider + toggle: ~0.5–1 day
- Extract keys for Header/Footer/Home + translations: ~1 day
- PR review + deploy: ~0.5 day

## How to Add Translations
1) Update messages/es.json with keys matching en.json.
2) For dynamic assets (press/video), add localized files/strings and reference by locale.

---
Maintainer notes: This plan is designed to be reversible and incremental; production will not change until the PR is merged.

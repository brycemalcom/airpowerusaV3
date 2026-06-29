# Project State

Last updated: 2026-05-08

## Current App

The repo currently implements the AirPower USA public website and funnels. It is a Next.js App Router app using root English routes plus locale-prefixed routes for English and Spanish.

Canonical public domain:

- `airpowerusa.net`

Deployment platform:

- Vercel

Production branch:

- `master`

Deployment source repo:

- `https://github.com/brycemalcom/airpowerusaV3`

## Routes

Public and marketing:

- `/` - main AirPower USA homepage.
- `/about` - AirPower company/about page.
- `/customer` - customer inquiry portal.
- `/contact` - general contact page.
- `/newsroom` - media hub with press releases, external coverage, industry reads, and video section.
- `/videos` - video gallery.

Investor and filing:

- `/invest` - investor portal.
- `/lp/ai-clean-energy` - investor landing page with A/B variant logic.
- `/filings` - SEC filing page for Air Power USA Form D details.
- `/investor-faqs` - investor FAQ page.

Locale-prefixed:

- `/en`
- `/es`
- `/en/about`, `/es/about`
- `/en/customer`, `/es/customer`
- `/en/newsroom`, `/es/newsroom`
- `/en/videos`, `/es/videos`
- `/en/filings`, `/es/filings`
- `/en/investor-faqs`, `/es/investor-faqs`

Planned:

- `/data-centers` - QR-only data-center conference landing page. Not implemented yet. Intended public URL: `https://airpowerusa.net/data-centers`. Do not add to global nav unless approved.

No current routes exist for:

- CETI standalone site.
- Drax standalone site.
- Graphene-specific Drax media funnel.

## Current Navigation

Global header navigation links to site sections/pages such as technology, use cases, products, newsroom, videos, and about.

The hamburger menu includes:

- For Customers
- For Investors
- Investor FAQs
- SEC Filings
- Newsroom
- Video Gallery

Campaign-only routes should remain outside global navigation until approved.

## Forms And GHL

General contact:

- UI: `src/app/contact/page.tsx`
- API: `/api/ghl/submit-inquiry`
- Inquiry kind: `general`
- GHL tag: `contact`
- Source: `Main website - General inquiry (Contact)`

Customer inquiry:

- UI: `src/components/sections/InquiryForm.tsx`
- API: `/api/ghl/submit-inquiry`
- Inquiry kind: `customer`
- GHL tag: `customer`
- Source: `Main website - Customer inquiry`

Investor lead:

- UI: `src/components/investor/GhlInvestorLeadForm.tsx`
- API: `/api/ghl/submit-lead`
- GHL tags: `investor-lead` plus landing-page variant.
- GHL pipeline: `AirPower Investor Pipeline`
- GHL stage: `New Lead`

Current gap:

- `submit-inquiry` does not yet support campaign/source attribution for data-center or future campaign leads.

Data-center lead recommendation:

- Route as a customer inquiry plus data-center campaign lead.
- Add GHL tags such as `customer`, `data-center`, and a campaign-specific tag.
- Add a source string such as `Data Center Conference - airpowerusa.net/data-centers`.
- Add custom fields for campaign key, page URL, UTM values, role/title, project type, and form message where GHL supports them.
- Trigger admin notification from a GHL workflow based on tag/source if possible.

## Anti-Spam

Forms use:

- Honeypot field.
- Minimum submit elapsed time.
- In-memory rate limit.
- Optional Cloudflare Turnstile.

Relevant files:

- `src/components/forms/FormAntiSpam.tsx`
- `src/lib/form-submission-guard.ts`
- `src/lib/form-submission-guard-constants.ts`

## Environment Variables

Variable names observed locally:

- `GHL_API_KEY`
- `GHL_LOCATION_ID`
- `NEXT_PUBLIC_INVESTOR_CALENDAR_URL`
- `NEXT_PUBLIC_TURNSTILE_SITE_KEY`
- `TURNSTILE_SECRET_KEY`
- `HUBSPOT_PORTAL_ID`
- `HUBSPOT_FORM_GUID`
- `HUBSPOT_CUSTOMER_FORM_GUID`

The HubSpot variables appear legacy. Current form submission code uses GHL.

## Media And Content

Static media:

- `public/media/images`
- `public/media/videos`
- `public/press`

Press release entries are currently maintained directly in:

- `src/components/sections/NewsSection.tsx`

Press HTML files are served from:

- `public/press/*.html`

Current content maintenance gap:

- Newsroom data is embedded in a React component rather than a separate structured content source.

## i18n State

Locales:

- `en`
- `es`

Message files:

- `messages/en.json`
- `messages/es.json`

Root non-locale routes are wrapped in a default English provider so components using `useTranslations` still work.

Current i18n status:

- Spanish is active in production through the language switcher and `/es` routes.
- Spanish should not be treated as parked.
- The current implementation is partial and should be audited before expanding.

Long-term localization goal:

- Support international audiences across many languages where practical, while keeping legal-sensitive investor/public-company/technical claims controlled and reviewable.

See `GOVERNANCE/LOCALIZATION_STRATEGY.md`.

## Historical/Stale Files

Stale root notes have been archived under `GOVERNANCE/artifacts/`:

- `ARCHIVED_DEV_SERVER_NOTES_20260508.md`
- `ARCHIVED_I18N_PLAN_20260508.md`
- `ARCHIVED_NETLIFY_STATUS_TATUS_20260508.txt`
- `ARCHIVED_PRESS_RELEASES_NOTES_20260508.md`
- `ARCHIVED_TEMP_INVESTOR_HIDE_20260508.md`

Current replacements:

- `README.md`
- `GOVERNANCE/LOCAL_DEV_RUNBOOK.md`
- `GOVERNANCE/LOCALIZATION_STRATEGY.md`
- `GOVERNANCE/PRESS_AND_NEWSROOM_WORKFLOW.md`

## Current Validation Baseline

Observed on 2026-05-07:

```text
npm run lint       passed
npx tsc --noEmit  passed
```

`next lint` reports a deprecation warning for future Next.js versions. This is not currently blocking.

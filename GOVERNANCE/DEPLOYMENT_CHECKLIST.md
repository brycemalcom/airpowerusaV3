# Deployment Checklist

Last updated: 2026-05-08

Use this before deploying production-facing changes.

## Confirm Scope

- Identify changed routes.
- Identify changed forms or API routes.
- Identify changed metadata, domains, or redirects.
- Identify any investor, public-company, or technical claims.
- Confirm whether the change is public, preview-only, QR-only, or parked.

## Environment

Confirm required environment variables exist in the deployment target:

- `GHL_API_KEY`
- `GHL_LOCATION_ID`
- `NEXT_PUBLIC_INVESTOR_CALENDAR_URL`
- `NEXT_PUBLIC_TURNSTILE_SITE_KEY`
- `TURNSTILE_SECRET_KEY`

If Turnstile secret is configured, the public site key must also be configured or forms will fail verification.

## Domain

Canonical production domain:

- `https://airpowerusa.net`

Use `.net` for new campaign URLs, QR codes, metadata cleanup, investor materials, and print collateral unless explicitly approved otherwise.

## Vercel

Deployment platform:

- Vercel

Owner-reported project/account:

- `airpowerusa-v3`

Production branch:

- `master`

Deployment source repo:

- `https://github.com/brycemalcom/airpowerusaV3`

Validation note:

- Current local Vercel CLI login does not show `airpowerusa-v3`; confirm production deployment wiring in the Vercel dashboard or with the correct Vercel scope/token before relying on CLI output.

## Validation Commands

Run:

```powershell
npm run lint
npx tsc --noEmit
npm run build
```

Known current note:

- `next lint` emits a Next.js deprecation warning. Passing lint is still required until the lint script is migrated.

## Route Smoke Tests

Smoke current key routes after local build or dev server:

- `/`
- `/customer`
- `/contact`
- `/invest`
- `/lp/ai-clean-energy`
- `/newsroom`
- `/filings`
- `/investor-faqs`
- `/videos`

For locale changes, also smoke:

- `/en`
- `/es`
- `/en/newsroom`
- `/es/newsroom`

For the data-center campaign, smoke:

- `/data-centers`
- `/data-centers?utm_source=qr&utm_medium=print&utm_campaign=data_centers_convention`
- `https://airpowerusa.net/data-centers` after deploy.

## Form Smoke Tests

Do not spam production GHL.

Before production:

- Test locally or in preview where practical.
- Confirm required fields and validation errors.
- Confirm anti-spam fields are included.
- Confirm success state.
- Confirm API error messages are user-readable.

For GHL-connected smoke tests:

- Use an obvious test name/email.
- Verify GHL contact tag/source/campaign fields.
- Delete or mark test records if needed.

## Campaign / QR Checklist

Before printing or distributing campaign materials:

- Confirm final production URL.
- Confirm production URL uses `airpowerusa.net`.
- Confirm whether UTM parameters are used.
- Confirm page is live and returns 200.
- Confirm mobile rendering.
- Confirm form submission and source attribution.
- Scan QR with a phone.
- Record QR target and asset approval status in governance.

## Content Review

Before deploy, confirm:

- Customer pages do not contain investor-only claims unless intended.
- Investor pages include required disclaimers and correct terms.
- CETI/public-company statements match approved releases or filings.
- Technical claims have approved sources.
- Contact emails, phone numbers, and domains are correct.

## Post-Deploy

After deploy:

- Visit production URLs.
- Confirm no broken navigation.
- Confirm analytics loads if relevant.
- Submit a controlled form test if approved.
- Check server/deployment logs for form or rendering errors.
- Update `SESSION_STATE.md` with validation and deployment status.

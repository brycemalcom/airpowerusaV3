# AirPower USA Media Hub

This repo currently hosts the AirPower USA public website, customer and investor funnels, newsroom, filings, videos, and campaign landing pages. It is being expanded into a broader marketing and media workspace for AirPower USA, CETI / Cyber Enviro-Tech, and future Drax Industries work.

Canonical public domain:

```text
airpowerusa.net
```

Start every session here:

```text
GOVERNANCE/START_HERE.md
```

## Stack

- Next.js 15 App Router
- React 19
- TypeScript
- Tailwind CSS
- next-intl
- Vercel Analytics
- GoHighLevel / LeadConnector forms
- Optional Cloudflare Turnstile form protection

## Local Development

```powershell
npm install
npm run dev
```

Default local URL:

```text
http://localhost:3000
```

## Validation

```powershell
npm run lint
npx tsc --noEmit
npm run build
```

## Deployment

Owner-reported deployment:

- Platform: Vercel
- Production branch: `master`
- GitHub repo: `https://github.com/brycemalcom/airpowerusaV3`
- Vercel project/account: `airpowerusa-v3`

The local Vercel CLI currently shows a different visible scope, so dashboard validation is still recorded in governance.

## Governance

The active source of truth lives in `GOVERNANCE/`.

Archived or stale handoffs live under `GOVERNANCE/artifacts/` and are not active instructions unless promoted into current governance docs.

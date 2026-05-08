# Session State

Last updated: 2026-05-08

## Current Objective

Create a lightweight but expandable governance layer for this growing marketing and media project, based on actual repo state and owner-confirmed context.

After governance baseline:

1. Review truth gaps with owner.
2. Build the `/data-centers` QR-only conference landing page.
3. Add GHL campaign attribution if needed for the data-center funnel.

## Owner Direction Captured

- The project is broader than a single AirPower website.
- It should support AirPower USA, CETI, and Drax-related marketing/media/funnel work over time.
- CETI means Cyber Enviro-Tech.
- Governance should let any future engineer or agent know what the project is, where it has been, where it is now, and where it is going.
- Old handoff artifacts should not be treated as gospel.
- Repo hygiene and project continuity matter as the business grows.
- The immediate campaign need is a data-center conference landing page, but governance comes first.
- Canonical public domain is `airpowerusa.net`.
- Deployment platform is Vercel.
- Future generated media, print materials, video, and investor materials should be governed and tracked.
- `master` is treated as production branch and Vercel is expected to auto-deploy from it.
- Vercel project/account is owner-reported as `airpowerusa-v3`.
- GitHub deployment source is `https://github.com/brycemalcom/airpowerusaV3`.
- Governance changes should be committed every session.
- Use feature branches for production-affecting work; direct `master` commits are acceptable for governance/doc-only work.
- Roger Pawson is final approval authority for claims and public materials.
- Spanish/i18n is active in production and needs audit/maturation, not parking.

## Repo Status Observed

Current path:

```text
C:\Users\bryce\OneDrive\Documents\airpowerusa-v2
```

Current branch:

```text
master
```

Current HEAD:

```text
9863f62 Newsroom: April 21 CETI press release on AirPower and U.S. energy policy
```

Remotes:

```text
origin https://github.com/brycemalcom/airpowerusaV3.git
v3     https://github.com/brycemalcom/airpowerusaV3.git
```

Working tree before governance edits:

```text
 M src/app/api/ghl/submit-lead/route.ts
?? GOVERNANCE/
```

Note:

- `src/app/api/ghl/submit-lead/route.ts` appears to be line-ending normalization only when checked with whitespace-insensitive Git diff.

## Validation Baseline

Observed on 2026-05-07 before governance doc edits:

```text
npm run lint       passed
npx tsc --noEmit  passed
```

Warnings:

- `next lint` is deprecated and will be removed in Next.js 16.
- ESLint output says the Next.js plugin was not detected in the ESLint configuration.

## Work Completed This Session

- Read the initial handoff artifact.
- Inspected repo tree, routes, key forms, GHL API routes, app config, middleware, i18n setup, deployment config, Git remotes, branch state, and recent Git history.
- Confirmed the old artifact should be treated as historical context only.
- Created initial governance docs.
- Promoted owner-confirmed `.net` domain and Vercel deployment truths.
- Added explicit media-generation workflow governance.
- Marked artifacts as archived/historical rather than active instructions.
- Checked Vercel CLI: installed as 41.7.0 and logged in as `glacierandember`.
- Vercel CLI visible scope showed `glacier-and-embers-projects/airpowerusa`, not owner-reported `airpowerusa-v3`; dashboard/correct scope validation still needed.
- Replaced stale root `README.md` with a current project entry point.
- Archived stale root notes for old dev server, i18n plan, press release notes, Netlify status, and temporary investor hide state.
- Added current localization, press/newsroom, and local dev runbook docs.

## Immediate Next Step

Review these governance docs with the owner, confirm truth gaps, then implement `/data-centers`.

## Confirmation Needed

- Vercel dashboard/correct scope validation for `airpowerusa-v3`, domain mappings, and Git auto-deploy.
- Whether `v3` remote should remain.
- Whether old Netlify references are historical only.
- Exact new project/repo name going forward.
- Drax naming, scope, and current source materials.
- Data-center conference name, date, city, and audience.

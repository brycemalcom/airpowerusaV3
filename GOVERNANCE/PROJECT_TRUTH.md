# Project Truth

Last updated: 2026-05-08

This is the canonical context document for the project. If another file disagrees with this one, treat this file as current unless the code or owner says otherwise.

## Project Identity

This repo is currently named `airpowerusa-v2`, but the project is broader than one website. It is becoming a marketing, media, campaign, funnel, investor/customer communications, and asset-production workspace for multiple related business entities.

Current repo path:

```text
C:\Users\bryce\OneDrive\Documents\airpowerusa-v2
```

Current primary implementation:

- AirPower USA public marketing and investor website.
- Customer inquiry funnel.
- Investor inquiry and scheduling funnel.
- Newsroom, press release, filings, FAQ, and video surfaces.

Broader project scope:

- AirPower USA: current primary website and campaign surface.
- CETI: Cyber Enviro-Tech, Inc. Public-company-related content exists in the newsroom and press releases and requires careful review.
- Drax Industries: planned/expected graphene and energy media work. No Drax site or route is currently implemented in this repo.

Possible future change:

- Rename this project/repo to reflect the broader AirPower/CETI/Drax marketing and media operating hub. This is not decided yet.

## Repo And Git

Current branch observed on 2026-05-07:

```text
master
```

Current HEAD observed on 2026-05-07:

```text
9863f62 Newsroom: April 21 CETI press release on AirPower and U.S. energy policy
```

Git remotes observed:

```text
origin https://github.com/brycemalcom/airpowerusaV3.git
v3     https://github.com/brycemalcom/airpowerusaV3.git
```

Production branch:

- `master`

GitHub deployment source:

- `https://github.com/brycemalcom/airpowerusaV3`

Workflow decision:

- Use feature branches for production-affecting work.
- Governance/doc-only updates can be committed directly on `master`.
- Ask before pushing unless the owner explicitly requests a push/deploy.

Working tree note observed on 2026-05-07:

- `src/app/api/ghl/submit-lead/route.ts` appears modified due to line-ending normalization only.
- `GOVERNANCE/` is being created as the project governance layer.

## Technical Stack

- Next.js 15 App Router.
- React 19.
- TypeScript.
- Tailwind CSS.
- shadcn-style local UI primitives under `src/components/ui`.
- next-intl with English and Spanish message files.
- Vercel Analytics.
- GoHighLevel / LeadConnector API integration.
- Optional Cloudflare Turnstile for form verification.

## Deployment Truth

Current deployment platform:

- Vercel.

Owner-reported production project/account:

- `airpowerusa-v3`

Owner-reported production behavior:

- Vercel auto-deploys from `master`.

Evidence in repo:

- `vercel.json`
- `@vercel/analytics`
- root docs referencing Vercel environment variables

Deployment details still need confirmation:

- Production domain mapping.
- Preview deployment policy.
- Whether Netlify is fully retired. A stale root file named `tatus` references old Netlify recovery work.

Local validation note:

- Vercel CLI is installed and logged in as `glacierandember`.
- The visible CLI scope `glacier-and-embers-projects` lists a project named `airpowerusa`, but not `airpowerusa-v3`, and only shows `glacierandember.com` as a domain.
- This may be an old/stale scope or not the production Vercel context. Confirm final deployment truth in the Vercel dashboard or with the correct Vercel scope/token.

## Domain Truth

Canonical public domain:

- `airpowerusa.net`

Other domains and URLs currently appearing in code/docs:

- `airpowerusa.com` - appears in root metadata and investor FAQ copy and should be treated as cleanup-needed unless owner says otherwise.
- `invest.airpowerusa.net` - middleware redirects the root of this host to `/lp/ai-clean-energy`.

Domain rule:

- New public pages, QR targets, campaign URLs, investor materials, and metadata should use `airpowerusa.net` unless explicitly approved otherwise.

## Current Business Surfaces

Production-facing or likely production-facing:

- `/` main AirPower USA site.
- `/customer` customer inquiry funnel.
- `/contact` general contact form.
- `/invest` investor funnel.
- `/lp/ai-clean-energy` investor landing page.
- `/newsroom` media hub.
- `/filings` SEC filing information.
- `/investor-faqs` investor FAQs.
- `/videos` video gallery.
- `/en/*` and `/es/*` locale-prefixed mirrors for selected pages.

Planned near-term:

- `/data-centers` QR-only campaign landing page for a data-center conference. It should be customer/infrastructure focused, not investor focused, unless explicitly changed by the owner.

## Lead Capture Truth

GoHighLevel / LeadConnector is the active CRM integration.

Current server routes:

- `/api/ghl/submit-inquiry` handles general contact and customer inquiries.
- `/api/ghl/submit-lead` handles investor leads and creates GHL opportunities.

Former HubSpot environment variable names still exist locally, but the current code routes forms to GHL.

Current GHL patterns:

- Inquiry forms use tags, source strings, and a `form_message` custom field.
- Investor forms use tags, source strings, `form_message`, and an opportunity in the `AirPower Investor Pipeline`.

Recommended campaign attribution pattern:

- Use all three where practical: tags, source strings, and custom fields.
- Data-center leads should be customer leads with data-center campaign classification.

## Content Risk Model

This project spans customer marketing, investor communications, public-company-related content, and technical claims. These categories must not be treated the same.

High-review categories:

- Investor/offering/securities statements.
- Public company, OTC, CETI, board, merger, licensing, revenue, or opportunity-size statements.
- Technical performance claims such as output, capacity, emissions, temperature, storage duration, or replacement capability.
- Conference handouts and QR campaigns that will be printed or broadly distributed.

For customer campaigns, prefer conservative language unless claims are source-backed and approved.

Approval authority:

- Roger Pawson is the final approval authority for AirPower claims, technical claims, investor-sensitive claims, and public materials.
- Existing website copy and owner-provided campaign materials can be treated as approved source material unless Roger or the owner says otherwise.

## Known Gaps

- Confirm Vercel production domain mapping details.
- Confirm exact entity naming and brand hierarchy across AirPower USA, CETI, and Drax.
- Confirm whether old Netlify notes are historical only.
- Decide whether to rename the repo/project.

## Operating Principle

When in doubt, preserve production behavior, capture the uncertainty in governance, and ask for confirmation before publishing claims or changing lead-routing behavior.

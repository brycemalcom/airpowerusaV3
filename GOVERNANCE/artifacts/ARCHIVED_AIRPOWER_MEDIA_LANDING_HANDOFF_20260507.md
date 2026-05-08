# AirPower Media + Landing Page Handoff - 2026-05-07

Purpose: give the next Codex session a clean start point for lightweight governance and the first data-center convention landing page without carrying DataNest-specific implementation context into this smaller project.

## Project Context
- Repo: `C:\Users\bryce\OneDrive\Documents\airpowerusa-v2`.
- Current app: Next.js 15 public marketing/investor site for AirPower USA.
- Current production concern: do not break existing public pages, investor pages, GHL lead capture, newsroom, filings, or domain routing.
- Broader business lane: AirPower USA, CETI (`C-E-T-I`, publicly traded), and Drax Industries / graphene-energy media work. This is becoming a media, content, marketing funnel, and public-company communications project, not just one website.
- Near-term campaign: data-center convention in California. Two AI-generated handouts exist and should be used as the source visual/copy direction for a QR-driven landing page.

## Current Technical Snapshot
- Framework: Next.js 15 App Router, React 19, TypeScript, Tailwind, next-intl, Vercel Analytics.
- Lead capture: GoHighLevel / LeadConnector through `/api/ghl/submit-lead` and `/api/ghl/submit-inquiry`.
- Anti-spam: honeypot, timing check, in-memory rate limit, optional Cloudflare Turnstile.
- Routes of interest:
  - `/` main AirPower site.
  - `/customer` customer inquiry funnel.
  - `/invest` investor funnel.
  - `/lp/ai-clean-energy` investor landing page.
  - `/newsroom`, `/filings`, `/investor-faqs`, `/videos`.
  - New target: `/data-centers`.
- Latest read-only checks from this handoff session:
  - `npm run lint` passed.
  - `npx tsc --noEmit` passed.
  - Current branch was `master`.
  - One dirty file existed: `src/app/api/ghl/submit-lead/route.ts`, apparently line-ending only when checked with ignore-space/CRLF options.

## Lightweight Governance To Add First
Create a small `GOVERNANCE/` folder. Do not copy the full DataNest governance system. This repo needs practical media-site governance:

1. `GOVERNANCE/START_HERE.md`
   - How a fresh session should orient.
   - Commands to run before edits.
   - Production safety rules.

2. `GOVERNANCE/PROJECT_STATE.md`
   - What the site currently does.
   - Which pages are production-facing.
   - Which pages/campaigns are active, preview, or parked.

3. `GOVERNANCE/BACKLOG.md`
   - Prioritized small backlog for launch safety, data-center landing page, GHL/tracking, content/press workflow, i18n cleanup, CETI site, Drax site, and media-generation pipeline.

4. `GOVERNANCE/SESSION_STATE.md`
   - Exact current objective and next step.
   - Current branch/status.
   - Last validation commands and results.

5. `GOVERNANCE/DECISION_LOG.md`
   - Dated decisions, especially anything involving investor claims, public-company claims, domains, campaign URLs, GHL routing, and asset claims.

6. `GOVERNANCE/CONTENT_REVIEW.md`
   - Claim/source/approval checklist.
   - Separate marketing copy from legally sensitive investor/public-company copy.
   - Mark unverified claims as needing owner/legal/team approval before production.

7. `GOVERNANCE/DEPLOYMENT_CHECKLIST.md`
   - Pre-deploy checks: lint, typecheck, build, key pages, form smoke, tracking source, QR target, mobile view.

## Immediate Mission: `/data-centers` Landing Page
Build a QR-only landing page matching the data-center handout campaign.

Target URL:
- Public route: `/data-centers`.
- Intended printed URL/QR: `airpowerusa.net/data-centers`.
- Do not add this route to main header/footer navigation yet.

Primary source assets:
- Handout A / broad one-sheet: “Power + Cooling Support for the Next Generation of Data Centers.”
- Handout B / system diagram: “Air-Power USA for Data Centers: Closed-Loop Compressed Air Power + BESS + Cold-Air Cooling Support.”
- The existing QR code in Handout A should later be replaced with a QR code that resolves to the live `/data-centers` URL.

Landing page goal:
- Convert convention/scanned traffic into qualified data-center or infrastructure leads.
- Keep it simple, fast, mobile-first, and visually consistent with the handouts.
- Make it feel like the digital companion to the printed collateral.

Suggested page structure:
1. Hero
   - Headline: “Power + Cooling Support for Next-Generation Data Centers.”
   - Subhead: zero-emission on-site power, integrated BESS, and cold-air cooling support for AI and high-density computing.
   - CTA: “Request Data Center Brief” / “Talk With AirPower USA.”
   - Use AirPower logo and visual language from the handouts.

2. Data Center Challenge
   - AI/high-density compute growth.
   - Grid constraints.
   - Uptime/resilience.
   - Cooling load.

3. AirPower Advantage
   - Zero-emission power.
   - Integrated BESS.
   - Closed-loop energy model.
   - Cold-air byproduct.
   - Scalable/modular deployment.

4. How It Works
   - Compressed air storage tanks.
   - Refill compressor.
   - Compressed air engine.
   - Generator.
   - BESS storage.
   - Closed-loop refill note.

5. Cold-Air Exhaust / Cooling Support
   - Position carefully as “cooling support” or “supplemental cooling benefit,” not a fully validated replacement for data-center HVAC unless approved.
   - Use -20C to -40C claim only if this is approved/source-backed by the AirPower team.
   - Use cases: hot aisle/cold aisle support, high-density racks, modular/edge containers, cooling plant support.

6. Lead Capture
   - Reuse existing GHL integration if possible.
   - Either add `inquiryKind = customer` to existing `/api/ghl/submit-inquiry`, or extend the payload with a campaign/source field if needed.
   - Capture: first name, last name, email, phone, company, role/title, project type, message.
   - Hidden campaign/source: `data-centers-convention-ca-2026` or another owner-approved campaign key.
   - Success state: “Thanks. We received your request. Our team will follow up.”

7. Footer / Compliance Note
   - Keep it commercial/customer-oriented, not investor-oriented.
   - Include `airpowerusa.net` and `info@airpowerusa.net`.

## Tracking / QR Requirements
- Generate a real QR code only after confirming final URL and production domain.
- Preferred QR target: `https://airpowerusa.net/data-centers`.
- If simple campaign tracking is desired, use `https://airpowerusa.net/data-centers?utm_source=qr&utm_medium=print&utm_campaign=data_centers_convention`.
- Ensure the landing page preserves campaign source into the GHL submission payload if practical.
- After deploy, scan the QR with a phone before sending the final handout to print.

## Content And Claim Guardrails
- Do not invent technical performance claims.
- Do not overstate cooling replacement capability. Use “cooling support,” “supplemental cooling,” and “cold-air byproduct” until stronger approval exists.
- Treat public company/CETI merger/relationship language as approval-required.
- Treat investor/offering statements as approval-required.
- Keep this landing page customer/infrastructure focused unless owner explicitly scopes investor language.
- Any generated image/video asset should be treated as a campaign asset and recorded with source prompt/version/approval status before production use.

## Suggested Backlog Seeds
- AP-001: Governance folder and launch safety docs.
- AP-002: `/data-centers` landing page MVP.
- AP-003: GHL campaign/source attribution for data-center leads.
- AP-004: QR code generation and handout replacement workflow.
- AP-005: Content/claim review for AirPower data-center claims.
- AP-006: Encoding/mojibake cleanup in docs/messages/source copy.
- AP-007: i18n scope cleanup and locale-route truth.
- AP-008: Press/newsroom publishing workflow.
- AP-009: CETI website rebuild discovery.
- AP-010: Drax/graphene website discovery.
- AP-011: AI media asset generation pipeline and approval workflow.

## First Next-Session Prompt
Use this prompt to start the next session:

```
We are working in C:\Users\bryce\OneDrive\Documents\airpowerusa-v2.

Read GOVERNANCE/artifacts/AIRPOWER_MEDIA_LANDING_HANDOFF_20260507.md first. Do not use DataNest assumptions beyond lightweight governance discipline.

First, create the small GOVERNANCE folder/docs described in that handoff. Then build the `/data-centers` QR-only landing page from the attached handout images. Do not add it to the public nav. Reuse existing site style and GHL form infrastructure where practical. Preserve production safety: run lint, typecheck, build if feasible, and smoke the route locally.

Important guardrails: do not invent claims, keep the page customer/data-center focused, mark any public-company/investor/technical claims that need owner approval, and do not touch unrelated production pages unless required.
```

## Done Criteria For First Landing Page Pass
- Governance folder exists and `SESSION_STATE.md` points to the landing page mission.
- `/data-centers` route renders on desktop and mobile.
- Page is visually aligned with the handouts and AirPower brand.
- Lead form submits to GHL or has a clearly documented integration gap.
- Campaign/source is captured or documented as next step.
- Route is not linked from global nav.
- `npm run lint` and `npx tsc --noEmit` pass.
- Local smoke confirms `/data-centers` returns 200.
- Final handoff says exactly what changed and what remains before production/QR print.

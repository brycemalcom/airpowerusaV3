# Backlog

Last updated: 2026-05-08

Priority labels:

- P0: needed for immediate safety or current campaign.
- P1: should happen soon.
- P2: important but can wait.
- P3: future or discovery.

## P0

### GOV-001: Establish Governance Baseline

Create and maintain the first governance docs so any future session can orient quickly.

Status: in progress; initial docs created and being refined.

### OPS-001: Confirm Deployment And Domain Truth

Confirmed:

- Canonical public domain is `airpowerusa.net`.
- Deployment platform is Vercel.
- Owner reports Vercel deploys from `master`.
- Owner reports Vercel project/account name is `airpowerusa-v3`.
- GitHub deployment source is `https://github.com/brycemalcom/airpowerusaV3`.

Still confirm:

- Production domain mappings.
- Whether Netlify is retired.
- Whether `invest.airpowerusa.net` is live and intentionally mapped.
- Why current local Vercel CLI scope shows `airpowerusa` but not `airpowerusa-v3`.

Status: partially confirmed.

### DC-001: Build `/data-centers` Landing Page MVP

Create a QR-only data-center conference landing page.

Requirements:

- Customer/infrastructure focused.
- Not linked in global nav.
- Mobile-first.
- Uses AirPower branding and existing site style.
- Reuses GHL inquiry infrastructure where practical.
- Avoids unapproved technical or investor claims.

Status: pending governance baseline.

### DC-002: Add Campaign Attribution To Customer Inquiries

Extend `/api/ghl/submit-inquiry` and relevant form payloads to preserve campaign/source/UTM details.

Candidate campaign key:

- `data-centers-convention-ca-2026`

Recommendation:

- Use tags, source strings, and custom fields.
- Route as customer plus data-center campaign classification.

Status: pending.

### REVIEW-001: Data-Center Claim Review

Approve or revise data-center campaign claims before production/print.

Watch claims:

- Zero-emission power.
- Integrated BESS.
- Closed-loop compressed air model.
- Cold-air byproduct.
- Any temperature range claim.
- Any statement implying replacement of data-center HVAC.

Status: source handouts provided; Roger Pawson is final approver for claims.

## P1

### DC-003: QR And Handout Replacement Workflow

After page is deployed:

- Use final QR target: `https://airpowerusa.net/data-centers` unless UTM tracking is approved.
- Decide whether to include UTM parameters.
- Replace old QR in handout source files.
- Scan-test with a phone after deploy.

Status: pending page deployment and UTM decision.

### OPS-002: Rename/Reposition Project

Rename/reposition away from `airpowerusa-v2` to reflect the broader AirPower/CETI/Drax marketing and media operating hub.

Status: owner wants this within the first couple passes.

### ENG-001: Encoding/Mojibake Cleanup

Clean broken encoded characters in visible UI/source copy.

Examples:

- Footer copyright symbol.
- Investor ranges.
- Press release excerpts.

Status: root stale docs archived/replaced; source/UI cleanup still pending.

### I18N-001: Clarify i18n Scope

Audit active Spanish/i18n behavior and define the internationalization growth path.

Current truth:

- Spanish is active in production through the language switcher and `/es` routes.
- Long-term ideal is broad multilingual support.

Status: pending audit.

### PRESS-001: Move Newsroom Data To Structured Source

Extract press releases, media coverage, and industry reads from `NewsSection.tsx` into a content file or data module.

Status: pending.

## P2

### MEDIA-001: Asset Register And Approval Workflow

Create a formal asset register for generated images, videos, handouts, campaign files, and print assets.

Status: started with `MEDIA_GENERATION_WORKFLOW.md`; asset register still pending.

### MEDIA-002: Video Production Pipeline

Define repeatable planning, generation, editing, approval, export, and publishing workflow for campaign and investor videos.

Status: pending.

### MEDIA-003: Print And Investor Material Pipeline

Define file formats, approval flow, QR handling, print proofing, and archival requirements for handouts, decks, PDFs, and investor materials.

Status: pending.

### GHL-001: Document GHL Pipelines And Custom Fields

Confirm and document:

- GHL location/account.
- Contact tags.
- Pipeline names.
- Stage names.
- Custom field keys.
- Calendar URLs.
- Notification ownership.

Status: pending owner/GHL review.

### SEO-001: Domain, Metadata, And Sitemap Cleanup

Align Open Graph URLs, canonical URLs, metadata, and public domain language to `airpowerusa.net`.

Status: pending cleanup.

## P3

### CETI-001: CETI Website / Media Discovery

Scope CETI-specific website, newsroom, investor/public-company communications, and campaign needs.

Status: future discovery.

### DRAX-001: Drax / Graphene Website Discovery

Scope Drax Industries and graphene/energy media needs.

Status: future discovery.

### PIPELINE-001: AI Media Generation Pipeline

Define repeatable workflows for generated images, videos, handouts, campaign landing pages, approvals, and archival records.

Status: future.

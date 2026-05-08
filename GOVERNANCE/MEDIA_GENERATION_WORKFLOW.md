# Media Generation Workflow

Last updated: 2026-05-08

Purpose: govern generated media, print assets, videos, investor materials, campaign graphics, and future entity-specific materials so the project can grow without losing source, approval, or claim history.

Final approval authority:

- Roger Pawson approves public-facing claims and materials.

## Scope

This workflow applies to:

- AI-generated images.
- AI-generated or edited video.
- Website and landing-page visuals.
- Conference handouts.
- Print collateral.
- Investor decks, PDFs, one-sheets, and presentation graphics.
- Newsroom thumbnails and social graphics.
- QR-enabled materials.
- Entity-specific assets for AirPower USA, CETI, and Drax.

## Asset Lifecycle

Use these statuses:

- `draft` - working asset, not approved.
- `internal-review` - ready for owner/team review.
- `claim-review` - needs technical, investor, or public-company review.
- `approved-web` - approved for website use.
- `approved-print` - approved for print.
- `approved-investor` - approved for investor materials.
- `published` - live, printed, distributed, or posted.
- `retired` - should not be reused.

## Required Record For Each Asset

Record these details before production use:

```text
Asset name:
File path:
Entity: AirPower USA | CETI | Drax | multi-entity
Campaign:
Asset type: image | video | print | deck | PDF | social | QR | other
Status:
Created/received date:
Source prompt/brief/document/footage:
Tool/model/vendor:
Version:
Intended use:
Claims embedded:
Review needed:
Approved by:
Published location:
Notes:
```

Prompt/source storage policy:

- For now, keep enough source information to reproduce or audit an asset: prompt, source brief, tool/model/vendor, and version.
- Exact storage location can evolve as the workflow matures.
- Final approved web/print/video assets must be tracked in the repo or governance even if large working files live elsewhere.

## Storage Convention

Current repo asset locations:

- Web images: `public/media/images`
- Web videos: `public/media/videos`
- Press HTML: `public/press`

Recommended future folders if asset volume grows:

```text
content/campaigns/
content/assets/
public/media/campaigns/
public/media/generated/
public/media/print/
public/media/investor/
```

Do not reorganize existing assets casually. Add structure when a campaign or media volume justifies it.

## Naming Convention

Prefer names that include date, entity, campaign, and version:

```text
2026-05-07_airpower_data-centers_hero_v01.png
2026-05-07_airpower_data-centers_handout_v03.pdf
2026-05-07_airpower_data-centers_short-video_v02.mp4
```

Use lowercase, hyphens, and clear version numbers.

## Image Workflow

1. Write or collect the source brief.
2. Generate draft images.
3. Save candidates with versioned names.
4. Record prompt/tool/source in the asset record.
5. Check for embedded claims, logos, QR codes, spelling, and brand fit.
6. Move through review status before production use.
7. Use approved final files in web or print.

## Video Workflow

1. Define objective, audience, entity, campaign, format, and destination.
2. Write script or outline.
3. Mark legal-sensitive claims before generation.
4. Generate or edit video drafts.
5. Save source files and exports separately.
6. Review captions, voiceover, claims, logos, QR codes, URLs, and contact details.
7. Export final formats for web, social, investor, or event use.
8. Record published URLs and final asset paths.

Expected video types:

- Website videos.
- Social shorts.
- Investor videos.
- Conference screen loops.
- Explainers.
- Product/technology demos.
- Any other audience-specific media that creates business value.

## Print Workflow

1. Confirm campaign, audience, and final URL.
2. Confirm `.net` domain and QR target.
3. Confirm copy review status.
4. Generate print-ready asset.
5. Proof all text, logos, QR codes, and contact details.
6. Scan QR on a phone before print.
7. Save editable source and final export.
8. Record approval and final file path.

## Investor Material Workflow

Investor materials require higher review.

Before production:

- Confirm offering terms.
- Confirm disclaimers.
- Confirm SEC references.
- Confirm any projected, market, revenue, share-price, minimum-investment, or investor-eligibility claims.
- Keep source files and final PDFs versioned.
- Record approval status.

Do not reuse customer campaign materials as investor materials without review.

## QR Rules

- Use `airpowerusa.net` unless explicitly approved otherwise.
- Confirm final route exists before generating production QR.
- Decide whether UTM parameters are needed.
- Scan-test before print or distribution.
- Record final QR target in the asset record.

## Review Rules

Escalate for review when an asset includes:

- Investor/offering/securities language.
- CETI/public-company language.
- Drax claims not yet documented.
- Technical performance claims.
- Capacity, temperature, runtime, emissions, or replacement claims.
- QR codes or printed URLs.
- Paid media claims.

## Current Near-Term Media Need

Data-center conference:

- Build `/data-centers`.
- Use `https://airpowerusa.net/data-centers` as the base target.
- Keep copy customer/infrastructure focused.
- Treat handouts as campaign assets.
- Track any generated or revised handout files before print.

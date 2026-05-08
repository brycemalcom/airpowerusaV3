# Asset And Funnel Inventory

Last updated: 2026-05-08

## Funnel Inventory

### Customer Inquiry Funnel

Entry points:

- `/customer`
- Customer CTA from homepage hero.

Implementation:

- Form component: `src/components/sections/InquiryForm.tsx`
- API route: `/api/ghl/submit-inquiry`
- Payload kind: `customer`
- GHL tag: `customer`
- GHL source: `Main website - Customer inquiry`

Captured fields:

- Name
- Organization
- Email
- Phone
- Location
- Message

### General Contact Funnel

Entry point:

- `/contact`

Implementation:

- Page/form: `src/app/contact/page.tsx`
- API route: `/api/ghl/submit-inquiry`
- Payload kind: `general`
- GHL tag: `contact`
- GHL source: `Main website - General inquiry (Contact)`

Captured fields:

- Name
- Email
- Subject
- Message

### Investor Funnel

Entry points:

- `/invest`
- `/lp/ai-clean-energy`
- `invest.airpowerusa.net/` redirects to `/lp/ai-clean-energy`
- Investor CTAs and hamburger menu.

Implementation:

- Shared form: `src/components/investor/GhlInvestorLeadForm.tsx`
- API route: `/api/ghl/submit-lead`
- GHL pipeline: `AirPower Investor Pipeline`
- GHL stage: `New Lead`
- GHL tags: `investor-lead` plus `lp-a`, `lp-b`, or `website`

Captured fields:

- First name
- Last name
- Email
- Phone
- Accredited investor status
- Investment range
- Message

Compliance note:

- Investor funnel copy is legal-sensitive and must be reviewed before material changes.

### Newsroom / Media Funnel

Entry points:

- `/newsroom`
- `/videos`
- Press release pages under `/press/*.html`

Implementation:

- Newsroom page: `src/app/newsroom/page.tsx`
- News data: `src/components/sections/NewsSection.tsx`
- Video gallery: `src/components/sections/VideoGallery.tsx`
- Press files: `public/press/*.html`

Current limitation:

- No dedicated content data file or CMS. Press/media entries are maintained in component code.

### Planned Data-Center Campaign Funnel

Planned entry point:

- `/data-centers`

Intended public/QR URL:

- `https://airpowerusa.net/data-centers`

Purpose:

- Convert data-center conference traffic into qualified customer/infrastructure leads.

Expected API path:

- Reuse `/api/ghl/submit-inquiry` with `inquiryKind: "customer"`.

Needed enhancement:

- Add campaign/source attribution to inquiry submissions before or during the landing page build.

Candidate campaign key:

- `data-centers-convention-ca-2026`

Conference details:

- Name/date/city/audience not yet known.

Required fields:

- First name
- Last name
- Email
- Phone
- Company
- Role/title
- Project type
- Message
- Hidden campaign/source fields
- UTM preservation if practical

Recommended GHL classification:

- Lead family: customer.
- Campaign family: data center.
- Tags: `customer`, `data-center`, campaign-specific tag.
- Source: data-center campaign source string.
- Custom fields: campaign key, page URL, UTM values, role/title, project type, message.
- Notification: owner/admin should receive first-pass notifications and distribute internally.

## Asset Inventory

Image assets live in:

```text
public/media/images
```

Current image themes include:

- AirPower logos.
- Air tanks and compressed-air system visuals.
- BESS/storage imagery.
- Server room imagery.
- Remote/community/grid/disaster/medical/agriculture/marine/construction/defense use-case imagery.
- Product/vehicle/trailer visuals.

Video assets live in:

```text
public/media/videos
```

Current videos include:

- Homepage hero loop.
- AirPower station loop.
- How-it-works clips.
- Prototype truck and station videos.

Press assets live in:

```text
public/press
```

Current press content includes AirPower and CETI-related releases from 2025 and 2026.

## Pending Campaign Assets

Data-center conference handouts:

- Broad one-sheet: "Power + Cooling Support for the Next Generation of Data Centers."
- System diagram: "Air-Power USA for Data Centers: Closed-Loop Compressed Air Power + BESS + Cold-Air Cooling Support."

Current repo status:

- Handout images were provided in chat on 2026-05-08.
- Source/editable files are not yet in the repo.
- Build the landing page from existing site assets plus data-center-focused visual/copy direction from the provided handouts.

Approved source material:

- Existing website copy and provided campaign handouts are approved source material unless Roger Pawson or the owner says otherwise.
- New claims not already present in approved source material still need review.

## Asset Intake Rule

When adding generated or campaign assets, record:

- File name and location.
- Campaign/entity.
- Source prompt, source brief, source document, or source footage.
- Date generated or received.
- Tool/model/vendor used when known.
- Version number or iteration label.
- Approval status.
- Any claims embedded in the asset.
- Whether the asset is for draft, internal review, web, print, investor use, paid media, or production.
- Final destination URL, QR target, or campaign linkage when applicable.

## Media Generation Categories

Expected future asset categories:

- Website imagery.
- Landing-page imagery.
- AI-generated campaign images.
- Short-form social videos.
- Long-form explainer videos.
- Conference handouts.
- Investor decks and investor PDFs.
- QR-enabled print collateral.
- Newsroom graphics and video thumbnails.
- Entity-specific brand assets for AirPower USA, CETI, and Drax.

See `GOVERNANCE/MEDIA_GENERATION_WORKFLOW.md` before creating or publishing generated media.

## Suggested Future Asset Register

If asset volume increases, create:

```text
GOVERNANCE/ASSET_REGISTER.md
```

or move campaign asset records into structured data under:

```text
content/assets/
content/campaigns/
```

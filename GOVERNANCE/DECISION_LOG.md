# Decision Log

Last updated: 2026-05-08

Use this log for decisions that affect project direction, domains, public claims, investor/public-company copy, routing, forms, tracking, deployment, or asset approvals.

## Decisions

### 2026-05-07: Governance Docs Are The Working Source Of Truth

Decision:

- `GOVERNANCE/PROJECT_TRUTH.md`, `SESSION_STATE.md`, `PROJECT_STATE.md`, and related governance docs are the current working source of truth.
- Files under `GOVERNANCE/artifacts/` are archived historical notes unless facts are promoted into current governance docs.

Reason:

- The project needs continuity without inheriting stale context.

### 2026-05-07: Project Scope Is Broader Than The AirPower Website

Decision:

- Treat this as a growing marketing/media/funnel workspace for AirPower USA, CETI, and Drax-related work.
- The current codebase remains primarily the AirPower USA site.

Reason:

- Owner clarified the business direction and expected growth of funnels, assets, media, and entity-specific work.

### 2026-05-07: CETI Means Cyber Enviro-Tech

Decision:

- Use CETI as Cyber Enviro-Tech.

Reason:

- Owner explicitly corrected this.

### 2026-05-07: Data-Center Landing Page Should Be Customer/Infrastructure Focused

Decision:

- The planned `/data-centers` page should be a commercial/customer funnel for data-center and infrastructure leads.
- Do not frame it as an investor page unless the owner changes scope.

Reason:

- Conference traffic is expected to be data-center/customer oriented.

### 2026-05-07: Campaign-Only Routes Stay Out Of Global Nav

Decision:

- QR-only campaign routes such as `/data-centers` should not be added to header/footer navigation unless approved.

Reason:

- Campaign pages should be targeted and measurable without changing the main public site information architecture.

### 2026-05-07: Canonical Public Domain Is airpowerusa.net

Decision:

- Use `airpowerusa.net` as the canonical public domain for new campaign URLs, QR targets, metadata cleanup, and public-facing materials unless explicitly approved otherwise.

Reason:

- Owner confirmed `.net` is the domain.

### 2026-05-07: Deployment Platform Is Vercel

Decision:

- Treat Vercel as the deployment platform for this project.

Reason:

- Owner confirmed Vercel.

### 2026-05-08: master Is Production Branch

Decision:

- Treat `master` as the production branch.
- Owner reports Vercel auto-deploys from `master`.

Reason:

- Owner confirmed with high confidence and local Git shows `master` tracking `origin/master`.

Validation note:

- Current local Vercel CLI login does not expose a matching `airpowerusa-v3` project. Dashboard or correct Vercel scope/token should be used to fully validate deployment wiring.

### 2026-05-08: Use Feature Branches For Production-Affecting Work

Decision:

- Use feature branches for pages, funnels, production UI, API changes, campaigns, integrations, and larger content changes.
- Governance/doc-only updates can be committed directly on `master`.
- Ask before pushing unless the owner explicitly requests a push/deploy.

Reason:

- `master` is production-linked, so feature branches reduce deployment risk while preserving fast governance updates.

### 2026-05-08: Commit Governance Changes Every Session

Decision:

- Governance changes should be committed whenever they are updated.

Reason:

- Project continuity depends on governance being durable between sessions.

### 2026-05-08: Project Should Be Renamed/Repositioned Soon

Decision:

- The project should move away from the narrow `airpowerusa-v2` identity within the first couple passes.

Reason:

- The project is becoming a broader AirPower/CETI/Drax marketing and media hub.

### 2026-05-08: Data-Center Leads Are Customer Leads With Campaign Classification

Decision:

- Route data-center leads as customer leads plus data-center campaign classification.
- Use tags, source strings, and custom fields where practical.

Reason:

- This keeps the lead commercially oriented while allowing campaign reporting and follow-up routing.

### 2026-05-08: Roger Pawson Is Final Claim/Material Approver

Decision:

- Roger Pawson is the final approval authority for AirPower claims, technical claims, investor-sensitive claims, and public materials.

Reason:

- Owner reports directly to Roger Pawson.

### 2026-05-08: Spanish Is Active, Not Parked

Decision:

- Treat Spanish/i18n as active production functionality requiring audit and maturation, not a parked experiment.

Reason:

- Owner can switch production to Spanish today, and the company is international.

### 2026-05-07: Archived Artifacts Are Not Active Instructions

Decision:

- Files in `GOVERNANCE/artifacts/` are archived historical materials. They can explain how an idea arrived, but future work should follow current governance docs and owner-confirmed truth.

Reason:

- Owner wants clean project truth and does not want stale context from older handoffs to steer future work.

## Pending Decisions

### Deployment Source Of Truth

Pending validation:

- Confirm the correct Vercel project/account, domain mappings, and whether Netlify is fully retired.

Why it matters:

- Deployment checklists and smoke tests need exact URLs and owners.

### Git Workflow

Decision moved above:

- Use feature branches for production-affecting work.
- Direct `master` commits are acceptable for governance/doc-only updates.

Why it matters:

- This affects handoff discipline and production safety.

### Project/Repo Name

Pending implementation:

- Choose and apply the new project/repo name.

Why it matters:

- Naming affects documentation, onboarding, repo mental model, and future entity organization.

### GHL Campaign Attribution

Pending implementation detail:

- Implement tags, source strings, and custom fields for campaign/source/UTM values where practical.

Why it matters:

- New campaign funnels need reliable attribution and reporting.

### Data-Center Claims

Decision:

- Existing website copy and owner-provided data-center handouts are approved source material unless Roger Pawson or the owner says otherwise.
- New claims not already present in approved source material still require review.

Why it matters:

- Technical performance and cooling claims must not be overstated.

### Drax Scope

Pending decision:

- Define which Drax Industries materials, claims, domains, and funnel goals should be represented in this project.

Why it matters:

- Drax is in the project scope but not implemented in the repo yet.

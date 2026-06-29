# Start Here

Purpose: give any future engineer or agent enough context to work on this project without guessing, carrying stale assumptions, or breaking production surfaces.

## Read Order

1. `GOVERNANCE/PROJECT_TRUTH.md` - canonical project context.
2. `GOVERNANCE/SESSION_STATE.md` - current objective, branch, status, and next step.
3. `GOVERNANCE/PROJECT_STATE.md` - current routes, funnels, integrations, and active campaigns.
4. `GOVERNANCE/BACKLOG.md` - prioritized work queue.
5. `GOVERNANCE/DECISION_LOG.md` - decisions made and decisions still needed.
6. `GOVERNANCE/CONTENT_REVIEW.md` - claim, investor, public-company, and legal review guardrails.
7. `GOVERNANCE/ASSET_AND_FUNNEL_INVENTORY.md` - assets, campaigns, forms, and lead paths.
8. `GOVERNANCE/MEDIA_GENERATION_WORKFLOW.md` - generated images, videos, print, and investor materials workflow.
9. `GOVERNANCE/LOCALIZATION_STRATEGY.md` - i18n/localization state and growth path.
10. `GOVERNANCE/PRESS_AND_NEWSROOM_WORKFLOW.md` - press release and media coverage workflow.
11. `GOVERNANCE/LOCAL_DEV_RUNBOOK.md` - local development and validation commands.
12. `GOVERNANCE/REPO_HYGIENE.md` - Git/local workflow and maintenance rules.
13. `GOVERNANCE/DEPLOYMENT_CHECKLIST.md` - pre-deploy and post-deploy checks.

Files under `GOVERNANCE/artifacts/` are archived handoffs or working notes. They can be useful evidence, but they are not active instructions unless their facts have been promoted into the governance docs above.

## First Commands

Run these before code edits:

```powershell
git status --short
git branch --show-current
git remote -v
npm run lint
npx tsc --noEmit
```

For code or UI work that can affect production behavior, also run:

```powershell
npm run build
```

## Git Workflow

- `master` is treated as the production branch.
- Vercel is expected to auto-deploy from `master` after pushes.
- Use feature branches for pages, funnels, production UI, API changes, campaigns, integrations, and larger content changes.
- Direct commits on `master` are acceptable for governance/doc-only updates and urgent hotfixes after validation.
- Commit governance changes every session. Ask before pushing unless the owner explicitly asks to push/deploy.

## Production Safety Rules

- Preserve existing public pages, investor pages, customer forms, newsroom, filings, videos, domain routing, and GHL lead capture unless the task explicitly changes them.
- Do not treat old README files, ad hoc handoffs, or archived notes as truth without checking code and current governance docs.
- Do not publish new investor, securities, public-company, merger, OTC, SEC, offering, or technical performance claims without content review.
- Keep customer/commercial campaigns separate from investor campaigns unless the owner explicitly scopes a mixed funnel.
- Do not expose secrets. `.env.local` can be inspected for variable names only, not values.
- Do not add QR-only or campaign-only routes to global navigation unless approved.
- Record generated media, print assets, video assets, and investor materials before production use.
- Update governance when work changes project state, active campaigns, lead routing, deployment assumptions, or legal-sensitive copy.

## Current Operating Focus

The immediate operating focus is to establish governance for a growing marketing and media project, then build the data-center conference landing page and funnel. See `SESSION_STATE.md` for the current step.

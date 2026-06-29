# Repo Hygiene

Last updated: 2026-05-08

## Git Workflow

Current branch:

```text
master
```

Current GitHub remote:

```text
https://github.com/brycemalcom/airpowerusaV3.git
```

Observed remotes:

- `origin`
- `v3`

Both point to the same GitHub repository.

Recommended workflow until owner confirms otherwise:

1. Check status before edits.
2. Keep each change scoped to one task or campaign.
3. Do not modify unrelated production pages.
4. Run lint and typecheck before handoff.
5. Run build before deployment or when changing routes, configs, forms, metadata, or major UI.
6. Update governance when project state changes.
7. Ask before committing or pushing unless explicitly instructed.

Current workflow decision:

- `master` is production branch.
- Vercel is expected to auto-deploy from pushed `master` changes.
- Use feature branches for production-affecting work: pages, funnels, API routes, integrations, campaigns, and larger content changes.
- Direct `master` commits are acceptable for governance/doc-only updates and urgent hotfixes after validation.
- Governance changes should be committed every session.
- Ask before pushing unless the owner explicitly requests push/deploy.

Recommended command set:

```powershell
git status --short
git branch --show-current
git remote -v
npm run lint
npx tsc --noEmit
npm run build
```

## Dirty Worktree Policy

Never revert user changes without explicit permission.

Known observed status on 2026-05-07:

- `src/app/api/ghl/submit-lead/route.ts` appears modified only because of line-ending normalization.
- `GOVERNANCE/` is newly added.

If a file is dirty before starting work:

- Inspect the diff.
- Determine whether it is related.
- Work around unrelated changes.
- Note any risk in `SESSION_STATE.md`.

## Branching

Branch policy:

- Use feature branches for production-affecting work.
- Governance/doc-only updates may be committed directly on `master`.
- Prefer PRs or explicit review before pushing production-affecting changes to `master`.

## Local Environment

Dependencies:

```powershell
npm install
```

Development:

```powershell
npm run dev
```

Validation:

```powershell
npm run lint
npx tsc --noEmit
npm run build
```

Build command:

```text
npm run build
```

This runs:

```text
next build && node scripts/fix-encoding.js
```

## Secrets

Do not commit or print secret values.

Environment variable names currently observed:

- `GHL_API_KEY`
- `GHL_LOCATION_ID`
- `NEXT_PUBLIC_INVESTOR_CALENDAR_URL`
- `NEXT_PUBLIC_TURNSTILE_SITE_KEY`
- `TURNSTILE_SECRET_KEY`
- Legacy HubSpot names may still exist locally.

## Encoding And Stale Docs

Several root docs and source strings contain mojibake/encoding artifacts such as broken arrows, copyright symbols, and currency dashes. Do not do broad encoding cleanup inside unrelated feature work.

Known files with stale or risky historical context:

- `README.md`
- `DEV_SERVER.md`
- `I18N_PLAN.md`
- `TEMP_INVESTOR_HIDE.md`
- `tatus`

Plan:

- Treat governance docs as current.
- Clean old docs as a dedicated backlog item.

## Add/Change Checklist

When adding a new route, funnel, asset batch, campaign, or integration:

- Add or update route status in `PROJECT_STATE.md`.
- Add funnel details in `ASSET_AND_FUNNEL_INVENTORY.md`.
- Add claim review items in `CONTENT_REVIEW.md` if needed.
- Add a decision in `DECISION_LOG.md` if scope, domain, routing, legal copy, or lead routing changes.
- Update `SESSION_STATE.md` with validation results and next step.

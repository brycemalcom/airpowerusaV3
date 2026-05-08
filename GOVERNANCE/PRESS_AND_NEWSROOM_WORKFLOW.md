# Press And Newsroom Workflow

Last updated: 2026-05-08

Purpose: document how press releases, media coverage, industry reads, and newsroom assets are maintained.

## Current Implementation

Newsroom page:

- `src/app/newsroom/page.tsx`

Newsroom sections:

- `src/components/sections/NewsroomHero.tsx`
- `src/components/sections/NewsSection.tsx`
- `src/components/sections/VideoGallery.tsx`
- `src/components/sections/NewsroomCta.tsx`

Press release HTML files:

- `public/press/*.html`

Current data storage:

- Press releases, media coverage, and industry reads are hardcoded in `NewsSection.tsx`.

## Add A Press Release

1. Create or receive approved release copy.
2. Confirm whether it is AirPower, CETI, Drax, or multi-entity.
3. Confirm required public-company and investor review if applicable.
4. Save clean HTML in `public/press/`.
5. Add an entry to `pressReleases` in `NewsSection.tsx`.
6. Smoke `/newsroom` and the modal/full release view.
7. Update governance if the release changes entity state, claims, or campaign direction.

## Add External Coverage

1. Confirm source URL and publication.
2. Add entry to `mediaCoverage` in `NewsSection.tsx`.
3. Use conservative excerpting and avoid over-quoting.
4. Mark whether coverage is news, analysis, or interview.

## Current Improvement Need

Move newsroom data out of `NewsSection.tsx` into a structured source, such as:

- `src/content/newsroom.ts`
- `content/newsroom/*.json`
- a future CMS

## Review Rules

Escalate for Roger Pawson/owner review when newsroom content includes:

- CETI/public-company statements.
- Investor/offering claims.
- Technical performance claims.
- Revenue, opportunity-size, order, or pipeline claims.
- Leadership, board, licensing, or territory claims.

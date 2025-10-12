Temporary investor page disable

What changed

- Home hero: Investors CTA text changed to "For Investors — Coming Soon" and click disabled
  - File: `src/components/sections/Hero.tsx`
- Header hamburger: Investors link marked "For Investors — Coming Soon" and disabled
  - File: `src/components/layout/Header.tsx`
- Redirect added to prevent access to `/invest` route
  - File: `next.config.js` → `redirects()` returns `/invest` -> `/`

How to re-enable investors

1) Revert hero CTA
   - In `Hero.tsx`, restore button label to "For Investors" and set onClick to `window.location.href = '/invest'`

2) Revert hamburger menu
   - In `Header.tsx`, change the hamburger menu entry back to `{ name: 'For Investors', href: '/invest', color: 'text-cyan-400' }`
   - Remove the conditional `onClick` prevention and `aria-disabled`

3) Remove redirect
   - In `next.config.js`, delete the `redirects()` block or remove the `/invest` item
   - After changing Next config, redeploy (Vercel will rebuild on push)

Notes

- This is intended as a temporary change. The `/invest` page files are untouched.
- After pushing changes, Vercel deployment will apply redirects automatically.



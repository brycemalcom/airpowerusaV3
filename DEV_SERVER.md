powershell
# Step 1: Kill all Node processes
taskkill /f /im node.exe

# Step 2: Clear Next.js cache  
Remove-Item -Recurse -Force .next -ErrorAction SilentlyContinue

# Step 3: Clear npm cache
npm cache clean --force

# Step 4: Start fresh
npm run dev

---

## Bot protection (Cloudflare Turnstile)

1. In [Cloudflare Dashboard](https://dash.cloudflare.com/) → **Turnstile** → **Add widget** (managed / invisible is fine). Add your production domain (and `localhost` for local testing if offered).
2. Copy **Site Key** and **Secret Key**.
3. **Vercel** → Project → **Settings** → **Environment Variables**:
   - `NEXT_PUBLIC_TURNSTILE_SITE_KEY` = site key (all environments you use)
   - `TURNSTILE_SECRET_KEY` = secret (**Production** + **Preview**; optional for local)
4. **Local:** add the same keys to `.env.local` and restart `npm run dev`.

If `TURNSTILE_SECRET_KEY` is unset, the API skips Turnstile verification (dev-friendly). If it is set, the widget must load (public site key) or submissions return 400.

Blocked submissions log one JSON line per event: `event: "form_submission_blocked"` with `reason` (`honeypot`, `submit_too_fast`, `rate_limited`, `turnstile_missing`, `turnstile_invalid`, etc.).
# Local Development Runbook

Last updated: 2026-05-08

## Setup

```powershell
npm install
```

## Run Locally

```powershell
npm run dev
```

Default local URL:

```text
http://localhost:3000
```

## Validation

```powershell
npm run lint
npx tsc --noEmit
npm run build
```

## Clean Restart

Use only when the dev server or Next cache is misbehaving:

```powershell
taskkill /f /im node.exe
Remove-Item -Recurse -Force .next -ErrorAction SilentlyContinue
npm run dev
```

Avoid clearing npm cache unless dependency installation is failing.

## Vercel CLI

PowerShell blocks the `vercel.ps1` shim on this machine. Use:

```powershell
& "$env:APPDATA\npm\vercel.cmd" --version
& "$env:APPDATA\npm\vercel.cmd" whoami
& "$env:APPDATA\npm\vercel.cmd" project list
```

Observed on 2026-05-08:

- Vercel CLI version: `41.7.0`
- Logged-in user: `glacierandember`
- Visible scope: `glacier-and-embers-projects`
- Visible project: `airpowerusa`

Owner-reported production project/account is `airpowerusa-v3`; this should be validated in the Vercel dashboard or with the correct Vercel scope/token.

## Turnstile

Relevant environment variables:

- `NEXT_PUBLIC_TURNSTILE_SITE_KEY`
- `TURNSTILE_SECRET_KEY`

If `TURNSTILE_SECRET_KEY` is unset, API routes skip Turnstile verification. If it is set, the widget must load and return a token or form submissions will fail.

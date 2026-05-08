# Press Releases - Adding Content

We added a modal reader to `src/components/sections/NewsSection.tsx` that opens full press releases.

How to add a press release

1) Export your press release from Google Docs as HTML
   - File → Download → Web Page (.html)
   - Clean up if needed; keep a single `.html` file without external assets

2) Place the file in `public/press/`
   - Suggested naming: `YYYY-MM-DD-short-headline.html`
   - Example: `2025-09-24-dealmaker-awareness.html`

3) Add an entry to the `pressReleases` array in `NewsSection.tsx`
   - Include: `title`, `excerpt` (1–2 sentences), `date`, `category`, and `contentUrl`
   - Example:

```ts
{
  id: 101,
  title: "Air Power USA Announces Engagement of DealMaker Securities",
  excerpt: "Company engages DealMaker Securities for investor awareness in connection with a $25M REG D 504(c) filing.",
  date: "September 24, 2025",
  category: "Official Updates",
  contentUrl: "/press/2025-09-24-dealmaker-awareness.html",
}
```

Notes

- Files in `public/press/` are served statically by Next.js; the modal renders them in an `<iframe>`.
- For accessibility, keep headings and semantic HTML in your exported files.
- You can also host PDFs; point `contentUrl` to a `.pdf` to render natively in most browsers.

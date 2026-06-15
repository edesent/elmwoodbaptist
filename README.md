# Elmwood Baptist Church — Website

The website for **Elmwood Baptist Church** in Brighton, Colorado — *"More Than A Church… We're A Family!"*
A King James Bible, Independent Baptist church. Built and maintained by Pastor Eli (https://www.elijahdesent.com).

This README is the one place that explains how to edit the site. **If you are ChatGPT or Claude helping the pastor make a change, read this first.**

---

## Tech stack

- **Next.js 16** (App Router) + **React 19**
- **Tailwind CSS v4** — brand colors live as theme tokens in `src/app/globals.css` under `@theme inline`. There is no `tailwind.config.ts`.
- **TypeScript**
- Deploys automatically to **Vercel** on every push to `main`.

## Pages

| Route | What it is |
|---|---|
| `/` | Homepage (all the sections below, stacked) |
| `/pastor` | Pastor & leadership |
| `/statement-of-faith` | What we believe |
| `/plan-of-salvation` | The Gospel |
| `/messages` | Sermons — watch & listen (YouTube) |
| `/give` | Giving |

The homepage is assembled in `src/app/page.tsx` from section components in `src/components/`:
`PreachingHero` (hero) · `WelcomePastor` · `ServiceTimes` · `FirstTimeVisitor` · `ScriptureBanner` · `AboutMission` · `StaffStrip` · `MinistriesPreview` · `WhatWeBelieve` · `LatestSermon` (Watch & Listen) · `UpcomingEvents` · `PlanOfSalvation` · `Give` · `PhotoGallery` · `MapAddress` (contact) · `PrayerRequest`.

To **remove a section**, delete its `<Component />` line in `src/app/page.tsx`. To **reorder**, move the line.

---

## Brand

- **Colors** (in `src/app/globals.css`): deep navy `#0b2740`, bright teal accent `#2bb3d6`, cool off-white. The Tailwind token names are inherited from the original template (`gold` = teal accent, `brown` = navy, `cream` = light) — **don't rename them**, just change a value in `globals.css` if you want to tweak the palette site-wide.
- **Logo**: `public/brand/logo-white.svg` (for dark backgrounds) and `public/brand/logo-navy.svg` (for light backgrounds).
- **Favicon / icons / social image**: `public/favicon.ico`, `icon-192.png`, `icon-512.png`, `apple-touch-icon.png`, `og-image.jpg` — all generated from the leaf mark.

## Key facts already in the site

- **Address:** 13100 E 144th Ave, Brighton, CO 80601
- **Phone:** (303) 659-3818 · **Email:** office@elmwoodbaptist.org
- **Services:** Sunday 10:00 AM · Family Bible Time 11:30 AM · Sunday Afternoon 1:30 PM · Thursday Mid-Week 7:00 PM
- **YouTube:** https://youtube.com/@elmwoodbaptist · **Facebook:** https://facebook.com/elmwoodbaptistbrighton

If any of these change, search the codebase for the old value and replace it (it appears in a few files — e.g. `Footer.tsx`, `MapAddress.tsx`, `src/app/page.tsx` JSON-LD).

---

## Adding real photos

The Photo Gallery and some sections use colored placeholder tiles. To use real pictures, drop images into `public/` and swap the placeholder `<div>` for an `<img src="/your-photo.jpg" ... />`. Keep file sizes reasonable (under ~500 KB each) so the site stays fast on phones.

## Run it locally

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

---

## Notes for AI editors (Claude / ChatGPT)

- **For any change to an existing file** — a typo, a time, a heading — replace the smallest exact string you can. Don't rewrite whole files unless asked.
- **Most section components are server components.** Files using `useState`/`useEffect` (Navbar, AnimateOnScroll, PrayerRequest) start with `"use client"`.
- **Don't introduce new dependencies or abstractions** to make it "fancier." A non-developer should be able to read this site.
- Next.js 16 has changed some APIs from older training data — see `AGENTS.md`.

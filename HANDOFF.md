# Allurea — Handoff from Azurea Clone

This repo is a **clone of `../azurea`** with brand strings renamed `Azurea → Allurea`. The visual design, layout, animations, and component structure are identical. This document tells the next session exactly what's done and what still needs the user's input.

---

## Origin

- Cloned from: `/home/branko/Documents/Projects/azurea` (commit `c2e2099` "Small map change")
- Cloned on: 2026-05-12
- Method: `rsync` excluding `.git`, `node_modules`, `.next`, `graphify-out`, `dist`, `build`
- Fresh git repo, no remote yet, no commits yet (everything staged on `master`)

---

## What's Already Renamed

✅ All capitalized `Azurea` → `Allurea` (47 occurrences across UI, metadata, OG tags, terms, privacy, components)
✅ Constants `AZUREA_LNG` / `AZUREA_LAT` → `ALLUREA_LNG` / `ALLUREA_LAT` in `LocationSection.tsx`
✅ Domain placeholder `azurea.com` → `allurea.com` in `app/terms/page.tsx`
✅ Logo files renamed in `public/`:
   - `azurea-icon.svg`     → `allurea-icon.svg`
   - `azurea-logo.svg`     → `allurea-logo.svg`
   - `azurea-wordmark.svg` → `allurea-wordmark.svg`
✅ Refs updated in `components/layout/Navbar.tsx` and `components/layout/Footer.tsx`
✅ Removed: `notes.md`, `claude-context.md` (stale Azurea-specific docs)

---

## What Still Uses `azurea` (intentionally — needs swap when assets ready)

These are **external service references**. Replacing them now would break the site. Swap once new assets exist.

### 1. CDN image URLs (CloudFront)
- Base: `https://d1pjqs5r0ua4f1.cloudfront.net/`
- Files: `azurea_gallery_1.webp` through `azurea_gallery_29.webp`, `azurea_gallery_3_fixed.webp`, `azurea_gallery_4_fixed.webp`, `azurea_update_render_web.mp4`
- **Action needed:** Upload new Allurea renders to a separate CDN bucket → swap URLs project-wide.
- Files containing CDN refs: `Hero.tsx`, `ProcessJourney.tsx`, `ProjectGallery.tsx`, `EarlyInvestorSection.tsx`, `CinematicJourney/index.tsx`, `CinematicJourney/ChapterExtras.tsx`, `InquirySection/index.tsx`, `LocationSection.tsx`
- Quick swap (when ready):
  ```bash
  find . -type f \( -name "*.ts" -o -name "*.tsx" \) -not -path "*/node_modules/*" \
    -exec sed -i 's|d1pjqs5r0ua4f1.cloudfront.net/azurea_|<NEW_CDN_HOST>/allurea_|g' {} +
  ```

### 2. Planpoint floorplan URL
- File: `components/sections/PlanpointSection.tsx:12`
- Current: `https://app.planpoint.io/azurea/william?...`
- **Action needed:** Create new Planpoint project for Allurea → get new URL → replace.

### 3. Logo SVG contents
- Files renamed but **SVG contents are still the Azurea brand mark**.
- **Action needed:** Replace SVG files at `public/allurea-icon.svg`, `public/allurea-logo.svg`, `public/allurea-wordmark.svg` with actual Allurea brand assets.

### 4. Royal Bali references
- `DeveloperSection.tsx:164` — "Allurea is developed by Royal Bali Group..."
- **Decide:** Is Allurea also a Royal Bali project? If different developer, update.

---

## What Likely Needs Manual Editing (per user intent)

The user said: *"maybe we will change planpoint picture renders and also the map change maybe a little bit the location etc"*

### Map & Location (`components/sections/LocationSection.tsx`)
- Project coordinates (currently Azurea's Seseh location):
  ```ts
  const ALLUREA_LNG = 115.129046;
  const ALLUREA_LAT = -8.610440;
  ```
- POI lists per tab (Overview / Coastline / Lifestyle / Directions) — each contains beach names, distances, descriptions specific to Seseh.
- Body copy throughout: references to "Seseh", "Canggu", "Pererenan", "Omni Gym" — adjust if Allurea is in different location.
- Mapbox styling preserved — no Mapbox token change needed.

### Hero video poster (`components/sections/Hero.tsx`)
- Currently uses `azurea_update_render_web.mp4` — needs new render.

### Inquiry form (`components/sections/InquirySection/index.tsx` + `InquiryForm.tsx`)
- **WhatsApp number** line 90ish: `https://wa.me/6285956779721` — replace with Allurea sales number.
- **Email**: check `InquirySection/index.tsx` for any `info@royal...` mentions — replace if separate Allurea inbox.
- **Google Apps Script URL** (`InquiryForm.tsx:9`): submissions currently post to Azurea's sheet — create new Apps Script + Sheet for Allurea, paste URL.

### Metadata (`app/layout.tsx`)
- Lines 25-31: title, description, OG site name — already say Allurea but **review copy** ("private coastal enclave in Munggu/Seseh, Bali") since location may change.

### Brand palette (optional)
- `app/globals.css` — comment says "Azurea Brand Identity guide". If Allurea has different palette (different gold? different navy?), edit CSS custom properties:
  - `--color-brand-black` (currently `#F8F8F6` ivory)
  - `--color-cream` (currently `#0d1833` dark navy)
  - `GOLD` constant in components (`#C9A55A`) — defined per-component, search & replace if changing.

---

## Files Touched in Last Azurea Session (context for next dev)

Recent work on Azurea (carried over to Allurea identically):

- `ProcessJourney.tsx` — mobile accordion + desktop sticky scroll redesign, gold ghost number, deliverables list per step, phase badges, large gold display numbers
- `ProjectGallery.tsx` — mobile 2-col tap grid + desktop swiper
- `InquirySection/InquiryForm.tsx` — 2-col grid, white button text, `whitespace-nowrap`, `bg-[#F8F8F6]` on selects (no black dropdowns)
- `InquirySection/index.tsx` — WhatsApp icon, `shrink-0` icon container
- `CinematicJourney/index.tsx` — architecture chapter removed, 3 chapters remain (vision/investment/villa), mobile image overlay fixed (`rgba(0,0,0,0.55)` not `from-brand-black`)
- `EarlyInvestorSection.tsx` — 4-panel horizontal image accordion, `flex-[5]`/`flex-[1]` expansion
- `LocationSection.tsx` — `shortLabel` field, mobile section rewrite (header, tab colors, hero gradient), POI pills

If next session does any of these, they're already in `../azurea/` git history at commits `c2e2099`/`98a41c7`/`c94bc2f`/`cb47092`/`18251a8`.

---

## Stack & Constraints (same as Azurea)

- **Framework**: Next.js (App Router) — **breaking-change version**, read `AGENTS.md` and `node_modules/next/dist/docs/` before writing new patterns
- **Tailwind**: v4 with CSS custom properties (inverted naming: `bg-brand-black` = ivory, `text-cream` = dark navy)
- **Animation**: Framer Motion (`useScroll`, `useMotionValueEvent`, sticky scroll patterns)
- **Map**: Mapbox GL JS
- **Forms**: Google Apps Script endpoint (no backend)
- **Images**: CloudFront CDN (`d1pjqs5r0ua4f1.cloudfront.net`) — see swap note above

---

## Setup Steps for Allurea Dev

```bash
cd /home/branko/Documents/Projects/allurea
pnpm install   # or npm install
pnpm dev       # localhost:3000
```

First commit (when ready):
```bash
git add -A
git commit -m "Initial commit: cloned from Azurea, renamed Azurea→Allurea"
gh repo create allurea --private --source=. --remote=origin --push
```

---

## TL;DR Checklist for Next Session

When user is ready to fully diverge Allurea from Azurea:

- [ ] Upload Allurea renders to CDN, find/replace `azurea_` → `allurea_` in image paths
- [ ] Replace 3 SVG logo files in `public/`
- [ ] New Planpoint project + URL swap in `PlanpointSection.tsx`
- [ ] Update map coords + POI list in `LocationSection.tsx` if location differs
- [ ] New Google Apps Script URL in `InquiryForm.tsx`
- [ ] New WhatsApp number in `InquirySection/index.tsx`
- [ ] New Hero video render in `Hero.tsx`
- [ ] Decide on developer attribution (`DeveloperSection.tsx`)
- [ ] Review/adjust copy in `app/layout.tsx` metadata, `app/privacy/`, `app/terms/`
- [ ] Optional: brand palette tweaks in `app/globals.css` if different from Azurea gold/navy

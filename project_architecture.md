
# VillaVBali — Project Architecture Document

> **Generated:** 2026-04-14  
> **Source inputs:** `whiteboard_mapping.jpeg`, `VillaVBaliBrand_Draft-1.pdf`, `/public/brand_assets_-00*.jpg`, `/renders/` directory inventory, `/app/` codebase scan  
> **Status:** PLANNING PHASE — Placeholder scaffolding ready; content gaps enumerated in Section 6.

---

## 1. Executive Summary

This document defines the complete front-end architecture for the **Villa V Collection** project showcase website. The site is a multi-page Next.js App Router application whose function is lead generation and developer/investor presentation for a luxury villa development in Bali, Indonesia.

Three distinct villas are confirmed in the render asset inventory. The brand identity (PDF draft) establishes a high-contrast tropical-luxury aesthetic anchored in an olive-green/off-white palette with a condensed display serif wordmark and a geometric triangle pattern as the secondary brand element.

All page routes, section placeholders, CSS variable definitions, component contracts, and identified content gaps are specified below.

---

## 2. Available Asset Inventory

### 2.1 Video Assets (`/renders/`)

| File | Orientation | Subject | Approx. Size | Intended Use (current best guess) |
|---|---|---|---|---|
| `VILLA 1 HORIZONTAL-003.mov` | Landscape 16:9 | Villa 1 exterior/interior | ~7.4 GB | Product page – Villa 1 hero |
| `VILLA 1 VERTICAL VIDEO-007.mov` | Portrait 9:16 | Villa 1 | ~5.8 GB | Mobile hero / social clips |
| `VILLA 2 HORIZONTAL-005.mov` | Landscape 16:9 | Villa 2 | ~4.6 GB | Product page – Villa 2 hero |
| `VILLA 3 HORIZONTAL-006.mov` | Landscape 16:9 | Villa 3 | ~4.5 GB | Product page – Villa 3 hero |
| `VILLA 3 VERTICAL-002.mov` | Portrait 9:16 | Villa 3 | ~4.2 GB | Mobile hero / social clips |
| `RENDERS 3 VILLA.mov` | TBD | All 3 villas overview | ~6.7 GB | Homepage hero video loop |
| `RENDERS 3 VILLA-004.mov` | TBD | All 3 villas (alt cut) | ~6.7 GB | Fallback / B-roll |

> **CRITICAL ACTION REQUIRED:** All `.mov` files must be transcoded to `.mp4` (H.264 or H.265) and `.webm` (VP9) at ≤10 MB for web autoplay loops before deployment. Raw `.mov` files cannot be streamed in a browser.

### 2.2 Static Render Archives (`/renders/*.zip`)

Eight ZIP archives contain still renders and 3D views. Contents are not yet extracted.

| Archive | Approx. Size |
|---|---|
| `09 – Visual Renders & 3D Views-20260414T085249Z-3-001.zip` | ~2.0 GB |
| `09 – Visual Renders & 3D Views-20260414T085249Z-3-008.zip` | ~2.0 GB |
| `09 – Visual Renders & 3D Views-20260414T085249Z-3-009.zip` | ~2.0 GB |
| `09 – Visual Renders & 3D Views-20260414T085249Z-3-010.zip` | ~0.3 GB |
| `09 – Visual Renders & 3D Views-20260414T090344Z-3-001.zip` | ~2.0 GB |
| `09 – Visual Renders & 3D Views-20260414T090344Z-3-008.zip` | ~2.0 GB |
| `09 – Visual Renders & 3D Views-20260414T090344Z-3-009.zip` | ~2.0 GB |
| `09 – Visual Renders & 3D Views-20260414T090344Z-3-010.zip` | ~0.3 GB |

> **ACTION REQUIRED:** Extract and catalog all renders. Organize into `/public/renders/villa-1/`, `/public/renders/villa-2/`, `/public/renders/villa-3/`, `/public/renders/exterior/` before gallery sections can be built.

### 2.3 Photography & Brand Illustration (`/public/`)

| File | Content | Intended Use |
|---|---|---|
| `brand_assets_-000.jpg` | Watercolor tropical leaf border (left-aligned, tall) | Section dividers, hero overlays, decorative framing |
| `brand_assets_-001.jpg` | Watercolor tropical leaf border (right-aligned, tall) | Mirror pair to _000 — section framing |
| `brand_assets_-002.jpg` | Aerial drone — Bali waterfall/river through jungle | Homepage hero background, Location page hero |
| `brand_assets_-003.jpg` | Aerial panoramic — Bali jungle canopy (wide crop) | Location page wide panoramic band |
| `brand_assets_-004.jpg` | Blank/placeholder | **Not usable — empty file** |
| `brand_assets_-005.jpg` | Blank/placeholder | **Not usable — empty file** |
| `brand_assets_-006.jpg` | Blank/placeholder | **Not usable — empty file** |
| `brand_assets_-007.jpg` | Blank/placeholder | **Not usable — empty file** |
| `brand_assets_-008.jpg` | Dark lush tropical foliage illustration (dense) | Section background textures, Contact page backdrop |

> **NOTE:** `brand_assets_-004` through `brand_assets_-007` are zero/near-zero content files. They are likely export failures from the original brand package. Request re-export from the brand designer.

---

## 3. Full Page & Routing Structure

The whiteboard maps a **7-section content model** and a **multi-page routing structure**. Interpretation: the homepage functions as a condensed overview with a looping video hero and teaser cards for each inner page. Each numbered item (1–7) corresponds to either a dedicated page or a major homepage section.

### 3.1 Route Map

```
/                          → Homepage
/project                   → Project Overview
/location                  → Location
/product                   → Product / Villas Overview
/product/villa-1           → Villa 1 Detail
/product/villa-2           → Villa 2 Detail
/product/villa-3           → Villa 3 Detail
/plans                     → Floor Plans & Site Plans
/promotions                → Promotions
/contact                   → Contact / Lead Form
```

### 3.2 Global Layout Components

```
app/
  layout.tsx               → Root layout (Nav + Footer wrapper)

components/
  Nav.tsx                  → Global navigation bar
  Footer.tsx               → Global footer
```

**Nav items (derived from whiteboard + brand):**

| Label | Route |
|---|---|
| Project | `/project` |
| Location | `/location` |
| Product | `/product` |
| Plans | `/plans` |
| Promotions | `/promotions` |
| Contact | `/contact` |

---

### 3.3 Page Sections — Detailed Breakdown

#### Page: `/` — Homepage

| # | Section ID | Component | Content Required | Asset Mapped |
|---|---|---|---|---|
| 1 | `hero-video` | `<HeroVideo>` | Autoplay looping video, muted, full-screen | `RENDERS 3 VILLA.mov` → transcoded `.mp4` |
| 2 | `hero-intro` | `<HeroIntro>` | Brand headline copy, subheadline, CTA button | **MISSING: Headline copy** |
| 3 | `location-teaser` | `<LocationTeaser>` | Short location statement, aerial image, link to `/location` | `brand_assets_-002.jpg` |
| 4 | `villa-cards` | `<VillaCardGrid>` | 3 villa preview cards with name, short descriptor, video thumbnail | Villa 1/2/3 horizontal `.mov` stills |
| 5 | `promotions-banner` | `<PromotionsBanner>` | Promotion headline, CTA to `/promotions` | **MISSING: Promotion offer text** |
| 6 | `project-strip` | `<ProjectStrip>` | Brief project pitch, developer/promoter name, CTA to `/project` | **MISSING: Developer name + project tagline** |
| 7 | `contact-cta` | `<ContactCTA>` | Short statement + lead form link or inline email capture | **MISSING: CTA copy** |

---

#### Page: `/project` — Project Overview

| # | Section ID | Component | Content Required | Asset Mapped |
|---|---|---|---|---|
| 1 | `project-hero` | `<PageHero>` | Page title "The Project", hero image or video | `brand_assets_-002.jpg` or `RENDERS 3 VILLA.mov` |
| 2 | `project-overview` | `<ProjectOverview>` | Project description, vision statement, total unit count | **MISSING: Project description copy** |
| 3 | `project-promoter` | `<PromoterBlock>` | Promoter/developer name, logo, short bio, credentials | **MISSING: Promoter name, logo, bio** |
| 4 | `project-promotion` | `<PromotionHighlight>` | Current deal/offer overview, pricing tier intro | **MISSING: Promotion details** |
| 5 | `project-gallery` | `<MasonryGallery>` | Project renders — exterior overview, site views | Renders from ZIP archives (pending extraction) |

---

#### Page: `/location` — Location

| # | Section ID | Component | Content Required | Asset Mapped |
|---|---|---|---|---|
| 1 | `location-hero` | `<PageHero>` | Full-width aerial image, "Bali, Indonesia" title | `brand_assets_-002.jpg` |
| 2 | `location-panorama` | `<FullBleedImage>` | Wide panoramic jungle shot | `brand_assets_-003.jpg` |
| 3 | `location-context` | `<LocationContext>` | Region name, municipality, distance to key landmarks | **MISSING: Exact villa address / area name (e.g., Canggu, Ubud, Seminyak?)** |
| 4 | `location-map` | `<InteractiveMap>` | Embedded map (Google Maps or Mapbox) with pin | **MISSING: GPS coordinates** |
| 5 | `location-nearby` | `<NearbyAttractions>` | List of nearby POIs (beaches, temples, airports) with distance | **MISSING: POI list and distances** |

---

#### Page: `/product` — Villas Overview

| # | Section ID | Component | Content Required | Asset Mapped |
|---|---|---|---|---|
| 1 | `product-hero` | `<PageHero>` | Title "The Villas", short overview statement | **MISSING: Overview copy** |
| 2 | `villa-grid` | `<VillaGrid>` | 3 villa cards with name, thumbnail, bedroom count, price | **MISSING: Villa names, specs, pricing** |

---

#### Page: `/product/villa-[id]` — Individual Villa Detail (dynamic route × 3)

| # | Section ID | Component | Content Required | Asset Mapped |
|---|---|---|---|---|
| 1 | `villa-video-hero` | `<VillaVideoHero>` | Full-bleed autoplay video | `VILLA [1/2/3] HORIZONTAL.mov` → transcoded `.mp4` |
| 2 | `villa-intro` | `<VillaIntro>` | Villa name, tagline, key spec highlights (beds, baths, sqm, price) | **MISSING: Villa specs per unit** |
| 3 | `villa-gallery` | `<PhotoGallery>` | Interior + exterior render stills (6–12 images minimum) | Renders from ZIP (pending extraction) |
| 4 | `villa-features` | `<FeatureList>` | Amenities, finishes, inclusions | **MISSING: Villa amenity list** |
| 5 | `villa-floorplan-preview` | `<FloorPlanPreview>` | Thumbnail floor plan with link to `/plans` | **MISSING: Floor plan images per villa** |
| 6 | `villa-cta` | `<VillaCTA>` | Enquire button, WhatsApp CTA, or form trigger | **MISSING: Contact phone / WhatsApp number** |

---

#### Page: `/plans` — Floor Plans & Site Plans

| # | Section ID | Component | Content Required | Asset Mapped |
|---|---|---|---|---|
| 1 | `plans-hero` | `<PageHero>` | Title "Floor Plans" | Generic brand background |
| 2 | `site-plan` | `<SitePlanViewer>` | Full site/masterplan image with villa location markers | **MISSING: Site plan image** |
| 3 | `villa-1-plans` | `<FloorPlanSet>` | Floor plan image(s) for Villa 1, level-by-level | **MISSING: Floor plan files, Villa 1** |
| 4 | `villa-2-plans` | `<FloorPlanSet>` | Floor plan image(s) for Villa 2 | **MISSING: Floor plan files, Villa 2** |
| 5 | `villa-3-plans` | `<FloorPlanSet>` | Floor plan image(s) for Villa 3 | **MISSING: Floor plan files, Villa 3** |
| 6 | `plans-download` | `<DownloadBlock>` | Optional: downloadable PDF brochure CTA | **MISSING: Brochure PDF (if applicable)** |

---

#### Page: `/promotions` — Promotions

| # | Section ID | Component | Content Required | Asset Mapped |
|---|---|---|---|---|
| 1 | `promotions-hero` | `<PageHero>` | Title "Current Promotions" | Brand background |
| 2 | `promoter-profile` | `<PromoterProfile>` | Promoter name, photo, credentials, contact | **MISSING: Promoter details** |
| 3 | `promotion-cards` | `<PromotionCardList>` | Individual promotion items (early-bird, payment plans, etc.) | **MISSING: Specific promotion terms** |
| 4 | `promotions-cta` | `<PromotionsCTA>` | Call to action — enquire or download terms sheet | **MISSING: Terms sheet PDF** |

---

#### Page: `/contact` — Contact / Lead Form

| # | Section ID | Component | Content Required | Asset Mapped |
|---|---|---|---|---|
| 1 | `contact-hero` | `<PageHero>` | Title "Contact Us", background image | `brand_assets_-008.jpg` (dark foliage) |
| 2 | `contact-form` | `<LeadForm>` | Fields: Name, Email, Phone, Villa of Interest, Message | **MISSING: Form submission destination (email / CRM)** |
| 3 | `contact-info` | `<ContactInfo>` | Phone, email, office address, WhatsApp link | **MISSING: All contact details** |
| 4 | `contact-map` | `<OfficeMap>` | Optional office/sales gallery location | **MISSING: Sales office location** |

---

## 4. Global CSS Variables — `app/globals.css`

### 4.1 Color Palette

Extracted visually from `VillaVBaliBrand_Draft-1.pdf` (Option 1 swatch panel). Hex values are **best-effort approximations** from visual analysis — exact values must be confirmed with the brand designer.

```css
:root {
  /* ─── PRIMARY BRAND COLORS ─── */

  /* Forest / Olive Green — dominant brand color, used for logo background,
     geometric pattern fill, and primary CTAs */
  --color-brand-green:       #6B8C35;

  /* Near Black / Charcoal — body text, nav, footer, strong UI elements */
  --color-brand-black:       #1A1A1A;

  /* ─── NEUTRAL PALETTE ─── */

  /* Off-White / Warm Cream — primary page background */
  --color-bg-primary:        #F2EFE8;

  /* Light Warm White — card backgrounds, overlay panels */
  --color-bg-secondary:      #FAFAF7;

  /* Sage / Muted Blue-Gray — secondary accent, subtle UI states */
  --color-accent-sage:       #B0C4C4;

  /* Light Gray — borders, dividers, inactive states */
  --color-gray-light:        #D4D4D4;

  /* Medium Gray — secondary body text, captions */
  --color-gray-mid:          #A8A8A8;

  /* ─── SEMANTIC ALIASES ─── */

  --color-text-primary:      var(--color-brand-black);
  --color-text-secondary:    var(--color-gray-mid);
  --color-text-on-dark:      var(--color-bg-primary);
  --color-text-on-green:     #FFFFFF;
  --color-cta-bg:            var(--color-brand-green);
  --color-cta-text:          #FFFFFF;
  --color-cta-hover:         #5A7828;   /* darkened brand green ~15% */
  --color-border:            var(--color-gray-light);
  --color-surface:           var(--color-bg-secondary);
}
```

> **MISSING — EXACT HEX CONFIRMATION REQUIRED:**  
> The brand PDF (Option 1) shows the color swatches visually but does not print the hex codes in the document. The values above are derived by eye from the PDF rendering. Before coding, request the exact hex codes from the brand designer (Fifth Avenue Properties / brand studio).

### 4.2 Typography

```css
:root {
  /* ─── DISPLAY / HEADING FONT ─── */
  /* Role: Logo wordmark, H1, H2, section titles */
  /* Visual match from brand PDF: condensed display serif, high stroke contrast,
     comparable to Cormorant Display, Playfair Display Condensed, or Freight Big */
  --font-display: 'PLACEHOLDER_DISPLAY_FONT', 'Cormorant Display', Georgia, serif;

  /* ─── BODY / UI FONT ─── */
  /* Role: Body copy, nav items, labels, captions */
  /* Visual match: clean geometric sans-serif */
  --font-body: 'PLACEHOLDER_BODY_FONT', 'Inter', Helvetica, sans-serif;

  /* ─── ACCENT / CAPTION FONT ─── */
  /* Role: Small caps subtitles (e.g., "BALI, INDONESIA"), tags, labels */
  --font-accent: var(--font-display);  /* same family at small-caps weight */

  /* ─── TYPE SCALE ─── */
  --text-hero:    clamp(3.5rem, 8vw, 8rem);     /* homepage hero headline */
  --text-h1:      clamp(2.5rem, 5vw, 5rem);
  --text-h2:      clamp(1.75rem, 3vw, 3rem);
  --text-h3:      clamp(1.25rem, 2vw, 2rem);
  --text-body-lg: 1.125rem;    /* 18px — primary body */
  --text-body:    1rem;        /* 16px */
  --text-sm:      0.875rem;    /* 14px — captions, labels */
  --text-xs:      0.75rem;     /* 12px — legal, micro-copy */

  /* ─── LETTER SPACING ─── */
  --tracking-hero:    0.02em;
  --tracking-heading: 0.04em;
  --tracking-caps:    0.15em;   /* small-caps labels like "BALI, INDONESIA" */
  --tracking-body:    0;
}
```

> **MISSING — FONT NAMES REQUIRED:**  
> The brand PDF does not name the typefaces. The wordmark font must be identified or licensed before implementation. See Section 6, items F-01 and F-02.

### 4.3 Spacing & Layout Tokens

```css
:root {
  /* ─── SPACING SCALE ─── */
  --space-1:  0.25rem;   /* 4px */
  --space-2:  0.5rem;    /* 8px */
  --space-3:  0.75rem;   /* 12px */
  --space-4:  1rem;      /* 16px */
  --space-6:  1.5rem;    /* 24px */
  --space-8:  2rem;      /* 32px */
  --space-12: 3rem;      /* 48px */
  --space-16: 4rem;      /* 64px */
  --space-24: 6rem;      /* 96px */
  --space-32: 8rem;      /* 128px */

  /* ─── SECTION VERTICAL RHYTHM ─── */
  --section-padding-y:  var(--space-24);
  --section-padding-x:  var(--space-8);

  /* ─── CONTAINER ─── */
  --container-max:      1440px;
  --container-wide:     1280px;
  --container-default:  1100px;
  --container-narrow:   720px;

  /* ─── BORDER RADIUS ─── */
  --radius-sm:  4px;
  --radius-md:  8px;
  --radius-lg:  16px;
  --radius-xl:  24px;

  /* ─── TRANSITION ─── */
  --transition-fast:    150ms ease;
  --transition-default: 300ms ease;
  --transition-slow:    600ms cubic-bezier(0.16, 1, 0.3, 1);
}
```

### 4.4 Brand Pattern & Decoration Tokens

```css
:root {
  /* Geometric triangle tessellation — used as background pattern overlay */
  /* Generated as SVG data URI or imported as a CSS background-image */
  --pattern-triangle-opacity-dark:  0.12;
  --pattern-triangle-opacity-light: 0.06;

  /* Foliage decorative assets */
  --deco-leaf-left:  url('/brand_assets_-000.jpg');
  --deco-leaf-right: url('/brand_assets_-001.jpg');
  --deco-foliage-bg: url('/brand_assets_-008.jpg');
}
```

---

## 5. File & Component Architecture

```
villa-v-bali/
├── app/
│   ├── layout.tsx                    ← Root layout — Nav + Footer + font loading
│   ├── globals.css                   ← All CSS custom properties (Section 4)
│   ├── page.tsx                      ← Homepage /
│   ├── project/
│   │   └── page.tsx                  ← /project
│   ├── location/
│   │   └── page.tsx                  ← /location
│   ├── product/
│   │   ├── page.tsx                  ← /product (overview)
│   │   └── [villa]/
│   │       └── page.tsx              ← /product/villa-1, /product/villa-2, /product/villa-3
│   ├── plans/
│   │   └── page.tsx                  ← /plans
│   ├── promotions/
│   │   └── page.tsx                  ← /promotions
│   └── contact/
│       └── page.tsx                  ← /contact
│
├── components/
│   ├── layout/
│   │   ├── Nav.tsx                   ← Global navigation
│   │   └── Footer.tsx                ← Global footer
│   ├── sections/
│   │   ├── HeroVideo.tsx             ← Full-bleed autoplay video hero
│   │   ├── HeroIntro.tsx             ← Headline + subheadline + CTA
│   │   ├── PageHero.tsx              ← Reusable inner-page hero (title + bg image)
│   │   ├── VillaCardGrid.tsx         ← 3-up villa preview cards
│   │   ├── VillaVideoHero.tsx        ← Per-villa video hero
│   │   ├── PhotoGallery.tsx          ← Masonry / grid image gallery
│   │   ├── FloorPlanSet.tsx          ← Floor plan viewer with lightbox
│   │   ├── LocationContext.tsx       ← Area description + stats
│   │   ├── InteractiveMap.tsx        ← Google Maps / Mapbox embed
│   │   ├── PromoterProfile.tsx       ← Promoter bio card
│   │   ├── PromotionCardList.tsx     ← Promotions list
│   │   ├── LeadForm.tsx              ← Contact / enquiry form
│   │   ├── ContactInfo.tsx           ← Phone, email, WhatsApp
│   │   ├── FullBleedImage.tsx        ← Edge-to-edge image section
│   │   └── FeatureList.tsx           ← Amenity / feature bullet grid
│   └── ui/
│       ├── Button.tsx                ← CTA button (primary/secondary variants)
│       ├── SectionWrapper.tsx        ← Consistent section padding container
│       ├── BrandMark.tsx             ← Asterisk brand mark SVG
│       ├── TrianglePattern.tsx       ← Geometric pattern SVG overlay
│       └── LeafDecoration.tsx        ← Left/right watercolor leaf framing
│
├── public/
│   ├── brand_assets_-000.jpg         ← Leaf border left
│   ├── brand_assets_-001.jpg         ← Leaf border right
│   ├── brand_assets_-002.jpg         ← Aerial waterfall hero
│   ├── brand_assets_-003.jpg         ← Jungle panoramic
│   ├── brand_assets_-008.jpg         ← Dark foliage texture
│   ├── renders/                      ← TO BE POPULATED from ZIP extraction
│   │   ├── villa-1/
│   │   ├── villa-2/
│   │   ├── villa-3/
│   │   └── exterior/
│   └── videos/                       ← TO BE POPULATED from .mov transcoding
│       ├── hero-loop.mp4
│       ├── hero-loop.webm
│       ├── villa-1.mp4
│       ├── villa-2.mp4
│       └── villa-3.mp4
│
└── lib/
    └── villa-data.ts                 ← Static data file for villa specs, content
```

---

## 6. Missing Information — Strict List

The following items are **blockers** — placeholder components cannot be filled until this information is supplied. Items are categorized by type and priority.

### Category A: Brand / Identity

| ID | Missing Item | Where Needed | Priority |
|---|---|---|---|
| A-01 | **Exact hex color codes** for all 6 brand swatches (currently approximated from PDF visual) | `globals.css` — `--color-*` variables | CRITICAL |
| A-02 | **Display typeface name and license** — the condensed serif used for "THE VILLA V COLLECTION" wordmark | `globals.css` — `--font-display`, `layout.tsx` font loading | CRITICAL |
| A-03 | **Body typeface name and license** — the sans-serif used for supporting copy | `globals.css` — `--font-body` | HIGH |
| A-04 | **Brand mark SVG file** — the asterisk/snowflake symbol (currently only visible in PDF raster) | `BrandMark.tsx`, Nav logo area | HIGH |
| A-05 | **Logo SVG or high-res PNG** — "THE VILLA V COLLECTION" wordmark as a vector file | `Nav.tsx`, `Footer.tsx`, hero overlays | CRITICAL |
| A-06 | **Triangle geometric pattern SVG** — the tessellated chevron pattern as a vector/SVG file | `TrianglePattern.tsx`, section backgrounds | MEDIUM |

### Category B: Copy & Content

| ID | Missing Item | Where Needed | Priority |
|---|---|---|---|
| B-01 | **Homepage hero headline** — primary H1 text for the homepage intro section (e.g., a variant or expansion of "Exhale & Discover Your Next Escape") | `HeroIntro.tsx` | CRITICAL |
| B-02 | **Homepage hero subheadline** — 1–2 sentence supporting statement beneath the headline | `HeroIntro.tsx` | CRITICAL |
| B-03 | **Homepage CTA button label and destination** — what does the primary CTA say and where does it link? | `HeroIntro.tsx` | HIGH |
| B-04 | **Project description copy** — 200–400 word overview of the Villa V Collection development | `ProjectOverview` section | HIGH |
| B-05 | **Project vision statement** — one-sentence positioning statement | Multiple pages | HIGH |
| B-06 | **Villa names** — are Villa 1, Villa 2, Villa 3 named individually (e.g., "Villa Ubud", "Villa Sayan")? | All product pages, villa cards | CRITICAL |
| B-07 | **Per-villa specifications** — bedrooms, bathrooms, build area (sqm), land area (sqm), pool type | `/product/villa-[id]` | CRITICAL |
| B-08 | **Per-villa amenity list** — what is included in each villa (kitchen type, finishes, outdoor spaces, etc.) | `FeatureList.tsx` | HIGH |
| B-09 | **Per-villa pricing** — freehold/leasehold price per villa, or price range if undisclosed publicly | Villa detail pages, villa cards | CRITICAL |
| B-10 | **Promoter/developer name, bio, and credentials** — who is developing/selling this project? | `/project`, `/promotions` | HIGH |
| B-11 | **Current promotion terms** — early-bird pricing, payment plans, inclusions, expiry dates | `/promotions` | HIGH |
| B-12 | **Location area name** — which specific area of Bali? (Canggu, Ubud, Seminyak, Pererenan, etc.) | `/location` | CRITICAL |
| B-13 | **Nearby POI list** — list of 6–10 key attractions with approximate drive time or distance | `NearbyAttractions.tsx` | MEDIUM |
| B-14 | **Footer legal copy** — copyright entity name, ABN/registration, disclaimer text | `Footer.tsx` | MEDIUM |
| B-15 | **SEO metadata** — page titles and meta descriptions for all 10 routes | `app/*/page.tsx` metadata exports | MEDIUM |

### Category C: Location & Maps

| ID | Missing Item | Where Needed | Priority |
|---|---|---|---|
| C-01 | **GPS coordinates of the villa site** — latitude/longitude | `InteractiveMap.tsx` | CRITICAL |
| C-02 | **Maps API key** — Google Maps or Mapbox token for the interactive map embed | `InteractiveMap.tsx`, `.env.local` | HIGH |
| C-03 | **Sales office / showroom address** — physical address for the contact map | `ContactInfo.tsx`, `OfficeMap.tsx` | MEDIUM |

### Category D: Media Assets

| ID | Missing Item | Where Needed | Priority |
|---|---|---|---|
| D-01 | **Web-optimized video files** — `.mov` renders must be transcoded to `.mp4` + `.webm` (target ≤10 MB for hero loops, ≤80 MB for full villa walkthrough) | `HeroVideo.tsx`, `VillaVideoHero.tsx` | CRITICAL |
| D-02 | **Still render catalog** — ZIP archives must be extracted and images sorted by villa number and shot type | `PhotoGallery.tsx`, all gallery sections | CRITICAL |
| D-03 | **Floor plan images or PDFs** — one or more floor plan drawings per villa (ground floor, upper floor if applicable) | `FloorPlanSet.tsx`, `/plans` page | CRITICAL |
| D-04 | **Site masterplan image** — overall site layout showing the 3 villas in relation to each other and the land boundary | `SitePlanViewer.tsx` | HIGH |
| D-05 | **Re-exported brand assets** — files `brand_assets_-004.jpg` through `brand_assets_-007.jpg` are empty/corrupt; need re-export from brand studio | TBD (unknown content) | HIGH |
| D-06 | **Promoter headshot or company logo** | `PromoterProfile.tsx` | MEDIUM |
| D-07 | **OG image** (1200×630px) — social share preview image for all pages | `app/layout.tsx` metadata | MEDIUM |

### Category E: Technical / Integration

| ID | Missing Item | Where Needed | Priority |
|---|---|---|---|
| E-01 | **Form submission destination** — where do lead form submissions go? Options: email address via API route, Resend/SendGrid integration, HubSpot, or a CRM webhook | `LeadForm.tsx`, `app/api/contact/route.ts` | CRITICAL |
| E-02 | **WhatsApp business number** — for WhatsApp CTA links on villa pages and contact page | `ContactInfo.tsx`, `VillaCTA.tsx` | HIGH |
| E-03 | **Primary contact email address** | `ContactInfo.tsx`, form handler | HIGH |
| E-04 | **Primary contact phone number** | `ContactInfo.tsx` | MEDIUM |
| E-05 | **Domain name** — what is the production URL? Needed for canonical URLs, OG tags, and Vercel deployment config | `app/layout.tsx`, `next.config.ts` | MEDIUM |
| E-06 | **Analytics requirement** — Google Analytics, Plausible, or no tracking? | `app/layout.tsx` | LOW |
| E-07 | **Brochure PDF** — downloadable investor/buyer brochure for the `/plans` or `/promotions` download CTA | `DownloadBlock.tsx` | LOW |

### Category F: Reference & Design Clarification

| ID | Missing Item | Where Needed | Priority |
|---|---|---|---|
| F-01 | **Confirm or identify the display typeface** — the `von-falk.webflow.io` reference site uses a comparable luxury aesthetic; is this an inspiration reference only, or are fonts to be matched from it? | Typography system | HIGH |
| F-02 | **Confirm brand option** — PDF is labelled "OPTION 1". Are there additional brand options under consideration, or is Option 1 final? | All design decisions | HIGH |
| F-03 | **Confirm villa count and structure** — renders show 3 villas; is this correct? Are there different typologies within the same project (e.g., 2-bed vs 3-bed)? | Product architecture, `/product/[villa]` routing | HIGH |
| F-04 | **Confirm navigation structure** — should the site use a sticky nav, a slide-out drawer, or a full-screen overlay menu? | `Nav.tsx` | MEDIUM |
| F-05 | **Confirm video placement** — which specific video files are intended for the homepage hero loop vs individual villa pages? Currently mapped by filename convention (`RENDERS 3 VILLA.mov` → homepage), but needs explicit confirmation | `HeroVideo.tsx`, `VillaVideoHero.tsx` | MEDIUM |

---

## 7. Recommended Next Steps (Priority Order)

| Step | Action | Owner | Blocks |
|---|---|---|---|
| 1 | Confirm exact hex codes and font names with brand designer | Client / Designer | A-01, A-02, A-03, `globals.css` |
| 2 | Transcode all `.mov` files to `.mp4` + `.webm` at web-appropriate bitrates | Developer | D-01, all video sections |
| 3 | Extract render ZIP archives, sort images by villa into `/public/renders/villa-[n]/` | Developer / Client | D-02, all gallery sections |
| 4 | Supply villa names, specs, and pricing | Client | B-06, B-07, B-08, B-09 |
| 5 | Supply GPS coordinates and confirm area name (Canggu? Ubud?) | Client | C-01, C-02, B-12 |
| 6 | Supply floor plan files per villa | Client | D-03, D-04, `/plans` page |
| 7 | Confirm form submission email and supply WhatsApp number | Client | E-01, E-02 |
| 8 | Scaffold all route files and placeholder section components | Developer | Unblocks parallel content population |
| 9 | Implement global CSS variables in `globals.css` | Developer | All visual styling |
| 10 | Build and test `Nav.tsx` and `Footer.tsx` | Developer | All pages |

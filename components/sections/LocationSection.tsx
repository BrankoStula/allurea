// components/sections/LocationSection.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Waves, Coffee, Utensils, Wind, Plane, type LucideIcon } from "lucide-react";
import type { Camera, POI, POIType } from "@/components/ui/MapboxMap";

// ─── Types ────────────────────────────────────────────────────────────────

type SubPOI = {
  label: string;
  longitude: number;
  latitude: number;
  type: POIType;
  images: string[];
};

type SubSection = {
  id: string;
  label: string;
  shortLabel: string;
  title: string;
  body: string;
  images: string[];
  camera: Camera;
  pois: SubPOI[];
};

// ─── Constants ────────────────────────────────────────────────────────────

const GOLD = "#C9A55A";
const EASE = [0.16, 1, 0.3, 1] as const;

const POI_ICONS: Record<POIType, LucideIcon> = {
  project:    MapPin,
  beach:      Waves,
  cafe:       Coffee,
  restaurant: Utensils,
  surf:       Wind,
  airport:    Plane,
};

const u = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&q=80&w=1400&fit=crop`;

const CDN = "https://d1pjqs5r0ua4f1.cloudfront.net";

// ─── Route data & Generators ──────────────────────────────────────────────

const DIRECTIONS_ROUTE: [number, number][] = [
  [115.168190, -8.746512],
  [115.174528, -8.743160],
  [115.179331, -8.736021],
  [115.183311, -8.722684],
  [115.180459, -8.716183],
  [115.173856, -8.700142],
  [115.167888, -8.682662],
  [115.164344, -8.672855],
  [115.160012, -8.663114],
  [115.153401, -8.653456],
  [115.145823, -8.646211],
  [115.138125, -8.636102],
  [115.133214, -8.624151],
  [115.129046, -8.610440],
];

// Helper to draw a sleek curved "flight path" between any POI and the Villa
function getCurvedRoute(start: [number, number], end: [number, number]): [number, number][] {
  const segments = 30;
  const route: [number, number][] = [];
  const midX = (start[0] + end[0]) / 2;
  const midY = (start[1] + end[1]) / 2;
  const dx = end[0] - start[0];
  const dy = end[1] - start[1];
  
  // Control point offset perpendicularly to create a smooth arc
  const ctrlX = midX - dy * 0.15; 
  const ctrlY = midY + dx * 0.15;

  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const x = (1 - t) * (1 - t) * start[0] + 2 * (1 - t) * t * ctrlX + t * t * end[0];
    const y = (1 - t) * (1 - t) * start[1] + 2 * (1 - t) * t * ctrlY + t * t * end[1];
    route.push([x, y]);
  }
  return route;
}

const ALLUREA_LNG = 115.129046;
const ALLUREA_LAT = -8.610440;

// ─── Section data ─────────────────────────────────────────────────────────

const SUBSECTIONS: SubSection[] = [
  {
    id: "overview",
    label: "01 — Overview",
    shortLabel: "Overview",
    title: "A Private Coastal Enclave",
    body: "Allurea is located in Seseh, one of Bali's fastest-growing coastal areas, offering a more private and residential environment just minutes from Canggu. This positioning provides direct access to the island's most active lifestyle and rental zones while maintaining a quieter, more refined setting.",
    images: [`${CDN}/allurea_masterplan_facade_night_cars.webp`, `${CDN}/allurea_unit9_kitchen_island_stairs.webp`, `${CDN}/allurea_unit9_living_room_nook.webp`],
    camera: { longitude: 115.129046, latitude: -8.610440, zoom: 14.5, pitch: 50, bearing: 0 },
    pois: [
      { label: "Allurea", longitude: 115.129046, latitude: -8.610440, type: "project", images: [`${CDN}/allurea_masterplan_aerial_cluster_dusk.webp`] },
    ],
  },
  {
    id: "coastline",
    label: "02 — The Coastline",
    shortLabel: "Coastline",
    title: "Minutes From Bali's Most Sought-After Beaches",
    body: "Located in Seseh, Allurea is just 4–6 minutes from Seseh Beach and within 10 minutes of Pererenan's coastline. Canggu's main beachfront and beach clubs are accessible within 15–20 minutes.",
    images: [`${CDN}/canggu_beach.webp`, `${CDN}/canggu_beach_club.webp`],
    camera: { longitude: 115.130364, latitude: -8.659627, zoom: 12.5, pitch: 35, bearing: -12 },
    pois: [
      { label: "Allurea",       longitude: 115.129046,  latitude: -8.610440,           type: "project", images: [`${CDN}/allurea_unit9_living_room_nook.webp`, `${CDN}/allurea_unit1013_dining_pendants.webp`] },
      { label: "Seseh Beach",  longitude: 115.1142204, latitude: -8.647293534681705,  type: "beach",   images: [`${CDN}/canggu_beach.webp`] },
      { label: "Canggu Beach", longitude: 115.130364,  latitude: -8.659627,           type: "beach",   images: [`${CDN}/canggu_beach.webp`, `${CDN}/canggu_beach_club.webp`] },
    ],
  },
  {
    id: "canggu",
    label: "03 — Active Lifestyle",
    shortLabel: "Lifestyle",
    title: "Access to Canggu's Leading Lifestyle Infrastructure",
    body: "Allurea benefits from immediate proximity to Omni Gym, with additional access to Canggu's top fitness, wellness, and social hubs within 10–15 minutes. This ecosystem consistently attracts long-stay guests and high-value renters.",
    images: [`${CDN}/omni_real.webp`, `${CDN}/nirvana_real.webp`, `${CDN}/open_house_seseh.webp`],
    camera: { longitude: 115.148, latitude: -8.638, zoom: 14, pitch: 60, bearing: 18 },
    pois: [
      { label: "Allurea",              longitude: 115.129046,          latitude: -8.610440,           type: "project", images: [`${CDN}/allurea_masterplan_aerial_cluster_dusk.webp`] },
      { label: "OMNI",               longitude: 115.12326167791198, latitude: -8.622796844965022, type: "surf",    images: [`${CDN}/omni_real.webp`] },
      { label: "Nirvana Life Fitness", longitude: 115.15445935490021, latitude: -8.64249459676792,  type: "surf",    images: [`${CDN}/nirvana_real.webp`] },
      { label: "Bali MMA",           longitude: 115.155898,          latitude: -8.641557,           type: "surf",    images: [`${CDN}/bali_mma.webp`] },
      { label: "Jungle Padel Seseh", longitude: 115.139880,          latitude: -8.634579,           type: "surf",    images: [`${CDN}/jungle_padel_seseh.webp`] },
      { label: "Open House Seseh",   longitude: 115.138541,          latitude: -8.633828,           type: "surf",    images: [`${CDN}/open_house_seseh.webp`] },
    ],
  },
  {
    id: "directions",
    label: "04 — Getting Here",
    shortLabel: "Directions",
    title: "Easy Access from Bali International Airport",
    body: "Connected to 50+ global cities, Allurea is a scenic 25-minute coastal drive from the airport — perfectly positioned for effortless arrivals while remaining a sanctuary away from the crowds.",
    images: [`${CDN}/denpasar_airport.webp`, `${CDN}/bali_airport.webp`, `${CDN}/bali_road.webp`],
    camera: { longitude: 115.145, latitude: -8.683, zoom: 11, pitch: 0, bearing: 0 },
    pois: [
      { label: "Ngurah Rai Airport", longitude: 115.168190, latitude: -8.746512, type: "airport" as POIType, images: [u("1583212292454-1dea0f959c21")] },
      { label: "Allurea",            longitude: 115.129046, latitude: -8.610440, type: "project" as POIType, images: ["/brand_assets_-002.jpg"] },
    ],
  },
];

// ─── Dynamic map (SSR-safe) ────────────────────────────────────────────────

const MapboxMap = dynamic(() => import("@/components/ui/MapboxMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-brand-black/60 flex items-center justify-center">
      <div className="w-5 h-5 rounded-full border-2 border-[#C9A55A]/30 border-t-[#C9A55A] animate-spin" />
    </div>
  ),
});

// ─── Directions card (shared between mobile + desktop) ────────────────────

function DirectionsCard() {
  return (
    <div className="border border-white/20 p-5 backdrop-blur-md bg-cream shadow-xl">
      <div className="flex items-start gap-3 mb-3">
        <Plane size={15} style={{ color: GOLD }} className="mt-0.5 shrink-0" strokeWidth={1.5} />
        <div>
          <p className="text-white text-[13px] font-medium leading-snug">Ngurah Rai International</p>
          <p className="text-white/40 text-[11px] tracking-wide">Denpasar, Bali — DPS</p>
        </div>
      </div>
      
      <div className="ml-1.75 flex flex-col gap-1.5 mb-3">
        {["Via Kuta", "Via Seminyak", "Via Canggu"].map(step => (
          <div key={step} className="flex items-center gap-2.5">
            <div className="w-px h-4 bg-[#C9A55A]/40 ml-px" />
            <span className="text-white/50 text-[10px] tracking-widest uppercase">{step}</span>
          </div>
        ))}
      </div>

      <div className="flex items-start gap-3 mb-4">
        <MapPin size={15} style={{ color: GOLD }} className="mt-0.5 shrink-0" strokeWidth={1.5} />
        <div>
          <p className="text-white text-[13px] font-medium leading-snug">Allurea</p>
          <p className="text-white/40 text-[11px] tracking-wide">Munggu, Bali</p>
        </div>
      </div>

      <div className="border-t border-white/10 pt-4 flex gap-6">
        {[{ val: "25", label: "min by car" }, { val: "28", label: "km coastal" }, { val: "50+", label: "direct routes" }].map((s, i, arr) => (
          <div key={s.label} className="flex items-center gap-6">
            <div>
              <p className="font-display text-2xl leading-none" style={{ color: GOLD }}>{s.val}</p>
              <p className="text-white/40 text-[10px] uppercase tracking-widest mt-1">{s.label}</p>
            </div>
            {i < arr.length - 1 && <div className="w-px h-8 bg-white/10" />}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Component ────────────────────────────────────────────────────────────

export default function LocationSection() {
  const [activeIdx, setActiveIdx]     = useState(0);
  const [selectedPOI, setSelectedPOI] = useState<SubPOI | null>(null);
  const [isDesktop, setIsDesktop]     = useState(false);
  const sectionRefs  = useRef<(HTMLDivElement | null)[]>([]);
  const sectionEl    = useRef<HTMLElement>(null);
  const activeIdxRef = useRef(0);
  const navigating   = useRef(false);

  const active = SUBSECTIONS[activeIdx];

  useEffect(() => { activeIdxRef.current = activeIdx; }, [activeIdx]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const handler = (e: MediaQueryListEvent | MediaQueryList) => setIsDesktop(e.matches);
    handler(mq);
    mq.addEventListener("change", handler as (e: MediaQueryListEvent) => void);
    return () => mq.removeEventListener("change", handler as (e: MediaQueryListEvent) => void);
  }, []);

  useEffect(() => {
    if (!isDesktop) return;
    const observers = sectionRefs.current.map((el, i) => {
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) { setActiveIdx(i); setSelectedPOI(null); }
        },
        { rootMargin: "-35% 0px -35% 0px", threshold: 0 },
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach(obs => obs?.disconnect());
  }, [isDesktop]);

  useEffect(() => {
    if (!isDesktop) return; // never hijack scroll on mobile
    const section = sectionEl.current;
    if (!section) return;
    const onWheel = (e: WheelEvent) => {
      const rect    = section.getBoundingClientRect();
      const viewMid = window.innerHeight / 2;
      if (viewMid < rect.top || viewMid > rect.bottom) return;
      const cur    = activeIdxRef.current;
      const isDown = e.deltaY > 0;
      if (isDown && cur >= SUBSECTIONS.length - 1) return;
      if (!isDown && cur <= 0) return;
      const target = isDown ? cur + 1 : cur - 1;
      const targetEl = sectionRefs.current[target];
      if (!targetEl) return;
      e.preventDefault();
      if (navigating.current) return;
      navigating.current = true;
      targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
      setTimeout(() => { navigating.current = false; }, 900);
    };
    section.addEventListener("wheel", onWheel, { passive: false });
    return () => section.removeEventListener("wheel", onWheel);
  }, [isDesktop]);

  const scrollTo = (i: number) => {
    sectionRefs.current[i]?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const displayImages: string[] = selectedPOI?.images.length ? selectedPOI.images : active.images;
  const mapPOIs: POI[] = active.pois.map(({ label, longitude, latitude, type }) => ({ label, longitude, latitude, type }));
  const interactivePOIs = active.id === "directions" ? [] : active.pois.filter(p => p.type !== "project");

  // --- DYNAMIC CAMERA & ROUTE LOGIC ---
  let mapCamera: Camera = active.camera;
  let activeRoute: [number, number][] | undefined = active.id === "directions" ? DIRECTIONS_ROUTE : undefined;

  if (selectedPOI) {
    if (selectedPOI.type === "project" || selectedPOI.label === "Allurea") {
      // Just zoom into Allurea
      mapCamera = { longitude: ALLUREA_LNG, latitude: ALLUREA_LAT, zoom: 15.5, pitch: 50, bearing: 10 };
    } else {
      // Draw a curved line to Allurea
      activeRoute = getCurvedRoute(
        [selectedPOI.longitude, selectedPOI.latitude],
        [ALLUREA_LNG, ALLUREA_LAT]
      );
      
      // Calculate dynamic zoom based on distance
      const dx = selectedPOI.longitude - ALLUREA_LNG;
      const dy = selectedPOI.latitude - ALLUREA_LAT;
      const dist = Math.sqrt(dx*dx + dy*dy);
      const dynamicZoom = dist > 0.05 ? 12.2 : 13.5; // Zoom out if it's far, zoom in if it's close

      // Frame both points in the camera
      mapCamera = {
        longitude: (selectedPOI.longitude + ALLUREA_LNG) / 2,
        latitude: (selectedPOI.latitude + ALLUREA_LAT) / 2,
        zoom: dynamicZoom,
        pitch: 35,
        bearing: 0
      };
    }
  }

  return (
    <section
      ref={sectionEl}
      id="why-bali"
      aria-label="Location — Why Bali"
      className="relative bg-brand-black text-cream border-y-1 border-brand-black"
    >

      {/* ════════════════════════════════════════════════════════════════════
          MOBILE LAYOUT
      ════════════════════════════════════════════════════════════════════ */}
      <div className="flex flex-col lg:hidden w-full">

        <div className="px-6 pt-16 pb-6">
          <motion.p
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: EASE }}
            className="text-[10px] uppercase tracking-[0.35em] mb-4 flex items-center gap-4"
            style={{ color: GOLD }}
          >
            <span className="w-6 h-px inline-block" style={{ backgroundColor: GOLD }} />
            Why Bali
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.08, ease: EASE }}
            className="font-display text-cream leading-tight"
            style={{ fontSize: "clamp(2rem, 8vw, 2.75rem)", letterSpacing: "var(--tracking-heading)" }}
          >
            Location &amp; Surroundings
          </motion.h2>
        </div>

        <div className="w-full border-b border-cream/10 pb-5 mb-2">
          <div className="flex overflow-x-auto scrollbar-hide px-6 gap-3 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {SUBSECTIONS.map((s, i) => {
              const isActive = i === activeIdx;
              return (
                <button
                  key={s.id}
                  onClick={() => { setActiveIdx(i); setSelectedPOI(null); }}
                  className={`relative shrink-0 px-5 py-2.5 text-[10px] uppercase tracking-[0.2em] transition-all duration-300 rounded-full border ${
                    isActive
                      ? "bg-[#C9A55A] text-brand-black border-[#C9A55A] font-semibold"
                      : "bg-transparent text-cream/60 border-cream/20"
                  }`}
                >
                  {s.shortLabel}
                </button>
              );
            })}
          </div>
        </div>

        <div className="w-full h-[45vh] min-h-[350px] relative border-b border-cream/10 bg-[#111111]">
          <MapboxMap camera={mapCamera} pois={mapPOIs} route={activeRoute} />
          
          <div className="absolute top-4 left-4 z-10 bg-brand-black/80 backdrop-blur-md px-3 py-1.5 border border-white/10 rounded-sm">
            <span className="text-[9px] tracking-[0.2em] uppercase font-semibold" style={{ color: GOLD }}>
              {active.shortLabel}
            </span>
          </div>
          <AnimatePresence>
            {selectedPOI && (
              <motion.div
                key={selectedPOI.label}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 4 }}
                className="absolute top-4 right-4 z-10 bg-[#C9A55A] px-3 py-1.5 shadow-xl rounded-sm"
              >
                <span className="text-brand-black text-[9px] tracking-[0.2em] uppercase font-semibold">
                  {selectedPOI.label}
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="px-6 py-10 flex flex-col gap-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIdx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col gap-6"
            >
              <div>
                <h3 className="font-display text-cream leading-tight mb-4" style={{ fontSize: "clamp(1.5rem, 6vw, 2rem)" }}>
                  {active.title}
                </h3>
                <p className="text-cream/60 text-sm leading-relaxed">
                  {active.body}
                </p>
              </div>

              {interactivePOIs.length > 0 && (
                <div className="flex flex-col gap-4 mt-2">
                  <p className="text-[9px] uppercase tracking-[0.3em] text-cream/40 border-b border-cream/10 pb-2">Points of Interest</p>
                  <div className="flex flex-wrap gap-2">
                    {interactivePOIs.map(poi => {
                      const Icon = POI_ICONS[poi.type];
                      const isSelected = selectedPOI?.label === poi.label;
                      return (
                        <button
                          key={poi.label}
                          onClick={() => setSelectedPOI(isSelected ? null : poi)}
                          className={`flex items-center gap-2 px-3 py-2 text-[10px] tracking-[0.15em] uppercase transition-all duration-300 cursor-pointer rounded-sm border ${
                            isSelected
                              ? "bg-[#C9A55A] text-brand-black border-[#C9A55A] font-semibold shadow-[0_0_10px_rgba(201,165,90,0.3)]"
                              : "bg-white/5 border-cream/10 text-cream/80 hover:bg-white/10"
                          }`}
                        >
                          <Icon size={12} strokeWidth={1.8} />
                          {poi.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {active.id === "directions" && (
                <div className="mt-2">
                  <DirectionsCard />
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="w-full pb-16">
          <div className="px-6 mb-5">
            <p className="text-[9px] uppercase tracking-[0.3em] text-cream/40 border-b border-cream/10 pb-2">Gallery</p>
          </div>
          <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 px-6 pb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            <AnimatePresence mode="popLayout">
              {displayImages.map((img, i) => (
                <motion.div
                  key={img}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="relative shrink-0 w-[85%] sm:w-[60%] aspect-[4/3] snap-center rounded-sm overflow-hidden border border-cream/10 shadow-lg"
                >
                  <Image src={img} alt="" fill className="object-cover" sizes="(max-width: 768px) 85vw, 60vw" quality={90} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

      </div>

      {/* ════════════════════════════════════════════════════════════════════
          DESKTOP LAYOUT
      ════════════════════════════════════════════════════════════════════ */}
      <div className="hidden lg:grid lg:grid-cols-12 relative">

        <div className="lg:col-span-4 relative bg-brand-black">
          
          <div className="sticky top-0 h-screen w-full overflow-hidden pointer-events-none z-0">
            <div className="absolute top-0 -left-12 lg:-left-20 w-80 lg:w-96 h-80 opacity-20 drop-shadow-2xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src="/palm_tree_transparent_right.png" 
                alt=""
                className="w-full h-full object-contain object-top object-left"
              />
            </div>
            
            <div className="absolute top-0 right-0 w-[400px] h-[120vh] opacity-40">
              <svg viewBox="0 0 400 1200" preserveAspectRatio="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <g stroke={GOLD} strokeWidth="1.5" fill="none">
                  {Array.from({ length: 7 }).map((_, i) => {
                    const startX = 350 - (i * 20);
                    const peakX = 100 - (i * 30); 
                    const endX = 380 - (i * 20);
                    return (
                      <path 
                        key={i} 
                        d={`M${startX},-100 C${peakX},400 ${peakX + 100},800 ${endX},1300`} 
                        opacity={0.7 - (i * 0.2)} 
                      />
                    );
                  })}
                </g>
              </svg>
            </div>
          </div>

          <div className="relative z-10 w-full h-full -mt-[100vh]">
            {SUBSECTIONS.map((s, i) => {
              const isActive = i === activeIdx;
              return (
                <div
                  key={s.id}
                  ref={(el) => { sectionRefs.current[i] = el; }}
                  className="min-h-screen flex flex-col justify-center px-12 py-28 border-b border-cream/5 last:border-b-0"
                >
                  <motion.p
                    animate={{ opacity: isActive ? 1 : 0.25, x: isActive ? 0 : -8 }}
                    transition={{ duration: 0.22 }}
                    className="label-caps mb-6 flex items-center gap-3 drop-shadow-md"
                    style={{ color: GOLD }}
                  >
                    <span className="w-5 h-px inline-block" style={{ backgroundColor: GOLD, opacity: 0.5 }} />
                    {s.label}
                  </motion.p>

                  <div className="overflow-hidden mb-6">
                    <motion.h2
                      animate={{ y: isActive ? "0%" : "110%" }}
                      transition={{ duration: 0.38, ease: EASE }}
                      className="font-display text-cream leading-tight drop-shadow-lg"
                      style={{ fontSize: "clamp(2.25rem, 4vw, 4rem)", letterSpacing: "var(--tracking-heading)" }}
                    >
                      {s.title}
                    </motion.h2>
                  </div>

                  <motion.p
                    animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 12 }}
                    transition={{ duration: 0.3, delay: isActive ? 0.06 : 0 }}
                    className="text-cream/60 leading-relaxed text-lg max-w-sm mb-8 drop-shadow-md"
                  >
                    {s.body}
                  </motion.p>

                  {interactivePOIs.length > 0 && isActive && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.22, delay: 0.1 }}
                      className="flex flex-wrap gap-2"
                    >
                      {interactivePOIs.map(poi => {
                        const Icon = POI_ICONS[poi.type];
                        const isSelected = selectedPOI?.label === poi.label;
                        return (
                          <button
                            key={poi.label}
                            onClick={() => setSelectedPOI(isSelected ? null : poi)}
                            className={[
                              "flex items-center gap-2 px-3 py-2 text-[11px] tracking-[0.12em] uppercase transition-all duration-300 cursor-pointer backdrop-blur-md",
                              isSelected
                                ? "bg-[#C9A55A] text-white font-semibold"
                                : "bg-cream border border-[#C9A55A] text-white hover:border-[#C9A55A]/60 hover:text-[#C9A55A]",
                            ].join(" ")}
                          >
                            <Icon size={12} strokeWidth={1.8} />
                            {poi.label}
                          </button>
                        );
                      })}
                    </motion.div>
                  )}

                  {s.id === "directions" && isActive && (
                    <motion.div
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.22, delay: 0.1 }}
                      className="mt-2"
                    >
                      <DirectionsCard />
                    </motion.div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="lg:col-span-8">
          <div className="sticky top-0 h-screen flex flex-col border-l border-cream/5">

            <div className="absolute -left-6 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-3">
              {SUBSECTIONS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => scrollTo(i)}
                  aria-label={`Jump to section ${i + 1}`}
                  className="group flex items-center justify-center w-5 h-5"
                >
                  <span
                    className={[
                      "block rounded-full transition-all duration-300",
                      i === activeIdx
                        ? "w-1.5 h-7 bg-[#C9A55A]"
                        : "w-1 h-2 bg-white/20 group-hover:bg-white/40 group-hover:h-3",
                    ].join(" ")}
                  />
                </button>
              ))}
            </div>

            <div className="flex-[2] relative min-h-0">
              <MapboxMap camera={mapCamera} pois={mapPOIs} route={activeRoute} />
              <div className="absolute top-5 left-5 z-10 bg-brand-black/80 backdrop-blur-sm px-3 py-1.5 pointer-events-none border border-white/5">
                <span className="text-[10px] tracking-[0.2em] uppercase font-semibold" style={{ color: GOLD }}>
                  {String(activeIdx + 1).padStart(2, "0")} / {String(SUBSECTIONS.length).padStart(2, "0")}
                </span>
              </div>
              <AnimatePresence>
                {selectedPOI && (
                  <motion.div
                    key={selectedPOI.label}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    transition={{ duration: 0.3 }}
                    className="absolute top-5 right-5 z-10 bg-[#C9A55A] px-3 py-1.5 pointer-events-none shadow-xl"
                  >
                    <span className="text-brand-black text-[10px] tracking-[0.2em] uppercase font-semibold">
                      {selectedPOI.label}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="flex-1 relative min-h-0 overflow-hidden border-t border-cream/10">
              <AnimatePresence mode="sync">
                <motion.div
                  key={displayImages.join("|")}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="absolute inset-0 flex"
                >
                  {displayImages.map((img, i) => (
                    <div key={i} className="flex-1 relative overflow-hidden">
                      <Image src={img} alt="" fill className="object-cover" sizes="25vw" quality={90} priority={activeIdx === 0 && i === 0} />
                    </div>
                  ))}
                  <div className="absolute inset-0 bg-linear-to-t from-brand-black/80 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-5 left-6 z-10">
                    <p className="text-cream/50 text-[10px] tracking-[0.25em] uppercase drop-shadow-md">
                      {selectedPOI ? selectedPOI.label : active.label}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
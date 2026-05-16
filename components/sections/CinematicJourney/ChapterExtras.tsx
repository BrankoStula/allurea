// components/sections/CinematicJourney/ChapterExtras.tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Calendar, Home, BedDouble, Bath, Waves, Sun, Car } from "lucide-react";

const GOLD = "#C9A55A";
const CDN = "https://d1pjqs5r0ua4f1.cloudfront.net";

// ─── STATIC DATA ───

export function VisionStats() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8 border-t border-cream/10 pt-8">
      {[
        { icon: MapPin,   label: "Location",    val: "Seseh, Bali"      },
        { icon: Home,     label: "Total Units", val: "8 Private Villas" },
        { icon: Calendar, label: "Delivery",    val: "Q2 2027"          },
      ].map((s, i) => (
        <div key={i} className="flex flex-col gap-2">
          <s.icon size={16} style={{ color: GOLD }} />
          <p className="text-cream/40 text-[10px] uppercase tracking-widest">{s.label}</p>
          <p className="text-cream font-medium">{s.val}</p>
        </div>
      ))}
    </div>
  );
}

// ─── ARCHITECTURE DATA ───

export const ARCH_SPACES = [
  {
    id: "rooftop",
    label: "Rooftop Terrace",
    icon: Sun,
    mainImg: `${CDN}/azurea_gallery_26.webp`,
    desc: "Designed for sunset viewing and private entertaining. Open volumes and warm natural tones define the atmosphere — a seamless transition between sky, structure, and landscape.",
    materials: [
      { name: "Open Volume",     position: "top-10 left-10",    layout: "right" as const },
      { name: "Natural Warmth",  position: "bottom-10 right-10", layout: "left" as const },
    ]
  },
  {
    id: "pool",
    label: "Private Pool & Deck",
    icon: Waves,
    mainImg: `${CDN}/azurea_gallery_6.webp`,
    desc: "A completely private tropical oasis. Cool stone underfoot, lush landscaping on all sides, and a deep azure water feature designed for year-round use.",
    materials: [
      { name: "Organic Texture", position: "top-10 right-10",   layout: "left" as const },
      { name: "Tropical Form",   position: "bottom-10 left-10", layout: "right" as const },
    ]
  },
  {
    id: "living",
    label: "Enclosed Living",
    icon: Home,
    mainImg: `${CDN}/azurea_gallery_3.webp`,
    desc: "Climate-controlled comfort meets indoor-outdoor flow. Full-height glazing maximizes natural light and blurs the boundary between interior space and the garden beyond.",
    materials: [
      { name: "Biophilic Flow",   position: "top-10 left-10",    layout: "right" as const },
      { name: "Soft Neutrals",    position: "bottom-10 right-10", layout: "left" as const },
    ]
  },
  {
    id: "bath",
    label: "Luxury Ensuites",
    icon: Bath,
    mainImg: `${CDN}/azurea_gallery_29.webp`,
    desc: "Spa-inspired sanctuaries with deep soaking tubs and rain showers. Designed around calm, tactile surfaces that reward slowing down.",
    materials: [
      { name: "Calm Surfaces",   position: "top-10 right-10",   layout: "left" as const },
      { name: "Tactile Depth",   position: "bottom-10 left-10", layout: "right" as const },
    ]
  },
];

// ─── RIGHT PANE TABS ───

export function MaterialSwatches({ 
  activeId, 
  onSelect 
}: { 
  activeId?: string; 
  onSelect?: (id: string) => void; 
}) {
  const [localId, setLocalId] = useState(ARCH_SPACES[0].id);
  const currentId = activeId || localId;
  const setCurrentId = onSelect || setLocalId;

  return (
    <div className="mt-8 border-t border-cream/10 pt-8">
      <p className="text-[10px] uppercase tracking-[0.2em] text-cream/30 mb-6">
        Select a space to explore
      </p>

      {/* Clickable Tabs - The description card below this is now GONE! */}
      <div className="flex flex-col gap-2">
        {ARCH_SPACES.map((space) => {
          const isActive = currentId === space.id;
          const Icon = space.icon;
          return (
            <button
              key={space.id}
              onClick={() => setCurrentId(space.id)}
              className={`flex items-center gap-4 px-4 py-3 text-left transition-all duration-300 rounded-sm border cursor-pointer ${
                isActive 
                  ? "bg-[#C9A55A]/10 border-[#C9A55A]/50 text-[#C9A55A]" 
                  : "bg-transparent border-transparent text-cream/50 hover:bg-cream/5 hover:text-cream"
              }`}
            >
              <Icon size={16} style={{ color: isActive ? GOLD : "inherit" }} />
              <span className="text-xs uppercase tracking-widest font-medium">
                {space.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function VillaFeatures() {
  return (
    <div className="mt-6 border-t border-cream/10 pt-6">
      <p className="text-[10px] uppercase tracking-[0.2em] text-cream/30 mb-6">
        Optimized for groups · Built for privacy · Configured for short-term rental demand
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {[
          { icon: BedDouble, label: "3 Ensuite Bedrooms" },
          { icon: Bath,      label: "3 Bathrooms"        },
          { icon: Waves,     label: "Private Pool"       },
          { icon: Car,       label: "Private Carport"    },
          { icon: Home,      label: "Rooftop Terrace"    },
          { icon: Bath,      label: "Ice Bath"           },
        ].map((a, i) => (
          <div key={i} className="flex items-center gap-3 bg-cream border border-cream/10 p-3">
            <a.icon size={16} style={{ color: GOLD }} />
            <span className="text-white text-xs tracking-wide">{a.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
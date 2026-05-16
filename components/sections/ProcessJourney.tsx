// components/sections/ProcessJourney.tsx
"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useMotionValueEvent, useTransform } from "framer-motion";
import { KeyRound, FileCheck, Building2, PackageCheck, BarChart3, type LucideIcon } from "lucide-react";

const CDN = "https://d1pjqs5r0ua4f1.cloudfront.net";
const EASE = [0.16, 1, 0.3, 1] as const;
const SNAP: [number, number, number, number] = [0.4, 0, 0.2, 1];
const GOLD = "#C9A55A";

type Step = {
  num: string; label: string; phase: string;
  heading: string; body: string;
  deliverables: string[];
  Icon: LucideIcon; img: string;
};

const STEPS: Step[] = [
  {
    num: "01", label: "Reservation", phase: "Pre-Commitment",
    heading: "Secure Your Preferred Villa",
    body: "Lock in your unit before public release — preferred selection, structured deposit, and reservation agreement handled from day one.",
    deliverables: [
      "Unit selection with preferred pricing access",
      "Reservation agreement & deposit structure",
      "Priority access before public launch",
    ],
    Icon: KeyRound,
    img: `${CDN}/azurea_gallery_5.webp`,
  },
  {
    num: "02", label: "Legal Structuring", phase: "Legal Phase",
    heading: "PT PMA & Leasehold Setup",
    body: "Full guidance through Indonesian company formation, leasehold execution, and legal review — structured for foreign investors from start to finish.",
    deliverables: [
      "PT PMA company formation & registration",
      "Leasehold title execution & independent review",
      "Notarised documentation & compliance handling",
    ],
    Icon: FileCheck,
    img: `${CDN}/azurea_gallery_13.webp`,
  },
  {
    num: "03", label: "Construction Delivery", phase: "Build Phase",
    heading: "Professional Build Management",
    body: "Your capital works while you don't. Milestone-based reporting and on-site oversight from groundbreak through completion — no surprises.",
    deliverables: [
      "Milestone-based progress reporting",
      "On-site project management & oversight",
      "Quality checks from groundbreak to handover",
    ],
    Icon: Building2,
    img: `${CDN}/azurea_gallery_12.webp`,
  },
  {
    num: "04", label: "Turnkey Handover", phase: "Completion",
    heading: "Ready to Rent on Day One",
    body: "Fully furnished, styled, and income-ready before you arrive. Your villa is handed over guest-ready with zero delay or setup required.",
    deliverables: [
      "Fully furnished & interior-styled villa",
      "Professional photography & OTA listing setup",
      "Guest-ready on the agreed handover date",
    ],
    Icon: PackageCheck,
    img: `${CDN}/azurea_gallery_6.webp`,
  },
  {
    num: "05", label: "Rental Management", phase: "Income Phase",
    heading: "Income Without the Operations",
    body: "We handle the property. You receive the returns. Guest acquisition, platform optimisation, housekeeping, and monthly income reporting — all managed.",
    deliverables: [
      "Guest acquisition across all major OTAs",
      "Housekeeping, maintenance & daily operations",
      "Monthly income reporting & owner disbursements",
    ],
    Icon: BarChart3,
    img: `${CDN}/azurea_gallery_9.webp`,
  },
];

// ─── REVERTED MOBILE ACCORDION ───────────────────────────────────────────────

function MobileProcessJourney() {
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <section className="block lg:hidden bg-brand-black border-y border-cream/8">
      {/* Header */}
      <div className="px-6 pt-14 pb-10">
        <p className="text-[10px] uppercase tracking-[0.35em] mb-5 flex items-center gap-4" style={{ color: GOLD }}>
          <span className="w-6 h-px inline-block" style={{ backgroundColor: GOLD }} />
          From Purchase to Income · Fully Managed
        </p>
        <h2
          className="font-display text-cream leading-tight"
          style={{ fontSize: "clamp(2rem, 10vw, 3rem)", letterSpacing: "var(--tracking-heading)" }}
        >
          Your Next Steps
        </h2>
        {/* Step counter */}
        <p className="text-[10px] uppercase tracking-widest mt-3" style={{ color: GOLD }}>
          {String(activeIdx + 1).padStart(2, "0")} / {String(STEPS.length).padStart(2, "0")}
        </p>
      </div>

      {/* Accordion rows */}
      <div className="border-t border-cream/10">
        {STEPS.map((step, i) => {
          const isActive = i === activeIdx;
          const Icon = step.Icon;
          return (
            <div key={step.num} className="relative border-b border-cream/10">
              {/* Gold left accent bar */}
              <motion.div
                className="absolute left-0 top-0 bottom-0 w-[3px] origin-top"
                style={{ backgroundColor: GOLD }}
                animate={{ scaleY: isActive ? 1 : 0 }}
                transition={{ duration: 0.4, ease: EASE }}
              />

              {/* Row header button */}
              <button
                onClick={() => setActiveIdx(i)}
                className="w-full flex items-center gap-5 py-5 px-6 text-left cursor-pointer"
              >
                <span
                  className="font-display text-3xl leading-none w-10 shrink-0 transition-all duration-300"
                  style={{
                    color: "transparent",
                    WebkitTextStroke: `1px ${isActive ? "rgba(201,165,90,0.5)" : "rgba(201,165,90,0.15)"}`,
                  }}
                >
                  {step.num}
                </span>
                <span
                  className={`flex-1 text-xs uppercase tracking-[0.2em] font-medium transition-colors duration-300 ${
                    isActive ? "text-cream" : "text-cream/40"
                  }`}
                >
                  {step.label}
                </span>
                <div className="flex items-center gap-3 shrink-0">
                  <Icon size={14} style={{ color: isActive ? GOLD : "rgba(255,255,255,0.2)" }} strokeWidth={1.5} />
                  <motion.span
                    className="text-cream/30 text-xl leading-none"
                    animate={{ rotate: isActive ? 45 : 0 }}
                    transition={{ duration: 0.3, ease: EASE }}
                  >
                    +
                  </motion.span>
                </div>
              </button>

              {/* Expandable body */}
              <motion.div
                animate={{ height: isActive ? "auto" : 0, opacity: isActive ? 1 : 0 }}
                initial={false}
                transition={{ duration: 0.55, ease: EASE }}
                className="overflow-hidden"
              >
                <div className="px-6 pb-10 flex flex-col gap-6">
                  <div className="h-52 border border-cream/10 overflow-hidden">
                    <motion.img
                      src={step.img}
                      alt={step.label}
                      className="w-full h-full object-cover"
                      animate={{ opacity: isActive ? 1 : 0, scale: isActive ? 1 : 1.04 }}
                      transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
                    />
                  </div>
                  <div className="flex items-center gap-3">
                    <Icon size={14} style={{ color: GOLD }} strokeWidth={1.5} />
                    <span className="text-[10px] uppercase tracking-[0.3em]" style={{ color: GOLD }}>
                      Step {step.num} · {step.label}
                    </span>
                  </div>
                  <h3 className="font-display text-cream leading-tight" style={{ fontSize: "clamp(1.5rem, 6vw, 2rem)", letterSpacing: "var(--tracking-heading)" }}>
                    {step.heading}
                  </h3>
                  <p className="text-cream/60 text-sm leading-relaxed">
                    {step.body}
                  </p>
                  
                  {/* Mobile Deliverables */}
                  <div className="border-t border-cream/10 pt-5 mt-2">
                    <p className="text-[9px] uppercase tracking-widest text-cream/30 mb-4">Key Deliverables</p>
                    <ul className="flex flex-col gap-3">
                      {step.deliverables.map((d, dIdx) => (
                        <li key={dIdx} className="flex items-start gap-3">
                          <Icon size={12} style={{ color: GOLD, marginTop: '2px' }} strokeWidth={1.5} />
                          <span className="text-xs text-cream/70 leading-snug">{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="h-px bg-cream/10 relative overflow-hidden mt-4">
                    <div
                      className="absolute inset-y-0 left-0 h-full transition-all duration-500"
                      style={{ backgroundColor: GOLD, width: `${((i + 1) / STEPS.length) * 100}%` }}
                    />
                  </div>
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

// ─── 3-COLUMN DESKTOP ARCHITECTURAL GRID ─────────────────────────────────────

export default function ProcessJourney() {
  const [activeIdx, setActiveIdx] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Animate the vertical timeline line based on scroll progress
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActiveIdx(Math.min(STEPS.length - 1, Math.floor(v * STEPS.length)));
  });

  const active = STEPS[activeIdx];
  const ActiveIcon = active.Icon;

  return (
    <>
      <MobileProcessJourney />
      
      {/* 600vh total scroll height to allow smooth transitioning through 5 steps. */}
      <div ref={containerRef} className="hidden lg:block relative bg-brand-black border-y border-cream/10 h-[600vh]">
        
        {/* Sticky viewport container - Ensuring bottom padding is respected */}
        <div className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden pt-20 pb-16 2xl:py-24 z-10">

          {/* ── DESKTOP BACKGROUND DECORATION ── */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            {/* Leaf Shadow */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src="/left_plant_bottom_1.jpg" 
              alt="" 
              className="absolute -top-12 right-0 w-[44rem] xl:w-[50rem] opacity-[0.15] object-contain object-top object-right transform -scale-x-100"
              style={{ mixBlendMode: 'multiply' }} 
            />
            {/* Animated Sweeping Abstract Gold Lines */}
            <div className="absolute top-[20vh] left-0 w-full h-[80vh] opacity-40">
              <svg viewBox="0 0 800 1000" preserveAspectRatio="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <g stroke={GOLD} strokeWidth="1.2" fill="none">
                  {Array.from({ length: 4 }).map((_, i) => {
                    const y1 = 200 + (i * 25);
                    const peak = 400 + (i * 15);
                    const y2 = 800 + (i * 20);
                    return (
                      <motion.path 
                        key={i} 
                        d={`M-100,${y1} C200,${peak} 500,${peak - 100} 900,${y2}`} 
                        initial={{ pathLength: 0, opacity: 0 }}
                        whileInView={{ pathLength: 1, opacity: 0.4 - (i * 0.04) }}
                        viewport={{ once: true }}
                        transition={{ duration: 2.5, delay: 0.2 + (i * 0.15), ease: EASE }}
                      />
                    );
                  })}
                </g>
              </svg>
            </div>
            {/* Background Ambient Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[120px] opacity-10" style={{ background: `radial-gradient(circle, ${GOLD}40 0%, transparent 70%)` }} />
          </div>

          {/* Main Title Row */}
          <div className="w-full px-12 lg:px-20 xl:px-28 mb-10 2xl:mb-16 shrink-0 relative z-10">
            <p className="text-[10px] uppercase tracking-[0.35em] mb-4 flex items-center gap-4" style={{ color: GOLD }}>
              <span className="w-8 h-px inline-block" style={{ backgroundColor: GOLD }} />
              From Purchase to Income
            </p>
            <h2 className="font-display text-cream leading-tight" style={{ fontSize: "clamp(2.75rem, 5vw, 4.5rem)" }}>
              The Ownership Journey
            </h2>
          </div>

          {/* 3-Column Layout */}
          <div className="w-full px-12 lg:px-20 xl:px-28 grid grid-cols-12 gap-10 xl:gap-16 items-center flex-1 min-h-0 relative z-10">
            
            {/* COLUMN 1: Vertical Timeline Menu */}
            <div className="col-span-3 xl:col-span-2 relative h-full flex flex-col justify-center">
              <div className="relative pl-8 border-l border-cream/10 py-4 flex flex-col gap-8 2xl:gap-10">
                {/* The animated gold line */}
                <motion.div 
                  className="absolute left-[-1px] top-0 w-[2px] origin-top" 
                  style={{ backgroundColor: GOLD, height: lineHeight }} 
                />
                
                {STEPS.map((step, i) => (
                  <button
                    key={step.num}
                    onClick={() => containerRef.current?.scrollTo({
                      top: (containerRef.current?.offsetTop ?? 0) + (i / STEPS.length) * (containerRef.current?.scrollHeight ?? 0),
                    })}
                    className="flex flex-col text-left group cursor-pointer"
                  >
                    <span 
                      className={`font-display text-2xl transition-all duration-300 ${i === activeIdx ? "text-[#C9A55A]" : "text-cream/20 group-hover:text-cream/40"}`}
                    >
                      {step.num}
                    </span>
                    <span 
                      className={`text-[10px] uppercase tracking-widest font-medium transition-all duration-300 ${i === activeIdx ? "text-cream" : "text-cream/40 group-hover:text-cream/60"}`}
                    >
                      {step.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* COLUMN 2: Framed Image Gallery */}
            <div className="col-span-4 xl:col-span-5 flex justify-center lg:justify-start xl:justify-center relative">
              {/* Vh-based height prevents the image from overflowing the bottom of laptop screens */}
              <div className="relative h-[55vh] max-h-[650px] aspect-[3/4]">
                {/* Offset Decorative Border */}
                <div className="absolute inset-0 border border-[#C9A55A]/40 translate-x-5 -translate-y-5 pointer-events-none" />
                
                {/* Main Image Container */}
                <div className="relative w-full h-full shadow-[0_20px_50px_rgba(0,0,0,0.5)] bg-brand-black overflow-hidden z-10">
                  {STEPS.map((step, i) => (
                    <motion.div
                      key={step.num}
                      className="absolute inset-0"
                      initial={false}
                      animate={{ 
                        opacity: i === activeIdx ? 1 : 0, 
                        scale: i === activeIdx ? 1 : 1.1 
                      }}
                      transition={{ duration: 0.8, ease: EASE }}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={step.img} alt="" className="w-full h-full object-cover" />
                    </motion.div>
                  ))}
                  {/* Inner subtle shadow */}
                  <div className="absolute inset-0 border border-cream/10 pointer-events-none z-20" />
                </div>
              </div>
            </div>

            {/* COLUMN 3: Content & Deliverables */}
            <div className="col-span-5 relative h-full flex items-center">
              {/* Massive Ghost Number behind the text */}
              <div className="absolute -left-10 top-1/2 -translate-y-1/2 font-display text-[20rem] xl:text-[24rem] leading-none text-white/[0.02] select-none pointer-events-none z-0">
                {active.num}
              </div>

              {/* Vh-based height to match the image column */}
              <div className="relative z-10 w-full h-[55vh] max-h-[650px]">
                {STEPS.map((step, i) => {
                  const isActive = i === activeIdx;
                  return (
                    <motion.div
                      key={step.num}
                      className="absolute inset-0 flex flex-col justify-center"
                      initial={false}
                      animate={{
                        opacity: isActive ? 1 : 0,
                        y: isActive ? 0 : 20,
                        pointerEvents: isActive ? "auto" : "none",
                      }}
                      transition={{ duration: 0.5, ease: SNAP }}
                    >
                      <div className="flex items-center gap-3 mb-5 2xl:mb-6">
                        <ActiveIcon size={14} style={{ color: GOLD }} strokeWidth={1.5} />
                        <span className="text-[10px] uppercase tracking-[0.4em]" style={{ color: GOLD }}>
                          {step.phase}
                        </span>
                      </div>

                      <h3 className="font-display text-cream leading-tight mb-4 2xl:mb-5" style={{ fontSize: "clamp(1.75rem, 2.5vw, 2.75rem)" }}>
                        {step.heading}
                      </h3>

                      <p className="text-cream/60 text-sm 2xl:text-base leading-relaxed mb-6 2xl:mb-8 max-w-md xl:max-w-lg">
                        {step.body}
                      </p>

                      <div className="border-t border-cream/10 pt-5 2xl:pt-6">
                        <p className="text-[9px] uppercase tracking-[0.3em] text-cream/30 mb-4 2xl:mb-5">
                          Key Deliverables
                        </p>
                        <ul className="flex flex-col gap-3 2xl:gap-4">
                          {step.deliverables.map((d, dIdx) => (
                            <li key={dIdx} className="flex items-start gap-3 2xl:gap-4">
                              <span className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: GOLD }} />
                              <span className="text-xs 2xl:text-sm text-cream/80 leading-snug">{d}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
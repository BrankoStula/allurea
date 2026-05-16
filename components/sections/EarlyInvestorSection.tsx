// components/sections/EarlyInvestorSection.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;
const GOLD = "#C9A55A";
const CDN  = "https://d1pjqs5r0ua4f1.cloudfront.net";

const REASONS = [
  {
    num: "01",
    subtitle: "Selection",
    title: "Best Unit Selection",
    body: "Choose your preferred orientation, privacy level, and views before public launch. Early investors access positions not available once marketing opens.",
    img: `${CDN}/azurea_gallery_26.webp`,
    stats: [{ label: "Available Units", val: "8" }, { label: "Phase", val: "VIP" }],
  },
  {
    num: "02",
    subtitle: "Pricing",
    title: "Lowest Entry Price",
    body: "VIP investors secure units at pre-market pricing — before appreciation driven by public launch activity and broader market exposure.",
    img: `${CDN}/azurea_gallery_13.webp`,
    stats: [{ label: "Entry Stage", val: "Now" }, { label: "Advantage", val: "~15%" }],
  },
  {
    num: "03",
    subtitle: "Structure",
    title: "Flexible Payments",
    body: "Early-stage buyers benefit from phased payment terms and structured commitments not available to post-launch purchasers.",
    img: `${CDN}/azurea_gallery_6.webp`,
    stats: [{ label: "Payment Phases", val: "3" }, { label: "Terms", val: "Staged" }],
  },
  {
    num: "04",
    subtitle: "Access",
    title: "Priority Allocation",
    body: "Secure your position before public competition begins. Once the open marketing phase launches, selection is limited to remaining inventory.",
    img: `${CDN}/azurea_gallery_4.webp`,
    stats: [{ label: "Priority", val: "First" }, { label: "Basis", val: "Confirmed" }],
  },
];

export default function EarlyInvestorSection() {
  const [activeNum, setActiveNum] = useState(REASONS[0].num);

  return (
    <section className="relative bg-brand-black border-b border-cream/10 overflow-hidden">

      {/* ── TOP RIGHT PALM SHADOW ── */}
      <div className="absolute top-0 right-0 w-full max-w-lg md:max-w-2xl h-[500px] pointer-events-none z-0 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/leafs_transparent_top_right.png"
          alt=""
          className="absolute -top-10 -right-10 w-full h-auto object-contain opacity-30"
          style={{ mixBlendMode: "multiply" }}
        />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 px-6 md:px-12 lg:px-24">

        {/* ── Header ── */}
        <div className="py-16 md:py-20 border-b border-cream/10">
          <motion.p
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, ease: EASE }}
            className="label-caps mb-5 flex items-center gap-4"
            style={{ color: GOLD }}
          >
            <span className="w-8 h-px inline-block" style={{ backgroundColor: GOLD }} />
            Why Now
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
            className="font-display text-cream leading-tight"
            style={{ fontSize: "clamp(2.2rem, 4vw, 3.75rem)", letterSpacing: "var(--tracking-heading)" }}
          >
            Why Early Investors Enter at This Stage
          </motion.h2>
        </div>

        {/* ── Accordion Panels ── */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
          className="w-full h-[560px] md:h-[600px] flex flex-col md:flex-row border border-cream/10 my-10 overflow-hidden"
        >
          {REASONS.map((r) => {
            const isActive = activeNum === r.num;

            return (
              <div
                key={r.num}
                onClick={() => setActiveNum(r.num)}
                onMouseEnter={() => setActiveNum(r.num)}
                className={`relative cursor-pointer overflow-hidden border-b border-white/10 last:border-0 md:border-b-0 md:border-r md:last:border-r-0 transition-all duration-700 ${
                  isActive ? "flex-[5]" : "flex-[1]"
                }`}
                style={{ transitionTimingFunction: "cubic-bezier(0.32,0.72,0,1)" }}
              >
                {/* Background image */}
                <div className="absolute inset-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={r.img} alt="" className="w-full h-full object-cover transition-transform duration-700 scale-105" />
                  <div
                    className={`absolute inset-0 transition-opacity duration-500 ${isActive ? "opacity-100" : "opacity-75"}`}
                    style={{ background: "linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.45) 50%, rgba(0,0,0,0.25) 100%)" }}
                  />
                </div>

                {/* Collapsed: vertical label (desktop only) */}
                <AnimatePresence>
                  {!isActive && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, transition: { duration: 0.1 } }}
                      transition={{ delay: 0.15, duration: 0.3 }}
                      className="hidden md:flex absolute inset-0 items-center justify-center pointer-events-none"
                    >
                      <p
                        className="font-display text-white/70 uppercase tracking-[0.25em] -rotate-90 whitespace-nowrap"
                        style={{ fontSize: "clamp(0.75rem, 1.2vw, 1rem)" }}
                      >
                        {r.title}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Collapsed: mobile center label */}
                <AnimatePresence>
                  {!isActive && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, transition: { duration: 0.1 } }}
                      className="md:hidden absolute inset-0 flex flex-col items-center justify-center pointer-events-none gap-1"
                    >
                      <p className="text-[10px] uppercase tracking-widest" style={{ color: GOLD }}>{r.subtitle}</p>
                      <p className="font-display text-white text-lg uppercase tracking-wide">{r.title}</p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Active: full content */}
                <AnimatePresence mode="wait">
                  {isActive && (
                    <motion.div
                      key={r.num + "-active"}
                      initial={{ opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, transition: { duration: 0.1 } }}
                      transition={{ delay: 0.2, duration: 0.5, ease: EASE }}
                      className="absolute inset-0 flex flex-col justify-end p-7 md:p-10"
                    >
                      {/* Ghost number */}
                      <div
                        className="absolute top-6 right-6 font-display leading-none select-none pointer-events-none"
                        style={{ fontSize: "clamp(5rem, 10vw, 8rem)", color: `${GOLD}18` }}
                      >
                        {r.num}
                      </div>

                      {/* Gold top accent line */}
                      <div className="absolute top-0 left-0 right-0 h-px" style={{ backgroundColor: `${GOLD}60` }} />

                      <p className="text-[10px] uppercase tracking-[0.3em] mb-3" style={{ color: GOLD }}>
                        {r.subtitle}
                      </p>
                      <h3
                        className="font-display text-white leading-tight mb-4"
                        style={{ fontSize: "clamp(1.6rem, 3vw, 2.75rem)", letterSpacing: "var(--tracking-heading)" }}
                      >
                        {r.title}
                      </h3>
                      <p
                        className="text-white/70 text-sm leading-relaxed mb-6 border-l-2 pl-4"
                        style={{ borderColor: `${GOLD}50`, maxWidth: "42ch" }}
                      >
                        {r.body}
                      </p>
                      <div className="flex gap-8">
                        {r.stats.map((s, i) => (
                          <div key={i}>
                            <p className="font-display text-white text-2xl mb-0.5">{s.val}</p>
                            <p className="text-[10px] uppercase tracking-widest text-white/50">{s.label}</p>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </motion.div>

        {/* ── CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 py-12 md:py-14"
        >
          <p className="text-cream/30 text-sm max-w-md">
            This phase is limited to a small number of qualified buyers. Unit availability is allocated on a first-confirmed basis.
          </p>
          <motion.button
            onClick={() => document.querySelector("#inquiry")?.scrollIntoView({ behavior: "smooth" })}
            className="shrink-0 px-8 py-3.5 font-display text-sm uppercase tracking-widest text-white transition-colors duration-200 whitespace-nowrap"
            style={{ backgroundColor: GOLD }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#b8904a")}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = GOLD)}
          >
            Request VIP Access
          </motion.button>
        </motion.div>

      </div>

      {/* ── SVG WAVE OVERLAY ── */}
      <div className="absolute bottom-0 left-0 w-full h-64 md:h-[32rem] pointer-events-none z-0">
        <svg
          viewBox="0 0 1440 300"
          preserveAspectRatio="none"
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g stroke={GOLD} strokeWidth="0.8" fill="none" opacity="0.4">
            {Array.from({ length: 22 }).map((_, i) => {
              const baseY   = 280 - i * 4;
              const peak    = 120 + i * 5;
              return (
                <path
                  key={i}
                  d={`M-50,${baseY} C240,${peak} 1080,${peak + 100} 1500,${260 + i * 0.4 - i * 4}`}
                  opacity={Math.max(0.08, 0.5 - i * 0.015)}
                />
              );
            })}
          </g>
        </svg>
      </div>

    </section>
  );
}

// components/sections/Hero.tsx
"use client";

import { motion, Variants } from "framer-motion";
import { ChevronDown } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;
const GOLD = "#C9A55A";

const PROOF_ITEMS = ["8 Villas", "3 Bedrooms", "Private Pool", "Rooftop Terrace", "Est. 14.85% Yield", "25-Year Leasehold"];

const maskReveal: Variants = {
  hidden:   { y: "115%", opacity: 0 },
  visible:  { y: "0%", opacity: 1, transition: { duration: 1.4, ease: EASE } },
};

const maskRevealDelay: Variants = {
  hidden:   { y: "115%", opacity: 0 },
  visible:  { y: "0%", opacity: 1, transition: { duration: 1.4, ease: EASE, delay: 0.2 } },
};

const staggerContainer: Variants = {
  hidden:   { opacity: 0 },
  visible:  { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.35 } },
};

export default function Hero() {
  const scrollToInquiry = () => document.querySelector("#inquiry")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section className="relative w-full h-svh min-h-[600px] overflow-hidden bg-black">

      {/* Background video */}
      <video
        autoPlay loop muted playsInline
        poster="https://d1pjqs5r0ua4f1.cloudfront.net/azurea_gallery_13.webp"
        className="absolute inset-0 w-full h-full object-cover z-0"
        style={{ opacity: 0.75 }}
      >
        <source src="https://d1pjqs5r0ua4f1.cloudfront.net/azurea_update_render_web.mp4" type="video/mp4" />
      </video>

      {/* Subtle overlays — top shadow + bottom vignette for legibility */}
      <div className="absolute inset-0 z-0 bg-linear-to-b from-cream/50 via-transparent to-cream/90" />
      <div className="absolute inset-0 z-0 bg-cream/25" />

      {/* ── VIP PRESALE TICKER ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="absolute top-20 md:top-24 left-0 right-0 z-10 overflow-hidden border-t border-b border-white/15 pointer-events-none"
      >
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
          className="flex min-w-max py-2.5"
        >
          {[0, 1].map(copy => (
            <div key={copy} className="flex items-center shrink-0">
              {[
                { text: "VIP Presale", gold: true },
                { text: "Private Release", gold: false },
                { text: "Early Investor Access", gold: false },
                { text: "Limited Units Available", gold: false },
                { text: "Seseh, Bali", gold: false },
                { text: "Est. 14.85% Yield", gold: true },
                { text: "Pre-Market Pricing", gold: false },
                { text: "8 Private Villas", gold: false },
              ].map((item, j) => (
                <span key={j} className="flex items-center">
                  <span
                    className="text-[9px] uppercase tracking-[0.28em] px-5"
                    style={{ color: item.gold ? GOLD : "rgba(255,255,255,0.7)" }}
                  >
                    {item.text}
                  </span>
                  <span className="w-px h-2.5 inline-block bg-white/15 shrink-0" />
                </span>
              ))}
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* ── TOP ROW — location badge ── */}
      <div className="absolute top-0 left-0 right-0 z-10 px-5 md:px-12 pt-36 md:pt-40 flex justify-between items-start pointer-events-none">
        {/* Desktop: right-anchored with extending accent line (Hidden on mobile to save space) */}
        <div className="hidden md:flex ml-auto text-right relative">
          <motion.div
            className="absolute left-full top-[45%] h-0.5 origin-left ml-8"
            style={{ backgroundColor: GOLD, width: "100vw", opacity: 0.4 }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.4, delay: 0.9, ease: EASE }}
          />
          <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
            <div className="overflow-hidden mb-1">
              <motion.p variants={maskReveal} className="text-[10px] tracking-[0.4em] uppercase" style={{ color: `${GOLD}CC` }}>VIP</motion.p>
            </div>
            <div className="overflow-hidden">
              <motion.h2 variants={maskRevealDelay} className="font-display text-2xl md:text-3xl uppercase tracking-[0.2em] text-white">Presale</motion.h2>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── MAIN CONTENT — bottom-anchored ── */}
      {/* Increased mobile bottom padding (pb-24) to clear the scroll arrow */}
      <div className="absolute bottom-0 left-0 right-0 z-10 px-5 md:px-12 pb-24 md:pb-14 pointer-events-none">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="flex flex-col max-w-4xl"
        >
          {/* Left accent line — desktop only */}
          <motion.div
            className="hidden md:block absolute right-full top-[30%] h-0.5 origin-right mr-8"
            style={{ backgroundColor: GOLD, width: "100vw", opacity: 0.4 }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.4, delay: 0.9, ease: EASE }}
          />

          {/* Eyebrow — desktop only */}
          <div className="hidden md:block overflow-hidden mb-5">
            <motion.p variants={maskReveal} className="text-[10px] tracking-[0.4em] uppercase" style={{ color: GOLD }}>
              VIP Presale · Private Release
            </motion.p>
          </div>

          {/* Heading */}
          <div className="overflow-hidden mb-4 md:mb-6">
            <motion.h1
              variants={maskReveal}
              className="font-display leading-[1.08] tracking-tight text-white font-light"
              style={{ fontSize: "clamp(2.5rem, 6.5vw, 4.5rem)" }}
            >
              Investment-Grade<br className="hidden sm:block" />
              {" "}Villas in Seseh
            </motion.h1>
          </div>

          {/* Subtitle - HIDDEN ON MOBILE to save space */}
          <div className="hidden md:block overflow-hidden mb-6 md:mb-8">
            <motion.p
              variants={maskRevealDelay}
              className="text-sm md:text-base font-light leading-relaxed max-w-sm md:max-w-xl"
              style={{ color: "rgba(255,255,255,0.55)" }}
            >
              VIP pricing currently available before public release. A boutique collection of 8 private villas with rooftop living, private pools, and projected high-yield rental performance.
            </motion.p>
          </div>

          {/* Proof strip */}
          <motion.div variants={maskRevealDelay} className="mb-8 md:mb-9">
            {/* Mobile: 2-col grid, reduced to 4 items to save a row */}
            <div className="grid grid-cols-2 gap-x-4 gap-y-3 md:hidden">
              {PROOF_ITEMS.slice(0, 4).map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full shrink-0" style={{ backgroundColor: GOLD, opacity: 0.8 }} />
                  <span className="text-[10px] uppercase tracking-[0.2em] text-white/60">
                    {item}
                  </span>
                </div>
              ))}
            </div>
            {/* Desktop: inline with dividers */}
            <div className="hidden md:flex flex-wrap items-center gap-x-5 gap-y-2">
              {PROOF_ITEMS.map((item, i) => (
                <span key={i} className="flex items-center gap-5 text-[10px] uppercase tracking-[0.25em]" style={{ color: "rgba(255,255,255,0.45)" }}>
                  {i > 0 && <span className="w-px h-3 inline-block" style={{ backgroundColor: "rgba(255,255,255,0.2)" }} />}
                  {item}
                </span>
              ))}
            </div>
          </motion.div>

          {/* CTA buttons */}
          <motion.div variants={maskRevealDelay} className="flex flex-col sm:flex-row items-center gap-4 sm:gap-3 pointer-events-auto">
            {/* Primary Button */}
            <button
              onClick={scrollToInquiry}
              className="w-full sm:w-auto px-7 py-4 sm:py-3.5 font-display text-sm uppercase tracking-widest transition-colors duration-200 text-brand-black whitespace-nowrap shadow-xl"
              style={{ backgroundColor: GOLD }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#b8904a")}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = GOLD)}
            >
              Request VIP Access
            </button>
            
            {/* Desktop Secondary Button */}
            <button
              onClick={scrollToInquiry}
              className="hidden sm:block w-full sm:w-auto px-7 py-4 sm:py-3.5 border border-white/30 text-white font-display text-sm uppercase tracking-widest hover:border-white/60 hover:bg-white/5 transition-all duration-200 whitespace-nowrap"
            >
              Download Investment Deck
            </button>

            {/* Mobile Secondary Link (Saves vertical space) */}
            <button
              onClick={scrollToInquiry}
              className="sm:hidden text-[10px] uppercase tracking-widest text-white/50 hover:text-white transition-colors underline decoration-white/20 underline-offset-4 py-2"
            >
              Download Investment Deck
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* ── SCROLL INDICATOR — mobile only ── */}
      {/* Pushed down to bottom-6 to prevent overlap */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.8 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5 sm:hidden pointer-events-none"
      >
        <span className="text-[8px] uppercase tracking-[0.3em]" style={{ color: "rgba(255,255,255,0.2)" }}>Scroll</span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
        >
          <ChevronDown size={14} style={{ color: "rgba(255,255,255,0.3)" }} strokeWidth={1.5} />
        </motion.div>
      </motion.div>

      {/* ── GOLD CORNER ACCENT — mobile only ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.5, duration: 0.6, ease: EASE }}
        className="absolute bottom-0 right-0 w-24 h-24 pointer-events-none sm:hidden"
        style={{
          background: `radial-gradient(circle at bottom right, ${GOLD}20 0%, transparent 70%)`,
        }}
      />

    </section>
  );
}
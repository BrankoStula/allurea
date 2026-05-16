// components/sections/DeveloperSection.tsx
"use client";

import { motion } from "framer-motion";
import { Building2, Shield, TrendingUp, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link"; 

const EASE = [0.16, 1, 0.3, 1] as const;
const GOLD = "#C9A55A";

const PILLARS = [
  {
    num: "01",
    Icon: Building2,
    title: "Development",
    body: "Land sourcing, design coordination, and construction management are executed under a single structure, ensuring full control over quality, timelines, and delivery.",
  },
  {
    num: "02",
    Icon: Shield,
    title: "Legal Structuring",
    body: "Each investor is guided through a clear ownership structure, including PT PMA setup, contract structuring, and documentation designed for long-term security and clarity.",
  },
  {
    num: "03",
    Icon: TrendingUp,
    title: "Management",
    body: "Post-handover, villas are fully managed including guest operations, maintenance, and revenue optimisation — a seamless transition from acquisition to income.",
  },
];

const sectionVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE } },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.65, ease: EASE } },
};

// Line drawing variants
const drawLineRight = {
  hidden: { scaleX: 0 },
  visible: { scaleX: 1, transition: { duration: 1.5, ease: EASE } },
};

const drawLineDown = {
  hidden: { scaleY: 0 },
  visible: { scaleY: 1, transition: { duration: 1.5, ease: EASE } },
};

// Helper for dynamic pillar padding to match the main grid
const getPillarPadding = (i: number) => {
  if (i === 0) return "pl-6 md:pl-12 lg:pl-24 pr-6 md:pr-12 lg:pr-16";
  if (i === 1) return "px-6 md:px-12 lg:px-16";
  return "pl-6 md:pl-12 lg:pl-16 pr-6 md:pr-12 lg:pr-24";
};

export default function DeveloperSection() {
  return (
    <motion.section
      className="bg-brand-black pt-30 text-cream relative w-full overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={sectionVariants}
    >
      {/* ── BACKGROUND DECORATION LAYER (z-0) ── */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        
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

        {/* Bottom Left Leaf Element (JPG requires multiply) */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          src="/left_plant_bottom_1.png" 
          alt="" 
          className="absolute -bottom-10 -left-10 w-64 lg:w-[32rem] opacity-20 object-contain object-bottom object-left"
          style={{ mixBlendMode: 'multiply' }} 
        />

        {/* Abstract Gold Waves (Sweeping across the section) */}
        <div className="absolute top-[30%] left-0 w-full h-[80%] opacity-25">
          <svg viewBox="0 0 1000 600" preserveAspectRatio="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <g stroke={GOLD} strokeWidth="1" fill="none">
              {Array.from({ length: 7 }).map((_, i) => {
                const y1 = 100 + (i * 20);
                const xPeak = 400 + (i * 15);
                const y2 = 500 + (i * 10);
                return (
                  <path 
                    key={i} 
                    d={`M-100,${y1} C200,${y1 + 50} ${xPeak},100 1100,${y2}`} 
                    opacity={0.6 - (i * 0.04)} 
                  />
                );
              })}
            </g>
          </svg>
        </div>
      </div>

      {/* Top Border Animation */}
      <motion.div 
        className="absolute top-0 left-0 w-full h-px bg-white/10 origin-left z-10"
        variants={drawLineRight}
      />

      {/* ── Intro Header (Centered Layout) ── */}
      <div className="relative z-10 flex flex-col items-center gap-6 pt-20 lg:pt-28 pb-12 px-6 md:px-12 lg:px-24 max-w-4xl mx-auto backdrop-blur-[2px]">
        
        {/* Eyebrow */}
        <motion.p 
          variants={fadeUp} 
          className="text-[10px] uppercase tracking-[0.35em] flex items-center gap-4 drop-shadow-md" 
          style={{ color: GOLD }}
        >
          <span className="w-8 h-px bg-[#C9A55A]/40 inline-block" />
          Developed by
          <span className="w-8 h-px bg-[#C9A55A]/40 inline-block" />
        </motion.p>

        {/* Logo */}
        <motion.div variants={fadeIn} className="flex justify-center my-2 drop-shadow-2xl">
          <Image
            src="https://d1pjqs5r0ua4f1.cloudfront.net/royal_bali_group_logo-removebg-preview.webp"
            alt="Royal Bali Group"
            width={480}
            height={240}
            className="h-28 md:h-36 lg:h-40 w-auto object-contain object-center"
          />
        </motion.div>

        {/* Subheading */}
        <motion.h2
          variants={fadeUp}
          className="font-display text-cream leading-tight mt-2 drop-shadow-lg text-center"
          style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", letterSpacing: "var(--tracking-heading)" }}
        >
          A Fully Integrated Development and Management Group
        </motion.h2>

        {/* Body */}
        <motion.p 
          variants={fadeUp} 
          className="text-cream/60 text-base lg:text-lg leading-relaxed max-w-3xl drop-shadow-md text-justify"
        >
          Allurea is developed by Royal Bali Group, a Bali-based company delivering residential villa projects through a fully integrated approach.
          From land sourcing and development to legal structuring and post-handover operations, every stage is handled internally to ensure consistency, transparency, and long-term performance.
        </motion.p>
      </div>

      {/* ── Pillars Header (Left-aligned, matching EarlyInvestorSection) ── */}
      <div className="relative z-10 w-full px-6 md:px-12 lg:px-24 pt-16 md:pt-20 pb-4  mt-8">
        <motion.p
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, ease: EASE }}
          className="text-[10px] uppercase tracking-[0.35em] mb-5 flex items-center gap-4"
          style={{ color: GOLD }}
        >
          <span className="w-8 h-px inline-block" style={{ backgroundColor: GOLD }} />
          The Structure
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
          className="font-display text-cream leading-tight w-full drop-shadow-lg"
          style={{ fontSize: "clamp(2.2rem, 4vw, 3.75rem)", letterSpacing: "var(--tracking-heading)" }}
        >
          A Single Partner From Acquisition to Income
        </motion.h2>
      </div>

      {/* ── Three Pillars ── */}
      <div className="relative z-10 w-full">
        {/* Main animated top border for the pillars grid */}
        <motion.div 
          className="absolute top-0 left-0 w-full h-px bg-white/10 origin-left"
          variants={drawLineRight}
        />

        {/* Absolute Vertical Lines (Separated from the text padding) */}
        <motion.div 
          className="hidden lg:block absolute top-0 bottom-0 left-[33.333%] w-px bg-white/10 origin-top"
          variants={drawLineDown}
        />
        <motion.div 
          className="hidden lg:block absolute top-0 bottom-0 left-[66.666%] w-px bg-white/10 origin-top"
          variants={drawLineDown}
        />

        {/* Pillar Grid */}
        <div className="grid lg:grid-cols-3 relative w-full">
          {PILLARS.map((pillar, i) => {
            const Icon = pillar.Icon;
            return (
              <motion.div
                key={pillar.num}
                variants={fadeUp}
                className={`relative pt-12 pb-24 flex flex-col ${getPillarPadding(i)}`}
              >
                {/* Mobile horizontal separator */}
                {i > 0 && (
                  <div className="block lg:hidden absolute top-0 left-0 w-full h-px bg-white/10" />
                )}

                {/* Gold bar — animated left to right */}
                <div className="w-full h-px bg-white/10 mb-8 overflow-hidden relative">
                  <motion.div
                    className="absolute inset-y-0 left-0 h-full shadow-[0_0_8px_rgba(201,165,90,0.5)]"
                    style={{ backgroundColor: GOLD }}
                    initial={{ width: "0%" }}
                    whileInView={{ width: "100%" }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 1.2, delay: i * 0.2 + 0.3, ease: EASE }}
                  />
                </div>

                {/* Content */}
                <div className="flex-1">
                  {/* Number */}
                  <p className="font-display font-thin leading-none text-[#C9A55A] mb-8 select-none drop-shadow-lg" style={{ fontSize: "clamp(5rem, 8vw, 8rem)" }}>
                    {pillar.num}
                  </p>

                  {/* Icon + title */}
                  <div className="flex items-center gap-4 mb-6">
                    <Icon size={20} style={{ color: GOLD }} strokeWidth={1.5} />
                    <h3 className="font-display text-cream uppercase tracking-[0.15em] text-lg drop-shadow-sm">
                      {pillar.title}
                    </h3>
                  </div>

                  {/* Body - Fixed with Justify */}
                  <p className="text-cream/60 text-base leading-relaxed max-w-sm drop-shadow-sm text-justify">
                    {pillar.body}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* ── Footer strip ── */}
      <div className="relative z-10 w-full backdrop-blur-md bg-brand-black/40">
        {/* Animated Top Border for footer strip */}
        <motion.div 
          className="absolute top-0 left-0 w-full h-px bg-white/10 origin-left"
          variants={drawLineRight}
        />
        
        <motion.div
          variants={fadeIn}
          className="py-8 px-6 md:px-12 lg:px-24 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5"
        >

          {/* CTA using Next.js Link */}
          <Link
            href="https://royalbaligroup.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 border border-[#C9A55A]/30 bg-[#C9A55A]/5 px-6 py-3 hover:border-[#C9A55A]/80 hover:bg-[#C9A55A]/10 transition-all duration-300 shrink-0"
          >
            <span className="font-display text-[11px] uppercase tracking-widest text-[#C9A55A] group-hover:text-cream transition-colors">
              Visit Royal Bali Group
            </span>
            <ArrowUpRight size={13} className="text-[#C9A55A] group-hover:text-cream transition-colors" />
          </Link>
        </motion.div>
      </div>

    </motion.section>
  );
}
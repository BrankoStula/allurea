// components/sections/PlanpointSection.tsx
"use client";

import React, { useRef, useState } from 'react';
import { motion, useInView, type Variants } from 'framer-motion';
import { Maximize2, ArrowRight } from "lucide-react";

const GOLD = "#C9A55A";

// The base URL packed with parameters for a clean Black, White, and Transparent UI
const PLANPOINT_BASE_URL = "https://app.planpoint.io/allurea/william?lang=English";

export default function PlanpointSection() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10% 0px" });
  
  const [isIframeLoading, setIsIframeLoading] = useState(true);

  const handleIframeLoad = () => {
    // Add a small delay to ensure the 3D engine inside the iframe has booted up
    setTimeout(() => {
      setIsIframeLoading(false);
    }, 1500); 
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    },
  };

  return (
    <section id="masterplan" className="bg-brand-black border-t border-cream/10 flex flex-col overflow-hidden">
      <div ref={containerRef} className="w-full mx-auto">
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex flex-col"
        >
          {/* ─── Header ─── */}
          <motion.div 
            variants={itemVariants}
            className="px-6 md:px-12 lg:px-16 py-16 flex flex-col md:flex-row md:items-end md:justify-between gap-8 border-b border-cream/10"
          >
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] mb-4 flex items-center gap-4" style={{ color: GOLD }}>
                <span className="w-6 h-px inline-block" style={{ backgroundColor: GOLD, opacity: 0.5 }} />
                Interactive Masterplan
              </p>
              <h2 className="font-display text-cream leading-tight" style={{ fontSize: "clamp(2rem, 3vw, 3.5rem)", letterSpacing: "var(--tracking-heading)" }}>
                Explore the Estate
              </h2>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 items-start md:items-center">
              <p className="text-cream/50 text-sm max-w-xs md:text-right">
                Explore the interactive 3D estate for real-time availability and plot positioning.
              </p>
              <button 
                onClick={() => document.querySelector("#inquiry")?.scrollIntoView({ behavior: "smooth" })}
                className="hidden lg:flex items-center gap-2 px-5 py-3 border border-cream/10 hover:border-[#C9A55A]/50 hover:bg-white/5 transition-colors duration-300 rounded-sm group cursor-pointer"
              >
                <span className="text-[10px] uppercase tracking-widest text-cream">Contact Us</span>
                <ArrowRight size={14} className="text-[#C9A55A] group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </motion.div>

          {/* ─── Full Width 3D Viewer with Padding ─── */}
          <motion.div
            variants={itemVariants}
            className="w-full bg-brand-black border-b border-cream/10"
          >
            <div className="relative w-full h-[65vh] lg:h-[80vh] min-h-[500px] bg-brand-black overflow-hidden">
              
              {/* Location label Overlay */}
              <div className="absolute top-5 left-5 z-30 pointer-events-none flex flex-col gap-1">
                <span className="text-[10px] uppercase tracking-[0.3em] text-cream/70 drop-shadow-md">Allurea</span>
                <span className="text-[9px] uppercase tracking-widest text-cream/40 drop-shadow-md">Seseh, Bali</span>
              </div>

              {/* Interactive badge Overlay */}
              <div className="absolute bottom-5 right-5 z-30 pointer-events-none">
                <div className="flex items-center gap-2 bg-brand-black/50 px-3 py-1.5 backdrop-blur-md border border-cream/10 rounded-sm">
                  <Maximize2 size={12} className="text-cream/60" />
                  <span className="text-[9px] uppercase tracking-widest text-cream/70">Interactive 3D</span>
                </div>
              </div>

              {/* Custom Loader Overlay */}
              {isIframeLoading && (
                <div className="absolute inset-0 z-20 bg-brand-black flex flex-col items-center justify-center transition-opacity duration-500">
                  <div className="w-8 h-8 border-4 border-[#C9A55A]/20 border-t-[#C9A55A] rounded-full animate-spin mb-4" />
                  <span className="text-[10px] uppercase tracking-[0.25em] text-cream/40">Loading Masterplan...</span>
                </div>
              )}

              {/* Simple React Iframe */}
              <iframe 
                src={PLANPOINT_BASE_URL}
                title="Interactive 3D Masterplan"
                onLoad={handleIframeLoad}
                allowFullScreen
                allow="geolocation"
                loading="lazy"
                className={`absolute inset-0 w-full h-full border-0 transition-opacity duration-700 z-10 ${
                  isIframeLoading ? 'opacity-0' : 'opacity-100'
                }`}
              />

            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}
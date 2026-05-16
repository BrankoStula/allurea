// components/sections/PlanpointSection.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;
const GOLD = "#C9A55A";

// Using the EXACT URL from the Planpoint embed script
const PLANPOINT_BASE_URL = "https://app.planpoint.io/azurea/william";

export default function PlanpointSection() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [loaded, setLoaded] = useState(false);

  // Implement Planpoint's exact injection logic
  useEffect(() => {
    const interval = setInterval(() => {
      if (iframeRef.current && !iframeRef.current.src) {
        iframeRef.current.src = PLANPOINT_BASE_URL;
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // PostMessage listener mimicking their script behavior
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === 'resize') {
        // Planpoint confirms it's alive
        setLoaded(true);
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  // Fallback loader removal
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 12000);
    return () => clearTimeout(t);
  }, []);

  return (
    <section id="masterplan" className="bg-brand-black border-t border-cream/10 flex flex-col">

      {/* ─── Header ─── */}
      <div className="px-6 md:px-12 lg:px-16 py-16 flex flex-col md:flex-row md:items-end md:justify-between gap-8 border-b border-cream/10">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE }}
            className="text-[10px] uppercase tracking-[0.3em] mb-4 flex items-center gap-4"
            style={{ color: GOLD }}
          >
            <span className="w-6 h-px inline-block" style={{ backgroundColor: GOLD, opacity: 0.5 }} />
            Interactive Masterplan
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, delay: 0.1, ease: EASE }}
            className="font-display text-cream leading-tight"
            style={{ fontSize: "clamp(2rem, 3vw, 3.5rem)", letterSpacing: "var(--tracking-heading)" }}
          >
            Explore the Estate
          </motion.h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
          className="flex flex-col sm:flex-row gap-4 items-start md:items-center"
        >
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
        </motion.div>
      </div>

      {/* ─── Full Width 3D Viewer ─── */}
      <div id="planpoint-container" className="w-full lg:h-[80vh] min-h-[500px] h-[60vh] relative shrink-0 bg-brand-black border-b border-cream/10 overflow-hidden">

        {/* Loading skeleton */}
        <div
          className={`absolute inset-0 bg-brand-black flex flex-col items-center justify-center gap-4 z-10 transition-opacity duration-500 ${loaded ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
        >
          <div className="w-6 h-6 rounded-full border-2 border-[#C9A55A]/20 border-t-[#C9A55A] animate-spin" />
          <p className="text-[10px] uppercase tracking-[0.25em] text-cream/30">Loading Masterplan</p>
        </div>

        {/* Iframe */}
        <iframe
          id="planpoint"
          ref={iframeRef}
          frameBorder="0"
          allowFullScreen
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0 }}
          className="z-0"
          onLoad={() => setLoaded(true)}
        />

      </div>

    </section>
  );
}
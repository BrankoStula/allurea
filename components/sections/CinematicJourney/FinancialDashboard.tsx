// components/sections/CinematicJourney/FinancialDashboard.tsx
"use client";

import { motion } from "framer-motion";
import { Clock, Wallet } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;
const GOLD = "#C9A55A";

export default function FinancialDashboard() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
      className="w-full flex flex-col justify-center h-full pt-20 lg:pt-0"
    >
      {/* Top Header */}
      <div className="flex items-center justify-between mb-10 border-b border-cream/10 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-1.5 rounded-full bg-[#C9A55A] animate-pulse" />
          <p className="text-[#C9A55A] text-[10px] uppercase tracking-[0.2em] font-semibold">Live Projections</p>
        </div>
        <p className="text-cream/40 text-[10px] uppercase tracking-[0.2em]">Seseh, Bali · Leasehold (25 Yrs)</p>
      </div>

      {/* Hero Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-12">
        {[
          { label: "Purchase Price",       val: "$400,000", isGold: false },
          { label: "Est. Year 1 Net Rent", val: "$59,400",  isGold: false },
          { label: "Projected ROI",        val: "14.85%",   isGold: true  },
          { label: "Break-Even",           val: "6.7 Yrs",  isGold: false },
          { label: "Leasehold",            val: "25 Years", isGold: false },
        ].map((m, i) => (
          <div key={i}>
            <p className="text-cream/40 text-[10px] uppercase tracking-widest mb-1">{m.label}</p>
            <p 
              className={`font-display text-2xl ${m.isGold ? "" : "text-cream"}`} 
              style={m.isGold ? { color: GOLD } : undefined}
            >
              {m.val}
            </p>
          </div>
        ))}
      </div>

      {/* Middle: Operations table + chart */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-12">
        {/* Year 1 Breakdown Table */}
        <div className="lg:col-span-5">
          <h4 className="text-cream text-[11px] uppercase tracking-widest mb-4 border-b border-cream/10 pb-3 flex items-center gap-2">
            <Wallet size={14} style={{ color: GOLD }} /> Year 1 Operations
          </h4>
          <div className="flex flex-col gap-3 text-sm">
            <div className="flex justify-between"><span className="text-cream/40">Gross Rev (81% Occ):</span>         <span className="text-cream font-medium">$74,249</span></div>
            <div className="flex justify-between"><span className="text-cream/40">Management & Utilities (20%):</span> <span className="text-cream font-medium">-$14,850</span></div>
            <div className="flex justify-between pt-3 border-t border-cream/5">
              <span style={{ color: GOLD }} className="font-semibold">Net Rental Revenue:</span>
              <span style={{ color: GOLD }} className="font-semibold">$59,400</span>
            </div>
            <div className="flex justify-between mt-1">
              <span className="text-cream/40">Postbuild Value Apprec:</span>
              <span className="text-cream font-medium">+$40,000 <span style={{ color: GOLD }} className="text-[10px] ml-1">(10%)</span></span>
            </div>
          </div>
        </div>

        {/* Animated Area Chart */}
        <div className="lg:col-span-7 flex flex-col justify-end">
          <div className="flex justify-between text-[10px] uppercase tracking-widest text-cream/40 mb-4">
            <span>Net Rent Accumulation</span>
            <span>$1,713,378 (25 Yrs)</span>
          </div>
          <div className="relative w-full h-32 border-b border-l border-cream/20">
            <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full overflow-visible" preserveAspectRatio="none">
              <defs>
                <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%"   stopColor={GOLD} stopOpacity="0.4" />
                  <stop offset="100%" stopColor={GOLD} stopOpacity="0"   />
                </linearGradient>
              </defs>
              <motion.path
                initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1, delay: 0.6 }}
                d="M 0 100 L 0 90 Q 25 70 50 45 T 100 5 L 100 100 Z" fill="url(#chartGrad)"
              />
              <motion.path
                initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
                d="M 0 90 Q 25 70 50 45 T 100 5" fill="none" stroke={GOLD} strokeWidth="2"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Bottom: Scenarios */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            label: "5-Year Scenario",
            rows: [
              { k: "Net Rent:",           v: "$309,115" },
              { k: "Property Residual:",  v: "$388,636" },
              { k: "Total Return:",       v: "$337,754", highlight: false },
              { k: "Yearly ROI:",         v: "16.89%",  highlight: true  },
            ],
          },
          {
            label: "10-Year Scenario",
            rows: [
              { k: "Net Rent:",           v: "$650,409" },
              { k: "Property Residual:",  v: "$321,814" },
              { k: "Total Return:",       v: "$612,223", highlight: false },
              { k: "Yearly ROI:",         v: "15.31%",  highlight: true  },
            ],
          },
          {
            label: "Long Term (25 Yrs)",
            rows: [
              { k: "Net Rent:",     v: "$1,713,378" },
              { k: "Property Residual:", v: "$0"   },
              { k: "Total Profit:", v: "$1,313,378", highlight: false },
              { k: "Yearly ROI:",   v: "12.98%",    highlight: true  },
            ],
          },
        ].map((scenario) => (
          <div key={scenario.label} className="border border-cream/10 p-5 bg-cream/[0.02]">
            <h5 className="text-[11px] uppercase tracking-widest mb-4 flex items-center gap-2" style={{ color: GOLD }}>
              <Clock size={12} /> {scenario.label}
            </h5>
            <div className="flex flex-col gap-2 text-xs">
              {scenario.rows.map((row, j) => (
                <div
                  key={j}
                  className={`flex justify-between ${j === scenario.rows.length - 2 ? "pt-2 border-t border-cream/5" : ""}`}
                >
                  <span className={row.highlight ? "font-semibold" : "text-cream/40"} style={row.highlight ? { color: GOLD } : undefined}>
                    {row.k}
                  </span>
                  <span className={row.highlight ? "font-semibold" : "text-cream font-medium"} style={row.highlight ? { color: GOLD } : undefined}>
                    {row.v}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Disclaimer */}
      <p className="mt-8 text-cream/25 text-[10px] leading-relaxed border-t border-cream/5 pt-6">
        Projections are based on operating assumptions and are provided for investor review, not guaranteed returns.
      </p>
    </motion.div>
  );
}
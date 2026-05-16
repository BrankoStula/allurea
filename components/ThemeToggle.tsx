"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useTheme, THEME_META, Theme, CYCLE } from "@/contexts/ThemeContext";

const GOLD = "#C9A55A";

export default function ThemeToggle() {
  const { theme, setTheme, cycleTheme } = useTheme();
  const current = THEME_META[theme];

  return (
    <div className="fixed bottom-8 right-6 z-[9999] flex flex-col items-end gap-2.5 select-none">

      {/* Animated label above button */}
      <AnimatePresence mode="wait">
        <motion.p
          key={theme}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.2 }}
          className="text-[8px] uppercase tracking-[0.35em] pr-0.5"
          style={{ color: "rgba(245,240,232,0.45)" }}
        >
          {current.label}
        </motion.p>
      </AnimatePresence>

      {/* Main pill */}
      <div
        className="flex items-center gap-0 overflow-hidden border"
        style={{
          backgroundColor: "rgba(0,10,25,0.85)",
          borderColor: "rgba(201,165,90,0.25)",
          backdropFilter: "blur(16px)",
        }}
      >
        {(CYCLE as Theme[]).map((t) => {
          const meta = THEME_META[t];
          const isActive = t === theme;
          return (
            <button
              key={t}
              onClick={() => setTheme(t)}
              title={meta.label}
              className="relative flex items-center justify-center px-3.5 py-3 transition-colors duration-300 cursor-pointer group"
              style={{
                backgroundColor: isActive ? "rgba(201,165,90,0.12)" : "transparent",
              }}
            >
              {/* Active indicator line */}
              {isActive && (
                <motion.div
                  layoutId="theme-active-line"
                  className="absolute bottom-0 left-0 right-0 h-px"
                  style={{ backgroundColor: GOLD }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                />
              )}

              {/* Color swatch dot */}
              <motion.div
                animate={{ scale: isActive ? 1 : 0.75, opacity: isActive ? 1 : 0.5 }}
                transition={{ duration: 0.25 }}
                className="w-3 h-3 rounded-full border"
                style={{
                  backgroundColor: meta.dot,
                  borderColor: isActive ? "rgba(201,165,90,0.6)" : "rgba(255,255,255,0.2)",
                }}
              />
            </button>
          );
        })}

        {/* Divider + cycle arrow */}
        <div className="w-px self-stretch" style={{ backgroundColor: "rgba(255,255,255,0.08)" }} />
        <button
          onClick={cycleTheme}
          className="px-3.5 py-3 text-[10px] transition-colors duration-200 cursor-pointer"
          style={{ color: "rgba(201,165,90,0.6)" }}
          title="Cycle theme"
        >
          <motion.span
            key={theme}
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            transition={{ duration: 0.25 }}
            className="block"
          >
            ›
          </motion.span>
        </button>
      </div>

    </div>
  );
}

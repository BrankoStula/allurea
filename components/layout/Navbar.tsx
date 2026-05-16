// components/layout/Navbar.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { id: "01", label: "Project",    href: "#project",    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop", tagline: "Discover the Vision" },
  { id: "02", label: "Location",   href: "#why-bali",   image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=2038&auto=format&fit=crop", tagline: "Bali, Indonesia" },
  { id: "03", label: "Villas",     href: "#villas",     image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop", tagline: "Curated Luxury" },
  { id: "04", label: "Plans",      href: "#masterplan", image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2071&auto=format&fit=crop", tagline: "Architectural Detail" },
  { id: "05", label: "Inquire",    href: "#inquiry",    image: "https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=2070&auto=format&fit=crop", tagline: "Get in Touch" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredLabel, setHoveredLabel] = useState<string | null>(null);
  const { scrollY } = useScroll();
  const [isHidden, setIsHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Auto-hide and blur on scroll
  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
    const previous = scrollY.getPrevious() || 0;
    if (latest > previous && latest > 100) {
      setIsHidden(true);
    } else {
      setIsHidden(false);
    }
  });

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

  const toggleMenu = () => {
    if (isOpen) setHoveredLabel(null);
    setIsOpen(!isOpen);
  };

  const handleHashNav = (hash: string) => {
    setIsOpen(false);
    setHoveredLabel(null);
    // Wait for menu close animation (400ms) + body overflow restore before scrolling
    setTimeout(() => {
      document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
    }, 420);
  };

  const activeLink = navLinks.find(link => link.label === hoveredLabel) || navLinks[0];

  return (
    <>
      {/* ─── NAVBAR MAIN HEADER ─── */}
      <motion.header 
        variants={{ visible: { y: 0 }, hidden: { y: "-100%" } }}
        animate={isHidden && !isOpen ? "hidden" : "visible"}
        transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
        className={`fixed top-0 left-0 w-full h-20 md:h-24 px-4 md:px-12 flex items-start pt-5 md:pt-6 justify-between z-50 overflow-visible transition-all duration-500 ${
          isScrolled && !isOpen
            ? "bg-brand-black backdrop-blur-md border-b border-cream/10 pointer-events-auto"
            : "bg-transparent pointer-events-none"
        }`}
        /* The inline style blocking the global SVG was removed from here! */
      >
        {/* Left: Hamburger Menu */}
        <button
          onClick={toggleMenu}
          className="p-2 -ml-2 text-brand-green hover:text-brand-green-dk transition-colors z-50 focus:outline-none flex-shrink-0 pointer-events-auto"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={32} strokeWidth={1.5} className="md:w-9 md:h-9" /> : <Menu size={32} strokeWidth={1.5} className="md:w-9 md:h-9" />}
        </button>

        {/* Middle: Allurea Logo */}
        <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center z-50 w-max top-6 md:top-6 pointer-events-auto">
          <Link href="/" onClick={() => { setIsOpen(false); setHoveredLabel(null); }} className="flex items-center gap-3 group">
            <Image
              src="/allurea-icon.svg"
              alt="Allurea Logo"
              width={26}
              height={38}
              className="group-hover:opacity-80 transition-opacity duration-300 w-5 md:w-[26px] h-auto"
            />
            {/* The wordmark is hidden on mobile (hidden md:block) */}
            <Image
              src="/allurea-wordmark.svg"
              alt="Allurea"
              width={130}
              height={24}
              className="hidden md:block group-hover:opacity-80 transition-opacity duration-300"
            />
          </Link>
        </div>

        {/* Right: Contact CTA */}
        {/* Right: Contact CTA */}
        <div className="absolute right-4 md:right-8 top-0 h-20 md:h-24 flex items-center z-50 pointer-events-auto">
          <button
            onClick={() => handleHashNav("#inquiry")}
            className={`group flex items-center gap-2 md:gap-3 border px-4 md:px-6 py-2 md:py-2.5 transition-all duration-300 backdrop-blur-sm bg-transparent ${
              isScrolled 
                ? "border-cream/50 hover:border-cream hover:bg-cream/10" // "Blue" (cream) state when navbar is solid
                : "border-[#C9A55A]/50 hover:border-[#C9A55A] hover:bg-[#C9A55A]/10" // Gold state when at the top
            }`}
          >
            <span className={`font-display text-[11px] md:text-[12px] uppercase tracking-widest transition-colors whitespace-nowrap ${
              isScrolled 
                ? "text-cream group-hover:text-cream/80" 
                : "text-white group-hover:text-[#C9A55A]"
            }`}>
              Contact
            </span>
            <span className={`block w-4 h-px transition-all duration-300 group-hover:w-6 ${
              isScrolled 
                ? "bg-cream/70 group-hover:bg-cream" 
                : "bg-white/70 group-hover:bg-[#C9A55A]"
            }`} />
          </button>
        </div>
      </motion.header>

      {/* ─── FULL SCREEN OVERLAY MENU ─── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { delay: 0.2 } }} transition={{ duration: 0.4 }} className="fixed inset-0 z-40 bg-cream overflow-hidden">
            <AnimatePresence mode="popLayout">
              <motion.div key={activeLink.image} initial={{ opacity: 0, scale: 1.05 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }} className="absolute inset-0 z-0 pointer-events-none">
                <Image src={activeLink.image} alt={activeLink.label} fill className="object-cover" priority />
              </motion.div>
            </AnimatePresence>

            <div className="absolute top-32 right-6 md:right-12 z-20 mix-blend-difference text-cream text-right pointer-events-none overflow-hidden">
              <motion.div key={`top-${activeLink.id}`} initial={{ clipPath: "inset(0 100% 0 0)", opacity: 0 }} animate={{ clipPath: ["inset(0 100% 0 0)", "inset(0 0% 0 0)", "inset(0 15% 0 0)", "inset(0 0% 0 0)"], opacity: 1 }} transition={{ duration: 0.65, times: [0, 0.5, 0.7, 1], ease: "easeInOut" }} className="font-display text-lg md:text-xl tracking-widest uppercase whitespace-nowrap">
                {activeLink.id} / {activeLink.label}
              </motion.div>
            </div>

            <div className="absolute bottom-12 right-6 md:right-12 z-20 mix-blend-difference text-cream text-right pointer-events-none overflow-hidden">
              <motion.div key={`bottom-${activeLink.id}`} initial={{ clipPath: "inset(0 100% 0 0)", opacity: 0 }} animate={{ clipPath: ["inset(0 100% 0 0)", "inset(0 0% 0 0)", "inset(0 20% 0 0)", "inset(0 0% 0 0)"], opacity: 1 }} transition={{ duration: 0.65, delay: 0.1, times: [0, 0.5, 0.7, 1], ease: "easeInOut" }} className="text-xs md:text-sm uppercase tracking-[0.2em] whitespace-nowrap">
                {activeLink.tagline}
              </motion.div>
            </div>

            <div className="relative z-10 w-full h-full flex flex-col justify-center px-6 md:px-12 overflow-visible">
              <motion.nav initial="closed" animate="open" exit="closed" variants={{ open: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } }, closed: { transition: { staggerChildren: 0.05, staggerDirection: -1 } } }} className="flex flex-col gap-4 md:gap-4 items-start">
                {navLinks.map((link) => (
                  <motion.div key={link.label} variants={{ open: { opacity: 1, x: 0 }, closed: { opacity: 0, x: -150 } }} transition={{ type: "spring", stiffness: 100, damping: 15 }} className="py-2 md:py-4 relative w-full">
                    <button onClick={() => handleHashNav(link.href)} onMouseEnter={() => setHoveredLabel(link.label)} onMouseLeave={() => setHoveredLabel(null)} className="relative inline-flex items-center font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-brand-black hover:text-brand-green transition-colors uppercase tracking-widest leading-none mix-blend-difference text-cream text-left group/link">
                      <motion.span className="absolute right-[calc(100%+1.5rem)] top-1/2 h-[2px] bg-cream origin-right" initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }} style={{ width: "100vw" }} />
                      {link.label}
                    </button>
                  </motion.div>
                ))}
              </motion.nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
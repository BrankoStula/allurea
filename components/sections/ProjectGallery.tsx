// components/sections/ProjectGallery.tsx
"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";

// Swiper Imports
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

// CSS imports
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

const LUXURY = [0.16, 1, 0.3, 1] as const;
const CDN = "https://d1pjqs5r0ua4f1.cloudfront.net";
const GOLD = "#C9A55A";

type Category = "All" | "Exterior" | "Living & Dining" | "Kitchen" | "Pool & Outdoor" | "Bedrooms" | "Bathrooms" | "Rooftop";

type GalleryItem = { src: string; label: string; category: Category };

const GALLERY: GalleryItem[] = [
  // ── Exterior ──
  { src: `${CDN}/azurea_gallery_13.webp`, label: "Villa Exterior",        category: "Exterior"        },
  { src: `${CDN}/azurea_gallery_4_fixed.webp`, label: "Living Area",       category: "Living & Dining"        },
  { src: `${CDN}/azurea_gallery_3_fixed.webp`, label: "Living Room",           category: "Living & Dining" },
  { src: `${CDN}/azurea_gallery_26.webp`, label: "Rooftop",               category: "Exterior"        },
  // ── Living & Dining ──
  { src: `${CDN}/azurea_gallery_3.webp`,  label: "Living Room",           category: "Living & Dining" },
  { src: `${CDN}/azurea_gallery_4.webp`,  label: "Dining Room",           category: "Living & Dining" },
  { src: `${CDN}/azurea_gallery_5.webp`,  label: "Kitchen & Living",      category: "Kitchen"         },
  { src: `${CDN}/azurea_gallery_10.webp`, label: "Dining Area",           category: "Living & Dining" },
  { src: `${CDN}/azurea_gallery_11.webp`, label: "Kitchen & Living",      category: "Living & Dining" },
  { src: `${CDN}/azurea_gallery_28.webp`, label: "Rooftop",               category: "Exterior"        },
  { src: `${CDN}/azurea_gallery_29.webp`, label: "Bathroom",              category: "Bathrooms"       },
  // ── Kitchen ──
  { src: `${CDN}/azurea_gallery_2.webp`,  label: "Kitchen",               category: "Kitchen"         },
  { src: `${CDN}/azurea_gallery_8.webp`,  label: "Kitchen Island",        category: "Kitchen"         },
  { src: `${CDN}/azurea_gallery_12.webp`, label: "Kitchen Counter",       category: "Kitchen"         },
  // ── Pool & Outdoor ──
  { src: `${CDN}/azurea_gallery_1.webp`,  label: "Rooftop",               category: "Exterior"  },
  { src: `${CDN}/azurea_gallery_6.webp`,  label: "Private Pool",          category: "Pool & Outdoor"  },
  { src: `${CDN}/azurea_gallery_7.webp`,  label: "Pool Terrace",          category: "Pool & Outdoor"  },
  { src: `${CDN}/azurea_gallery_9.webp`,  label: "Pool & Garden",         category: "Pool & Outdoor"  },
  { src: `${CDN}/azurea_gallery_22.webp`, label: "Bedroom",               category: "Bedrooms"        },
  { src: `${CDN}/azurea_gallery_25.webp`, label: "Bedroom",               category: "Bedrooms"        },
  // ── Bedrooms ──
  { src: `${CDN}/azurea_gallery_16.webp`, label: "Living Room",           category: "Living & Dining" },
  { src: `${CDN}/azurea_gallery_27.webp`, label: "Rooftop Terrace",       category: "Exterior"        },
    { src: `${CDN}/azure_gallery_fontain.webp`, label: "Fountain",       category: "Exterior"        },

  // ── Bathrooms ──
  { src: `${CDN}/azurea_gallery_17.webp`, label: "Bedroom",               category: "Bedrooms"        },
  { src: `${CDN}/azurea_gallery_18.webp`, label: "Bedroom Desk",          category: "Bedrooms"        },
  { src: `${CDN}/azurea_gallery_20.webp`, label: "Bedroom",               category: "Bedrooms"        },
  { src: `${CDN}/azurea_gallery_21.webp`, label: "Bedroom",               category: "Bedrooms"        },
  // ── Rooftop ──
  { src: `${CDN}/azurea_gallery_19.webp`, label: "Bedroom",               category: "Bedrooms"        },
];

const CATEGORIES: Category[] = ["All", "Exterior", "Living & Dining", "Kitchen", "Pool & Outdoor", "Bedrooms", "Bathrooms"];

export default function ProjectGallery() {
  const [mounted, setMounted] = useState(false);
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const [isDesktop, setIsDesktop] = useState(true);
  
  // Lightbox State
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Filter items based on active category
  const items = activeCategory === "All"
    ? GALLERY
    : GALLERY.filter(i => i.category === activeCategory);

  const count = items.length;

  // Track hydration for Portal
  useEffect(() => {
  // eslint-disable-next-line react-hooks/set-state-in-effect
  setMounted(true);
}, []);

  // Track viewport size for Swiper direction
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(min-width: 1024px)");
    const handleMediaChange = (e: MediaQueryListEvent | MediaQueryList) => setIsDesktop(e.matches);
    handleMediaChange(mq); 
    mq.addEventListener("change", handleMediaChange);
    return () => mq.removeEventListener("change", handleMediaChange);
  }, []);

  // Lock body scroll when lightbox is open
  useEffect(() => {
    if (lightboxIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [lightboxIndex]);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowLeft") {
        setLightboxIndex((prev) => (prev !== null ? (prev === 0 ? count - 1 : prev - 1) : null));
      }
      if (e.key === "ArrowRight") {
        setLightboxIndex((prev) => (prev !== null ? (prev === count - 1 ? 0 : prev + 1) : null));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, count]);

  return (
    <div className="bg-brand-black border-t border-cream/10 overflow-hidden relative">

      {/* ── BACKGROUND DECORATION LAYER ── */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          src="/leaves_right_top_4.png" 
          alt="" 
          className="absolute -top-10 -right-10 w-64 lg:w-[32rem] opacity-20 object-contain object-top object-left"
          style={{ mixBlendMode: 'multiply' }} 
        />
        <div className="absolute top-0 left-0 w-full lg:w-[60%] h-full opacity-30">
          <svg viewBox="0 0 500 1000" preserveAspectRatio="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <g stroke={GOLD} strokeWidth="0.7" fill="none">
              {Array.from({ length: 15 }).map((_, i) => {
                const y1 = -100 + (i * 20);
                const xPeak = 300 + (i * 10);
                const y2 = 800 + (i * 15);
                return (
                  <path key={i} d={`M-50,${y1} C100,${y1 + 100} ${xPeak},500 600,${y2}`} opacity={0.6 - (i * 0.03)} />
                );
              })}
            </g>
          </svg>
        </div>
      </div>

      {/* ── Header ── */}
      <div className="px-6 md:px-12 lg:px-16 pt-20 lg:pt-28 pb-8 flex justify-between items-end gap-6 relative z-10">
        <div>
          <p className="label-caps mb-4 flex items-center gap-4" style={{ color: GOLD }}>
            <span className="w-6 h-px inline-block" style={{ backgroundColor: GOLD, opacity: 0.5 }} />
            The Collection
          </p>
          <h2 className="font-display text-4xl lg:text-5xl text-cream tracking-tight">
            Visual Gallery
          </h2>
        </div>
        <p className="text-cream/30 text-[10px] tracking-widest uppercase hidden sm:block">
          {String(count).padStart(2, "0")} images
        </p>
      </div>

      {/* ── Category Tabs ── */}
      <div className="px-6 md:px-12 lg:px-16 mb-10 relative z-10">
        <div className="flex gap-2 lg:gap-3 overflow-x-auto scrollbar-hide pb-4">
          {CATEGORIES.map((cat) => {
            const isActive = cat === activeCategory;
            const catCount = cat === "All" ? GALLERY.length : GALLERY.filter(i => i.category === cat).length;
            
            return (
              <button
                key={cat}
                onClick={() => {
                  setThumbsSwiper(null); 
                  setActiveCategory(cat);
                }}
                className={`relative shrink-0 flex items-center gap-2 px-5 py-2.5 text-[10px] sm:text-[11px] uppercase tracking-widest transition-all duration-300 border rounded-sm ${
                  isActive
                    ? "bg-[#C9A55A]/10 border-[#C9A55A] text-[#C9A55A] shadow-sm shadow-[#C9A55A]/5"
                    : "bg-white/[0.03] border-cream/10 text-cream/60 hover:text-cream hover:border-cream/30 hover:bg-white/10"
                }`}
              >
                {cat}
                <span
                  className={`text-[9px] px-1.5 py-0.5 rounded-sm leading-none transition-colors duration-300 ${
                    isActive ? "bg-[#C9A55A]/20 text-[#C9A55A]" : "bg-white/10 text-cream/40"
                  }`}
                >
                  {catCount}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Main Gallery & Thumbnails Layout ── */}
      <div className="w-full px-6 md:px-12 lg:px-16 pb-24 relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.6, ease: LUXURY }}
            className="flex flex-col lg:flex-row gap-4 lg:gap-6 h-[50vh] sm:h-[65vh] lg:h-[75vh] max-h-[800px]"
          >
            
            {/* 1. Main Large Image Swiper */}
            <div className="w-full lg:w-[80%] h-[80%] lg:h-full relative group/nav rounded-sm overflow-hidden border border-cream/10 shadow-2xl">
              <Swiper
                modules={[FreeMode, Navigation, Thumbs]}
                thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed && thumbsSwiper.el ? thumbsSwiper : null }}
                navigation={{
                  prevEl: ".gallery-prev",
                  nextEl: ".gallery-next",
                }}
                slidesPerView={1}
                spaceBetween={0}
                className="w-full h-full"
              >
                {items.map((item, i) => (
                  <SwiperSlide key={`main-${item.src}-${i}`}>
                    {/* Clickable Image Container */}
                    <div 
                      className="w-full h-full relative group/zoom cursor-zoom-in"
                      onClick={() => setLightboxIndex(i)}
                    >
                      <Image
                        src={item.src}
                        alt={item.label}
                        fill
                        className="object-cover transition-transform duration-700 group-hover/zoom:scale-105"
                        sizes="(max-width: 1024px) 100vw, 80vw"
                        priority={i === 0}
                      />
                      
                      {/* Inner Text overlay */}
                      <div className="absolute bottom-6 md:bottom-10 left-6 md:left-10 z-10 pointer-events-none transition-opacity duration-300 group-hover/zoom:opacity-0">
                        <p className="text-cream/90 text-[10px] md:text-xs uppercase tracking-[0.2em] font-medium drop-shadow-md">
                          {item.label}
                        </p>
                      </div>

                      {/* Expand Hint Icon */}
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover/zoom:opacity-100 transition-opacity duration-300 z-10">
                         <div className="bg-brand-black/50 backdrop-blur-md px-5 py-4 rounded-full text-white flex items-center gap-3 border border-white/10 shadow-xl">
                           <Maximize2 size={18} strokeWidth={1.5} />
                           <span className="text-[10px] uppercase tracking-widest">Enlarge</span>
                         </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* Prominent Overlay Navigation Arrows */}
              <button className="gallery-prev absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-14 md:h-14 flex items-center justify-center rounded-full bg-brand-black/50 backdrop-blur-md border border-cream/20 text-cream hover:bg-[#C9A55A] hover:border-[#C9A55A] hover:text-brand-black transition-all duration-300 opacity-0 group-hover/nav:opacity-100 disabled:opacity-0 shadow-xl cursor-pointer">
                <ChevronLeft size={24} strokeWidth={1.5} />
              </button>
              <button className="gallery-next absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-14 md:h-14 flex items-center justify-center rounded-full bg-brand-black/50 backdrop-blur-md border border-cream/20 text-cream hover:bg-[#C9A55A] hover:border-[#C9A55A] hover:text-brand-black transition-all duration-300 opacity-0 group-hover/nav:opacity-100 disabled:opacity-0 shadow-xl cursor-pointer">
                <ChevronRight size={24} strokeWidth={1.5} />
              </button>
            </div>

            {/* 2. Thumbnail Preview Swiper */}
            <div className="w-full lg:w-[20%] h-[20%] lg:h-full">
              <Swiper
                key={isDesktop ? "vertical" : "horizontal"}
                onSwiper={setThumbsSwiper}
                modules={[FreeMode, Navigation, Thumbs]}
                direction={isDesktop ? "vertical" : "horizontal"}
                slidesPerView={3}
                spaceBetween={16}
                freeMode={true}
                watchSlidesProgress={true}
                className="w-full h-full"
              >
                {items.map((item, i) => (
                  <SwiperSlide 
                    key={`thumb-${item.src}-${i}`} 
                    className="cursor-pointer rounded-sm overflow-hidden relative border-2 border-transparent transition-all duration-300 opacity-40 hover:opacity-80 [&.swiper-slide-thumb-active]:opacity-100 [&.swiper-slide-thumb-active]:border-[#C9A55A]"
                  >
                    <Image 
                      src={item.src} 
                      fill 
                      className="object-cover" 
                      alt={`${item.label} thumbnail`} 
                      sizes="(max-width: 1024px) 33vw, 20vw" 
                    />
                    <div className="absolute inset-0 bg-[#C9A55A]/10 opacity-0 transition-opacity duration-300 [.swiper-slide-thumb-active_&]:opacity-100 pointer-events-none" />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── FULL SCREEN LIGHTBOX MODAL (PORTALED to BODY) ── */}
      {mounted && createPortal(
        <AnimatePresence>
          {lightboxIndex !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: LUXURY }}
              // Pure black overlay to avoid light bleed from layout below
              className="fixed inset-0 z-[99999] bg-black/95 flex flex-col items-center justify-center p-4 md:p-12"
            >
              {/* Top Bar / Close Button */}
              <div className="absolute top-0 left-0 w-full p-6 md:p-8 flex justify-end z-[100000]">
                <button 
                  onClick={() => setLightboxIndex(null)}
                  className="flex items-center gap-3 px-5 py-3 rounded-full bg-white/10 border border-white/20 text-white hover:bg-white/20 hover:scale-105 transition-all cursor-pointer shadow-lg backdrop-blur-sm"
                >
                  <span className="text-[10px] uppercase tracking-widest hidden sm:block font-medium">Close</span>
                  <X size={20} strokeWidth={2} />
                </button>
              </div>

              {/* Lightbox Navigation Arrows */}
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex((prev) => (prev !== null ? (prev === 0 ? count - 1 : prev - 1) : null));
                }}
                className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 md:w-16 md:h-16 rounded-full bg-black/50 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 hover:scale-105 transition-all z-[100000] cursor-pointer shadow-xl backdrop-blur-sm"
              >
                <ChevronLeft size={32} strokeWidth={1.5} />
              </button>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex((prev) => (prev !== null ? (prev === count - 1 ? 0 : prev + 1) : null));
                }}
                className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 md:w-16 md:h-16 rounded-full bg-black/50 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 hover:scale-105 transition-all z-[100000] cursor-pointer shadow-xl backdrop-blur-sm"
              >
                <ChevronRight size={32} strokeWidth={1.5} />
              </button>

              {/* Current Image */}
              <div className="relative w-full h-full max-w-7xl max-h-[80vh] md:max-h-[85vh]">
                <Image 
                  src={items[lightboxIndex].src} 
                  alt={items[lightboxIndex].label} 
                  fill 
                  className="object-contain" 
                  quality={100}
                  sizes="100vw"
                  priority
                />
              </div>

              {/* Floating Footer Overlay */}
              <div className="absolute bottom-8 md:bottom-12 text-center z-[100000] pointer-events-none flex flex-col gap-3 items-center">
                <div className="bg-black/80 border border-white/20 px-8 py-3.5 rounded-full flex flex-col sm:flex-row items-center gap-2 sm:gap-6 shadow-2xl backdrop-blur-sm">
                  <p className="text-white tracking-[0.25em] uppercase text-[10px] md:text-xs font-medium" style={{ color: GOLD }}>
                    {items[lightboxIndex].label}
                  </p>
                  <div className="hidden sm:block w-px h-3 bg-white/30" />
                  <p className="text-white/60 text-[10px] tracking-widest font-mono">
                    {String(lightboxIndex + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
                  </p>
                </div>
              </div>

            </motion.div>
          )}
        </AnimatePresence>,
        document.body // Portaled directly to the body!
      )}

    </div>
  );
}
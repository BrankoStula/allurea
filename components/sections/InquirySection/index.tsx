// components/sections/InquirySection/index.tsx
"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Mail, MapPin } from "lucide-react";
import InquiryForm from "./InquiryForm";

const EASE = [0.16, 1, 0.3, 1] as const;
const GOLD = "#C9A55A";

function WhatsAppIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}

const CONTACTS = [
  { Icon: Mail,          label: "Email",        value: "Admin@royalbalidevelopments.com", href: "mailto:Admin@royalbalidevelopments.com", isCustom: false },
  { Icon: WhatsAppIcon,  label: "WhatsApp",     value: "+62 859 5677 9721",              href: "https://wa.me/6285956779721",            isCustom: true  },
  { Icon: MapPin,        label: "Project Site", value: "Munggu, Bali · Indonesia",       href: null,                                     isCustom: false },
];

export default function InquirySection() {
  return (
    <section id="inquiry" className="relative w-full min-h-screen flex flex-col lg:flex-row bg-brand-black text-cream overflow-hidden">

      {/* Architectural line overlays */}
      <div className="absolute inset-0 pointer-events-none z-20 hidden lg:block">
        <motion.div
          initial={{ height: 0 }}
          whileInView={{ height: "100%" }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 1.5, ease: EASE }}
          className="absolute top-0 bottom-0 left-[41.666%] w-px bg-white/10"
        />
        {[{ top: "top-24", delay: 0.2 }, { top: "bottom-24", delay: 0.4 }].map(({ top, delay }, i) => (
          <motion.div
            key={i}
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: "100%", opacity: 1 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1.5, delay, ease: EASE }}
            className={`absolute ${top} left-0 right-0 h-px bg-white/10`}
          />
        ))}
      </div>

      {/* Left column — image + contact info */}
      <div className="relative w-full lg:w-5/12 min-h-[60vh] lg:min-h-screen flex flex-col justify-center p-8 sm:p-12 lg:p-24 overflow-hidden">

        {/* Background image */}
        <motion.div
          initial={{ scale: 1.15 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute inset-0 z-0"
        >
          <Image
            src="https://d1pjqs5r0ua4f1.cloudfront.net/azurea_gallery_13.webp"
            alt="Luxury Villa"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
            /* FIX: This guarantees the image stays razor-sharp by bypassing Next.js compression */
            unoptimized 
          />
                    <div className="absolute inset-0 bg-cream/50 lg:bg-gradient-to-t lg:from-cream/90 lg:via-cream/40 lg:to-transparent" />

        </motion.div>

        {/* Text Content (Sitting directly over the image, no overlay) */}
        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="label-caps mb-6 flex items-center gap-4" style={{ color: GOLD }}>
              <span className="w-8 h-px inline-block" style={{ backgroundColor: GOLD, opacity: 0.4 }} />
              Investment Package
            </p>
            <h2 className="font-display text-4xl lg:text-5xl text-white mb-6 tracking-tight leading-[1.1]">
              Request the Allurea<br />Investment Package
            </h2>
            <p className="text-white/60 text-lg leading-relaxed mb-12 max-w-sm">
              Receive the full villa details, investment assumptions, availability, payment structure, and next-step process.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col gap-6"
          >
            {CONTACTS.map(({ Icon, label, value, href, isCustom }) => (
              <div key={label} className="flex items-start gap-4 group">
                <div
                  className="w-10 h-10 shrink-0 rounded-full border border-white/20 backdrop-blur-md flex items-center justify-center transition-colors duration-300"
                  style={{ color: GOLD }}
                >
                  {isCustom ? <Icon size={16} /> : <Icon size={16} />}
                </div>
                <div>
                  <p className="text-[10px] tracking-widest uppercase text-white/40 mb-1">{label}</p>
                  {href ? (
                    <a href={href} className="text-white/80 hover:text-white transition-colors">{value}</a>
                  ) : (
                    <p className="text-white/80">{value}</p>
                  )}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Right column — form */}
      <div className="relative w-full lg:w-7/12 flex items-center justify-center p-8 sm:p-12 lg:p-16 z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-[120%] bg-[#C9A55A]/5 rounded-full blur-[100px] pointer-events-none" />
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="w-full max-w-2xl relative z-10"
        >
          <InquiryForm />
        </motion.div>
      </div>

    </section>
  );
}
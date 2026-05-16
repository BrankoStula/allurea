// components/layout/Footer.tsx
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-brand-black text-cream pt-20 pb-8 border-t border-cream/10 relative overflow-hidden">
      <div className="px-6 md:px-12 lg:px-24">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-20">
          
          {/* Col 1: Brand Info */}
          <div className="flex flex-col gap-6 lg:pr-8">
            <Link href="/" className="inline-block w-max">
              <Image
                src="/allurea-logo.svg"
                alt="Allurea"
                width={140}
                height={40}
                className="opacity-90 hover:opacity-100 transition-opacity"
              />
            </Link>
            <p className="text-cream/50 text-sm leading-relaxed">
              A curated collection of luxury villas in Munggu, Bali. A private coastal enclave offering high-yield investment and timeless tropical living.
            </p>
          </div>

          {/* Col 2: The Collection */}
          <div>
            <h4 className="text-[#C9A55A] text-[10px] tracking-[0.2em] uppercase font-semibold mb-6">
              The Collection
            </h4>
            <ul className="flex flex-col gap-3 text-cream/70 text-sm">
              <li><Link href="/#project" className="hover:text-cream transition-colors">The Vision</Link></li>
              <li><Link href="/#why-bali" className="hover:text-cream transition-colors">Location</Link></li>
              <li><Link href="/#masterplan" className="hover:text-cream transition-colors">The Villas</Link></li>
              <li><Link href="/#masterplan" className="hover:text-cream transition-colors">Interactive Masterplan</Link></li>
            </ul>
          </div>

          {/* Col 3: Connect */}
          <div>
            <h4 className="text-[#C9A55A] text-[10px] tracking-[0.2em] uppercase font-semibold mb-6">
              Connect
            </h4>
            <ul className="flex flex-col gap-3 text-cream/70 text-sm">
              <li><Link href="/#inquiry" className="hover:text-cream transition-colors">Contact Us</Link></li>
              <li><Link href="/#inquiry" className="hover:text-cream transition-colors">Schedule a Viewing</Link></li>
              <li><a href="mailto:Admin@royalbalidevelopments.com" className="hover:text-cream transition-colors">Admin@royalbalidevelopments.com</a></li>
              <li><a href="tel:+6285956779721" className="hover:text-cream transition-colors">+62 859 5677 9721</a></li>
            </ul>
          </div>

          {/* Col 4: Newsletter / Office */}
          <div>
            <h4 className="text-[#C9A55A] text-[10px] tracking-[0.2em] uppercase font-semibold mb-6">
              Office
            </h4>
            <address className="text-cream/70 text-sm not-italic leading-relaxed">
              Jalan Pantai Seseh<br />
              Munggu, Mengwi<br />
              Badung Regency<br />
              Bali, Indonesia 80351
            </address>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-cream/10 text-cream/40 text-xs gap-4">
          <p>© {new Date().getFullYear()} Allurea Estate. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-cream transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-cream transition-colors">Terms of Service</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
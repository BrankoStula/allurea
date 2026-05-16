import Link from "next/link";

export const metadata = {
  title: "Privacy Policy — Allurea Estate",
  description: "How Allurea Estate collects, uses, and protects your personal information.",
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-brand-black text-cream">
      <div className="max-w-3xl mx-auto px-6 md:px-12 py-24 md:py-32">

        <div className="mb-12">
          <p className="text-[#C9A55A] text-[10px] uppercase tracking-[0.3em] mb-4">Legal</p>
          <h1 className="font-display text-4xl md:text-5xl leading-tight mb-4" style={{ letterSpacing: "var(--tracking-heading)" }}>
            Privacy Policy
          </h1>
          <p className="text-cream/40 text-sm">Last updated: April 2026</p>
        </div>

        <div className="flex flex-col gap-10 text-cream/70 text-sm leading-relaxed">

          <section>
            <h2 className="text-cream text-base font-semibold mb-3">1. Who We Are</h2>
            <p>
              Allurea Estate is a luxury real estate development project located in Seseh, Bali, Indonesia, operated by Royal Bali Developments. We can be contacted at{" "}
              <a href="mailto:Admin@royalbalidevelopments.com" className="text-[#C9A55A] hover:underline">
                Admin@royalbalidevelopments.com
              </a>{" "}
              or by phone at +62 859 5677 9721.
            </p>
          </section>

          <section>
            <h2 className="text-cream text-base font-semibold mb-3">2. Information We Collect</h2>
            <p className="mb-3">When you submit an inquiry through our website, we collect:</p>
            <ul className="list-disc pl-5 flex flex-col gap-1.5">
              <li>Name and contact details (email address, phone number)</li>
              <li>Investment budget range and timeline</li>
              <li>Buyer type and financing preferences</li>
              <li>Any additional information you provide in your message</li>
            </ul>
            <p className="mt-3">
              We may also collect standard website analytics data (pages visited, browser type, approximate location) through anonymised tools.
            </p>
          </section>

          <section>
            <h2 className="text-cream text-base font-semibold mb-3">3. How We Use Your Information</h2>
            <ul className="list-disc pl-5 flex flex-col gap-1.5">
              <li>To respond to your investment inquiry</li>
              <li>To send you relevant project updates and investment information you have requested</li>
              <li>To improve our website and communications</li>
              <li>To comply with applicable legal obligations</li>
            </ul>
            <p className="mt-3">We do not sell, rent, or share your personal data with third parties for marketing purposes.</p>
          </section>

          <section>
            <h2 className="text-cream text-base font-semibold mb-3">4. Data Retention</h2>
            <p>
              We retain your personal data for as long as necessary to fulfil the purposes described in this policy, or as required by law. Inquiry data is typically retained for up to 3 years unless you request earlier deletion.
            </p>
          </section>

          <section>
            <h2 className="text-cream text-base font-semibold mb-3">5. Your Rights</h2>
            <p className="mb-3">Depending on your jurisdiction, you may have the right to:</p>
            <ul className="list-disc pl-5 flex flex-col gap-1.5">
              <li>Access the personal data we hold about you</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Withdraw consent to marketing communications at any time</li>
            </ul>
            <p className="mt-3">
              To exercise any of these rights, contact us at{" "}
              <a href="mailto:Admin@royalbalidevelopments.com" className="text-[#C9A55A] hover:underline">
                Admin@royalbalidevelopments.com
              </a>.
            </p>
          </section>

          <section>
            <h2 className="text-cream text-base font-semibold mb-3">6. Security</h2>
            <p>
              We implement appropriate technical and organisational measures to protect your personal data against unauthorised access, alteration, disclosure, or destruction.
            </p>
          </section>

          <section>
            <h2 className="text-cream text-base font-semibold mb-3">7. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. The current version will always be available on this page with the date of last update noted above.
            </p>
          </section>

        </div>

        <div className="mt-16 pt-8 border-t border-cream/10">
          <Link href="/" className="text-[#C9A55A] text-sm hover:underline">
            ← Back to Allurea
          </Link>
        </div>

      </div>
    </div>
  );
}

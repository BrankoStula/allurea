import Link from "next/link";

export const metadata = {
  title: "Terms of Service — Allurea Estate",
  description: "Terms and conditions governing use of the Allurea Estate website.",
};

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-brand-black text-cream">
      <div className="max-w-3xl mx-auto px-6 md:px-12 py-24 md:py-32">

        <div className="mb-12">
          <p className="text-[#C9A55A] text-[10px] uppercase tracking-[0.3em] mb-4">Legal</p>
          <h1 className="font-display text-4xl md:text-5xl leading-tight mb-4" style={{ letterSpacing: "var(--tracking-heading)" }}>
            Terms of Service
          </h1>
          <p className="text-cream/40 text-sm">Last updated: April 2026</p>
        </div>

        <div className="flex flex-col gap-10 text-cream/70 text-sm leading-relaxed">

          <section>
            <h2 className="text-cream text-base font-semibold mb-3">1. Acceptance of Terms</h2>
            <p>
              By accessing and using the Allurea Estate website (allurea.com), you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use this website.
            </p>
          </section>

          <section>
            <h2 className="text-cream text-base font-semibold mb-3">2. Information and Investment Disclaimer</h2>
            <p className="mb-3">
              All information presented on this website — including projected yields, rental income estimates, occupancy rates, and financial projections — is provided for indicative purposes only.
            </p>
            <p>
              Past performance and projections do not guarantee future results. Investment in real estate carries risk, including loss of capital. You should seek independent legal, financial, and tax advice before making any investment decision.
            </p>
          </section>

          <section>
            <h2 className="text-cream text-base font-semibold mb-3">3. No Offer or Solicitation</h2>
            <p>
              Nothing on this website constitutes a formal offer, invitation, or solicitation to invest. All transactions are subject to formal agreements, legal review, and applicable Indonesian property law.
            </p>
          </section>

          <section>
            <h2 className="text-cream text-base font-semibold mb-3">4. Intellectual Property</h2>
            <p>
              All content on this website — including images, text, logos, renderings, and design — is the property of Royal Bali Developments or its licensors. No content may be reproduced, distributed, or used without express written permission.
            </p>
          </section>

          <section>
            <h2 className="text-cream text-base font-semibold mb-3">5. Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by law, Allurea Estate and Royal Bali Developments accept no liability for any loss or damage arising from reliance on information contained on this website, or from your use of or inability to use this website.
            </p>
          </section>

          <section>
            <h2 className="text-cream text-base font-semibold mb-3">6. Third-Party Links</h2>
            <p>
              This website may contain links to third-party websites for your convenience. We have no control over the content of those sites and accept no responsibility for them or for any loss or damage that may arise from your use of them.
            </p>
          </section>

          <section>
            <h2 className="text-cream text-base font-semibold mb-3">7. Governing Law</h2>
            <p>
              These Terms of Service are governed by and construed in accordance with the laws of the Republic of Indonesia. Any disputes arising shall be subject to the exclusive jurisdiction of the courts of Bali, Indonesia.
            </p>
          </section>

          <section>
            <h2 className="text-cream text-base font-semibold mb-3">8. Changes to Terms</h2>
            <p>
              We reserve the right to update these Terms of Service at any time. Continued use of the website following any changes constitutes your acceptance of the updated terms.
            </p>
          </section>

          <section>
            <h2 className="text-cream text-base font-semibold mb-3">9. Contact</h2>
            <p>
              Questions regarding these terms can be directed to{" "}
              <a href="mailto:Admin@royalbalidevelopments.com" className="text-[#C9A55A] hover:underline">
                Admin@royalbalidevelopments.com
              </a>.
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

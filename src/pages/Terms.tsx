import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { ArrowLeft } from "lucide-react";

export default function Terms() {
  return (
    <div className="min-h-screen bg-background">
      <SEO title="Terms of Service | James Bugden" description="Terms of service for jamesbugden.com career tools and guides." />
      <div className="max-w-3xl mx-auto px-5 py-12 md:py-16">
        <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" /> Back
        </Link>

        <h1 className="font-heading text-3xl font-bold text-foreground mb-2">Terms of Service</h1>
        <p className="text-sm text-muted-foreground mb-8">Last updated: April 19, 2026</p>

        <div className="prose prose-sm max-w-none text-foreground/90 space-y-6">
          <section>
            <h2 className="font-heading text-xl font-semibold text-foreground">1. Acceptance of Terms</h2>
            <p>By accessing and using jamesbugden.com ("the Site"), you agree to be bound by these Terms of Service. If you do not agree, please do not use the Site.</p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold text-foreground">2. Services</h2>
            <p>The Site provides free career development tools, guides, and resources including resume analysis, salary data, interview preparation materials, and negotiation toolkits. These tools are provided for informational and educational purposes.</p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold text-foreground">3. User Accounts</h2>
            <p>Some features require creating a free account. You are responsible for maintaining the security of your account credentials. You agree to provide accurate information when creating an account.</p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold text-foreground">4. Intellectual Property</h2>
            <p>All content on the Site — including guides, tools, designs, and text — is owned by James Bugden and protected by copyright. You may use the tools for personal career development but may not reproduce, distribute, or commercially exploit the content without permission.</p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold text-foreground">5. User Content</h2>
            <p>Content you submit (such as resume text for analysis) remains yours. We process it solely to provide the requested service and do not claim ownership of your content.</p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold text-foreground">6. Disclaimer</h2>
            <p>Career advice, salary data, and negotiation strategies are provided for informational purposes only. Results may vary. The Site does not guarantee specific career outcomes. Salary figures are estimates based on publicly available data and may not reflect actual compensation.</p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold text-foreground">7. Limitation of Liability</h2>
            <p>The Site and its tools are provided "as is" without warranty of any kind. James Bugden shall not be liable for any damages arising from the use of the Site or reliance on its content.</p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold text-foreground">8. Changes to Terms</h2>
            <p>We may update these terms from time to time. Continued use of the Site after changes constitutes acceptance of the updated terms.</p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold text-foreground">9. Contact</h2>
            <p>For questions about these terms, contact us via <a href="https://www.linkedin.com/in/james-bugden/" target="_blank" rel="noopener noreferrer" className="text-executive underline hover:text-executive-light">LinkedIn</a>.</p>
          </section>
        </div>
      </div>
    </div>
  );
}

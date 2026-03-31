import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { ArrowLeft } from "lucide-react";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-background">
      <SEO title="Privacy Policy | James Bugden" description="Privacy policy for jamesbugden.com career tools and guides." />
      <div className="max-w-3xl mx-auto px-5 py-12 md:py-16">
        <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" /> Back
        </Link>

        <h1 className="font-heading text-3xl font-bold text-foreground mb-2">Privacy Policy</h1>
        <p className="text-sm text-muted-foreground mb-8">Last updated: March 31, 2026</p>

        <div className="prose prose-sm max-w-none text-foreground/90 space-y-6">
          <section>
            <h2 className="font-heading text-xl font-semibold text-foreground">1. Information We Collect</h2>
            <p>When you create an account or use our tools, we may collect:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Email address (for account creation and communication)</li>
              <li>Name (if provided via Google sign-in)</li>
              <li>Resume content (when using the Resume Analyzer or Resume Builder — processed for analysis only)</li>
              <li>Usage data (pages visited, features used) to improve our services</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold text-foreground">2. How We Use Your Information</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>To provide and improve our career tools and guides</li>
              <li>To save your progress and preferences across sessions</li>
              <li>To send occasional career resources (you can unsubscribe anytime)</li>
              <li>To analyze aggregate usage patterns (no individual tracking)</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold text-foreground">3. Data Storage & Security</h2>
            <p>Your data is stored securely using industry-standard encryption. We use Supabase for authentication and data storage, with row-level security policies to protect your information. We do not sell or share your personal data with third parties.</p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold text-foreground">4. Cookies & Analytics</h2>
            <p>We use essential cookies for authentication. We may use anonymous analytics to understand how our tools are used. No third-party advertising cookies are used.</p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold text-foreground">5. Third-Party Services</h2>
            <p>We use Google OAuth for sign-in. When you sign in with Google, Google's privacy policy applies to the authentication process. We only receive your email and basic profile information.</p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold text-foreground">6. Your Rights</h2>
            <p>You can request deletion of your account and associated data at any time by contacting us. You can update or correct your information through your account settings.</p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold text-foreground">7. Contact</h2>
            <p>For privacy-related questions, contact us via <a href="https://www.linkedin.com/in/james-bugden/" target="_blank" rel="noopener noreferrer" className="text-executive underline hover:text-executive-light">LinkedIn</a>.</p>
          </section>
        </div>
      </div>
    </div>
  );
}

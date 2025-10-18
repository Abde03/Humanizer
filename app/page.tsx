'use client'

import { useSession } from "next-auth/react";
import HeroSection from "@/components/hero-section"
import FeaturesSection from "@/components/features-section"
import PricingSection from "@/components/pricing-section"
import ContactSection from "@/components/contact-section"
import Humanize from "@/components/humanize";

export default function Home() {
  const { status, data: session } = useSession();


  // If loading, show loading state
  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--background)" }}>
        <div className="animate-spin rounded-full h-32 w-32 border-b-2" style={{ borderColor: "var(--primary)" }}></div>
      </div>
    )
  }

  // Show page with proper max-width container
  return (
  <div className="min-h-screen" style={{ background: "var(--background)" }}>
      <div className="max-w-4xl mx-auto">
        {session ? <Humanize /> : <HeroSection />}
        {!session && (
          <>
            <FeaturesSection />
            <PricingSection />
            <ContactSection />
          </>
        )}
      </div>
    </div>
  );
}

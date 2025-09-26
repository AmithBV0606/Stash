import CallToActionSection from "@/components/call-to-action-section";
import FeaturesSection from "@/components/features-section";
import FooterSection from "@/components/footer-section";
import HeroSection from "@/components/hero-section";
import InsightsSection from "@/components/insights-section";
import TeamsSection from "@/components/teams-section";
import React from "react";

export default function page() {
  return (
    <div>
      <HeroSection />
      <FeaturesSection />
      <InsightsSection />
      <TeamsSection />
      <CallToActionSection />
      <FooterSection />
    </div>
  );
}

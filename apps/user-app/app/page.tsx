import FeaturesSection from "@/components/features-section";
import HeroSection from "@/components/hero-section";
import InsightsSection from "@/components/insights-section";
import React from "react";

export default function page() {
  return (
    <div>
      <HeroSection />
      <FeaturesSection />
      <InsightsSection />
    </div>
  );
}

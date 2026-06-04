"use client"

import { CommonHeader } from "@/components/common/header"
import { CommonFooter } from "@/components/common/footer"
import { HeroSection } from "@/components/hero-section"
import { FeatureCards } from "@/components/feature-cards"
import { ContentSections } from "@/components/content-sections"
import { StatsSection } from "@/components/stats-section"

export function LandingPage() {
  const handleSearch = (query: string) => {
    console.log("Search:", query)
  }

  return (
    <div className="min-h-screen bg-white">
      <CommonHeader />
      <HeroSection onSearch={handleSearch} />
      <FeatureCards />
      <ContentSections />
      <StatsSection />
      <CommonFooter />
    </div>
  )
}

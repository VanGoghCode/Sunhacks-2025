import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/hero-section";
import { MarketplaceSection } from "@/components/marketplace-section";
import { EnvironmentalImpact } from "@/components/environmental-impact";
import { NGOPartners } from "@/components/ngo-partners";
import { AboutSection } from "@/components/about-section";
import { ContactSection } from "@/components/contact-section";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <MarketplaceSection />
      <EnvironmentalImpact />
      <NGOPartners />
      <AboutSection />
      <ContactSection />
      <Footer />
    </main>
  );
}

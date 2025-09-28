"use client";

import { useEffect } from 'react';
import HeroSection from '../components/sections/HeroSection';
import SocialProofSection from '../components/sections/SocialProofSection';
import WhatWeDoSection from '../components/sections/WhatWeDoSection';
import HowItWorksSection from '../components/sections/HowItWorksSection';
import ImpactCounterSection from '../components/sections/ImpactCounterSection';
import WhoYouCanHelpSection from '../components/sections/WhoYouCanHelpSection';
import WallOfLoveSection from '../components/sections/WallOfLoveSection';
import ConnectedNGOsSection from '../components/sections/ConnectedNGOsSection';

export default function Home() {
  useEffect(() => {
    // Handle hash navigation when page loads
    const hash = window.location.hash;
    if (hash) {
      // Small delay to ensure DOM is fully rendered
      setTimeout(() => {
        const targetId = hash.substring(1);
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  }, []);
  return (
    <main>
      <HeroSection />
      <SocialProofSection />
      <WhatWeDoSection />
      <HowItWorksSection />
      <ImpactCounterSection />
      <WhoYouCanHelpSection />
      <WallOfLoveSection />
      <ConnectedNGOsSection />
    </main>
  );
}

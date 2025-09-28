import HeroSection from '../components/sections/HeroSection';
import SocialProofSection from '../components/sections/SocialProofSection';
import WhatWeDoSection from '../components/sections/WhatWeDoSection';
import HowItWorksSection from '../components/sections/HowItWorksSection';
import ImpactCounterSection from '../components/sections/ImpactCounterSection';
import WhoYouCanHelpSection from '../components/sections/WhoYouCanHelpSection';
import WallOfLoveSection from '../components/sections/WallOfLoveSection';
import ConnectedNGOsSection from '../components/sections/ConnectedNGOsSection';

export default function Home() {
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

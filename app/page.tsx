// app/page.tsx
import Hero from "@/components/sections/Hero";
import EarlyInvestorSection from "@/components/sections/EarlyInvestorSection";
import LocationSection from "@/components/sections/LocationSection";
import CinematicJourney from "@/components/sections/CinematicJourney";
import ProjectGallery from "@/components/sections/ProjectGallery";
import PlanpointSection from "@/components/sections/PlanpointSection";
import DeveloperSection from "@/components/sections/DeveloperSection";
import ProcessJourney from "@/components/sections/ProcessJourney";
import InquirySection from "@/components/sections/InquirySection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <EarlyInvestorSection />
      <LocationSection />
      <CinematicJourney />
      <ProjectGallery />
      <PlanpointSection />
      <DeveloperSection />
      <ProcessJourney />
      <InquirySection />
    </>
  );
}

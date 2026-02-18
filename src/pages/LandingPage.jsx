import React from "react";
import HeroSection from "../components/sections/HeroSection";
// import Navbar from "../components/ui/Navbar";
import PartnersLSection from "../components/sections/PartnersLSection";
import TopCSection from "../components/sections/TopCSection";
import StatsSection from "../components/sections/StatsSection";
import WhoCESection from "../components/sections/WhoCESection";
import VirtualLSection from "../components/sections/VirtualLSection";
import TestimonialSection from "../components/sections/TestimonialSection";


const LandingPage = () => {
  return (
    <div>
      {/* <Navbar /> */}
      <HeroSection />
      <PartnersLSection />
      <TopCSection />
      <WhoCESection />
      <VirtualLSection />
      <StatsSection />
      <TestimonialSection />
    </div>
  );
};

export default LandingPage;

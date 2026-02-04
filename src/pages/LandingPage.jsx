import React from "react";
import HeroSection from "../components/sections/HeroSection";
import Navbar from "../components/Navbar";
import PartnersLSection from "../components/sections/PartnersLSection";
import TopCSection from "../components/sections/TopCSection";
import StatsSection from "../components/sections/StatsSection";

const LandingPage = () => {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <PartnersLSection />
      <TopCSection />
      <StatsSection />
    </div>
  );
};

export default LandingPage;

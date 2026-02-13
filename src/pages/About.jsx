import Navbar from "../components/ui/Navbar";
import StatsSection from "../components/sections/StatsSection";
import TestimonialSection from "../components/sections/TestimonialSection";
import AboutSection from "../components/sections/AboutSection";


const About = () => {
  return (
    <div>
      <Navbar />
      <AboutSection />
      <StatsSection />
      <TestimonialSection />
    </div>
  );
};

export default About
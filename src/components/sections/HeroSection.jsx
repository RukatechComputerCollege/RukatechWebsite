import { useState, useEffect } from "react";
import { GiSupersonicArrow } from "react-icons/gi";
import heroImage from "../../../public/hero-business.jpg";

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(6);
  const totalSlides = 10;

  // Auto-advance slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-700"
        style={{ backgroundImage: `url(${heroImage})` }}
      />

      {/* Blue Gradient Overlay */}
      <div className="absolute inset-0 hero-overlay" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col left-0 md:left-16 justify-center container mx-auto px-6 lg:px-12">
        <div className="max-w-3xl animate-fade-in">
          {/* Subheading */}
          <div className="flex gap-3">
            <div className="h-0.5 w-8 md:w-12 mt-2 md:mt-3 bg-[hsl(var(--accent))]" />
            <p className="text-white text-sm text-shadow md:text-lg mb-4 tracking-wide">
                Don't - Miss Out On Our Upcoming Trainings.
            </p>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[hsl(var(--primary))] leading-tight mb-8 text-shadow">
            Corporate Courses, Guaranteed To Run In The First Quarter, 2026
          </h1>

          {/* CTA Button */}
          <button className="cta-button group">
            <span>LEARN MORE</span>
            <span className="cta-arrow group-hover:translate-x-1 transition-transform">
              <GiSupersonicArrow className="w-4 h-4" />
            </span>
          </button>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-6 lg:left-12 flex items-center gap-2">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`slide-indicator ${index === currentSlide ? "slide-indicator-active" : ""}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

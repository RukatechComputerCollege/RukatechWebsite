import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CarouselNavButton from "../ui/CarouselNavButton";

const testimonialsSeed = [
  {
    id: 1,
    name: "Aisha Bello",
    role: "Software Engineer",
    quote:
      "The courses were practical and hands-on — I landed my first cloud role within 3 months. The instructors are world-class and supportive.",
    avatar: "/images/student-portrait.jpg",
    rating: 5,
  },
  {
    id: 2,
    name: "Samuel Okoro",
    role: "High School Student",
    quote:
      "I learned design and coding in a way that actually made sense. Projects were fun and helped me build my portfolio.",
    avatar: "/images/student-portrait.jpg",
    rating: 5,
  },
  {
    id: 3,
    name: "Chinwe Nwosu",
    role: "Career Switcher",
    quote:
      "Flexible, career-focused classes with mentors who cared. The hands-on projects gave me confidence to apply for roles.",
    avatar: "/images/student-portrait.jpg",
    rating: 5,
  },
  {
    id: 4,
    name: "Tunde Akande",
    role: "Teen Learner",
    quote:
      "Friendly instructors and clear projects — loved the community and the weekly live sessions.",
    avatar: "/images/student-portrait.jpg",
    rating: 5,
  },
];

export default function TestimonialSection() {
  const [items, setItems] = useState(testimonialsSeed);
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef(null);
  const pauseRef = useRef(false);
  const intervalRef = useRef(null);

  // rotate forward by moving first item to the end
  const rotateNext = () => {
    setItems((prev) => {
      const nxt = [...prev.slice(1), prev[0]];
      return nxt;
    });
    setActiveIndex(0);
  };

  // rotate backward by moving last item to the start
  const rotatePrev = () => {
    setItems((prev) => {
      const last = prev[prev.length - 1];
      return [last, ...prev.slice(0, prev.length - 1)];
    });
    setActiveIndex(0);
  };

  useEffect(() => {
    function startAutoplay() {
      if (intervalRef.current) return;
      intervalRef.current = setInterval(() => {
        if (!pauseRef.current) rotateNext();
      }, 4500);
    }
    function stopAutoplay() {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    startAutoplay();
    return () => stopAutoplay();
  }, []);

  // pause on interactions
  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;
    const onPointerDown = () => (pauseRef.current = true);
    const onPointerUp = () => (pauseRef.current = false);
    const onEnter = () => (pauseRef.current = true);
    const onLeave = () => (pauseRef.current = false);

    el.addEventListener("pointerdown", onPointerDown);
    el.addEventListener("pointerup", onPointerUp);
    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);

    return () => {
      el.removeEventListener("pointerdown", onPointerDown);
      el.removeEventListener("pointerup", onPointerUp);
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  const cardVariants = {
    enter: { opacity: 0, y: 12 },
    center: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: -12, transition: { duration: 0.35 } },
  };

  return (
    <section className="py-16 bg-[hsl(var(--background))]">
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          <div className="lg:w-1/3">
            <span className="inline-block bg-[hsl(var(--accent))] text-[hsl(var(--accent-foreground))] px-3 py-1 rounded-full text-xs font-semibold">
              TESTIMONIALS
            </span>
            <h2 className="mt-4 text-3xl font-extrabold text-[hsl(var(--primary))]">
              What our learners say
            </h2>
            <p className="mt-3 text-[hsl(var(--muted))]">
              Real stories from students who transformed their careers and lives
              through our practical, project-driven courses.
            </p>

            <div className="mt-6 hidden lg:flex gap-3">
              <CarouselNavButton
                onClick={() => {
                  pauseRef.current = true;
                  rotatePrev();
                }}
                ariaLabel="Previous testimonial"
                direction="prev"
                bgClass="bg-white"
                borderClass="border-2 border-[hsl(var(--accent)/10%)]"
                bgHoverClass="hover:bg-[hsl(var(--accent))]"
                borderHoverClass="hover:border-[hsl(var(--accent))]"
                iconColorClass="text-[hsl(var(--primary))]"
                iconHoverColorClass="group-hover:text-[hsl(var(--primary))]"
              />

              <CarouselNavButton
                onClick={() => {
                  pauseRef.current = true;
                  rotateNext();
                }}
                ariaLabel="Next testimonial"
                direction="next"
                bgClass="bg-white"
                borderClass="border-2 border-[hsl(var(--accent)/10%)]"
                bgHoverClass="hover:bg-[hsl(var(--accent))]"
                borderHoverClass="hover:border-[hsl(var(--accent))]"
                iconColorClass="text-[hsl(var(--primary))]"
                iconHoverColorClass="group-hover:text-[hsl(var(--primary))]"
              />
            </div>
          </div>

          <div className="lg:w-2/3">
            <div ref={carouselRef} className="relative">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {items.slice(0, 3).map((t, i) => (
                  <AnimatePresence mode="wait" key={t.id + String(i)}>
                    <motion.article
                      layout
                      initial="enter"
                      animate="center"
                      exit="exit"
                      variants={cardVariants}
                      className="bg-[hsl(var(--card))] text-[hsl(var(--card-foreground))] rounded-2xl p-6 flex flex-col gap-4 shadow-lg"
                    >
                      <div className="flex items-center gap-4">
                        <img
                          src={t.avatar}
                          className="w-14 h-14 rounded-full object-cover"
                          alt={t.name}
                        />
                        <div>
                          <div className="font-semibold text-[hsl(var(--primary))]">
                            {t.name}
                          </div>
                          <div className="text-sm text-[hsl(var(--muted))]">
                            {t.role}
                          </div>
                        </div>
                      </div>

                      <blockquote className="text-[hsl(var(--primary))] text-sm leading-relaxed flex-1">
                        “{t.quote}”
                      </blockquote>

                      <div className="flex items-center gap-2 mt-2">
                        {Array.from({ length: t.rating }).map((_, s) => (
                          <svg
                            className="w-4 h-4 text-[#F59E0B]"
                            viewBox="0 0 24 24"
                            fill="#F59E0B"
                            key={s}
                          >
                            <path d="M12 .587l3.668 7.431L23.5 9.75l-5.666 5.523L19.334 24 12 19.897 4.666 24l1.5-8.727L.5 9.75l7.832-1.732L12 .587z" />
                          </svg>
                        ))}
                      </div>
                    </motion.article>
                  </AnimatePresence>
                ))}
              </div>

              {/* mobile controls */}
              <div className="absolute left-3 right-3 top-3 flex justify-between lg:hidden">
                <CarouselNavButton
                  onClick={() => {
                    pauseRef.current = true;
                    rotatePrev();
                  }}
                  ariaLabel="Previous testimonial"
                  direction="prev"
                  bgClass="bg-white"
                  borderClass="border-2 border-[hsl(var(--accent)/10%)]"
                  bgHoverClass="hover:bg-[hsl(var(--accent))]"
                  borderHoverClass="hover:border-[hsl(var(--accent))]"
                  iconColorClass="text-[hsl(var(--primary))]"
                  iconHoverColorClass="group-hover:text-[hsl(var(--primary))]"
                />

                <CarouselNavButton
                  onClick={() => {
                    pauseRef.current = true;
                    rotateNext();
                  }}
                  ariaLabel="Next testimonial"
                  direction="next"
                  bgClass="bg-white"
                  borderClass="border-2 border-[hsl(var(--accent)/10%)]"
                  bgHoverClass="hover:bg-[hsl(var(--accent))]"
                  borderHoverClass="hover:border-[hsl(var(--accent))]"
                  iconColorClass="text-[hsl(var(--primary))]"
                  iconHoverColorClass="group-hover:text-[hsl(var(--primary))]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Indicators */}
        <div className="mt-8 flex items-center gap-2 justify-center">
          {items.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                // rotate until chosen appears at 0
                const current = [...items];
                while (current[0].id !== items[idx].id) {
                  current.push(current.shift());
                }
                setItems(current);
                setActiveIndex(0);
              }}
              className={`w-2 h-2 rounded-full ${idx === 0 ? "bg-[hsl(var(--accent))]" : "bg-[hsl(var(--primary))/20%]"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

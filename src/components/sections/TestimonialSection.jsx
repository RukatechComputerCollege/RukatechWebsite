import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Edward Alexander",
    rating: 4.9,
    date: "29 Aug, 2017",
    quote:
      "Amazing service and support! The team went above and beyond to ensure our project was delivered on time. Highly recommend their professional approach.",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
  },
  {
    id: 2,
    name: "Diana Johnston",
    rating: 4.9,
    date: "29 Aug, 2017",
    quote:
      "Overall pleasurable experience. Pay a little first and Pay a little during the development of the app as milestones are achieved, which made me feel very confident and comfortable. Seamless and Easy process.",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
  },
  {
    id: 3,
    name: "Lauren Contreras",
    rating: 4.9,
    date: "29 Aug, 2017",
    quote:
      "Exceptional quality and attention to detail. The communication throughout the project was outstanding. Will definitely work with them again on future projects.",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
  },
  {
    id: 4,
    name: "Michael Chen",
    rating: 4.8,
    date: "15 Sep, 2017",
    quote:
      "Incredible attention to user experience. They transformed our vision into reality with precision and creativity. The end result exceeded all expectations.",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
  },
];

// Positions along the curve (top, middle, bottom)
const curvePositions = [
  { x: 48, y: 40 },
  { x: 68, y: 140 },
  { x: 48, y: 240 },
];

// Entry position (above the curve)
const entryPosition = { x: 28, y: -40 };
// Exit position (to the left, fading out)
const exitPosition = { x: -80, y: 280 };

const TestimonialSectionX = () => {
  const [step, setStep] = useState(0);
  const [activeIndex, setActiveIndex] = useState(1); // Middle position is active

  // Exact rotation sequence: 123 → 412 → 341 → 234 → 123
  const rotationSequence = [
    [0, 1, 2],
    [3, 0, 1],
    [2, 3, 0],
    [1, 2, 3],
  ];

  const getPreviousIndices = () => {
    const prevStep = (step - 1 + 4) % 4;
    return rotationSequence[prevStep];
  };

  const getVisibleIndices = () => {
    return rotationSequence[step];
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prev) => (prev + 1) % 4);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const visibleIndices = getVisibleIndices();
  const previousIndices = getPreviousIndices();

  const exitingTestimonial = previousIndices[2];
  const isExiting = !visibleIndices.includes(exitingTestimonial);

  const handleClick = (positionIndex) => {
    setActiveIndex(positionIndex);
  };

  return (
    <section className="relative pb-0 md:pb-30 lg:pb-14 w-full overflow-visible bg-[hsl(var(--primary))] pt-20">
      <div className="absolute -left-32 -top-45 h-220 w-180 rounded-full bg-[hsl(var(--accent))] opacity-100" />

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-20 mx-auto max-w-5xl rounded-sm bg-[hsl(var(--primary))] px-8 py-12 shadow-xl md:px-16"
        >
          <div className="mb-10 flex items-center gap-3">
            <div className="h-0.5 w-8 bg-[hsl(var(--accent))]" />
            <h2 className="text-xl font-semibold tracking-tight text-[hsl(var(--accent))]">
              Customer Reviews
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <div className="relative h-75">
              <svg
                className="absolute left-0 top-0 h-full w-32"
                viewBox="0 0 100 300"
                fill="none"
                preserveAspectRatio="none"
              >
                <path
                  d="M 50 20 Q 90 150 50 280"
                  stroke="hsl(var(--testimonial-line))"
                  strokeWidth="2"
                  fill="none"
                />
              </svg>

              <AnimatePresence mode="popLayout">
                {visibleIndices.map((testimonialIndex, positionIndex) => {
                  const testimonial = testimonials[testimonialIndex];
                  const position = curvePositions[positionIndex];
                  const isActive = positionIndex === activeIndex;

                  const wasInPreviousStep =
                    previousIndices.includes(testimonialIndex);
                  const previousPosition = wasInPreviousStep
                    ? previousIndices.indexOf(testimonialIndex)
                    : -1;

                  let initialX = position.x;
                  let initialY = position.y;

                  if (!wasInPreviousStep) {
                    initialX = entryPosition.x;
                    initialY = entryPosition.y;
                  } else if (previousPosition !== -1) {
                    initialX = curvePositions[previousPosition].x;
                    initialY = curvePositions[previousPosition].y;
                  }

                  return (
                    <motion.div
                      key={testimonial.id}
                      initial={{
                        opacity: wasInPreviousStep ? 1 : 0,
                        scale: wasInPreviousStep ? 1 : 0.8,
                        x: initialX,
                        y: initialY,
                      }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                        x: position.x,
                        y: position.y,
                      }}
                      exit={{
                        opacity: 0,
                        scale: 0.8,
                        x: exitPosition.x,
                        y: exitPosition.y,
                      }}
                      transition={{
                        duration: 0.6,
                        ease: [0.4, 0, 0.2, 1],
                      }}
                      onClick={() => handleClick(positionIndex)}
                      className="absolute flex cursor-pointer items-center gap-4"
                      style={{ left: 0, top: 0 }}
                    >
                      <motion.div
                        animate={{
                          scale: isActive ? 1 : 0.85,
                          opacity: isActive ? 1 : 0.6,
                        }}
                        transition={{ duration: 0.3 }}
                        className="relative z-10"
                      >
                        <img
                          src={testimonial.avatar}
                          alt={testimonial.name}
                          className={`rounded-full border-2 object-cover transition-all duration-300 ${
                            isActive
                              ? "h-14 w-14 border-[hsl(var(--crent))] shadow-lg md:h-16 md:w-16"
                              : "h-10 w-10 border-[hsl(var(--accent))] md:h-12 md:w-12"
                          }`}
                        />
                      </motion.div>

                      <motion.div
                        animate={{
                          opacity: isActive ? 1 : 0.6,
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <h3
                          className={`font-semibold transition-all duration-300 ${
                            isActive
                              ? "text-lg text-[hsl(var(--accent))]"
                              : "text-sm text-[hsl(var(--accent))]"
                          }`}
                        >
                          {testimonial.name}
                        </h3>
                        <div className="flex items-center gap-1.5">
                          <Star className="h-3.5 w-3.5 fill-[hsl(var(--testimonial-star))] text-[hsl(var(--testimonial-star))]" />
                          <span
                            className={`transition-all duration-300 ${
                              isActive
                                ? "text-sm text-[hsl(var(--accent))]"
                                : "text-xs text-[hsl(var(--accent))]"
                            }`}
                          >
                            {testimonial.rating} on {testimonial.date}
                          </span>
                        </div>
                      </motion.div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            <div className="relative flex items-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`quote-${visibleIndices[activeIndex]}`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="relative"
                >
                  <span className="absolute -left-4 -top-4 font-serif text-6xl text-[hsl(var(--testimonial-star))] md:-left-6 md:text-7xl">
                    "
                  </span>

                  <p className="pl-4 font-serif text-lg italic leading-relaxed text-[hsl(var(--testimonial-star))] md:pl-6 md:text-xl">
                    <span className="text-2xl md:text-3xl">
                      {testimonials[visibleIndices[activeIndex]].quote.charAt(
                        0,
                      )}
                    </span>
                    {testimonials[visibleIndices[activeIndex]].quote.slice(1)}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialSectionX;

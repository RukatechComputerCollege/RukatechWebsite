import React, { useRef, useEffect } from "react";
import CTAButton from "../ui/CTAButton";
import CarouselNavButton from "../ui/CarouselNavButton";

export default function VirtualLSection() {
  const carouselRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);

  const courses = [
    {
      id: 1,
      title: "Microsoft Azure Administrator Associate",
      description:
        "Master the cloud with our comprehensive Azure training. Learn to manage subscriptions, secure identities, and administer infrastructure.",
      category: "Cloud Computing",
      imageUrl: "/images/kid.jpeg",
      color: "#0ea5a4",
    },
    {
      id: 2,
      title: "AWS Certified Solutions Architect",
      description:
        "Design resilient, high-performing, secure, and cost-optimized architectures on AWS.",
      category: "AWS",
      imageUrl: "/images/kid.jpeg",
      color: "#f97316",
    },
    {
      id: 3,
      title: "Professional Graphic Design Masterclass",
      description:
        "Learn design theory, typography, and color mastery. Create stunning visuals for web and print.",
      category: "Design",
      imageUrl: "/images/kid.jpeg",
      color: "#6366f1",
    },
    {
      id: 4,
      title: "DevOps Engineering Foundation",
      description:
        "Bridge the gap between development and operations. Master CI/CD pipelines and automation.",
      category: "DevOps",
      imageUrl: "/images/kid.jpeg",
      color: "#06b6d4",
    },
  ];

  // Scroll helpers
  function scrollNext() {
    if (!carouselRef.current) return;
    const el = carouselRef.current;
    const card = el.querySelector(".card");
    if (!card) return;
    el.scrollBy({ left: card.clientWidth + 16, behavior: "smooth" });
  }

  function scrollPrev() {
    if (!carouselRef.current) return;
    const el = carouselRef.current;
    const card = el.querySelector(".card");
    if (!card) return;
    el.scrollBy({ left: -(card.clientWidth + 16), behavior: "smooth" });
  }

  // Intersection animations for left/right sections
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target;
          if (entry.isIntersecting) el.classList.add("in-view");
        });
      },
      { threshold: 0.18 },
    );
    if (leftRef.current) observer.observe(leftRef.current);
    if (rightRef.current) observer.observe(rightRef.current);
    return () => observer.disconnect();
  }, []);

  // Autoplay with pause-on-interaction
  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;
    let interval = null;
    let resumeTimeout = null;
    let isPaused = false;

    function start() {
      if (interval != null) return;
      interval = window.setInterval(() => {
        if (!isPaused) scrollNext();
      }, 4000);
    }

    function stop() {
      if (interval != null) {
        clearInterval(interval);
        interval = null;
      }
    }

    function pauseTemporary() {
      isPaused = true;
      if (resumeTimeout != null) clearTimeout(resumeTimeout);
      resumeTimeout = window.setTimeout(() => {
        isPaused = false;
      }, 3500);
    }

    function onInteraction() {
      pauseTemporary();
    }

    // start autoplay
    start();

    el.addEventListener("mouseenter", onInteraction);
    el.addEventListener("pointerdown", onInteraction);
    el.addEventListener("wheel", onInteraction, { passive: true });

    // when user manually clicks nav, pause for a bit
    const navPrev = el.parentElement?.querySelector(".st-ctrl:first-child");
    const navNext = el.parentElement?.querySelector(".st-ctrl:last-child");
    [navPrev, navNext].forEach((n) =>
      n?.addEventListener("click", onInteraction),
    );

    // pause while being dragged / scrolled
    let isScrolling = false;
    function onScroll() {
      isScrolling = true;
      pauseTemporary();
      // debounce
      window.clearTimeout(onScroll._t);
      onScroll._t = window.setTimeout(() => {
        isScrolling = false;
      }, 150);
    }
    el.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      stop();
      el.removeEventListener("mouseenter", onInteraction);
      el.removeEventListener("pointerdown", onInteraction);
      el.removeEventListener("wheel", onInteraction);
      el.removeEventListener("scroll", onScroll);
      [navPrev, navNext].forEach((n) =>
        n?.removeEventListener("click", onInteraction),
      );
      if (resumeTimeout != null) clearTimeout(resumeTimeout);
    };
  }, []);

  return (
    <div className="st-topc-root">
      <section className="st-section">
        {/* decorative blurred blobs similar to original design */}
        {/* <div className="st-blob st-blob-1" aria-hidden="true" /> */}
        {/* <div className="st-blob st-blob-2" aria-hidden="true" /> */}

        <div className="st-container">
          <div className="st-grid">
            <div className="st-left" ref={leftRef}>
              <div className="st-photo">
                {/* Student portrait image (uses public/images/student-portrait.jpg) */}
                <img
                  src="/images/student-portrait.jpg"
                  alt="Student with backpack"
                  className="st-photo-img"
                />

                <div className="st-badge">
                  {/* CheckCircle icon */}
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M9 12l2 2 4-4"
                      stroke="#10b981"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <circle
                      cx="12"
                      cy="12"
                      r="9"
                      stroke="#d1fae5"
                      strokeWidth="2"
                    />
                  </svg>

                  <div className="st-badge-text">
                    <strong>World-Class Learning</strong>
                    <span>Join 5000+ students achieving their goals</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="st-right" ref={rightRef}>
              <div className="st-header">
                <div className="st-pill">LIVE SECTION</div>
                <h2 className="st-title">
                  VIRTUAL LIVE <span className="accent">TRAINING</span>
                </h2>

                <p className="st-lead text-sm text-gray-600">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Assumenda explicabo eius quas inventore dolor, laudantium,
                  unde numquam, quidem laborum dolorum porro eaque autem magni
                  excepturi suscipit expedita reiciendis error aliquam!
                </p>
                {/* CTA Button */}
                <CTAButton
                  href="#"
                  label="VIEW COURSES"
                  textColor="text-[hsl(var(--accent))]"
                  hoverTextColor="text-[hsl(var(--primary))]"
                />
              </div>

              <div className="st-carousel-wrap overflow-auto scrollbar-hide">
                <div className="st-carousel-controls">
                  {/* CarouselNavButton keeps default visuals but allows props to override */}
                  <CarouselNavButton
                    onClick={scrollPrev}
                    ariaLabel="Previous"
                    direction="prev"
                    // defaults: white bg, light border, dark icon; hover uses accent
                    bgClass="bg-[hsl(var(--primary))]"
                    borderClass="border-2 border-[hsl(var(--accent)/20%)]"
                    iconColorClass="text-[hsl(var(--accent))]"
                    bgHoverClass="hover:bg-[hsl(var(--accent))]"
                    borderHoverClass="hover:border-black"
                    iconHoverColorClass="group-hover:text-[hsl(var(--primary))]"
                  />
                  <CarouselNavButton
                    onClick={scrollNext}
                    ariaLabel="Next"
                    direction="next"
                    bgClass="bg-[hsl(var(--primary))]"
                    borderClass="border-2 border-[hsl(var(--accent)/20%)]"
                    iconColorClass="text-[hsl(var(--accent))]"
                    bgHoverClass="hover:bg-[hsl(var(--accent))]"
                    borderHoverClass="hover:border-black"
                    iconHoverColorClass="group-hover:text-[hsl(var(--primary))]"
                  />
                </div>

                <div className="st-carousel scrollbar-hide" ref={carouselRef}>
                  {courses.map((c, idx) => (
                    <article
                      key={c.id}
                      className="card"
                      style={{ ["--i"]: String(idx) }}
                    >
                      <div className="card-media">
                        <img
                          src={c.imageUrl}
                          alt={c.title}
                          className="card-img"
                        />
                        <div className="card-badge">{c.category}</div>
                      </div>

                      <div className="card-body">
                        <div className="card-actions">
                          {/* CTA Button */}
                          <CTAButton
                            href="#"
                            label="Start Now"
                            textColor="text-[hsl(var(--accent))]"
                            hoverTextColor="text-[hsl(var(--primary))]"
                            bgHoverClass="hover:bg-[hsl(var(--accent))]"
                            className="absolute bottom-5 -right-[-4] bg-[hsl(var(--primary))]"
                          />
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

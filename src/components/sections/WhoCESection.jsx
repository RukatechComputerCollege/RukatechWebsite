import React, { useRef, useEffect } from "react";
import CTAButton from "../ui/CTAButton";
import CarouselNavButton from "../ui/CarouselNavButton";

export default function WhoCESection() {
  const carouselRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);

  const groups = [
    {
      id: 1,
      title: "Kids",
      description:
        "Fun, guided learning for ages 3–10. Interactive lessons that build confidence and fundamentals through play and projects.",
      category: "Ages 3–10",
      imageUrl: "/images/course-aws.jpg",
    },
    {
      id: 2,
      title: "Teenagers",
      description:
        "Focused programs for ages 11–17: practical skills for school, creative portfolio work, and mentorship toward careers and certifications.",
      category: "Ages 11–17",
      imageUrl: "/images/course-azure.jpg",
    },
    {
      id: 3,
      title: "Adults",
      description:
        "Career-focused and flexible learning for adults: upskilling, certifications, and hands-on projects to level up your career.",
      category: "18+",
      imageUrl: "/images/course-design.jpg",
    },
  ];

  function scrollNext() {
    if (!carouselRef.current) return;
    const el = carouselRef.current;
    const card = el.querySelector(".card");
    if (!card) return;
    const gap = 16;
    const scrollBy = card.clientWidth + gap;

    // Smoothly scroll to the next card, then rotate the first card to the end
    el.scrollBy({ left: scrollBy, behavior: "smooth" });
    // After scroll completes, move first card to end and compensate scrollLeft
    setTimeout(() => {
      const first = el.querySelector(".card");
      if (first) {
        el.appendChild(first);
        el.scrollLeft -= scrollBy;
      }
    }, 420);
  }

  function scrollPrev() {
    if (!carouselRef.current) return;
    const el = carouselRef.current;
    const card = el.querySelector(".card");
    if (!card) return;
    const gap = 16;
    const scrollBy = card.clientWidth + gap;

    // Move last child to the front, adjust scrollLeft, then scroll smoothly backwards
    const last = el.querySelector(".card:last-child");
    if (last) {
      el.insertBefore(last, el.firstChild);
      el.scrollLeft += scrollBy;
      // now smooth scroll back by one card width
      el.scrollBy({ left: -scrollBy, behavior: "smooth" });
    }
  }

  // Intersection animations
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

  // Autoplay with pause on interaction (same pattern as TopCSection)
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

    start();

    el.addEventListener("mouseenter", onInteraction);
    el.addEventListener("pointerdown", onInteraction);
    el.addEventListener("wheel", onInteraction, { passive: true });

    const navPrev = el.parentElement?.querySelector(".wce-ctrl:first-child");
    const navNext = el.parentElement?.querySelector(".wce-ctrl:last-child");
    [navPrev, navNext].forEach((n) =>
      n?.addEventListener("click", onInteraction),
    );

    function onScroll() {
      pauseTemporary();
      window.clearTimeout(onScroll._t);
      onScroll._t = window.setTimeout(() => {}, 150);
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
    <div className="wce-root">
      <section className="wce-section">
        <div className="wce-container">
          <div className="wce-grid">
            {/* Cards (left on desktop, below image on mobile) */}
            <div className="wce-left" ref={leftRef}>
              <div className="wce-header">
                <div className="st-pill">WHO CAN ENROLL</div>
                <h2 className="st-title">
                  WHO CAN <span className="accent">ENROLL</span>
                </h2>

                <p className="st-lead text-sm text-gray-600">
                  We welcome learners at every stage: children who are just
                  starting out, teenagers exploring careers, and adults looking
                  to upskill. Our programs are tailored to each group with
                  age-appropriate content, flexible scheduling, and expert
                  instructors.
                </p>

                {/* VIEW ALL COURSES CTA (same as TopCSection) */}
                <div style={{ marginTop: 12 }}>
                  <CTAButton
                    href="#"
                    label="VIEW COURSES"
                    textColor="text-[hsl(var(--primary))]"
                    borderClass="border-[hsl(var(--primary))]"
                    iconBgClass="bg-[hsl(var(--primary))]"
                    iconColorClass="text-[hsl(var(--accent))]"
                    bgHoverClass="hover:bg-[hsl(var(--primary))]"
                    textHoverClass="group-hover:text-[hsl(var(--accent))]"
                    borderHoverClass="hover:border-[hsl(var(--primary))]"
                  />
                </div>
              </div>

              <div className="st-carousel-wrap overflow-auto scrollbar-hide">
                <div className="st-carousel-controls wce-controls">
                  <CarouselNavButton
                    onClick={scrollPrev}
                    ariaLabel="Previous"
                    direction="prev"
                    bgClass="bg-[hsl(var(--accent))]"
                    borderClass="border-2 border-[hsl(var(--primary) / 20%)]"
                    iconColorClass="text-[hsl(var(--primary))]"
                    bgHoverClass="hover:bg-[hsl(var(--primary))]"
                    borderHoverClass="hover:border-black"
                    iconHoverColorClass="group-hover:text-[hsl(var(--accent))]"
                    className="wce-ctrl"
                  />
                  <CarouselNavButton
                    onClick={scrollNext}
                    ariaLabel="Next"
                    direction="next"
                    bgClass="bg-[hsl(var(--accent))]"
                    borderClass="border-2 border-[hsl(var(--primary) / 20%)]"
                    iconColorClass="text-[hsl(var(--primary))]"
                    bgHoverClass="hover:bg-[hsl(var(--primary))]"
                    borderHoverClass="hover:border-black"
                    iconHoverColorClass="group-hover:text-[hsl(var(--accent))]"
                    className="wce-ctrl"
                  />
                </div>

                <div className="st-carousel scrollbar-hide" ref={carouselRef}>
                  {groups.map((g, i) => (
                    <article
                      key={g.id}
                      className="card"
                      style={{ ["--i"]: String(i) }}
                    >
                      <div className="card-media">
                        <img
                          src={g.imageUrl}
                          alt={g.title}
                          className="card-img"
                        />
                        <div className="card-badge">{g.category}</div>
                        <div className="card-overlay" />
                      </div>

                      <div className="card-body">
                        <div className="card-stars" aria-hidden="true">
                          {Array.from({ length: 5 }).map((_, s) => (
                            <svg
                              className="star"
                              key={s}
                              viewBox="0 0 24 24"
                              fill="#F59E0B"
                              width="14"
                              height="14"
                            >
                              <path d="M12 .587l3.668 7.431L23.5 9.75l-5.666 5.523L19.334 24 12 19.897 4.666 24l1.5-8.727L.5 9.75l7.832-1.732L12 .587z" />
                            </svg>
                          ))}
                        </div>
                        <h3 className="card-title">{g.title}</h3>
                        <p className="card-desc text-gray-600">
                          {g.description}
                        </p>

                        <div className="card-actions">
                          <CTAButton
                            href="#"
                            label="Start Now"
                            textColor="text-[hsl(var(--accent))]"
                            hoverTextColor="text-[hsl(var(--primary))]"
                          />
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>

            {/* Right image (on mobile this will be shown above via ordering) */}
            <div className="wce-right" ref={rightRef}>
              <div className="st-photo">
                <img
                  src="/images/student-portrait.jpg"
                  alt="Who can enroll"
                  className="st-photo-img"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

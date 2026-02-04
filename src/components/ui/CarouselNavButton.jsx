import React from "react";

// Reusable carousel nav button that accepts tailwind-style classes for
// background, border, icon color and hover variants.
export default function CarouselNavButton({
  onClick,
  ariaLabel = "Navigate",
  direction = "prev", // 'prev' or 'next'
  bgClass = "bg-white",
  /*
    bgHoverClass: EXPECTS a full class string including state (e.g. "hover:bg-[hsl(var(--accent))]")
    This ensures Tailwind picks up the class at build time.
  */
  bgHoverClass = "",
  borderClass = "border-2 border-[#e5e7eb]",
  /*
    borderHoverClass: full class string including state (e.g. "hover:border-[hsl(var(--accent))]")
  */
  borderHoverClass = "",
  iconColorClass = "text-[#111]",
  /*
    iconHoverColorClass: full class string including state (e.g. "group-hover:text-[hsl(var(--accent))]")
  */
  iconHoverColorClass = "",
  className = "",
}) {
  // Compose classes directly. Hover/state classes MUST be passed as full classes
  // (e.g. "hover:bg-..." or "group-hover:text-...") so Tailwind JIT can detect them.
  const composedButtonClass = `inline-flex items-center justify-center w-10 h-10 rounded-full transition-transform duration-150 group ${bgClass} ${bgHoverClass || ""} ${borderClass} ${borderHoverClass || ""} ${className}`;

  const iconClass = `w-4 h-4 stroke-current ${iconColorClass} ${iconHoverColorClass || ""}`;

  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel}
      className={composedButtonClass}
    >
      {direction === "prev" ? (
        <svg
          className={iconClass}
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M15 18l-6-6 6-6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : (
        <svg
          className={iconClass}
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M9 6l6 6-6 6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </button>
  );
}

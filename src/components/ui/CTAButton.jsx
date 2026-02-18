import { GiPentarrowsTornado } from "react-icons/gi";

/**
 * Reusable CTA Button
 * Props:
 * - href: link target
 * - label: button text
 * - textColor: Tailwind class for text color (e.g. "text-white")
 * - hoverTextColor: Tailwind class (without variant) to apply on hover (e.g. "text-accent or text-blue-500"). This will be prefixed with `group-hover:`
 * - className: extra classes for the anchor
 * - arrowClassName: extra classes for the arrow span
 * - borderClass: optional Tailwind class to override the button border color (e.g. "border-[hsl(var(--primary))]")
 * - iconBgClass: optional Tailwind class to override the arrow background color (e.g. "bg-[hsl(var(--primary))]")
 * - iconColorClass: optional Tailwind class to override the arrow icon color (e.g. "text-[hsl(var(--accent-foreground))]")
 */
const CTAButton = ({
  href = "#",
  label = "LEARN MORE",
  textColor = "text-white",
  hoverTextColor = "",
  className = "",
  arrowClassName = "",
  borderClass = "",
  iconBgClass = "",
  iconColorClass = "",
  /**
   * bgHoverClass: full hover class string, e.g. "hover:bg-[hsl(var(--primary))]"
   */
  bgHoverClass = "",
  /**
   * borderHoverClass: full hover class string for border, e.g. "hover:border-[hsl(var(--primary))]"
   */
  borderHoverClass = "",
  /**
   * textHoverClass: full hover class string for text, e.g. "group-hover:text-[hsl(var(--accent-foreground))]"
   * Backwards-compatible: if `textHoverClass` is not provided, `hoverTextColor` will be used
   */
  textHoverClass = "",
}) => {
  // support older `hoverTextColor` prop (value without `group-hover:`) for convenience
  const generatedHoverText = hoverTextColor
    ? `group-hover:${hoverTextColor}`
    : "";
  const hoverClass = textHoverClass || generatedHoverText;

  return (
    <a
      href={href}
      className={`cta-button group inline-flex items-center gap-3 ${borderClass} ${borderHoverClass} ${className} ${bgHoverClass}`}
    >
      <span
        className={`transition-colors duration-200 ${textColor} ${hoverClass}`}
      >
        {label}
      </span>
      <span
        className={`cta-arrow group-hover:translate-x-3 group-hover:rotate-670 transition-transform ${iconBgClass} ${iconColorClass} ${arrowClassName}`}
      >
        <GiPentarrowsTornado className="w-4 h-4" />
      </span>
    </a>
  );
};

export default CTAButton;

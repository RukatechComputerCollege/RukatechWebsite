import { GiSupersonicArrow } from "react-icons/gi";

/**
 * Reusable CTA Button
 * Props:
 * - href: link target
 * - label: button text
 * - textColor: Tailwind class for text color (e.g. "text-white")
 * - hoverTextColor: Tailwind class (without variant) to apply on hover (e.g. "text-accent or text-blue-500"). The component will prefix it with `group-hover:`
 * - className: extra classes for the anchor
 * - arrowClassName: extra classes for the arrow span
 */
const CTAButton = ({
  href = "#",
  label = "LEARN MORE",
  textColor = "text-white",
  hoverTextColor = "",
  className = "",
  arrowClassName = "",
}) => {
  const hoverClass = hoverTextColor ? `group-hover:${hoverTextColor}` : "";

  return (
    <a
      href={href}
      className={`cta-button group inline-flex items-center gap-3 ${className}`}
    >
      <span
        className={`transition-colors duration-200 ${textColor} ${hoverClass}`}
      >
        {label}
      </span>
      <span
        className={`cta-arrow group-hover:translate-x-3 group-hover:rotate-670 transition-transform ${arrowClassName}`}
      >
        <GiSupersonicArrow className="w-4 h-4" />
      </span>
    </a>
  );
};

export default CTAButton;

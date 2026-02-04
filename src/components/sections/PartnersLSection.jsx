import LogoLoop from "../ui/PartnersLoop";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
} from "react-icons/si";

const techLogos = [
  {
    node: <SiReact className="w-12 h-12 text-[hsl(var(--primary))]" />,
    title: "React",
    href: "https://react.dev",
  },
  {
    node: <SiNextdotjs className="w-12 h-12 text-[hsl(var(--primary))]" />,
    title: "Next.js",
    href: "https://nextjs.org",
  },
  {
    node: <SiTypescript className="w-12 h-12 text-[hsl(var(--primary))]" />,
    title: "TypeScript",
    href: "https://www.typescriptlang.org",
  },
  {
    node: <SiTailwindcss className="w-12 h-12 text-[hsl(var(--primary))]" />,
    title: "Tailwind CSS",
    href: "https://tailwindcss.com",
  },
];

// Alternative with image sources
const imageLogos = [
  {
    src: "/logos/company1.png",
    alt: "Company 1",
    href: "https://company1.com",
  },
  {
    src: "/logos/company2.png",
    alt: "Company 2",
    href: "https://company2.com",
  },
  {
    src: "/logos/company3.png",
    alt: "Company 3",
    href: "https://company3.com",
  },
];

function PartnersLSection() {
  return (
    <section className="py-12 bg-gray-900 text-center">
      <div className="container mx-auto px-4">
        <h3 className="text-sm text-gray-400 uppercase tracking-wide mb-6">
          Trusted by
        </h3>
        <div className="relative" style={{ height: "60px" }}>
          <LogoLoop
            logos={techLogos}
            speed={100}
            direction="left"
            logoHeight={60}
            gap={64}
            hoverSpeed={0}
            scaleOnHover
            fadeOut
            fadeOutColor="#111827"
            ariaLabel="Technology partners"
          />
        </div>
      </div>
    </section>
  );
}

export default PartnersLSection;

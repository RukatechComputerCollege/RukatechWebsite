import React from "react";
import StatCard from "../ui/StatCard";
import { GraduationCap, Users, UserCheck, BookOpen } from "lucide-react";

const stats = [
  { icon: GraduationCap, value: 100000, label: "Learners Served", suffix: "+" },
  { icon: Users, value: 45000, label: "Adults Served", suffix: "+" },
  { icon: UserCheck, value: 55000, label: "Teenagers Served", suffix: "+" },
  { icon: BookOpen, value: 150, label: "Courses Available", suffix: "+" },
];

const StatsSection = () => {
  return (
    <section className="stats-section">
      {/* Background decorative elements */}
      <div className="stats-bg-pattern" />

      {/* Wave connector SVG for desktop */}
      <svg
        className="stats-wave-connector"
        viewBox="0 0 1200 200"
        preserveAspectRatio="none"
      >
        <path
          d="M0,100 C150,150 300,50 450,100 C600,150 750,50 900,100 C1050,150 1200,50 1350,100"
          fill="none"
          stroke="url(#waveGradient)"
          strokeWidth="2"
          strokeDasharray="8,8"
          className="animate-dash"
        />
        <defs>
          <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop
              offset="0%"
              stopColor="hsl(var(--primary))"
              stopOpacity="0.3"
            />
            <stop
              offset="50%"
              stopColor="hsl(var(--primary))"
              stopOpacity="0.8"
            />
            <stop
              offset="100%"
              stopColor="hsl(var(--primary))"
              stopOpacity="0.3"
            />
          </linearGradient>
        </defs>
      </svg>

      {/* Floating circles decoration */}
      <div className="stats-floating-circles">
        <div className="floating-circle floating-circle-1" />
        <div className="floating-circle floating-circle-2" />
        <div className="floating-circle floating-circle-3" />
      </div>

      <div className="container mx-auto px-4">


        {/* Stats Grid with Wave Layout */}
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={`stats-grid-item stats-grid-item-${index + 1}`}
            >
              <StatCard
                icon={stat.icon}
                value={stat.value}
                label={stat.label}
                suffix={stat.suffix}
                delay={index * 150}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;

import React, { useState, useEffect, useRef } from "react";

const useCountUp = ({ end, duration = 2000, start = 0, suffix = "" }) => {
  const [count, setCount] = useState(start);
  const [isInView, setIsInView] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setIsInView(true);
          setHasAnimated(true);
        }
      },
      { threshold: 0.3 },
    );
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => observer.disconnect();
  }, [hasAnimated]);

  useEffect(() => {
    if (!isInView) return;
    let startTime;
    let animationFrame;
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = Math.floor(easeOutQuart * (end - start) + start);
      setCount(currentCount);
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };
    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [isInView, end, start, duration]);

  const reset = () => {
    setCount(start);
    setHasAnimated(false);
    setIsInView(false);
  };

  const formattedCount = () => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M${suffix}`;
    }
    if (count >= 1000) {
      return `${(count / 1000).toFixed(count >= 10000 ? 0 : 1)}K${suffix}`;
    }
    return `${count.toLocaleString()}${suffix}`;
  };

  return { count, formattedCount: formattedCount(), ref, reset, isInView };
};

const StatCard = ({
  icon: Icon,
  value,
  label,
  suffix = "+",
  delay = 0,
  className,
}) => {
  const { formattedCount, ref, isInView } = useCountUp({
    end: value,
    duration: 2500 + delay,
    suffix,
  });

  return (
    <div
      ref={ref}
      className={`stat-card group ${isInView ? "animate-fade-in" : ""} ${className || ""}`}
      style={{
        animationDelay: `${delay}ms`,
        opacity: isInView ? 1 : 0,
      }}
    >
      {/* Icon Container */}
      <div className="stat-icon-wrapper">
        <div className="stat-icon-ring" />
        <div className="stat-icon-bg">
          <Icon className="stat-icon" />
        </div>
      </div>

      {/* Content */}
      <div className="stat-content">
        <span className="stat-number">{formattedCount}</span>
        <span className="stat-label">{label}</span>
      </div>

      {/* Decorative bottom accent */}
      <div className="stat-accent" />
    </div>
  );
};

export default StatCard;

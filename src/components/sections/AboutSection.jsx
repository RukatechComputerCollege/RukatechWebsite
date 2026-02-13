import * as React from "react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Calendar,
  Star,
  TrendingUp,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import { BarChart, Bar, XAxis, ResponsiveContainer, Cell } from "recharts";
import * as DialogPrimitive from "@radix-ui/react-dialog";
// import * as LabelPrimitive from "@radix-ui/react-label";
import { Slot } from "@radix-ui/react-slot";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * STANDALONE UTILS
 */
function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/**
 * STANDALONE UI COMPONENTS (Consolidated shadcn primitives)
 */

// --- Button ---
const Button = React.forwardRef(
  (
    {
      className,
      variant = "default",
      size = "default",
      asChild = false,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";
    const variants = {
      default: "bg-violet-600 text-white shadow hover:bg-violet-700",
      outline:
        "border border-slate-200 bg-transparent hover:bg-slate-50 hover:text-slate-900",
      ghost: "hover:bg-slate-100 hover:text-slate-900",
    };
    const sizes = {
      default: "h-9 px-4 py-2",
      lg: "h-11 rounded-md px-8",
      icon: "h-9 w-9",
    };
    return (
      <Comp
        className={cn(
          "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:pointer-events-none disabled:opacity-50",
          variants[variant],
          sizes[size],
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);

// --- Card ---
const Card = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-xl border border-slate-200 bg-white text-slate-950 shadow-sm",
      className,
    )}
    {...props}
  />
));

// --- Input & Textarea ---
const Input = React.forwardRef(({ className, type, ...props }, ref) => (
  <input
    type={type}
    className={cn(
      "flex h-9 w-full rounded-md border border-slate-200 bg-white px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:cursor-not-allowed disabled:opacity-50",
      className,
    )}
    ref={ref}
    {...props}
  />
));

const Textarea = React.forwardRef(({ className, ...props }, ref) => (
  <textarea
    className={cn(
      "flex min-h-15 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:cursor-not-allowed disabled:opacity-50",
      className,
    )}
    ref={ref}
    {...props}
  />
));

// --- Dialog ---
const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogPortal = DialogPrimitive.Portal;
const DialogOverlay = React.forwardRef(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className,
    )}
    {...props}
  />
));
const DialogContent = React.forwardRef(
  ({ className, children, ...props }, ref) => (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Content
        ref={ref}
        className={cn(
          "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border border-slate-200 bg-white p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
          className,
        )}
        {...props}
      >
        {children}
        <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 disabled:pointer-events-none">
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPortal>
  ),
);
const DialogHeader = ({ className, ...props }) => (
  <div
    className={cn(
      "flex flex-col space-y-1.5 text-center sm:text-left",
      className,
    )}
    {...props}
  />
);
const DialogTitle = React.forwardRef(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-none tracking-tight",
      className,
    )}
    {...props}
  />
));

/**
 * DATA MODELS & CONSTANTS
 */

const images = [
  {
    url: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1200",
    alt: "Happy Patient",
    badges: [],
  },
  {
    url: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=1200",
    alt: "Pediatric Care",
    badges: [
      { type: "response", text: "100% Fast", icon: CheckCircle2 },
      { type: "feedback", text: "98% Satisfied", icon: Star },
    ],
  },
  {
    url: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=1200",
    alt: "Specialist Doctor",
    badges: [],
  },
  {
    url: "https://images.unsplash.com/photo-1581056771107-24ca5f033842?auto=format&fit=crop&q=80&w=1200",
    alt: "Medical Consultation",
    badges: [],
  },
];

const chartData = [
  { name: "Alex", value: 65 },
  { name: "Hamil", value: 85 },
  { name: "Jenny", value: 45 },
  { name: "Mathie", value: 70 },
];

/**
 * COMPONENT LOGIC
 */
function ContactForm({ onSuccess }) {
  return (
    <form className="space-y-4 pt-4">
      <div className="space-y-2">
        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          Email
        </label>
        <input
          type="email"
          placeholder="hello@example.com"
          className={cn(
            "flex h-9 w-full rounded-md border border-slate-200 bg-white px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:cursor-not-allowed disabled:opacity-50",
          )}
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          Message
        </label>
        <textarea
          placeholder="How can we help you?"
          className={cn(
            "flex min-h-15 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:cursor-not-allowed disabled:opacity-50",
          )}
        />
      </div>
      <Button type="button" className="w-full">
        Send Message
      </Button>
    </form>
  );
}

export default function AboutSection() {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const getVisibleIndices = () => {
    const prev = (activeIndex - 1 + images.length) % images.length;
    const next = (activeIndex + 1) % images.length;
    return [prev, activeIndex, next];
  };

  const visibleIndices = getVisibleIndices();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <div className="w-full bg-white py-16 lg:py-24 overflow-hidden font-sans text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* SECTION HEADER TAG */}
        <motion.div
          className="flex items-center justify-center gap-4 mb-8"
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="h-0.5 w-16 relative overflow-hidden bg-slate-100 rounded-full"
            initial={{ opacity: 0.5 }}
            animate={{
              background: [
                "linear-gradient(90deg, #f1f5f9 0%, #7c3aed 50%, #f1f5f9 100%)",
                "linear-gradient(90deg, #f1f5f9 50%, #7c3aed 100%, #f1f5f9 0%)",
                "linear-gradient(90deg, #f1f5f9 100%, #7c3aed 0%, #f1f5f9 50%)",
              ],
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <motion.div
              className="absolute inset-0 bg-linear-to-r from-transparent via-violet-500 to-transparent w-full"
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            />
          </motion.div>

          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-slate-100 bg-white shadow-sm">
            <div className="w-1.5 h-1.5 rounded-full bg-violet-600 shadow-[0_0_8px_rgba(124,58,237,0.6)]" />
            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">
              About Us
            </span>
          </div>

          <motion.div
            className="h-0.5 w-16 relative overflow-hidden bg-slate-100 rounded-full"
            initial={{ opacity: 0.5 }}
            animate={{
              background: [
                "linear-gradient(90deg, #f1f5f9 100%, #7c3aed 0%, #f1f5f9 50%)",
                "linear-gradient(90deg, #f1f5f9 50%, #7c3aed 100%, #f1f5f9 0%)",
                "linear-gradient(90deg, #f1f5f9 0%, #7c3aed 50%, #f1f5f9 100%)",
              ],
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <motion.div
              className="absolute inset-0 bg-linear-to-r from-transparent via-violet-500 to-transparent w-full"
              animate={{ x: ["100%", "-100%"] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            />
          </motion.div>
        </motion.div>

        {/* HERO SECTION */}
        <motion.div
          className="max-w-6xl mx-auto mb-20 px-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 leading-[1.05] text-slate-900">
              Architecting the{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-violet-600 to-indigo-600">
                Future of Care
              </span>
            </h1>
            <p className="text-xl text-slate-500 max-w-3xl mx-auto leading-relaxed">
              We are a collective of medical visionaries and technology
              pioneers, redefining the boundaries of what's possible in modern
              healthcare.
            </p>
          </motion.div>

          {/* DREAM, PRESENT, FUTURE PILLARS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {[
              {
                title: "The Dream",
                desc: "A world where high-quality healthcare is a seamless, intuitive experience for every human being.",
                icon: Star,
                color: "bg-blue-500/10 text-blue-600",
                border: "border-blue-200/50 shadow-blue-500/5",
                delay: 0,
              },
              {
                title: "The Present",
                desc: "Delivering world-class expertise through compassionate care and cutting-edge medical precision.",
                icon: CheckCircle2,
                color: "bg-violet-500/10 text-violet-600",
                border: "border-violet-200/50 shadow-violet-500/5",
                delay: 0.2,
              },
              {
                title: "The Future",
                desc: "Pioneering AI-driven diagnostics and personalized wellness protocols for proactive longevity.",
                icon: TrendingUp,
                color: "bg-indigo-500/10 text-indigo-600",
                border: "border-indigo-200/50 shadow-indigo-500/5",
                delay: 0.4,
              },
            ].map((pillar, idx) => (
              <motion.div
                key={pillar.title}
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: pillar.delay,
                }}
                whileHover={{
                  scale: 1.05,
                  rotate: [0, -1, 1, 0],
                  transition: { duration: 0.3 },
                }}
                className={cn(
                  "p-8 rounded-[2.5rem] border bg-white/40 backdrop-blur-xl shadow-xl transition-all duration-500 hover:shadow-2xl hover:bg-white/60 group relative overflow-hidden",
                  pillar.border,
                )}
              >
                {/* Floating Glow Effect */}
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-linear-to-br from-white/20 to-transparent rounded-full blur-3xl group-hover:bg-white/40 transition-colors duration-500" />

                <div
                  className={cn(
                    "w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-inner relative z-10",
                    pillar.color,
                  )}
                >
                  <pillar.icon className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-slate-900 relative z-10">
                  {pillar.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed relative z-10 font-medium">
                  {pillar.desc}
                </p>

                {/* Interactive Bottom Accent */}
                <div className="absolute bottom-0 left-0 h-1.5 bg-linear-to-r from-transparent via-current to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 w-full" />
              </motion.div>
            ))}
          </div>

          {/* UNIQUE CTA AREA */}
          <motion.div
            variants={itemVariants}
            className="relative p-1 rounded-[2.5rem] bg-linear-to-r from-violet-600 via-indigo-600 to-violet-600 animate-gradient-x overflow-hidden shadow-2xl shadow-violet-200"
          >
            <div className="bg-white rounded-[2.3rem] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
              <div className="max-w-xl text-center md:text-left">
                <h2 className="text-3xl font-bold mb-4 text-slate-900">
                  Ready to begin your journey?
                </h2>
                <p className="text-slate-500">
                  Connect with our team today to explore how we can personalize
                  your path to peak wellness.
                </p>
              </div>

              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <Button
                    size="lg"
                    className="rounded-full px-10 py-7 text-lg bg-slate-900 hover:bg-black text-white shadow-xl transition-all hover:scale-105 active:scale-95 group shrink-0"
                  >
                    Get Started
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Start Your Journey</DialogTitle>
                  </DialogHeader>
                  <ContactForm onSuccess={() => setOpen(false)} />
                </DialogContent>
              </Dialog>
            </div>

            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
              <div className="absolute top-[-50%] left-[-10%] w-[40%] h-full bg-violet-100/30 rounded-full blur-[100px]" />
              <div className="absolute bottom-[-50%] right-[-10%] w-[40%] h-full bg-indigo-100/30 rounded-full blur-[100px]" />
            </div>
          </motion.div>
        </motion.div>

        {/* INFINITE SLIDER SECTION */}
        <div className="relative mb-32 h-100 md:h-125">
          <div className="flex h-full gap-4 items-center">
            {visibleIndices.map((idx, position) => {
              const image = images[idx];
              const isActive = position === 1;

              return (
                <motion.div
                  key={`${idx}-${position}`}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    width: isActive ? "60%" : "20%",
                  }}
                  transition={{
                    duration: 0.8,
                    ease: [0.32, 0.72, 0, 1],
                  }}
                  className="relative h-full overflow-hidden rounded-[2.5rem] group shadow-xl"
                >
                  <img
                    src={image.url}
                    alt={image.alt}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {!isActive && (
                    <div className="absolute inset-0 bg-white/20 backdrop-blur-[2px] transition-opacity duration-500" />
                  )}

                  {isActive && image.badges.length > 0 && (
                    <>
                      {image.badges.map((badge, bIdx) => {
                        const Icon = badge.icon;
                        const isTop = badge.type === "response";
                        return (
                          <motion.div
                            key={bIdx}
                            initial={{ opacity: 0, x: isTop ? -20 : 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 }}
                            className={`absolute ${isTop ? "top-8 left-8" : "bottom-8 right-8"} bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl shadow-xl flex items-center gap-3 z-10`}
                          >
                            <div
                              className={`${isTop ? "bg-green-100" : "bg-yellow-100"} p-2 rounded-full`}
                            >
                              <Icon
                                className={`w-5 h-5 ${isTop ? "text-green-600" : "text-yellow-600 fill-yellow-600"}`}
                              />
                            </div>
                            <div>
                              <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">
                                {badge.type}
                              </p>
                              <p className="text-sm font-bold text-slate-900">
                                {badge.text}
                              </p>
                            </div>
                          </motion.div>
                        );
                      })}
                    </>
                  )}

                  {isActive && (
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                      <div className="w-20 h-20 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/50">
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ repeat: Infinity, duration: 2 }}
                          className="w-2 h-2 bg-white rounded-full"
                        />
                      </div>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Navigation Controls */}
          <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-4">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full"
              onClick={() =>
                setActiveIndex(
                  (current) => (current - 1 + images.length) % images.length,
                )
              }
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <div className="flex gap-2">
              {images.map((_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${i === activeIndex ? "w-6 bg-violet-600" : "bg-slate-200"}`}
                />
              ))}
            </div>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full"
              onClick={() =>
                setActiveIndex((current) => (current + 1) % images.length)
              }
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* FEATURES GRID SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Column 1: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-center h-full space-y-6"
          >
            <h2 className="text-3xl font-bold leading-tight">
              Your Trusted Healthcare Providers
            </h2>
            <p className="text-slate-500 leading-relaxed">
              We combine advanced medical technology with human-centric care.
              Our team of specialists is dedicated to your long-term health and
              wellness journey.
            </p>
            <Button
              variant="outline"
              className="w-fit rounded-full px-6 py-5 group transition-colors"
            >
              Make a schedule
              <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </motion.div>

          {/* Column 2: Service Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="p-8 rounded-4xl bg-linear-to-br from-violet-600 to-indigo-700 text-white border-0 shadow-2xl shadow-violet-900/20 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-white/10 transition-colors" />

              <div className="relative z-10">
                <div className="mb-8">
                  <h3 className="text-2xl font-bold mb-2">
                    Very fast and accurate service
                  </h3>
                  <p className="text-violet-100 opacity-90">
                    Experience healthcare without the wait. Precision in every
                    diagnosis.
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 transform transition-transform group-hover:-translate-y-2">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-orange-600" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">
                        Appointment
                      </p>
                      <p className="text-xs text-violet-200">Today, 09:30 AM</p>
                    </div>
                  </div>
                  <div className="flex -space-x-2 mb-2">
                    <div className="w-8 h-8 rounded-full bg-slate-200 border-2 border-indigo-600" />
                    <div className="w-8 h-8 rounded-full bg-slate-300 border-2 border-indigo-600" />
                    <div className="w-8 h-8 rounded-full bg-slate-400 border-2 border-indigo-600 flex items-center justify-center text-[10px] font-bold text-slate-700">
                      +3
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Column 3: Analytics Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="p-8 rounded-4xl bg-white border-slate-100 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-slate-200/60 transition-all duration-300">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">
                    Analysis your physical performance
                  </h3>
                  <p className="text-sm text-slate-400 mt-1">
                    Weekly progress report
                  </p>
                </div>
                <div className="bg-violet-50 p-2 rounded-xl">
                  <TrendingUp className="w-6 h-6 text-violet-600" />
                </div>
              </div>

              <div className="h-50 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={chartData}
                    margin={{ top: 10, right: 0, left: -25, bottom: 0 }}
                  >
                    <XAxis
                      dataKey="name"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "#94a3b8", fontSize: 12 }}
                      dy={10}
                    />
                    <Bar dataKey="value" radius={[6, 6, 6, 6]} barSize={40}>
                      {chartData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={index === 1 ? "#7c3aed" : "#e2e8f0"}
                          className="transition-all duration-300 hover:opacity-80 cursor-pointer"
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

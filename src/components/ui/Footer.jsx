import React, { useState, forwardRef } from "react";
import { motion } from "framer-motion";
import {
  FaLinkedinIn,
  FaStar,
  FaAward,
  FaFacebook,
  FaInstagram,
} from "react-icons/fa";

const floatAnimation = {
  animate: {
    y: [0, -15, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const FloatingBadges = () => {
  return (
    <>
      {/* Left Decorative Area (Desktop) */}
      <div className="absolute left-0 top-40 bottom-0 w-1/4">
        <motion.div
          variants={floatAnimation}
          animate="animate"
          className="absolute top-50 right-0 w-32 h-64 rounded-full bg-linear-to-b from-white/20 to-white/5 backdrop-blur-md border border-white/10 shadow-xl transform -rotate-12"
        >
          <div className="absolute inset-0 bg-linear-to-tr from-transparent via-white/10 to-transparent rounded-full" />
        </motion.div>

        <motion.div
          animate={{
            y: [0, 20, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute top-80 left-53 w-24 h-24 rounded-full bg-linear-to-br from-white/20 to-white/5 shadow-lg border border-white/20"
        />

        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-20 right-10 w-16 h-16 rounded-full bg-white blur-xl opacity-60"
        />
      </div>

      {/* Right Decorative Area (Desktop) */}
      <div className="absolute right-0 top-0 bottom-0 w-1/4">
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
          className="absolute top-40 right-5 md:right-50 bg-[hsl(var(--accent))] backdrop-blur-md rounded-full px-3 py-2 md:p-4 bg-linear-to-b from-white/20 to-white/5 shadow-xl flex items-center gap-3 pr-6 min-w-24"
        >
          <div className="bg-[hsl(var(--accent))] p-2 rounded-full text-[hsl(var(--primary))]">
            <FaStar />
          </div>
          <div>
            <div className="text-xs text-[hsl(var(--primary))] font-bold uppercase tracking-wider">
              Rating
            </div>
            <div className="text-sm font-bold text-[hsl(var(--primary))]">
              <span className="whitespace-nowrap">5.0 Stars</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          animate={{ y: [0, -15, 0] }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.2,
          }}
          className="absolute bottom-32 right-10 bg-[hsl(var(--accent))] backdrop-blur-md rounded-full p-3 md:p-4 bg-linear-to-b from-white/20 to-white/5 shadow-xl flex items-center gap-3 pr-6"
        >
          <div className="bg-[hsl(var(--primary))] p-2 rounded-full text-[hsl(var(--accent))]">
            <FaAward />
          </div>
          <div>
            <div className="text-xs text-[hsl(var(--primary))] font-bold uppercase tracking-wider">
              Award
            </div>
            <div className="text-sm whitespace-nowrap font-bold text-[hsl(var(--primary))]">
              Top Agency
            </div>
          </div>
        </motion.div>

        <motion.div
          animate={{ y: [0, -8, 0], x: [0, 5, 0] }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute top-20 lg:top-1/2 right-80 bg-[hsl(var(--accent))] backdrop-blur-md from-white/20 to-white/5 rounded-full w-14 h-14 shadow-xl flex items-center justify-center text-[hsl(var(--primary))] text-2xl"
        >
          <FaLinkedinIn />
        </motion.div>

        <motion.div
          animate={{ y: [0, -8, 0], x: [0, 5, 0] }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute top-20 lg:top-1/2 right-55 bg-[hsl(var(--accent))] backdrop-blur-md from-white/20 to-white/5 rounded-full w-14 h-14 shadow-xl flex items-center justify-center text-[hsl(var(--primary))] text-2xl"
        >
          <FaInstagram />
        </motion.div>

        <motion.div
          animate={{ y: [0, -8, 0], x: [0, 5, 0] }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute top-20 lg:top-1/2 right-30 bg-[hsl(var(--accent))] backdrop-blur-md from-white/20 to-white/5 rounded-full w-14 h-14 shadow-xl flex items-center justify-center text-[hsl(var(--primary))] text-2xl"
        >
          <FaFacebook />
        </motion.div>
      </div>
    </>
  );
};

const Footer = forwardRef((_, ref) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", { phoneNumber, email });
    // Add your form submission logic here
  };

  const footerLinks = [
    { label: "Home", href: "#" },
    { label: "About Us", href: "#" },
    { label: "Courses", href: "#" },
    { label: "Contact Us", href: "#" },
    { label: "Portal", href: "#" },
  ];

  const legalLinks = [
    { label: "Terms & Conditions", href: "#" },
    { label: "Privacy Policy", href: "#" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <footer
      ref={ref}
      className="relative footer-curve w-full bottom-0 top-0 left-0 right-0 h-190 md:h-190 max-h-screen overflow-hidden bg-[hsl(var(--accent))] flex flex-col"
    >
      {/* Floating Badges */}
      <FloatingBadges />

      {/* CTA Section */}
      <motion.div
        className="relative z-10 px-6 pt-16 pb-8 flex-1 flex flex-col justify-center"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            variants={itemVariants}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Get Your Tech
            <br />
            Journey Started.
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-white/90 text-base md:text-lg mb-6 max-w-2xl mx-auto leading-relaxed"
          >
            Ready to grow your investor base, mobilize existing investors, or
            build your personal brand?
          </motion.p>

          <motion.form
            variants={itemVariants}
            onSubmit={handleSubmit}
            className="flex flex-col gap-3 max-w-lg mx-auto"
          >
            <motion.input
              whileFocus={{ scale: 1.02 }}
              type="tel"
              placeholder="Your Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full px-5 py-3 rounded-xl bg-[hsl(var(--primary))] text-gray-800 placeholder:text-gray-400 text-base focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-300"
            />

            <div className="relative">
              <motion.input
                whileFocus={{ scale: 1.02 }}
                type="email"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-5 py-3 pr-28 rounded-xl bg-[hsl(var(--primary))] text-gray-800 placeholder:text-gray-400 text-base focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-300"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2 bg-[hsl(var(--accent))] text-white font-semibold rounded-lg hover:bg-[hsl(var(--accent)/90%)] transition-colors duration-300"
              >
                Next
              </motion.button>
            </div>
          </motion.form>
        </div>
      </motion.div>

      {/* Bottom Footer */}
      <motion.div
        className="relative z-10 px-6 py-4 border-t border-white/10 mt-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            {/* Left Side - Logo and Copyright */}
            <div className="flex flex-col gap-2">
              <motion.div
                className="flex items-center gap-2"
                whileHover={{ scale: 1.02 }}
              >
                <img
                  src="/images/logo.png"
                  alt="Rukatech Logo"
                  className="w-10 h-10"
                />
                <span className="text-white text-xl font-bold tracking-tight">
                  Rukatech
                </span>
              </motion.div>
              <div className="text-white/70 text-xs">
                <p>Rukatech 2026. All rights reserved</p>
                {/* <p>
                  Designed by{" "}
                  <span className="text-white font-medium">
                    Black Peak Creative
                  </span>
                </p> */}
              </div>
            </div>

            {/* Right Side - Social, Badges, and Links */}
            <div className="flex flex-col items-start lg:items-end gap-3">
              <div className="flex items-center gap-3">
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-white hover:text-white/80 transition-colors"
                >
                  <FaLinkedinIn className="w-5 h-5" />
                </motion.a>

                {[1, 2, 3].map((badge) => (
                  <motion.div
                    key={badge}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center"
                  >
                    <div className="text-center text-white text-[6px] leading-tight font-semibold">
                      <span className="text-[5px] block">BEST</span>
                      <span className="block">
                        {badge === 1 ? "UX" : badge === 2 ? "UI" : "INNOVATION"}
                      </span>
                      <span className="text-[4px] block">CSSDA</span>
                    </div>
                  </motion.div>
                ))}
              </div>

              <nav className="flex flex-wrap gap-x-6 gap-y-1">
                {footerLinks.map((link) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    whileHover={{ scale: 1.05 }}
                    className="text-white font-medium hover:text-white/80 transition-colors text-xs"
                  >
                    {link.label}
                  </motion.a>
                ))}
              </nav>

              <nav className="flex flex-wrap gap-x-6 gap-y-1">
                {legalLinks.map((link) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    whileHover={{ scale: 1.05 }}
                    className="text-white/70 hover:text-white transition-colors text-xs"
                  >
                    {link.label}
                  </motion.a>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </motion.div>
    </footer>
  );
});

Footer.displayName = "Footer";

export default Footer;

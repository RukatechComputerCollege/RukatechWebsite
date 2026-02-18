import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { MdKeyboardArrowDown } from "react-icons/md";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const programs = [
    { name: "Front End Development", to: "/frontend" },
    { name: "Backend Development", to: "/backend" },
    { name: "Full Stack Development", to: "/fullstack" },
    { name: "Graphics Design", to: "/graphics-design" },
    { name: "UI/UX Design", to: "/ui-ux-design" },
    { name: "Programming", to: "/programming" },
    { name: "Cloud Computing", to: "/cloud-computing" },
    { name: "Data Science", to: "/data-science" },
  ];

  const isAnyProgramActive = programs.some((prog) =>
    location.pathname.startsWith(prog.to),
  );

  const navLinks = [
    { name: "HOME", to: "/", active: true },
    { name: "ABOUT US", to: "/about" },
    { name: "PROGRAMS", to: "#", hasDropdown: true },
    { name: "CONTACT US", to: "/contact" },
    { name: "STUDENT PORTAL", to: "/student-portal" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 lg:pl-26 right-0 z-40 navbar-border transition-all duration-300 ${
        isScrolled
          ? "bg-black/20 backdrop-blur-xl border-b border-white/20"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="container mx-auto lg:px-12">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              <img
                src="images/logo.png"
                alt="Rukatech Logo"
                className="w-10 h-10 object-contain"
              />
              <div className="ml-2">
                <span className="text-[hsl(var(--primary))] font-bold text-sm lg:text-lg tracking-tight">
                  RUKATECH COMPUTER COLLEGE
                </span>
                <span className="block text-gray-400 text-sm lg:text-medium font-medium -mt-1">
                  Learn What Earns
                </span>
              </div>
            </div>
          </div>

          {/* Navigation Links (visible from large screens only) */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <div key={link.name} className="relative group">
                {link.hasDropdown ? (
                  <button
                    onMouseEnter={() => setDropdownOpen(true)}
                    onMouseLeave={() => setDropdownOpen(false)}
                    className={`nav-link flex items-center gap-1 ${
                      isAnyProgramActive ? "nav-link-active" : ""
                    }`}
                  >
                    {link.name}
                    <MdKeyboardArrowDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
                  </button>
                ) : (
                  <NavLink
                    to={link.to}
                    className={({ isActive }) =>
                      `nav-link flex items-center gap-1 ${
                        isActive ? "nav-link-active" : ""
                      }`
                    }
                  >
                    {link.name}
                  </NavLink>
                )}

                {/* Dropdown Menu for Programs */}
                {link.hasDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={
                      dropdownOpen
                        ? { opacity: 1, y: 0 }
                        : { opacity: 0, y: -10 }
                    }
                    onMouseEnter={() => setDropdownOpen(true)}
                    onMouseLeave={() => setDropdownOpen(false)}
                    className={`absolute left-0 top-full pt-2 transition-all duration-200 ${
                      dropdownOpen
                        ? "opacity-100 visible"
                        : "opacity-0 invisible"
                    }`}
                  >
                    <div className="rounded-lg shadow-xl overflow-hidden p-6 w-max bg-white/5 backdrop-blur-xl border border-slate-700/20">
                      <div className="grid grid-cols-2 gap-6">
                        {programs.map((program, idx) => (
                          <NavLink
                            key={idx}
                            to={program.to}
                            className={({ isActive }) =>
                              `text-sm font-medium transition-colors duration-200 block py-2 ${
                                isActive
                                  ? "text-[hsl(var(--primary))] font-semibold"
                                  : "text-white hover:border-b-2 w-fit border-[hsl(var(--accent))]"
                              }`
                            }
                          >
                            {program.name}
                          </NavLink>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            ))}
          </div>

          {/* Mobile/Tablet Menu Button */}
          <button
            className="lg:hidden text-[hsl(var(--primary))] p-2 rounded-md"
            aria-label="Open menu"
            onClick={() => setOpen(true)}
          >
            <HiOutlineMenu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Mobile Slide-in Panel */}
      <AnimatePresence>
        {open && (
          <>
            {/* Overlay */}
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="fixed inset-0 z-40 bg-black/40"
              onClick={() => setOpen(false)}
            />

            {/* Panel */}
            <motion.aside
              key="panel"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 z-50 h-full w-80 bg-white dark:bg-slate-900 shadow-lg p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <img
                    src="/images/logo.png"
                    alt="Rukatech Logo"
                    className="w-8 h-8 object-contain"
                  />
                  <div>
                    <span className="text-[hsl(var(--primary))] font-bold text-sm tracking-tight">
                      RUKATECH
                    </span>
                    <span className="block text-[hsl(var(--accent))] font-medium -mt-1 text-xs">
                      Learn What Earns
                    </span>
                  </div>
                </div>
                <button
                  aria-label="Close menu"
                  onClick={() => setOpen(false)}
                  className="p-2 rounded-md"
                >
                  <HiOutlineX className="w-6 h-6" />
                </button>
              </div>

              <nav className="flex flex-col gap-4">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.name}
                    initial={{ x: 40, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: 40, opacity: 0 }}
                    transition={{
                      delay: 0.05 * index,
                      type: "spring",
                      stiffness: 200,
                    }}
                  >
                    <NavLink
                      to={link.to}
                      onClick={() => setOpen(false)}
                      className={({ isActive }) =>
                        `text-lg font-semibold tracking-wide ${
                          isActive ? "text-[hsl(var(--primary))]" : ""
                        }`
                      }
                    >
                      {link.name}
                    </NavLink>
                  </motion.div>
                ))}
              </nav>

              <div className="mt-8">
                <NavLink
                  to="/"
                  onClick={() => setOpen(false)}
                  className="inline-block px-4 py-2 bg-[hsl(var(--accent))] text-[hsl(var(--accent-foreground))] rounded-md font-semibold"
                >
                  Get Started
                </NavLink>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;

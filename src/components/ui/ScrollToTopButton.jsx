import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
// import { ChevronUp } from "lucide-react";
import { LiaLocationArrowSolid } from "react-icons/lia";

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 240);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 12 }}
          transition={{ duration: 0.28, ease: "easeOut" }}
          className="fixed right-6 bottom-6 z-50"
        >
          {/* subtle glow behind button */}
          <motion.span
            aria-hidden
            className="absolute inset-0 rounded-full"
            style={{ boxShadow: "0 12px 30px rgba(0,0,0,0.12)" }}
            initial={{ opacity: 0.12, scale: 0.9 }}
            animate={{ opacity: [0.12, 0.18, 0.12], scale: [0.9, 1.05, 0.9] }}
            transition={{ repeat: Infinity, duration: 2.8, ease: "easeInOut" }}
          />

          <motion.button
            onClick={scrollToTop}
            aria-label="Scroll to top"
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.96 }}
            className="relative flex h-12 w-12 items-center justify-center rounded-full bg-[hsl(var(--accent))] text-[hsl(var(--accent-foreground))] shadow-lg ring-1 ring-[hsl(var(--accent)/15%)] transition-colors focus:outline-none"
          >
            <motion.span
              initial={{ y: 0 }}
              animate={{ y: [0, -6, 0] }}
              transition={{
                repeat: Infinity,
                duration: 2.2,
                ease: "easeInOut",
              }}
              className="absolute top-1 left-0 right-0 flex justify-center pointer-events-none"
            >
              <LiaLocationArrowSolid className="h-5 w-5 fill-current" />
            </motion.span>

            {/* decorative ring */}
            <span className="sr-only">Scroll to top</span>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

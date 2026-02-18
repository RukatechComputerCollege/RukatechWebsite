import React from "react";
import { FaLinkedinIn, FaStar, FaAward } from "react-icons/fa";
import { motion } from "framer-motion";

const FloatingBadges = () => {
  return (
    <div>
      {/* Left Decorative Area (Desktop) */}
      <div className="hidden lg:block lg:col-span-3 relative h-full min-h-100">
        {/* 3D Abstract Elements - Simulated with CSS */}
        <motion.div
          animate={floatAnimation}
          className="absolute top-10 right-0 w-32 h-64 rounded-full bg-linear-to-b from-white/20 to-white/5 backdrop-blur-md border border-white/10 shadow-xl transform -rotate-12"
        >
          <div className="absolute inset-0 bg-linear-to-tr from-transparent via-white/10 to-transparent rounded-full" />
        </motion.div>

        <motion.div
          animate={{
            y: [0, 20, 0],
            transition: {
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            },
          }}
          className="absolute top-40 left-10 w-24 h-24 rounded-full bg-linear-to-br from-[#8F85FF] to-[#5B4DFF] shadow-lg border border-white/20"
        />

        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.5, 0.8, 0.5],
            transition: { duration: 4, repeat: Infinity, ease: "easeInOut" },
          }}
          className="absolute bottom-20 right-10 w-16 h-16 rounded-full bg-white blur-xl opacity-60"
        />
      </div>


      {/* Right Decorative Area (Desktop) */}
      <div className="hidden lg:block lg:col-span-3 relative h-full min-h-100">
        {/* Floating Badges */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
          className="absolute top-20 left-0 bg-white rounded-full p-4 shadow-xl flex items-center gap-3 pr-6"
        >
          <div className="bg-yellow-100 p-2 rounded-full text-yellow-600">
            <FaStar />
          </div>
          <div>
            <div className="text-xs text-gray-500 font-bold uppercase tracking-wider">
              Rating
            </div>
            <div className="text-sm font-bold text-gray-900">5.0 Stars</div>
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
          className="absolute bottom-32 right-10 bg-white rounded-full p-4 shadow-xl flex items-center gap-3 pr-6"
        >
          <div className="bg-purple-100 p-2 rounded-full text-purple-600">
            <FaAward />
          </div>
          <div>
            <div className="text-xs text-gray-500 font-bold uppercase tracking-wider">
              Award
            </div>
            <div className="text-sm font-bold text-gray-900">Top Agency</div>
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
          className="absolute top-1/2 right-0 bg-white rounded-full w-14 h-14 shadow-xl flex items-center justify-center text-[#0077b5] text-2xl"
        >
          <FaLinkedinIn />
        </motion.div>
      </div>


    </div>
  );
};

export default FloatingBadges;

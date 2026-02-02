import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";

const WhatsAppButton = () => {
  return (
    <motion.a
      href="#"
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: "spring" }}
      className="fixed bottom-8 left-8 z-40 group"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <div className="relative">
        {/* Pulsing effect behind */}
        <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-20 duration-2000"></div>

        {/* Main button */}
        <div className="bg-[#25D366] text-white p-4 rounded-full shadow-lg shadow-black/20 flex items-center justify-center relative border-2 border-white/20 backdrop-blur-sm">
          <FaWhatsapp className="w-8 h-8" />
        </div>

        {/* Tooltip on hover */}
        <span className="absolute left-full ml-3 top-1/2 -translate-y-1/2 bg-white text-gray-800 text-xs font-bold px-2 py-1 rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          Chat with us!
        </span>
      </div>
    </motion.a>
  );
};

export { WhatsAppButton };
export default WhatsAppButton;

"use client";
import { motion } from "framer-motion";

interface WishTextProps {
  sender?: string;
}

const WishText = ({ sender }: WishTextProps) => {
  return (
    <motion.div
      className="text-center space-y-2 sm:space-y-3 p-2 sm:p-4 bg-gradient-to-r from-purple-900/50 via-blue-900/50 to-pink-900/50 rounded-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <motion.p
        className="text-[#ffd54f] text-base sm:text-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Que este nuevo año te traiga
      </motion.p>
      <motion.p
        className="text-white text-base sm:text-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        momentos de alegría, éxito y paz
      </motion.p>
      <motion.p
        className="text-[#ff8a65] text-base sm:text-lg font-semibold"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
      >
        Que cada día esté lleno de nuevas oportunidades
      </motion.p>
      <motion.p
        className="text-[#4fc3f7] text-base sm:text-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        y sueños cumplidos
      </motion.p>
      <motion.p
        className="text-[#ff4081] text-xl sm:text-2xl font-bold mt-2 sm:mt-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        ¡Feliz y Próspero Año Nuevo 2025!
      </motion.p>
      {sender && (
        <motion.div
          className="mt-2 sm:mt-3 p-2 sm:p-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8 }}
        >
          <motion.p
            className="text-base sm:text-lg font-bold text-white"
            animate={{
              textShadow: [
                "0 0 5px rgba(0, 0, 0, 0.5)",
                "0 0 10px rgba(0, 0, 0, 0.7)",
                "0 0 5px rgba(0, 0, 0, 0.5)",
              ],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          >
            Con cariño, {sender.replace(/ /g, "\u00A0")}
          </motion.p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default WishText;

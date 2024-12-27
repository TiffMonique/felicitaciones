"use client";
import { motion } from "framer-motion";

const MainTitle = ({ name, sender }: { name?: string; sender?: string }) => {
  return (
    <motion.div
      className="text-center mb-8"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {name && (
        <motion.h1
          className="text-4xl font-bold mb-2"
          style={{
            background: "linear-gradient(45deg, #FF6B6B, #4ECDC4, #FFD93D)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {name}
        </motion.h1>
      )}
      <motion.p
        className="text-xl text-[#FFD93D] mb-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {sender ? `${sender} te desea` : "deseándote"}
      </motion.p>
      <motion.p
        className="text-2xl font-semibold text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        Un Año Nuevo lleno de alegría, éxito y nuevas aventuras
      </motion.p>
    </motion.div>
  );
};

export default MainTitle;

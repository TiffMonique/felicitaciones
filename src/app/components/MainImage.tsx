"use client";
import Image from "next/image";
import { motion } from "framer-motion";

const MainImage = () => {
  return (
    <motion.div
      className="relative w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto my-2 sm:my-4"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.div
        animate={{
          scale: [1, 1.05, 1],
          rotate: [0, 2, -2, 0],
          y: [0, -10, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      >
        <Image
          src="/hny_2025_gemini-removebg.png"
          alt="Feliz Año Nuevo 2025"
          width={400}
          height={240}
          className="w-full h-auto"
          priority
        />
      </motion.div>
    </motion.div>
  );
};

export default MainImage;

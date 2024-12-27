"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface MessageProps {
  sender?: string;
}

const Message = ({ sender }: MessageProps) => {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const newYear = new Date(2025, 0, 1);
      const difference = newYear.getTime() - now.getTime();

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const senderLetters = sender ? sender.toUpperCase().split("") : [];
  const colors = ["#FF6B6B", "#4ECDC4", "#FFD93D", "#FF8B94", "#4ECDC4"];

  return (
    <motion.div
      className="text-center space-y-2 my-2 sm:my-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      {sender && (
        <motion.h1 className="text-3xl sm:text-4xl font-bold mb-1">
          {senderLetters.map((letter, index) => (
            <motion.span
              key={index}
              className="inline-block"
              animate={{
                y: [0, -5, 0],
                rotate: [-10, 0, 10, 0],
              }}
              transition={{
                y: {
                  duration: 1,
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: index * 0.1,
                },
                rotate: {
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: index * 0.1,
                },
              }}
              style={{
                color: colors[index % colors.length],
                textShadow: "0 0 5px rgba(255,255,255,0.5)",
              }}
            >
              {letter}
            </motion.span>
          ))}
        </motion.h1>
      )}
      <motion.p
        className="text-[#ffa726] text-lg sm:text-xl font-semibold"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        {sender ? "te desea" : "¡Crea tu mensaje para desear"} un Feliz Año
        Nuevo 2025{!sender && "!"}
      </motion.p>
      <motion.div
        className="bg-gradient-to-r from-blue-400 via-green-500 to-yellow-500 text-white px-3 py-1 sm:px-4 sm:py-2 rounded-full inline-block mt-1 sm:mt-2"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.9 }}
      >
        <span className="text-base sm:text-lg font-bold">{timeLeft}</span>
        <span className="ml-1 text-sm sm:text-base">para el Año Nuevo</span>
      </motion.div>
    </motion.div>
  );
};

export default Message;

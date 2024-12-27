"use client";
import { motion } from "framer-motion";

const AnimatedNumbers = () => {
  const numbers = [
    { number: "2", color: "#4dd0e1" },
    { number: "0", color: "#76ff03" },
    { number: "2", color: "#4dd0e1" },
    { number: "5", color: "#ff4081" },
  ];

  return (
    <div className="flex justify-center my-2 sm:my-4">
      {numbers.map((item, index) => (
        <motion.div
          key={index}
          className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold mx-1 sm:mx-2"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.2, duration: 0.5 }}
          style={{
            color: item.color,
            textShadow: `0 0 10px ${item.color}, 0 0 20px ${item.color}, 0 0 30px ${item.color}`,
          }}
        >
          <motion.span
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
              delay: index * 0.5,
              ease: "easeInOut",
            }}
            style={{ display: "inline-block" }}
          >
            {item.number}
          </motion.span>
        </motion.div>
      ))}
    </div>
  );
};

export default AnimatedNumbers;

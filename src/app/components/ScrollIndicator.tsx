"use client";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const ScrollIndicator = () => {
  return (
    <motion.div
      className="absolute bottom-0 left-1/2 transform -translate-x-1/2"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2, duration: 0.5 }}
    >
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
      >
        <ChevronDown className="text-white w-8 h-8 opacity-50" />
      </motion.div>
    </motion.div>
  );
};

export default ScrollIndicator;

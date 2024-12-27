"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const VisitCounter = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Simulamos un contador de visitas
    const randomCount = Math.floor(Math.random() * 10000) + 1000;
    setCount(randomCount);

    const interval = setInterval(() => {
      setCount((prevCount) => prevCount + Math.floor(Math.random() * 5));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="text-center my-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <p className="text-lg">
        Mensajes creados: <span className="font-bold">{count}</span>
      </p>
    </motion.div>
  );
};

export default VisitCounter;

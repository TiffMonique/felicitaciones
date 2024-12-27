"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const CountdownUnit = ({ value, label }: { value: number; label: string }) => (
  <motion.div
    className="flex flex-col items-center mx-2"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
  >
    <motion.span
      className="text-3xl font-bold"
      style={{
        color:
          label === "día"
            ? "#FF6B6B"
            : label === "h"
            ? "#4ECDC4"
            : label === "min"
            ? "#FFD93D"
            : "#FF8B94",
      }}
    >
      {value}
    </motion.span>
    <span className="text-sm text-gray-300">{label}</span>
  </motion.div>
);

const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date("2025-01-01T00:00:00");

    const updateCountdown = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex justify-center items-center space-x-1 mb-8">
      <CountdownUnit value={timeLeft.days} label="día" />
      <CountdownUnit value={timeLeft.hours} label="h" />
      <CountdownUnit value={timeLeft.minutes} label="min" />
      <CountdownUnit value={timeLeft.seconds} label="seg" />
      <span className="text-gray-400 ml-2">antes</span>
    </div>
  );
};

export default Countdown;

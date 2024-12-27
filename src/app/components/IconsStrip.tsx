"use client";
import { motion } from "framer-motion";
import {
  BombIcon as Balloon,
  Gift,
  PartyPopperIcon as Party,
  Sparkle,
  Cake,
  Heart,
} from "lucide-react";

const IconsStrip = ({ side = "left" }: { side?: "left" | "right" }) => {
  const icons = [
    { icon: Balloon, color: "#FF6B6B" },
    { icon: Gift, color: "#4ECDC4" },
    { icon: Party, color: "#FFD93D" },
    { icon: Sparkle, color: "#FF8B94" },
    { icon: Cake, color: "#95E1D3" },
    { icon: Heart, color: "#FF6B6B" },
  ];

  return (
    <div
      className={`fixed ${side}-4 top-1/2 -translate-y-1/2 flex flex-col gap-6`}
    >
      {icons.map((Icon, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: side === "left" ? -20 : 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.2 }}
        >
          <Icon.icon
            size={24}
            style={{ color: Icon.color }}
            className="opacity-80 hover:opacity-100 transition-opacity"
          />
        </motion.div>
      ))}
    </div>
  );
};

export default IconsStrip;

"use client";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface PageTransitionProps {
  children: ReactNode;
  isNewMessage: boolean;
}

const PageTransition: React.FC<PageTransitionProps> = ({
  children,
  isNewMessage,
}) => {
  return (
    <motion.div
      key={isNewMessage ? "new" : "initial"}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        initial={{ scale: isNewMessage ? 0.9 : 1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

export default PageTransition;

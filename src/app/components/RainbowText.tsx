'use client'

import { motion } from 'framer-motion'

export function RainbowText({ text, className = '' }: { text: string; className?: string }) {
  const colors = ['#FF69B4', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD']

  return (
    <motion.div
      className={`flex flex-wrap justify-center ${className}`}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {text.split('').map((letter, i) => (
        <motion.span
          key={i}
          style={{
            color: colors[i % colors.length],
            textShadow: '0 0 10px rgba(255,255,255,0.5)'
          }}
          className="text-4xl md:text-6xl font-bold"
          animate={{
            y: [0, -10, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.1
          }}
        >
          {letter}
        </motion.span>
      ))}
    </motion.div>
  )
}


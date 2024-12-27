'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export function Countdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date()
      const newYear = new Date(2025, 0, 1)
      const diff = newYear.getTime() - now.getTime()

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000)
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="flex justify-center gap-2 text-xl">
      <motion.span
        className="text-yellow-300"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 1, repeat: Infinity }}
      >
        {timeLeft.days} días
      </motion.span>
      <motion.span
        className="text-green-400"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
      >
        {timeLeft.hours} hrs
      </motion.span>
      <motion.span
        className="text-blue-400"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
      >
        {timeLeft.minutes} min
      </motion.span>
      <motion.span
        className="text-pink-400"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 1, repeat: Infinity, delay: 0.6 }}
      >
        {timeLeft.seconds} seg
      </motion.span>
      <span className="text-white">antes</span>
    </div>
  )
}


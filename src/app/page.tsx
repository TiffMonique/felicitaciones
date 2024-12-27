'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { StarryBackground } from './components/StarryBackground'
import { AdSpace } from './components/AdSpace'
import { RainbowText } from './components/RainbowText'
import { Countdown } from './components/Countdown'
import { CreateMessageButton } from './components/CreateMessageButtonProps'


export default function AnoNuevo2025() {
  const [sender, setSender] = useState<string | null>(null)

  const handleSubmit = (name: string) => {
    setSender(name)
  }

  return (
    <div className="min-h-screen relative overflow-hidden text-white">
      <StarryBackground />

      <div className="container mx-auto px-4 pt-4 pb-32">
        <AdSpace position="top" />

        <div className="max-w-md mx-auto text-center space-y-8">
          {sender ? (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="mb-4"
            >
              <RainbowText text={sender} className="mb-2" />
              <motion.p
                className="text-2xl text-yellow-300"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                deseándote
              </motion.p>
            </motion.div>
          ) : null}

          <Countdown />

          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-pink-500 via-yellow-500 to-cyan-500 text-transparent bg-clip-text">
              Feliz Año
              <br />
              Nuevo 2025
            </h1>
          </motion.div>

          {sender ? (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="space-y-8"
            >
              <p className="text-xl leading-relaxed">
                Te envío mis mejores deseos
                <br />
                de casa a casa y
                <br />
                <span className="text-red-400">de corazón a corazón</span>
              </p>

              <AdSpace position="bottom" />
            </motion.div>
          ) : null}
        </div>
      </div>

      <CreateMessageButton onSubmit={handleSubmit} />
    </div>
  )
}
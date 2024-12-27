'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import type { Stats } from '../types/index'

export function StatsDisplay() {
  const [stats, setStats] = useState<Stats>({
    total_messages: 15234,
    total_shares: 45123,
    active_users: 892
  })

  useEffect(() => {
    // Simulación de actualización en tiempo real
    const interval = setInterval(() => {
      setStats(prev => ({
        total_messages: prev.total_messages + Math.floor(Math.random() * 3),
        total_shares: prev.total_shares + Math.floor(Math.random() * 5),
        active_users: 800 + Math.floor(Math.random() * 200)
      }))
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div
      className="fixed bottom-20 left-4 bg-black/30 backdrop-blur-md rounded-lg p-4 text-white text-sm"
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse" />
          <span>{stats.active_users} personas creando mensajes</span>
        </div>
        <div>✉️ {stats.total_messages.toLocaleString()} mensajes enviados</div>
        <div>🔄 {stats.total_shares.toLocaleString()} veces compartido</div>
      </div>
    </motion.div>
  )
}


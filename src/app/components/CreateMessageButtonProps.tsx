'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { Sparkles } from 'lucide-react'

interface CreateMessageButtonProps {
  onSubmit: (name: string) => void
}

export function CreateMessageButton({ onSubmit }: CreateMessageButtonProps) {
  const [name, setName] = useState('')

  return (
    <motion.div
      className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-md mx-auto flex gap-2">
        <input
          type="text"
          placeholder="Escribe tu nombre aquí..."
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="flex-1 bg-white/10 border-white/20 text-white placeholder-white/50"
        />
        <button
          onClick={() => name && onSubmit(name)}
          disabled={!name}
          className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white"
        >
          <Sparkles className="mr-2 h-4 w-4" />
          Ver
        </button>
      </div>
    </motion.div>
  )
}


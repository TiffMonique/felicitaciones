import { motion } from 'framer-motion'

export function AdSpace({ position }: { position: 'top' | 'bottom' }) {
  return (
    <motion.div
      className={`w-full max-w-md mx-auto ${position === 'top' ? 'h-16' : 'h-20'} bg-white/5 backdrop-blur-sm rounded-lg overflow-hidden ${position === 'top' ? 'mb-4' : 'my-8'}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="h-full flex items-center justify-center text-white/50 text-sm">
        Espacio publicitario
      </div>
    </motion.div>
  )
}


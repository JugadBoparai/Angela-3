import { useState } from 'react'
import { motion } from 'framer-motion'

export default function IntroScreen({ noMessage, onYes, onNo }) {
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 })
  return (
    <motion.div
      key="intro"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex flex-col items-center justify-center px-6 py-20 pt-12"
    >
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="text-3xl md:text-4xl font-bold text-rose-800 text-center mb-2 font-romantic"
      >
        Angela Kaur Bhathal 💌
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="text-xl md:text-2xl text-rose-600 text-center mb-10 font-romantic"
      >
        Will you be my Valentine?
      </motion.p>

      {noMessage && (
        <motion.p
          key={noMessage}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-rose-500 text-lg mb-6 min-h-[2rem]"
        >
          {noMessage}
        </motion.p>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        className="flex flex-col sm:flex-row gap-4 sm:gap-6"
      >
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={onYes}
          className="px-8 py-4 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-500 text-white text-lg font-semibold shadow-lg shadow-rose-300/50 hover:shadow-xl hover:shadow-rose-400/50 transition-shadow"
        >
          Yes ❤️
        </motion.button>

        <motion.button
          onMouseEnter={() => {
            setNoPosition({ x: Math.random() * 80 - 40, y: Math.random() * 60 - 30 })
          }}
          animate={{ x: noPosition.x, y: noPosition.y }}
          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          whileTap={{ scale: 0.95 }}
          onClick={onNo}
          className="px-8 py-4 rounded-2xl bg-white/80 text-rose-600 text-lg font-semibold border-2 border-rose-300 hover:border-rose-400 shadow-md hover:shadow-lg transition-all relative z-10"
        >
          No 💔
        </motion.button>
      </motion.div>
    </motion.div>
  )
}

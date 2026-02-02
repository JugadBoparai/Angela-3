import { motion } from 'framer-motion'

export default function YesCelebrationScreen({ onContinue, onBack }) {
  return (
    <motion.div
      key="yes"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen flex flex-col items-center justify-center px-6 py-20 pt-12 relative"
    >
      {onBack && (
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onBack}
          className="absolute top-24 left-4 md:left-8 flex items-center gap-2 px-4 py-2 rounded-full text-rose-600 hover:bg-rose-100/80 transition-colors text-sm font-medium"
        >
          ← Go back
        </motion.button>
      )}

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
        className="text-center space-y-6"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-rose-800 font-romantic">
          LEVEL COMPLETE 🎉
        </h2>
        <p className="text-xl md:text-2xl text-rose-600">
          You said YES ❤️
        </p>
      </motion.div>

      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onContinue}
        className="mt-10 px-8 py-4 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-500 text-white text-lg font-semibold shadow-lg shadow-rose-300/50 hover:shadow-xl hover:shadow-rose-400/50 transition-shadow"
      >
        Continue →
      </motion.button>
    </motion.div>
  )
}

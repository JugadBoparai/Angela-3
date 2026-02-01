import { motion } from 'framer-motion'

export default function ProgressBar({ progress }) {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-1.5 bg-rose-200/50">
      <motion.div
        className="h-full bg-gradient-to-r from-rose-500 to-pink-500 rounded-r-full"
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
      />
    </div>
  )
}

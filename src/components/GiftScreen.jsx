import { motion } from 'framer-motion'

const GIFTS = [
  {
    id: 'date',
    emoji: '🍽️',
    title: 'A surprise date night just for us',
    subtitle: '✨',
  },
  {
    id: 'cozy',
    emoji: '🍿',
    title: 'A cozy day with movies, snacks and cuddles',
    subtitle: '❤️',
  },
  {
    id: 'adventure',
    emoji: '🌍',
    title: 'An adventure together – memories over things',
    subtitle: '💑',
  },
]

export default function GiftScreen({ onSelect }) {
  return (
    <motion.div
      key="gift"
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
        className="text-3xl md:text-4xl font-bold text-rose-800 text-center mb-12 font-romantic"
      >
        Choose your gift 🎁
      </motion.h1>

      <div className="flex flex-col md:flex-row gap-6 md:gap-8 max-w-4xl w-full">
        {GIFTS.map((gift, index) => (
          <motion.button
            key={gift.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.15, duration: 0.5 }}
            whileHover={{
              scale: 1.05,
              y: -8,
              boxShadow: '0 25px 50px -12px rgba(236, 72, 153, 0.25)',
            }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelect(gift)}
            className="flex-1 p-6 rounded-2xl bg-white/90 backdrop-blur border-2 border-rose-200 hover:border-rose-400 shadow-lg hover:shadow-xl transition-all text-left group"
          >
            <span className="text-4xl block mb-3 group-hover:scale-125 transition-transform">
              {gift.emoji}
            </span>
            <p className="text-rose-800 font-semibold text-base md:text-lg leading-snug">
              {gift.title} {gift.subtitle}
            </p>
          </motion.button>
        ))}
      </div>
    </motion.div>
  )
}

import { motion } from 'framer-motion'

const GIFTS = [
  {
    id: 'date',
    emoji: '🍽️',
    title: 'A surprise date night just for us',
    subtitle: '✨',
    wrapper: '🎀', // Hidden from Angela – only shown as wrapped
  },
  {
    id: 'cozy',
    emoji: '🍿',
    title: 'A cozy day with movies, snacks and cuddles',
    subtitle: '❤️',
    wrapper: '🎀',
  },
  {
    id: 'adventure',
    emoji: '🌍',
    title: 'An adventure together – memories over things',
    subtitle: '💑',
    wrapper: '🎀',
  },
]

export default function GiftScreen({ onSelect, onBack }) {
  return (
    <motion.div
      key="gift"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5 }}
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

      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="text-3xl md:text-4xl font-bold text-rose-800 text-center mb-12 font-romantic"
      >
        Pick a wrapped gift 🎁
      </motion.h1>

      <p className="text-rose-600 text-center mb-10">
        They are all different… choose wisely 😏
      </p>

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
            className="flex-1 p-8 rounded-2xl bg-gradient-to-b from-rose-100 to-pink-100 backdrop-blur border-2 border-rose-300 shadow-lg hover:shadow-xl transition-all flex flex-col items-center justify-center group"
          >
            {/* Wrapped gift box - Angela won't know what's inside */}
            <div className="relative mb-4">
              <span className="text-6xl block group-hover:scale-110 transition-transform">
                🎁
              </span>
              <span className="absolute -top-1 -right-1 text-2xl opacity-80">
                {gift.wrapper}
              </span>
            </div>
            <p className="text-rose-700 font-medium text-base">
              Mystery Gift
            </p>
            <p className="text-rose-500 text-sm mt-1">
              ??? 
            </p>
          </motion.button>
        ))}
      </div>
    </motion.div>
  )
}

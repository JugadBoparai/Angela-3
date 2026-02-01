import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'

const LOVE_LETTER = [
  'Dear Angela,',
  'From the moment you came into my life, everything felt warmer, brighter, and more meaningful.',
  'You are my best friend, my safe place, and my favorite person.',
  'Thank you for your love, your laughter, and the way you make everything better just by being you.',
  "Happy Valentine's Day my Santrapakora ❤️",
  '– Jugad',
]

// Placeholder image - replace with your personal photo
const PLACEHOLDER_IMAGE = 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&h=400&fit=crop'

// Placeholder royalty-free love song - replace with your song
const LOVE_SONG_URL = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'

function burstConfetti() {
  const count = 200
  const defaults = { origin: { y: 0.7 }, zIndex: 9999 }

  function fire(particleRatio, opts) {
    confetti({ ...defaults, ...opts, particleCount: Math.floor(count * particleRatio) })
  }

  fire(0.25, { spread: 26, startVelocity: 55 })
  fire(0.2, { spread: 60 })
  fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 })
  fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 })
  fire(0.1, { spread: 120, startVelocity: 45 })
}

function gentleConfetti() {
  confetti({
    particleCount: 30,
    spread: 60,
    origin: { y: 0.6 },
    colors: ['#ec4899', '#f472b6', '#f9a8d4', '#fce7f3'],
  })
}

function FlyingHeart({ delay, left, top }) {
  return (
    <motion.div
      className="absolute text-2xl md:text-4xl pointer-events-none select-none"
      style={{ left: `${left}%`, top: `${top}%` }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: [0, 1, 1, 0.8],
        scale: [0, 1.2, 1, 1.3],
        x: [0, 10, -5, 15],
        y: [0, -15, 10, -20],
        rotate: [0, 15, -10, 20],
      }}
      transition={{
        duration: 4,
        delay,
        repeat: Infinity,
        repeatDelay: 1,
      }}
    >
      💖
    </motion.div>
  )
}

export default function FinalScreen({ selectedGift, onLetterComplete }) {
  const [visibleLines, setVisibleLines] = useState(0)
  const [isLetterComplete, setIsLetterComplete] = useState(false)
  const [audioPlaying, setAudioPlaying] = useState(false)
  const audioRef = useRef(null)
  const beatIntervalRef = useRef(null)
  const onLetterCompleteRef = useRef(onLetterComplete)
  onLetterCompleteRef.current = onLetterComplete

  useEffect(() => {
    burstConfetti()
  }, [])

  useEffect(() => {
    const audio = new Audio(LOVE_SONG_URL)
    audioRef.current = audio
    audio.volume = 0.5
    audio.play()
      .then(() => setAudioPlaying(true))
      .catch(() => {})

    return () => {
      audio.pause()
      if (beatIntervalRef.current) clearInterval(beatIntervalRef.current)
    }
  }, [])

  const handlePlayMusic = () => {
    if (audioRef.current) {
      audioRef.current.play().then(() => setAudioPlaying(true)).catch(() => {})
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleLines((prev) => {
        if (prev < LOVE_LETTER.length) {
          gentleConfetti()
          return prev + 1
        }
        clearInterval(interval)
        setIsLetterComplete(true)
        onLetterCompleteRef.current?.()
        return prev
      })
    }, 2200)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (!audioRef.current) return
    beatIntervalRef.current = setInterval(() => {
      if (isLetterComplete) {
        gentleConfetti()
      }
    }, 600)

    return () => {
      if (beatIntervalRef.current) clearInterval(beatIntervalRef.current)
    }
  }, [isLetterComplete])

  const heartPositions = [
    { delay: 0, left: 10, top: 15 },
    { delay: 0.5, left: 85, top: 20 },
    { delay: 1, left: 25, top: 70 },
    { delay: 1.5, left: 75, top: 65 },
    { delay: 2, left: 5, top: 45 },
    { delay: 2.5, left: 90, top: 50 },
    { delay: 0.3, left: 50, top: 10 },
    { delay: 1.2, left: 15, top: 85 },
    { delay: 1.8, left: 80, top: 90 },
  ]

  return (
    <motion.div
      key="final"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="min-h-screen relative overflow-hidden py-20 pt-12 px-4"
    >
      {/* Glow background */}
      <div className="absolute inset-0 bg-gradient-to-br from-rose-200/50 via-pink-100/30 to-red-100/50 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-rose-300/20 rounded-full blur-3xl pointer-events-none" />

      {/* Flying hearts */}
      {heartPositions.map((pos, i) => (
        <FlyingHeart key={i} {...pos} />
      ))}

      <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
        {/* Music play button - for when autoplay is blocked */}
        {!audioPlaying && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={handlePlayMusic}
            className="mb-4 px-4 py-2 rounded-full bg-rose-500/90 text-white text-sm font-medium shadow-lg hover:bg-rose-600 transition-colors"
          >
            🎵 Play music
          </motion.button>
        )}

        {/* Personal image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          <img
            src={PLACEHOLDER_IMAGE}
            alt="Angela"
            className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover ring-4 ring-rose-300/50 shadow-2xl shadow-rose-200/50"
          />
        </motion.div>

        {/* Gift label */}
        {selectedGift && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-rose-600 font-medium mb-6 text-center"
          >
            You chose: {selectedGift.title} {selectedGift.subtitle}
          </motion.p>
        )}

        {/* Love letter - rolling paper effect */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="w-full"
          style={{ perspective: '1200px' }}
        >
          <motion.div
            className="relative bg-amber-50/95 backdrop-blur rounded-2xl p-8 md:p-10 shadow-2xl border border-amber-200/50 letter-scroll max-h-[50vh] overflow-y-auto"
            style={{
              boxShadow: '0 25px 50px -12px rgba(180, 83, 9, 0.25), inset 0 1px 0 rgba(255,255,255,0.8)',
              transformStyle: 'preserve-3d',
            }}
            animate={{
              rotateX: [0, 3, -2, 0],
              y: [0, 3, -2, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
          >
            {/* Subtle paper texture overlay */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-transparent via-amber-100/10 to-transparent pointer-events-none" />

            <div className="relative space-y-4 font-romantic text-amber-900/90">
              {LOVE_LETTER.map((line, index) => (
                <motion.p
                  key={index}
                  initial={{ opacity: 0, x: -20, y: 10 }}
                  animate={{
                    opacity: visibleLines > index ? 1 : 0,
                    x: visibleLines > index ? 0 : -20,
                    y: visibleLines > index ? 0 : 10,
                  }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                  className={
                    index === 0
                      ? 'text-xl font-semibold text-rose-800'
                      : index === LOVE_LETTER.length - 1
                      ? 'text-lg font-semibold text-rose-700 italic'
                      : 'text-base md:text-lg leading-relaxed'
                  }
                >
                  {line}
                </motion.p>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  )
}

import { useState, useEffect, useRef } from 'react'
import { motion, useAnimation } from 'framer-motion'
import confetti from 'canvas-confetti'

const LOVE_LETTER = [
  'Dear Angela,',
  'From the moment you came into my life, everything felt warmer, brighter, and more meaningful.',
  'You are my best friend, my safe place, and my favorite person.',
  'Thank you for your love, your laughter, and the way you make everything better just by being you.',
  "Happy Valentine's Day my Santrapakora ❤️",
  '– Jugad',
]

// Image and music from public folder
const PHOTO_PATH = '/IMG_0628.jpeg'
const LOVE_SONG_URL = '/' + encodeURIComponent('Dilawara - Acoustic  The PropheC  Ezu  Latest Punjabi Song.mp3')

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

function FlyingHeart({ delay, left, top, heartControls, isMobile }) {
  return (
    <motion.div
      className={`absolute pointer-events-none select-none ${isMobile ? 'text-lg' : 'text-2xl md:text-4xl'}`}
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
      <motion.span
        animate={heartControls}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="inline-block"
      >
        💖
      </motion.span>
    </motion.div>
  )
}

export default function FinalScreen({ selectedGift, onLetterComplete, onBack }) {
  const [isMobile, setIsMobile] = useState(false)
  const [visibleLines, setVisibleLines] = useState(0)
  const [isLetterComplete, setIsLetterComplete] = useState(false)
  const [audioPlaying, setAudioPlaying] = useState(false)
  const audioRef = useRef(null)
  const beatIntervalRef = useRef(null)
  const onLetterCompleteRef = useRef(onLetterComplete)
  onLetterCompleteRef.current = onLetterComplete

  const heartControls = useAnimation()

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  useEffect(() => {
    burstConfetti()
  }, [])

  useEffect(() => {
    heartControls.start({
      scale: [1, 1.4, 1],
      transition: { duration: 1.5, repeat: Infinity, repeatType: 'reverse' },
    })
  }, [heartControls])

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
      {heartPositions.slice(0, isMobile ? 5 : 9).map((pos, i) => (
        <FlyingHeart key={i} {...pos} heartControls={heartControls} isMobile={isMobile} />
      ))}

      {onBack && (
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onBack}
          className="absolute top-24 left-4 md:left-8 z-20 flex items-center gap-2 px-4 py-2 rounded-full text-rose-600 bg-white/80 backdrop-blur hover:bg-white transition-colors text-sm font-medium shadow-sm"
        >
          ← Go back
        </motion.button>
      )}

      <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center gap-6 md:gap-8 pb-8">
        {/* Music play button */}
        {!audioPlaying && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={handlePlayMusic}
            className="px-4 py-2 rounded-full bg-rose-500/90 text-white text-sm font-medium shadow-lg hover:bg-rose-600 transition-colors"
          >
            🎵 Play music
          </motion.button>
        )}

        {/* 1️⃣ GIFT – hovedfokus midt på skjermen */}
        {selectedGift && (
          <motion.div
            initial={{ opacity: 0, scale: 0.7, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, type: 'spring', stiffness: 200 }}
            className="w-full max-w-md mx-auto flex flex-col items-center"
          >
            <motion.div
              className="relative p-8 md:p-10 rounded-3xl bg-gradient-to-br from-white/90 to-rose-50/90 backdrop-blur border-2 border-rose-200/80 shadow-xl shadow-rose-200/30 cursor-default"
              whileHover={{
                scale: 1.03,
                boxShadow: '0 30px 60px -15px rgba(236, 72, 153, 0.4)',
                transition: { duration: 0.3 },
              }}
              whileTap={{ scale: 0.98 }}
              animate={{
                boxShadow: [
                  '0 25px 50px -12px rgba(236, 72, 153, 0.2)',
                  '0 25px 50px -12px rgba(236, 72, 153, 0.35)',
                  '0 25px 50px -12px rgba(236, 72, 153, 0.2)',
                ],
              }}
              transition={{ duration: 2.5, repeat: Infinity, repeatType: 'reverse' }}
            >
              {/* Personal image – liten ved gaven */}
              <motion.img
                src={PHOTO_PATH}
                alt="Angela"
                className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover ring-2 ring-rose-300/50 shadow-lg mx-auto mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              />
              <span className="text-5xl md:text-6xl block text-center mb-3">{selectedGift.emoji}</span>
              <h2 className="text-xl md:text-2xl font-bold text-rose-800 text-center leading-tight font-romantic">
                {selectedGift.title} {selectedGift.subtitle}
              </h2>
              <p className="text-rose-500 text-sm text-center mt-2">Din gave ❤️</p>
            </motion.div>
          </motion.div>
        )}

        {/* 2️⃣ BREV – dukker opp under gaven, transparent bakgrunn */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="w-full"
          style={{ perspective: '1200px' }}
        >
          <motion.div
            className="relative bg-white/70 md:bg-amber-50/75 backdrop-blur rounded-2xl p-6 md:p-8 border border-amber-200/60 letter-scroll max-h-[45vh] md:max-h-[40vh] overflow-y-auto"
            style={{
              boxShadow: '0 20px 40px -15px rgba(180, 83, 9, 0.15), inset 0 1px 0 rgba(255,255,255,0.9)',
              transformStyle: 'preserve-3d',
            }}
            animate={{
              rotateX: [0, 2, -1.5, 0],
              y: [0, 2, -1, 0],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
          >
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-transparent via-amber-100/5 to-transparent pointer-events-none" />

            <div className="relative space-y-3 md:space-y-4 font-romantic text-amber-900/90">
              {LOVE_LETTER.map((line, index) => (
                <motion.p
                  key={index}
                  initial={{ opacity: 0, x: -20, y: 10 }}
                  animate={{
                    opacity: visibleLines > index ? 1 : 0,
                    x: visibleLines > index ? 0 : -20,
                    y: visibleLines > index ? 0 : 10,
                  }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  className={
                    index === 0
                      ? 'text-lg md:text-xl font-semibold text-rose-800'
                      : index === LOVE_LETTER.length - 1
                      ? 'text-base md:text-lg font-semibold text-rose-700 italic'
                      : 'text-sm md:text-base leading-relaxed'
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

import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import ProgressBar from './components/ProgressBar'
import IntroScreen from './components/IntroScreen'
import YesCelebrationScreen from './components/YesCelebrationScreen'
import GiftScreen from './components/GiftScreen'
import FinalScreen from './components/FinalScreen'

const NO_MESSAGES = [
  "Are you sure? 🤔",
  "That hurt a little 🥺",
  "Pretty please? 🙏",
  "I'll make it worth your while 😊",
  "Last chance to say yes... 💕",
  "Okay, I'm choosing for you! ❤️"
]

function App() {
  const [currentScreen, setCurrentScreen] = useState(0)
  const [noClickCount, setNoClickCount] = useState(0)
  const [selectedGift, setSelectedGift] = useState(null)
  const [letterComplete, setLetterComplete] = useState(false)

  const getProgress = () => {
    if (currentScreen === 0) return 0
    if (currentScreen === 1) return 33
    if (currentScreen === 2) return 66
    if (currentScreen === 3 && !letterComplete) return 66
    return 100
  }

  const handleYes = () => {
    setCurrentScreen(1)
  }

  const handleContinue = () => {
    setCurrentScreen(2)
  }

  const handleNo = () => {
    if (noClickCount >= NO_MESSAGES.length - 1) {
      handleYes()
      return
    }
    setNoClickCount(prev => prev + 1)
  }

  const handleGiftSelect = (gift) => {
    setSelectedGift(gift)
    setCurrentScreen(3)
  }

  const handleBack = () => {
    if (currentScreen === 1) setCurrentScreen(0)
    if (currentScreen === 2) setCurrentScreen(1)
    if (currentScreen === 3) {
      setSelectedGift(null)
      setLetterComplete(false)
      setCurrentScreen(2)
    }
  }

  return (
    <div className="min-h-screen w-full overflow-x-hidden relative">
      <ProgressBar progress={getProgress()} />

      <AnimatePresence mode="wait">
        {currentScreen === 0 && (
          <IntroScreen
            key="intro"
            noMessage={NO_MESSAGES[noClickCount]}
            onYes={handleYes}
            onNo={handleNo}
          />
        )}
        {currentScreen === 1 && (
          <YesCelebrationScreen
            key="yes"
            onContinue={handleContinue}
            onBack={handleBack}
          />
        )}
        {currentScreen === 2 && (
          <GiftScreen
            key="gift"
            onSelect={handleGiftSelect}
            onBack={handleBack}
          />
        )}
        {currentScreen === 3 && (
          <FinalScreen
            key="final"
            selectedGift={selectedGift}
            onLetterComplete={() => setLetterComplete(true)}
            onBack={handleBack}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

export default App

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, Sparkles, PartyPopper, Music, Star } from 'lucide-react'
import './App.css'

function App() {
  const [isAccepted, setIsAccepted] = useState(false)
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 })
  const [noButtonScale, setNoButtonScale] = useState(1)
  const [yesButtonScale, setYesButtonScale] = useState(1)
  const [noCount, setNoCount] = useState(0)
  const [hearts, setHearts] = useState([])

  // GIFs for different stages
  const questionGif = "https://media.tenor.com/tE1nS9C4nooAAAAi/q-uby-cute.gif" // Cute asking gif
  const thinkingGif = "https://media.tenor.com/z8p_U5Y8f_EAAAAi/milk-and-mocha.gif" // Thinking gif
  const successGif = "https://media.tenor.com/f7SbgvF_d0YAAAAi/milk-and-mocha-bear-cuddles.gif" // Happy hug gif
  const avoidGif = "https://media.tenor.com/yS_S78rVzOwAAAAi/jump-cute.gif" // Jumping/Avoid gif

  const phrases = [
    "No",
    "Are you sure?",
    "Really sure??",
    "Think again!",
    "Last chance!",
    "Surely not?",
    "You might regret this!",
    "Give it another thought!",
    "Are you absolutely sure?",
    "This could be a mistake!",
    "Have a heart!",
    "Don't be so cold!",
    "Change of heart?",
    "Wouldn't you reconsider?",
    "Is that your final answer?",
    "You're breaking my heart ;("
  ];

  useEffect(() => {
    const newHearts = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 30 + 10,
      duration: Math.random() * 15 + 10,
      delay: Math.random() * 5,
      emoji: ['❤️', '💖', '✨', '🌸', '💝'][Math.floor(Math.random() * 5)]
    }))
    setHearts(newHearts)
  }, [])

  const handleNoHover = () => {
    const padding = 120
    const newX = (Math.random() - 0.5) * (window.innerWidth - padding)
    const newY = (Math.random() - 0.5) * (window.innerHeight - padding)

    setNoButtonPos({ x: newX, y: newY })
    setNoCount(prev => prev + 1)

    // Make YES button bigger and NO smaller every time they try to click NO
    setYesButtonScale(prev => prev + 0.15)
    setNoButtonScale(prev => Math.max(0.4, prev - 0.05))
  }

  const SuccessScreen = () => (
    <motion.div
      initial={{ scale: 0.5, opacity: 0, rotate: -10 }}
      animate={{ scale: 1, opacity: 1, rotate: 0 }}
      className="glass-card success-card"
    >
      <div className="gif-container">
        <img src={successGif} alt="Celebration" className="valentine-gif" />
      </div>

      <motion.div
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
        className="emoji-header"
      >
        🥰 ❤️ 🎉
      </motion.div>

      <h2 className="success-title">Yay! I knew it! ❤️</h2>
      <p className="success-text">
        You've made me the happiest person today! <br />
        Can't wait for our special Valentine's date! 🌹
      </p>

      <div className="decor-icons">
        <PartyPopper className="icon-pop" size={40} />
        <Sparkles className="icon-sparkle" size={40} />
      </div>
    </motion.div>
  )

  const QuestionScreen = () => {
    const currentGif = noCount === 0 ? questionGif : (noCount > 10 ? avoidGif : thinkingGif);

    return (
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="glass-card main-card"
      >
        <div className="gif-container" style={{ position: 'relative' }}>
          <img src={currentGif} alt="Valentine" className="valentine-gif" />
          {noCount > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="floating-emoji"
            >
              🥺
            </motion.div>
          )}
        </div>

        <h1 className="main-title">
          {noCount > 5 ? "Please say yes! 🥺" : "Will you be my Valentine?"}
        </h1>

        <div className="button-container">
          <motion.button
            className="btn btn-yes"
            style={{ scale: yesButtonScale }}
            whileHover={{ scale: yesButtonScale + 0.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsAccepted(true)}
          >
            Yes! 💖
          </motion.button>

          <motion.button
            className="btn btn-no"
            animate={{
              x: noButtonPos.x,
              y: noButtonPos.y,
              scale: noButtonScale
            }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            onMouseEnter={handleNoHover}
            onTouchStart={handleNoHover}
          >
            {phrases[Math.min(noCount, phrases.length - 1)]}
          </motion.button>
        </div>

        {noCount > 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="attempt-counter"
          >
            Attempts to say No: {noCount} 😂
          </motion.p>
        )}
      </motion.div>
    )
  }

  return (
    <div className="app-container">
      {/* Background Floating Elements */}
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="floating-heart"
          initial={{ y: '110vh', x: `${heart.x}vw` }}
          animate={{ y: '-10vh' }}
          transition={{
            duration: heart.duration,
            repeat: Infinity,
            delay: heart.delay,
            ease: 'linear'
          }}
        >
          <span style={{ fontSize: heart.size, opacity: 0.4 }}>
            {heart.emoji}
          </span>
        </motion.div>
      ))}

      <AnimatePresence mode="wait">
        {isAccepted ? <SuccessScreen key="success" /> : <QuestionScreen key="question" />}
      </AnimatePresence>

      <div className="footer-credits">
        Made with ❤️ for someone special
      </div>
    </div>
  )
}

export default App

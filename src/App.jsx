import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, Sparkles, PartyPopper, ChevronRight, ChevronLeft, Send } from 'lucide-react'
import './App.css'

function App() {
  const [currentPage, setCurrentPage] = useState(0)
  const [isAccepted, setIsAccepted] = useState(false)
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 })
  const [yesButtonScale, setYesButtonScale] = useState(1)
  const [noCount, setNoCount] = useState(0)
  const [hearts, setHearts] = useState([])

  // Custom messages for the first 2 pages
  const specialMessages = [
    {
      title: "Hey Nishant... ❤️",
      text: "I wanted to take a moment to tell you how incredibly special you are to me. Every day with you feels like a beautiful adventure.",
      gif: "/bubududu.gif",
      emoji: "🌟"
    },
    {
      title: "My Favorite Person",
      text: "From our laughs to the quiet moments, you've made my world so much brighter. I'm so lucky to have you by my side.",
      gif: "/i-love-you-i-missed-you.gif",
      emoji: "💝"
    }
  ]

  const phrases = [
    "No",
    "Are you sure? 🤨",
    "Really sure?? 🥺",
    "Think again! 💭",
    "Last chance! ⚠️",
    "Surely not? 😲",
    "You might regret this! 😢",
    "Give it another thought! 🤔",
    "Are you absolutely sure? 😭",
    "This could be a mistake! 🚫",
    "Have a heart! ❤️",
    "Change of heart? 💝",
    "Wouldn't you reconsider? 🥺",
    "Is that your final answer? 😰",
    "You're breaking my heart! ;💔",
    "Emotional Damage! 💀",
    "I will kill myself! 🔪",
    "You're so mean! 😡",
    "I'm gonna cry... 😭😭",
    "Zahar khalu kya?? 🧪💀",
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
    const range = 80; // Small range to keep it near the card

    // Move with an offset so it doesn't overlap the center "Yes" button
    let newX = (Math.random() * range * 2) - range;
    let newY = (Math.random() * range * 2) - range;

    // Minimum distance from center to keep Yes button clear
    if (Math.abs(newX) < 60) newX = newX > 0 ? 80 : -80;
    if (Math.abs(newY) < 60) newY = newY > 0 ? 80 : -80;

    setNoButtonPos({ x: newX, y: newY })
    setNoCount(prev => prev + 1)
    setYesButtonScale(prev => Math.min(prev + 0.1, 2.5))
  }

  const PageTransition = ({ children }) => (
    <motion.div
      initial={{ x: 50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -50, opacity: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="glass-card"
    >
      {children}
    </motion.div>
  )

  const SuccessScreen = () => (
    <PageTransition>
      <div className="gif-container">
        <img src="/milk-and-mocha-milk-and-mocha-bear.gif" alt="Success" className="valentine-gif" />
      </div>
      <h2 className="success-title">Yay! ❤️</h2>
      <p className="success-text">
        You've made me the happiest person in the world, Nishant! <br />
        I love you so much! 🌹🥰
      </p>
      <div className="decor-icons">
        <PartyPopper size={40} />
        <Heart fill="currentColor" size={40} />
      </div>
    </PageTransition>
  )

  const MessagePage = ({ data, index }) => (
    <PageTransition>
      <div className="emoji-header">{data.emoji}</div>
      <div className="gif-container">
        <img src={data.gif} alt="Message" className="valentine-gif" />
      </div>
      <h2 className="main-title" style={{ fontSize: '2.5rem' }}>{data.title}</h2>
      <p className="message-content">{data.text}</p>
      <div className="nav-container">
        <button className="btn btn-next" onClick={() => setCurrentPage(index + 1)}>
          Next <ChevronRight size={20} />
        </button>
      </div>
    </PageTransition>
  )

  const QuestionPage = () => (
    <PageTransition>
      <div className="gif-container">
        <img
          src="/valentine.gif"
          alt="Valentine"
          className="valentine-gif"
        />
      </div>
      <h1 className="main-title">So Nishant... Will you be my Valentine?</h1>

      <div className="button-container">
        <motion.button
          className="btn btn-yes"
          style={{ scale: yesButtonScale }}
          whileHover={{ scale: yesButtonScale + 0.1 }}
          onClick={() => setIsAccepted(true)}
        >
          YES! ❤️
        </motion.button>

        <motion.button
          className="btn btn-no"
          animate={{ x: noButtonPos.x, y: noButtonPos.y }}
          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          onMouseEnter={handleNoHover}
          onTouchStart={handleNoHover}
        >
          {phrases[Math.min(noCount, phrases.length - 1)]}
        </motion.button>
      </div>
    </PageTransition>
  )

  return (
    <div className="app-container">
      {/* Background Hearts */}
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="floating-heart"
          initial={{ y: '110vh', x: `${heart.x}vw` }}
          animate={{ y: '-10vh' }}
          transition={{ duration: heart.duration, repeat: Infinity, delay: heart.delay, ease: 'linear' }}
        >
          <span style={{ fontSize: heart.size, opacity: 0.3 }}>{heart.emoji}</span>
        </motion.div>
      ))}

      <AnimatePresence mode="wait">
        {isAccepted ? (
          <SuccessScreen key="success" />
        ) : currentPage < specialMessages.length ? (
          <MessagePage
            key={`page-${currentPage}`}
            data={specialMessages[currentPage]}
            index={currentPage}
          />
        ) : (
          <QuestionPage key="question" />
        )}
      </AnimatePresence>

      <div className="footer-credits">Scroll or click 'Next' to read ❤️</div>
    </div>
  )
}

export default App

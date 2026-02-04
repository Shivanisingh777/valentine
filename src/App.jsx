import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, Sparkles, PartyPopper } from 'lucide-react'
import './App.css'

function App() {
  const [isAccepted, setIsAccepted] = useState(false)
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 })
  const [hearts, setHearts] = useState([])
  const containerRef = useRef(null)

  // Generate random hearts for background decoration
  useEffect(() => {
    const newHearts = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 30 + 10,
      duration: Math.random() * 20 + 10,
      delay: Math.random() * 5
    }))
    setHearts(newHearts)
  }, [])

  const handleNoHover = () => {
    // Generate a random position within viewport bounds
    // Avoid the very edges to keep the button visible
    const padding = 100
    const newX = (Math.random() - 0.5) * (window.innerWidth - padding)
    const newY = (Math.random() - 0.5) * (window.innerHeight - padding)

    setNoButtonPos({ x: newX, y: newY })
  }

  const SuccessScreen = () => (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="glass-card"
    >
      <div className="icon-container" style={{ marginBottom: '2rem' }}>
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 10, -10, 0]
          }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <PartyPopper size={80} color="#ff4d6d" strokeWidth={1.5} />
        </motion.div>
      </div>
      <h2 className="success-title">Yay! Best Day Ever! ❤️</h2>
      <p style={{ fontSize: '1.2rem', color: '#666' }}>
        I knew you'd say yes! Can't wait to spend it with you.
      </p>
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
        style={{ marginTop: '2rem' }}
      >
        <Heart fill="#ff4d6d" color="#ff4d6d" size={40} />
      </motion.div>
    </motion.div>
  )

  const QuestionScreen = () => (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="glass-card"
      ref={containerRef}
    >
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ repeat: Infinity, duration: 2 }}
        style={{ marginBottom: '1rem' }}
      >
        <Heart fill="#ff4d6d" color="#ff4d6d" size={60} />
      </motion.div>

      <h1>Will you be my Valentine?</h1>

      <div className="button-container">
        <motion.button
          className="btn btn-yes"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsAccepted(true)}
        >
          Yes <Sparkles size={20} />
        </motion.button>

        <motion.button
          className="btn btn-no"
          animate={{ x: noButtonPos.x, y: noButtonPos.y }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          onMouseEnter={handleNoHover}
          onTouchStart={handleNoHover}
        >
          No
        </motion.button>
      </div>
    </motion.div>
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
          transition={{
            duration: heart.duration,
            repeat: Infinity,
            delay: heart.delay,
            ease: 'linear'
          }}
        >
          <Heart
            fill={Math.random() > 0.5 ? "#ff4d6d" : "#ff758f"}
            color="transparent"
            size={heart.size}
            opacity={0.3}
          />
        </motion.div>
      ))}

      <AnimatePresence mode="wait">
        {isAccepted ? <SuccessScreen key="success" /> : <QuestionScreen key="question" />}
      </AnimatePresence>
    </div>
  )
}

export default App

'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ChevronUp } from 'lucide-react'

interface LoveNote {
  short: string
  long: string
}

const loveNotes: LoveNote[] = [
  {
    short: "Your smile brightens my darkest days.",
    long: "Every time I see your smile, it's like the sun breaking through the clouds. No matter how tough things get, your smile reminds me of all the beauty and joy in our life together."
  },
  {
    short: "I fall in love with you more each day.",
    long: "It's amazing how our love keeps growing. Every day, I discover new things to adore about you - your kindness, your humor, your strength. You make me want to be a better person."
  },
  {
    short: "You're not just my girlfriend, you're my best friend.",
    long: "I love that we can be silly together, share our deepest secrets, and support each other through anything. Our friendship is the foundation of our love, and it makes our bond unbreakable."
  },
  {
    short: "I'm so grateful to have you in my life.",
    long: "Sometimes I wonder how I got so lucky to have you. You bring so much happiness, love, and meaning to my life. I'm thankful for every moment we share."
  },
  {
    short: "You make every moment special.",
    long: "Whether we're on an adventure or just cuddling on the couch, being with you makes every experience magical. You have a way of turning ordinary moments into cherished memories."
  },
]

export function LoveNotes() {
  const [currentNote, setCurrentNote] = useState(0)
  const [isExpanded, setIsExpanded] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentNote((prevNote) => (prevNote + 1) % loveNotes.length)
      setIsExpanded(false)
    }, 30000) // Change note every 30 seconds

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="bg-pink-100 p-6 rounded-lg shadow-md">
      <h3 className="text-2xl font-semibold mb-4 text-pink-600 font-playfair">Love Note of the Day</h3>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentNote}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="text-blue-600"
        >
          <p className="text-lg italic mb-2">{loveNotes[currentNote].short}</p>
          <AnimatePresence>
            {isExpanded && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="text-sm mt-2"
              >
                {loveNotes[currentNote].long}
              </motion.p>
            )}
          </AnimatePresence>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-2 text-pink-500 hover:text-pink-600 transition-colors flex items-center"
          >
            {isExpanded ? (
              <>
                <ChevronUp size={16} className="mr-1" /> Read less
              </>
            ) : (
              <>
                <ChevronDown size={16} className="mr-1" /> Read more
              </>
            )}
          </button>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}


'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const loveNotes = [
  "Your smile brightens my darkest days.",
  "I fall in love with you more and more each day.",
  "You're not just my girlfriend, you're my best friend.",
  "I'm so grateful to have you in my life.",
  "You make every moment special.",
]

export function LoveNotes() {
  const [currentNote, setCurrentNote] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentNote((prevNote) => (prevNote + 1) % loveNotes.length)
    }, 10000) // Change note every 10 seconds

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="bg-pink-100 p-6 rounded-lg shadow-md">
      <h3 className="text-2xl font-semibold mb-4 text-pink-600 font-playfair">Love Note of the Day</h3>
      <motion.p
        key={currentNote}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className="text-blue-600 text-lg italic"
      >
        {loveNotes[currentNote]}
      </motion.p>
    </div>
  )
}


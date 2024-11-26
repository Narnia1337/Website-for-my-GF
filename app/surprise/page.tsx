'use client'

import { motion } from 'framer-motion'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function SurprisePage() {
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/love-letter')
    }, 5000) // Redirect after 5 seconds

    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-300 to-pink-300">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold text-pink-600 mb-4 font-playfair">Happy Birthday, Eesha!</h1>
        <p className="text-xl text-blue-600 mb-8">You've unlocked your special surprise!</p>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-lg text-pink-500">
            I love you more than words can express. Here's to another year of joy, laughter, and love together!
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
}


'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'

const ReactConfetti = dynamic(() => import('react-confetti'), { ssr: false })

export default function SurprisePage() {
  const router = useRouter()
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/love-letter')
    }, 5000) // Redirect after 5 seconds

    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight })
    }

    // Set initial size
    handleResize()

    // Add event listener
    window.addEventListener('resize', handleResize)

    return () => {
      clearTimeout(timer)
      window.removeEventListener('resize', handleResize)
    }
  }, [router])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-300 to-pink-300">
      <ReactConfetti width={windowSize.width} height={windowSize.height} />
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold text-pink-600 mb-4 font-playfair">Happy Birthday, Eesha!</h1>
        <p className="text-xl text-blue-600 mb-8">You&apos;ve unlocked your special surprise!</p>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-lg text-pink-500">
            I love you more than words can express. Here&apos;s to another year of joy, laughter, and love together!
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
}


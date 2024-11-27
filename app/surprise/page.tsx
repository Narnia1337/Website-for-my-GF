'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'

const ReactConfetti = dynamic(() => import('react-confetti'), { ssr: false })

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      when: "beforeChildren",
      staggerChildren: 0.2
    }
  }
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10
    }
  }
}

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
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-300 to-pink-300"
    >
      <ReactConfetti width={windowSize.width} height={windowSize.height} />
      <motion.div
        variants={itemVariants}
        className="text-center"
      >
        <h1 className="text-4xl font-bold text-pink-600 mb-4 font-playfair">Happy Birthday, Eesha!</h1>
        <p className="text-xl text-blue-600 mb-8">You&apos;ve unlocked your special surprise!</p>
        <motion.div
          variants={itemVariants}
        >
          <p className="text-lg text-pink-500">
            I love you more than words can express. Here&apos;s to another year of joy, laughter, and love together!
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}


'use client'

import Image from 'next/image'
import { useBackgroundRotation } from '@/hooks/useBackgroundRotation'
import { motion, AnimatePresence } from 'framer-motion'

export function BackgroundImages() {
  const currentImage = useBackgroundRotation()

  return (
    <div className="fixed inset-0">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentImage}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <Image
            src={currentImage}
            alt="Background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-amber-900/60 to-rose-900/60 backdrop-blur-sm" />
        </motion.div>
      </AnimatePresence>
    </div>
  )
}


'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { X } from 'lucide-react'

const photos = [
  "/lp_image.jpeg",
  "/IMG_8679.jpeg",
  "/IMG_8923.jpeg",
  "/IMG_8509.jpeg",
  "/IMG_8739.jpeg",
  "/IMG_8681.jpeg",
  "/IMG_8641.jpeg",
  "/IMG_9307.jpeg"
]

export function PhotoGallery() {
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null)
  const [revealedCount, setRevealedCount] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setRevealedCount(prev => {
        if (prev < photos.length - 1) return prev + 1
        clearInterval(timer)
        return prev
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="py-12 bg-gradient-to-r from-pink-50 to-blue-50">
      <h2 className="text-3xl font-bold text-center text-pink-600 mb-8 font-playfair">
        My Favorite Moments of You
      </h2>
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {photos.map((photo, index) => (
            <motion.div
              key={photo}
              initial={{ opacity: 0, y: 20 }}
              animate={index <= revealedCount ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="relative aspect-[3/4] cursor-pointer"
              onClick={() => setSelectedPhoto(photo)}
            >
              <Image
                src={photo}
                alt="Eesha"
                fill
                className="object-cover rounded-lg border-4 border-pink-300"
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedPhoto && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-pink-400 transition-colors"
            onClick={() => setSelectedPhoto(null)}
          >
            <X size={32} />
          </button>
          <div className="relative max-w-4xl w-full max-h-[80vh] aspect-[3/4]">
            <Image
              src={selectedPhoto}
              alt="Eesha"
              fill
              className="object-contain"
            />
          </div>
        </motion.div>
      )}
    </div>
  )
}


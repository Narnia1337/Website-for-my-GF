'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { useState } from 'react'
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
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative aspect-[3/4] cursor-pointer"
              onClick={() => setSelectedPhoto(photo)}
            >
              <Image
                src={photo}
                alt="Eesha"
                fill
                className="object-cover rounded-lg"
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


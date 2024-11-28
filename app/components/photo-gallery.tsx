'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
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
  const [visiblePhotos, setVisiblePhotos] = useState<string[]>([])
  const galleryRef = useRef<HTMLDivElement>(null)
  const photoRefs = useRef<(HTMLDivElement | null)[]>([])

  const setPhotoRef = useCallback((index: number) => (el: HTMLDivElement | null) => {
    photoRefs.current[index] = el
  }, [])

  useEffect(() => {
    const observers = photoRefs.current.map((ref, index) => {
      if (!ref) return null

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setVisiblePhotos(prev => [...prev, photos[index]])
            }, index * 750) // 1 second delay between each photo
            observer.disconnect()
          }
        },
        {
          root: null,
          rootMargin: '50px',
          threshold: 0.1
        }
      )

      observer.observe(ref)
      return observer
    })

    return () => {
      observers.forEach(observer => observer?.disconnect())
    }
  }, [])

  return (
    <div ref={galleryRef} className="py-12 bg-gradient-to-r from-pink-50 to-blue-50">
      <h2 className="text-3xl font-bold text-center text-pink-600 mb-8 font-playfair">
        My Favorite Moments of You
      </h2>
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {photos.map((photo, index) => (
            <div
              key={photo}
              ref={setPhotoRef(index)}
              className="relative aspect-[3/4]"
            >
              {visiblePhotos.includes(photo) && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="w-full h-full cursor-pointer group"
                  onClick={() => setSelectedPhoto(photo)}
                >
                  <div className="absolute inset-0 rounded-lg border-4 border-pink-200 p-2 transition-all duration-300 group-hover:border-pink-300">
                    <div className="relative w-full h-full overflow-hidden rounded-lg">
                      <Image
                        src={photo}
                        alt="Eesha"
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 768px) 50vw, 25vw"
                        loading="lazy"
                        quality={75}
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence>
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
              onClick={(e) => {
                e.stopPropagation()
                setSelectedPhoto(null)
              }}
            >
              <X size={32} />
            </button>
            <div className="relative max-w-4xl w-full max-h-[80vh] aspect-[3/4]">
              <div className="absolute inset-0 rounded-lg border-8 border-pink-200/20 overflow-hidden">
                <Image
                  src={selectedPhoto}
                  alt="Eesha"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}


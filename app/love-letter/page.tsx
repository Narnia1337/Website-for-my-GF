'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { RelationshipTimeline } from '../components/relationship-timeline'
import { LoveNotes } from '../components/love-notes'
import { MusicPlayer } from '../components/music-player'
import { PhotoGallery } from '../components/photo-gallery'
import { LoveMap } from '../components/love-map'
import { Button } from "@/components/ui/button"
import { Heart } from 'lucide-react'

interface ImageInfo {
  src: string;
  needsMiddleAlignment: boolean;
}

const images: ImageInfo[] = [
  { src: '/hoco.jpeg', needsMiddleAlignment: true },
  { src: '/museum.jpeg', needsMiddleAlignment: false },
  { src: '/IMG_9145.jpeg', needsMiddleAlignment: true },
  { src: '/IMG_9355.jpeg', needsMiddleAlignment: true },
  { src: '/july15.jpeg', needsMiddleAlignment: false },
  { src: '/nobu1.jpeg', needsMiddleAlignment: false },
  { src: '/concert.jpeg', needsMiddleAlignment: false },
  { src: '/seniorsunrise.jpeg', needsMiddleAlignment: false },
]

export default function LoveLetterPage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8])

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, 5000)

    return () => clearInterval(intervalId)
  }, [])

  const currentImage = images[currentImageIndex]

  return (
    <div ref={containerRef}>
      <div className="min-h-screen relative overflow-hidden">
        <motion.div 
          className="fixed inset-0 z-0"
          style={{ opacity }}
        >
          <div className="relative w-full h-full">
            <Image
              src={currentImage.src}
              alt={`Couple image ${currentImageIndex + 1}`}
              fill
              className="object-cover"
              sizes="100vw"
              priority
              style={{
                objectPosition: currentImage.needsMiddleAlignment ? 'center 25%' : 'center',
              }}
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/70 to-pink-900/70" />
        </motion.div>

        <motion.div 
          className="relative z-10 min-h-screen flex items-end justify-start p-8"
          style={{ scale, opacity }}
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-pink-100 mb-8 ml-8 font-playfair">
            I love you
          </h1>
        </motion.div>
      </div>

      <RelationshipTimeline />
      
      <PhotoGallery />

      <div className="relative z-10 bg-blue-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            <LoveNotes />
            <MusicPlayer />
            <LoveMap />
          </div>

          <div className="mt-16 text-center">
            <Link href="/love-letter/full-essay">
              <Button className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-4 px-8 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105">
                <Heart className="w-6 h-6 mr-2" />
                Read My Love Letter to You
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}


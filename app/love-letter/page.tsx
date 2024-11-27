'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { RelationshipTimeline } from '../components/relationship-timeline'
import { LoveNotes } from '../components/love-notes'
import { PhotoGallery } from '../components/photo-gallery'
import { LoveMap } from '../components/love-map'
import { Button } from "@/components/ui/button"
import { Heart } from 'lucide-react'
import { MusicPlayer } from '../components/music-player'

interface ImageInfo {
  src: string;
  needsMiddleAlignment: boolean;
  needsTopAlignment: boolean;
  customAlignment?: boolean;
}

const images: ImageInfo[] = [
  { src: '/hoco.jpeg', needsMiddleAlignment: true, needsTopAlignment: false },
  { src: '/museum.jpeg', needsMiddleAlignment: false, needsTopAlignment: false },
  { src: '/IMG_9145.jpeg', needsMiddleAlignment: true, needsTopAlignment: false },
  { src: '/IMG_9355.jpeg', needsMiddleAlignment: false, needsTopAlignment: true },
  { src: '/july15.jpeg', needsMiddleAlignment: false, needsTopAlignment: false, customAlignment: true },
  { src: '/nobu1.jpeg', needsMiddleAlignment: false, needsTopAlignment: false },
  { src: '/concert.jpeg', needsMiddleAlignment: false, needsTopAlignment: false },
  { src: '/seniorsunrise.jpeg', needsMiddleAlignment: false, needsTopAlignment: false },
]

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -20 }
}

const pageTransition = {
  type: "spring",
  stiffness: 100,
  damping: 20
}

export default function LoveLetterPage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const timelineRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start start", "end start"]
  })

  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, 5000)

    return () => clearInterval(intervalId)
  }, [])

  const currentImage = images[currentImageIndex]

  return (
    <motion.div 
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className="relative"
    >
      <motion.div 
        className="fixed inset-0 z-0"
        style={{ opacity }}
      >
        <div className="absolute inset-0 transition-opacity duration-1000 ease-in-out">
          <Image
            src={currentImage.src}
            alt={`Couple image ${currentImageIndex + 1}`}
            fill
            className="object-cover"
            sizes="100vw"
            priority
            style={{
              objectPosition: currentImage.customAlignment 
                ? 'center 25%'
                : currentImage.needsTopAlignment 
                  ? 'center top' 
                  : currentImage.needsMiddleAlignment 
                    ? 'center 25%' 
                    : 'center',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/70 to-pink-900/70" />
        </div>
      </motion.div>

      <div className="relative z-10">
        <div className="min-h-screen flex items-end justify-start p-8">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-pink-100 mb-8 ml-8 font-playfair">
            I love you
          </h1>
        </div>

        <div ref={timelineRef}>
          <RelationshipTimeline />
        </div>

        <div className="bg-white">
          <PhotoGallery />

          <div className="relative z-10 bg-blue-50 py-16">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="space-y-12">
                <LoveNotes />
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
      </div>

      <MusicPlayer />
    </motion.div>
  )
}


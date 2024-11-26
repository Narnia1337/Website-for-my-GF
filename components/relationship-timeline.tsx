'use client'

import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

interface TimelineEvent {
  date: string
  title: string
  description: string
}

const events: TimelineEvent[] = [
  {
    date: 'July 15, 2022',
    title: 'Our First Date',
    description: 'We went to that cute café and talked for hours. I knew then that you were special.'
  },
  {
    date: 'October 31, 2022',
    title: 'Our First Halloween Together',
    description: 'Remember our matching costumes? You made such a cute witch!'
  },
  {
    date: 'December 25, 2022',
    title: 'Our First Christmas',
    description: 'Waking up next to you on Christmas morning was the best gift I could ask for.'
  },
  {
    date: 'February 14, 2023',
    title: "Valentine's Day Surprise",
    description: "I'll never forget the look on your face when you saw the candlelit dinner I prepared."
  },
  {
    date: 'May 1, 2023',
    title: 'Our First Trip Together',
    description: "Exploring a new city with you was an adventure I'll always cherish."
  }
]

export function RelationshipTimeline() {
  return (
    <div className="py-12 bg-gradient-to-r from-pink-100 to-blue-100">
      <h2 className="text-3xl font-bold text-center text-pink-600 mb-8 font-playfair">Our Love Story</h2>
      <div className="max-w-3xl mx-auto">
        {events.map((event, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            className="mb-8 flex"
          >
            <div className="flex-shrink-0 w-24 text-right mr-4">
              <div className="text-sm font-semibold text-blue-600">{event.date}</div>
            </div>
            <div className="flex-grow pb-8 border-l-2 border-pink-300 pl-4">
              <div className="relative">
                <div className="absolute -left-6 top-1 w-4 h-4 bg-pink-400 rounded-full"></div>
                <h3 className="text-xl font-semibold text-pink-600 mb-2">{event.title}</h3>
                <p className="text-blue-600">{event.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      <motion.div 
        className="flex justify-center mt-8"
        initial={{ y: -10 }}
        animate={{ y: 10 }}
        transition={{ repeat: Infinity, repeatType: "reverse", duration: 1 }}
      >
        <ChevronDown className="w-8 h-8 text-pink-500" />
      </motion.div>
    </div>
  )
}


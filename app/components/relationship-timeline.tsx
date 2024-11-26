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
    date: 'May 3, 2024',
    title: 'The day I first saw you',
    description: 'Who knew you doing something as simple as fixing my wig could change my life forever.'
  },
  {
    date: 'May 15, 2024',
    title: 'Our very first date at Haraz',
    description: 'I could not stop fumbling over my words.'
  },
  {
    date: 'May 16, 2024',
    title: 'Our very first hangout',
    description: 'The crazy rain, that fun drive... RIP to that umbrella though.'
  },
  {
    date: 'June 11, 2024',
    title: "An Unforgettable Birthday Dinner",
    description: "You introduced me to a whole new part of Houston that I'd never seen, food was phenomenal, and you looked stunning. "
  },
  {
    date: 'June 18, 2024',
    title: 'Bryson Tiller Concert',
    description: "While this concert was not what we were expecting, I still had a lot of fun and I'm so glad you were there with me."
  },
  {
    date: 'July 15, 2024',
    title: 'The Day',
    description: "This was the day I asked if I could have the honor of becoming your boyfriend. The best day of my life when you said yes."
  },
  {
    date: 'September 21, 2024',
    title: 'Hoco Night!',
    description: 'This day was just spectacular, your perfect planning paired perfectly with the group and it was a night I will never forget.'
  }
]

export function RelationshipTimeline() {
  return (
    <div className="py-12 bg-gradient-to-r from-pink-100 to-blue-100">
      <h2 className="text-3xl font-bold text-center text-pink-600 mb-8 font-playfair">Our Love Story</h2>
      <div className="max-w-3xl mx-auto relative">
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-pink-300"></div>
        {events.map((event, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            className={`mb-8 flex items-center ${index % 2 === 0 ? 'flex-row-reverse' : 'flex-row'}`}
          >
            <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'pl-8'}`}>
              <div className="text-sm font-semibold text-blue-600 mb-1">{event.date}</div>
              <h3 className="text-xl font-semibold text-pink-600 mb-2">{event.title}</h3>
              <p className="text-blue-600">{event.description}</p>
            </div>
            <div className="z-10 flex items-center justify-center w-10 h-10 bg-pink-400 rounded-full border-4 border-white shadow-md">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.2 + 0.2, type: 'spring', stiffness: 260, damping: 20 }}
                className="w-3 h-3 bg-white rounded-full"
              />
            </div>
            <div className="w-5/12"></div>
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


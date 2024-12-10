'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { EnvelopeAnimation } from '@/app/components/envelope-animation'
import { AnimatedBackground } from '@/app/components/animated-background'

export default function FullEssayPage() {
  const [showContent, setShowContent] = useState(false)

  const handleAnimationComplete = () => {
    setShowContent(true)
  }

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <AnimatedBackground />
      <div className="absolute inset-0 bg-gradient-to-br from-pink-100/70 to-purple-100/70 z-0" />
      <AnimatePresence mode="wait">
        {!showContent && <EnvelopeAnimation onAnimationComplete={handleAnimationComplete} />}
        {showContent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="relative z-10"
          >
            <Link href="/love-letter" className="inline-flex items-center text-pink-600 hover:text-pink-700 mb-8">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Our Love Story
            </Link>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="max-w-3xl mx-auto bg-white/90 backdrop-blur-sm rounded-lg shadow-2xl overflow-hidden"
            >
              <div className="p-8 sm:p-12">
                <h1 className="text-4xl font-bold text-center text-pink-600 mb-8 font-playfair">My Love Letter to You</h1>
                <div className="prose prose-lg prose-pink mx-auto font-handwriting whitespace-pre-wrap">
                  {`My dearest Eesha,

I am so deeply in love with you. As overwhelming as my feelings might be, I still find myself struggling to put my exact sentiments into words. Still, I will attempt to describe just how much you mean to me. Today is your birthday, and thus, I wish to woo you with a walk through the story of our love and the numerous ways that made you such a dear to me.

I first met you over six months ago, and all you did was fix my Einstein wig. Who knew something as simple as a dress-up event for class would bring the most beautiful girl in the world into my life? Ever since that day, I have realized that you are the one who adds beauty to my life. Your smile, laughter, and pretty eyes entrap me; I've been in love since.

We first hung out in Haraz on May 15th; I remember every single detail, from me fumbling over my words to giving you pictures of the entire pre-cal test. The very next day, we planned our second hangout, and in spite of the crazy rain and that lost umbrella, the day was perfect because I was with you.

We enjoyed the journey, laughed, explored, and even learned together. From the awkward dates to today's cute, comfortable silence, I am grateful for it all. I equally like how we can make fun of each other, how you stand for me, and how we deal with problems as a pair. I'm sure you remember our first-ever concert together, Bryson Tiller. While we did spend almost two hours waiting for him to show up, waiting that long was completely worth it because I spent that time waiting with you.

You are not only my lover but also my friend, my advisor, and my companion in everything that happens in my life. With you, I excel like no other thing could ever bring me down. You protect me, embrace me, and appreciate me and all that I am. The fact that you comprehend me better than I do is a blessing that I enjoy daily.

July 15th is a day I will never forget. The day you agreed to be my girlfriend was the best day of my life. Since then, every day I spent with you was a day I will always be grateful for. Your love inspires me to reach out as far as possible and even go beyond that to be as great as possible.

Sure, I love the small things you do—when you frown while laughing, how you get so animated when talking about stupid drivers, and how you like dealing with problems head-on. I like your brain, your sense of humor, and your beautiful personality, no matter what happens. My days were gray and boring before you shared them with me and made every day special.

On this happy occasion of another year of your life, I want to express my happiness that you were born and all the words I can tell you about how happy you have made me. You add spice to my everyday life; I can hardly wait to make more beautiful memories with you. Every moment spent with you, whether a quiet night in the study watching a movie or an exciting night going out to eat, it is always a blessing.

I will do anything for you, and I will not let you down; I will be there for your success and your tears and the cause of your happiness. I solemnly vow to love you, especially when things are terrible, not in the good times. I promise to be with you every day and age, to gain from you, and to value you forever. You have my word that I will be the best companion through all the adventures life presents, from the easiest to the most complicated ones.

Eesha, you are the dream I never knew I had, the love I have longed for, and now you are my everything—my wife, my lover, my dearest friend. Your birthday is not just a celebration of you; it is a reflection of the happiness you bring to the world. I am endlessly grateful for the fate that led us to one another, and I promise to spend every day proving my love for you.

Happy birthday. I cannot wait for what the future holds for us.

With endless love,
Devesh`}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}


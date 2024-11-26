'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { motion } from "framer-motion"
import { Heart } from 'lucide-react'

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [password, setPassword] = useState('')
  const router = useRouter()

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)

    if (password.toLowerCase() === '1210') {
      setTimeout(() => {
        router.push('/surprise')
      }, 1000)
    } else {
      setTimeout(() => {
        setIsLoading(false)
        setPassword('')
      }, 1000)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full max-w-md px-8 py-12 rounded-3xl bg-gradient-to-br from-pink-100 to-blue-100 shadow-xl"
    >
      <motion.div 
        className="flex justify-center mb-6"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.3, duration: 0.5, type: "spring" }}
      >
        <Heart className="w-16 h-16 text-pink-500" />
      </motion.div>
      <motion.h2 
        className="text-3xl font-bold text-center text-pink-600 mb-6 font-playfair"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        Welcome, Eesha!
      </motion.h2>
      <motion.p 
        className="text-center text-blue-600 mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        Enter your password to unlock your surprise
      </motion.p>
      <form onSubmit={onSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="password" className="text-pink-600">Password</Label>
          <Input 
            id="password" 
            type="password" 
            placeholder="Enter your special day" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-white/50 text-blue-600 placeholder-blue-300 border-pink-200 focus:border-pink-400 focus:ring-pink-400"
          />
        </div>
        <Button 
          className="w-full bg-pink-500 text-white hover:bg-pink-600 transition-colors duration-300 rounded-full" 
          type="submit" 
          disabled={isLoading}
        >
          {isLoading ? 'Unlocking...' : 'Unlock Surprise'}
        </Button>
      </form>
      <motion.p 
        className="text-sm text-center text-blue-500 mt-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.6 }}
      >
        Hint: It's my phone password ❤️ (Format: ####)
      </motion.p>
    </motion.div>
  )
}


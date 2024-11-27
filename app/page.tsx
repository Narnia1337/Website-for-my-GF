'use client'

import { motion } from 'framer-motion'
import { LoginForm } from "@/components/login-form"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      when: "beforeChildren",
      staggerChildren: 0.3
    }
  }
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10
    }
  }
}

export default function Home() {
  return (
    <motion.main 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex min-h-screen flex-col items-center justify-center p-24 bg-gradient-to-r from-blue-200 to-pink-200"
    >
      <motion.div variants={itemVariants}>
        <LoginForm />
      </motion.div>
    </motion.main>
  )
}


'use client'

import React, { useState, useEffect } from 'react'
import styles from './envelope-animation.module.css'

interface EnvelopeAnimationProps {
  onAnimationComplete: () => void;
}

export const EnvelopeAnimation: React.FC<EnvelopeAnimationProps> = ({ onAnimationComplete }) => {
  const [animationState, setAnimationState] = useState('initial')

  useEffect(() => {
    const timer1 = setTimeout(() => setAnimationState('fly-in'), 0)
    const timer2 = setTimeout(() => setAnimationState('open'), 2000)
    const timer3 = setTimeout(() => setAnimationState('letter-out'), 3000)
    const timer4 = setTimeout(() => setAnimationState('letter-transform'), 5000)
    const timer5 = setTimeout(() => onAnimationComplete(), 6000)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
      clearTimeout(timer4)
      clearTimeout(timer5)
    }
  }, [onAnimationComplete])

  return (
    <div className={`${styles.container} ${styles[animationState]}`}>
      <div className={`${styles.envelope} ${styles[animationState]}`}>
        <div className={styles.flap}></div>
        <div className={styles.pocket}></div>
        <div className={`${styles.letter} ${styles[animationState]}`}>
          <div className={styles.letterContent}>
            <h2>My Love Letter</h2>
            <p>To my dearest Eesha...</p>
          </div>
        </div>
      </div>
    </div>
  )
}


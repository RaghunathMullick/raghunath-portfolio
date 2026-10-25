import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { MechanicalMotion } from './MechanicalMotion'

type CinematicIntroProps = { onComplete: () => void }

export function CinematicIntro({ onComplete }: CinematicIntroProps) {
  const reduced = useReducedMotion()
  const [leaving, setLeaving] = useState(false)
  useEffect(() => {
    if (reduced) { onComplete(); return }
    const timer = window.setTimeout(() => { setLeaving(true); window.setTimeout(onComplete, 480) }, 3100)
    return () => window.clearTimeout(timer)
  }, [onComplete, reduced])
  if (reduced) return null
  return <motion.div className="cinematic-intro" initial={{ opacity: 1 }} animate={{ opacity: leaving ? 0 : 1 }} transition={{ duration: .46, ease: [0.76, 0, .24, 1] }}>
    <button className="intro-skip" onClick={() => { setLeaving(true); window.setTimeout(onComplete, 240) }}>Skip intro</button>
    <div className="intro-mechanism"><MechanicalMotion reducedMotion={false}/></div>
    <div className="intro-copy"><motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .34, duration: .5 }}>Precision engineering / 01</motion.p><motion.h1 initial={{ clipPath: 'inset(0 100% 0 0)', x: -22 }} animate={{ clipPath: 'inset(0 0% 0 0)', x: 0 }} transition={{ delay: 1.45, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}>RAGHUNATH MULLICK</motion.h1><motion.span initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 2.18, duration: .55, ease: [0.16, 1, 0.3, 1] }}/></div>
  </motion.div>
}

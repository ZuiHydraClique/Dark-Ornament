/**
 * Ornaments.jsx
 * Sichtbare SVG-Ornamente mit Zeichenanimation (draw-on-scroll).
 * Technik: Framer Motion pathLength 0→1, gefolgt von einem Glow-Effekt.
 */

import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'

const DRAW_EASE = [0.25, 0.46, 0.45, 0.94]

/* Ornament-Farbe: sehr gedimmt — kaum sichtbar, nur als Textur */
const C = '#ff0000'         // Basis-Farbe (Hover-Glow)
const CO = 'rgba(236, 13, 13, 0.78)'  // 28% Opacity — dezent

/**
 * Hook: Gibt isInView zurück und setzt "glowing" nach `glowDelay` ms.
 */
function useDrawEffect(amount = 1.5, glowDelay = 1600) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount })
  const [glowing, setGlowing] = useState(false)

  useEffect(() => {
    if (!isInView) return
    const t = setTimeout(() => setGlowing(true), glowDelay)
    return () => clearTimeout(t)
  }, [isInView, glowDelay])

  return { ref, isInView, glowing }
}

/** Hilfsfunktion für animierte Pfad-Props */
function pathAnim(isInView, delay = 0, duration = 1.4) {
  return {
    initial: { pathLength: 0, opacity: 0 },
    animate: isInView ? { pathLength: 1, opacity: 1 } : {},
    transition: {
      pathLength: { duration, delay, ease: DRAW_EASE },
      opacity: { duration: 0.2, delay },
    },
  }
}

/* ──────────────────────────────────────────────────────
   SectionDivider — Linien, die sich von der Mitte aus
   nach links und rechts ziehen, plus zentriertes Rautensymbol
   ────────────────────────────────────────────────────── */
export function SectionDivider({ className = '' }) {
  const { ref, isInView, glowing } = useDrawEffect(0.9, 1600)

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`ornament flex items-center justify-center py-3 ${className}`}
      style={{ opacity: 0.45, filter: 'blur(0.4px)' }}
    >
      <motion.svg
        width="340" height="20" viewBox="0 0 340 20" fill="none"
        animate={{
          filter: glowing
            ? 'drop-shadow(0 0 6px rgba(185,28,28,0.5))'
            : 'none',
        }}
        transition={{ filter: { duration: 0.7, ease: 'easeOut' } }}
      >
        <motion.line x1="160" y1="10" x2="10" y2="10" stroke={CO} strokeWidth="1.2" {...pathAnim(isInView, 0.2, 1.2)} />
        <motion.line x1="180" y1="10" x2="330" y2="10" stroke={CO} strokeWidth="1.2" {...pathAnim(isInView, 0.2, 1.2)} />
        <motion.path d="M 170 2 L 178 10 L 170 18 L 162 10 Z" stroke={CO} strokeWidth="1.2" fill="none" {...pathAnim(isInView, 0.0, 0.8)} />
        <motion.path d="M 170 6 L 174 10 L 170 14 L 166 10 Z" stroke={CO} strokeWidth="0.8" fill={C}
          style={{ fillOpacity: isInView ? 0.25 : 0 }} {...pathAnim(isInView, 0.5, 0.6)} />
        {[50, 100].map((x) => (
          <motion.circle key={x} cx={x} cy={10} r="2" stroke={CO} strokeWidth="1" {...pathAnim(isInView, 0.6 + x / 400, 0.4)} />
        ))}
        {[240, 290].map((x) => (
          <motion.circle key={x} cx={x} cy={10} r="2" stroke={CO} strokeWidth="1" {...pathAnim(isInView, 0.6 + x / 1000, 0.4)} />
        ))}
      </motion.svg>
    </div>
  )
}

/* ──────────────────────────────────────────────────────
   CornerFlourishes — L-förmige Eckverzierungen
   ────────────────────────────────────────────────────── */
function CornerBracket({ rotate = 0, delay = 0, isInView, glowing, className = '' }) {
  return (
    <motion.svg
      aria-hidden="true"
      width="52" height="52" viewBox="0 0 52 52" fill="none"
      style={{ transform: `rotate(${rotate}deg)`, opacity: 0.35, filter: 'blur(0.5px)' }}
      className={`absolute ${className}`}
      animate={{
        filter: glowing ? 'blur(0.5px) drop-shadow(0 0 5px rgba(185,28,28,0.4))' : 'blur(0.5px)',
      }}
      transition={{ filter: { duration: 0.6 } }}
    >
      <motion.path d="M 3 49 L 3 3 L 49 3" stroke={CO} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...pathAnim(isInView, delay, 0.9)} />
      <motion.path d="M 10 49 L 10 10 M 49 10 L 10 10" stroke={CO} strokeWidth="0.7" strokeLinecap="round" strokeOpacity={0.5} {...pathAnim(isInView, delay + 0.5, 0.7)} />
    </motion.svg>
  )
}

export function CornerFlourishes() {
  const { ref, isInView, glowing } = useDrawEffect(0.4, 1800)

  return (
    <div ref={ref}>
      <CornerBracket rotate={0} delay={0} isInView={isInView} glowing={glowing} className="top-3 left-3" />
      <CornerBracket rotate={90} delay={0.15} isInView={isInView} glowing={glowing} className="top-3 right-3" />
      <CornerBracket rotate={180} delay={0.3} isInView={isInView} glowing={glowing} className="bottom-3 right-3" />
      <CornerBracket rotate={270} delay={0.45} isInView={isInView} glowing={glowing} className="bottom-3 left-3" />
    </div>
  )
}

/* ──────────────────────────────────────────────────────
   FloatingOrnamentLeft / Right — vertikale Ornamente
   Nur auf Desktop sichtbar (hidden sm:block)
   ────────────────────────────────────────────────────── */
function FloatingSpine({ side = 'left' }) {
  const { ref, isInView, glowing } = useDrawEffect(0.15, 2500)
  const ticks = [55, 110, 165, 220, 275]

  return (
    <motion.svg
      ref={ref}
      aria-hidden="true"
      viewBox="0 0 80 340"
      fill="none"
      className={`ornament hidden sm:block absolute ${side === 'left' ? 'left-0' : 'right-0'} top-1/2 -translate-y-1/2 w-14 lg:w-20`}
      style={{ opacity: 0.3, filter: 'blur(0.6px)' }}
      animate={{
        filter: glowing
          ? 'blur(0.6px) drop-shadow(0 0 6px rgba(185,28,28,0.4))'
          : 'blur(0.6px)',
      }}
      transition={{ filter: { duration: 0.8 } }}
    >
      <motion.line x1="40" y1="20" x2="40" y2="320" stroke={CO} strokeWidth="1.2" {...pathAnim(isInView, 0, 1.5)} />
      {ticks.map((y, i) => (
        <motion.line key={y} x1="18" y1={y} x2="62" y2={y} stroke={CO} strokeWidth="1" {...pathAnim(isInView, 0.4 + i * 0.12, 0.6)} />
      ))}
      {ticks.map((y, i) => (
        <motion.circle key={`c${y}`} cx="40" cy={y} r="4" stroke={CO} strokeWidth="1.2" {...pathAnim(isInView, 0.6 + i * 0.12, 0.5)} />
      ))}
      <motion.circle cx="40" cy="170" r="7" stroke={CO} strokeWidth="1.6" {...pathAnim(isInView, 1.2, 0.8)} />
      <motion.path d="M 36 170 L 44 170 M 40 166 L 40 174" stroke={CO} strokeWidth="1" strokeLinecap="round" {...pathAnim(isInView, 1.6, 0.4)} />
    </motion.svg>
  )
}

export function FloatingOrnamentLeft() { return <FloatingSpine side="left" /> }
export function FloatingOrnamentRight() { return <FloatingSpine side="right" /> }

/* ──────────────────────────────────────────────────────
   HeroOrnament — großes Mandala/Kreisornament rechts oben
   ────────────────────────────────────────────────────── */
export function HeroOrnament() {
  const { ref, isInView, glowing } = useDrawEffect(0.2, 3000)

  const spokes = Array.from({ length: 12 }).map((_, i) => {
    const angle = (i * 30 * Math.PI) / 180
    return {
      x1: 150 + 78 * Math.cos(angle),
      y1: 150 + 78 * Math.sin(angle),
      x2: 150 + 138 * Math.cos(angle),
      y2: 150 + 138 * Math.sin(angle),
    }
  })

  return (
    <motion.svg
      ref={ref}
      aria-hidden="true"
      viewBox="0 0 300 300"
      fill="none"
      className="ornament hidden md:block absolute top-10 right-8 lg:right-12 xl:right-20 w-52 lg:w-64 xl:w-72"
      animate={{
        filter: glowing
          ? 'drop-shadow(0 0 12px rgba(185,28,28,0.9))'
          : 'drop-shadow(0 0 0px rgba(185,28,28,0))',
      }}
      transition={{ filter: { duration: 0.9 } }}
    >
      {/* Äußerer Ring */}
      <motion.circle cx="150" cy="150" r="138" stroke="#b91c1c" strokeWidth="0.8"
        {...pathAnim(isInView, 0, 2.0)} />
      {/* Mittlerer Ring */}
      <motion.circle cx="150" cy="150" r="108" stroke="#b91c1c" strokeWidth="0.7"
        {...pathAnim(isInView, 0.3, 1.8)} />
      {/* Innerer Ring */}
      <motion.circle cx="150" cy="150" r="78" stroke="#b91c1c" strokeWidth="1.0"
        {...pathAnim(isInView, 0.6, 1.5)} />
      {/* Speichen */}
      {spokes.map(({ x1, y1, x2, y2 }, i) => (
        <motion.line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
          stroke="#b91c1c" strokeWidth="0.6"
          {...pathAnim(isInView, 1.0 + i * 0.04, 0.5)} />
      ))}
      {/* Zentralraute */}
      <motion.path
        d="M 150 136 L 164 150 L 150 164 L 136 150 Z"
        stroke="#b91c1c" strokeWidth="1.2"
        {...pathAnim(isInView, 1.6, 0.8)}
      />
      {/* Innere Zentralraute */}
      <motion.path
        d="M 150 143 L 157 150 L 150 157 L 143 150 Z"
        stroke="#b91c1c" strokeWidth="1" fill="#b91c1c"
        style={{ fillOpacity: isInView ? 0.6 : 0 }}
        {...pathAnim(isInView, 2.0, 0.5)}
      />
    </motion.svg>
  )
}

/* ──────────────────────────────────────────────────────
   DotGrid — Punktraster, blendet gestaffelt ein
   ────────────────────────────────────────────────────── */
export function DotGrid({ className = '' }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  const dots = []
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      dots.push({ cx: col * 24 + 12, cy: row * 24 + 12, delay: (row + col) * 0.04 })
    }
  }

  return (
    <svg
      ref={ref}
      aria-hidden="true"
      viewBox="0 0 204 204"
      fill="none"
      className={`ornament absolute ${className}`}
      preserveAspectRatio="xMidYMid slice"
    >
      {dots.map(({ cx, cy, delay }, i) => (
        <motion.circle
          key={i} cx={cx} cy={cy} r="2"
          fill="#b91c1c"
          initial={{ opacity: 0, scale: 0 }}
          animate={isInView ? { opacity: 0.4, scale: 1 } : {}}
          transition={{ duration: 0.4, delay, ease: DRAW_EASE }}
        />
      ))}
    </svg>
  )
}

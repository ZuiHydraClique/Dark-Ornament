import { Suspense } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import heroBg from '../assets/hero_bg.png'
import Logo3D from './Logo3D'

const EASE = [0.25, 0.26, 0.45, 0.94]

export default function Hero() {
  const scrollToGallery = () =>
    document.querySelector('#gallery')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section
      id="hero"
      className="relative h-screen min-h-[600px] flex items-center overflow-hidden"
    >
      {/* ── Statischer Hintergrund (kein Parallax) ── */}
      <div className="absolute inset-0 w-full h-full" aria-hidden="true">
        <motion.img
          src={heroBg}
          alt=""
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, ease: EASE }}
          className="w-full h-full object-cover object-center"
          loading="eager"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-hero-gradient" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_20%_50%,rgba(185,28,28,0.12)_0%,transparent_70%)]" />
      </div>

      {/* ── Vertikale Akzentlinie ── */}
      <div
        className="absolute top-0 left-4 sm:left-8 lg:left-14 w-px h-full bg-gradient-to-b from-transparent via-crimson/20 to-transparent pointer-events-none"
        aria-hidden="true"
      />

      {/* ── 3D-Logo (rechte Seite, nur ab lg) ── */}
      <Logo3D className="absolute right-0 top-0 w-[50vw] h-full hidden lg:block pointer-events-none z-[1]" />

      {/* ── Textinhalt — LINKSBÜNDIG (z-10 liegt über Canvas) ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 xl:px-20">
        <div className="max-w-xl">

          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0, x: -14 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.1, ease: EASE }}
            className="text-crimson text-[10px] sm:text-xs font-semibold tracking-[0.5em] uppercase mb-5 sm:mb-6"
          >
            Premium Tattoo-Kunst
          </motion.p>

          {/* Hauptüberschrift */}
          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.2, ease: EASE }}
            className="font-display font-black text-5xl sm:text-6xl lg:text-7xl xl:text-[5.5rem] text-white leading-[1.0] mb-5"
          >
            Dark
            <br />
            <em className="text-crimson not-italic">Ornament</em>
          </motion.h1>

          {/* Trennlinie */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.0, delay: 0.45, ease: EASE }}
            className="origin-left h-px w-2/3 bg-gradient-to-r from-crimson via-crimson/50 to-transparent mb-5"
            aria-hidden="true"
          />

          {/* Untertitel */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.48, ease: EASE }}
            className="text-gray-300 text-sm sm:text-base max-w-md mb-3 leading-relaxed"
          >
            Fine Line · Blackwork · Ornament
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.62 }}
            className="text-gray-500 text-xs sm:text-sm mb-10 tracking-wide"
          >
            Raul Pinkasov — Privates Studio, Nürnberg
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.72, ease: EASE }}
            className="flex flex-row flex-wrap gap-3 sm:gap-4"
          >
            <a
              href="#booking"
              id="hero-book-cta"
              onClick={(e) => {
                e.preventDefault()
                document.querySelector('#booking')?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="btn-primary text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-4 shadow-[0_0_28px_rgba(185,28,28,0.35)]"
            >
              Session buchen
            </a>
            <a
              href="#gallery"
              id="hero-gallery-cta"
              onClick={(e) => {
                e.preventDefault()
                document.querySelector('#gallery')?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="btn-outline text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-4"
            >
              Galerie ansehen
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 1.0 }}
            className="mt-12 sm:mt-14 flex items-start gap-8 sm:gap-12"
          >
            {[
              { value: '12+', label: 'Jahre Erfahrung' },
              { value: '1.200+', label: 'Zufriedene Kunden' },
              { value: '18', label: 'Auszeichnungen' },
            ].map(({ value, label }) => (
              <div key={label}>
                <p className="font-display text-2xl sm:text-3xl font-bold text-white">{value}</p>
                <p className="text-gray-500 text-[10px] sm:text-xs mt-1 tracking-wide uppercase">{label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ── Scroll-Indikator ── */}
      <motion.button
        onClick={scrollToGallery}
        aria-label="Nach unten scrollen"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        className="absolute bottom-7 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 text-gray-500 hover:text-crimson transition-colors cursor-pointer"
      >
        <span className="text-[9px] tracking-[0.35em] uppercase">Scrollen</span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 2.0, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </motion.button>
    </section>
  )
}

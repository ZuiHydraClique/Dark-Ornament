// Hilfsfunktion für Animationen
function getCardVariants(index) {
  const col = index % 3
  if (col === 0) return { hidden: { opacity: 0, x: -70 }, visible: { opacity: 1, x: 0 } }
  if (col === 2) return { hidden: { opacity: 0, x: 20 }, visible: { opacity: 1, x: 0 } }
  return { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }
}
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react'
import { SectionDivider, FloatingOrnamentLeft, FloatingOrnamentRight, HeroOrnament } from './Ornaments'

import video1 from '../assets/video_1.mp4'
import video2 from '../assets/video_2.mp4'
import video3 from '../assets/video_3.mp4'

const EASE = [0.25, 0.46, 0.45, 0.94]

const GALLERY_ITEMS = [
  {
    id: 1,
    src: video1,
    title: 'Studio Walkthrough',
    style: 'Studio Walkthrough',
    desc: 'Ein Rundgang durch das Studio.',
    href: 'https://example.com/video1'
  },
  {
    id: 2,
    src: video2,
    title: 'Tattoo Prozess',
    style: 'Video',
    desc: 'Einblick in den Tätowierprozess.',
    href: 'https://example.com/video2'
  },
  {
    id: 3,
    src: video3,
    title: 'Kunstwerke',
    style: 'Video · Kunst',
    desc: 'Präsentation ausgewählter Kunstwerke.',
    href: 'https://example.com/video3'
  }
]
function GalleryCard({ item, index, delay = 0, className = '' }) {
  const variants = getCardVariants(index)
  return (
    <motion.a
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, margin: '-60px' }}
      transition={{ duration: 0.55, delay, ease: EASE }}
      className={`relative group cursor-pointer block aspect-[4/5] md:aspect-[3/4] overflow-visible ${className}`}
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${item.title} Video ansehen`}
    >
      <div className="relative mx-auto w-full h-full max-w-sm lg:max-w-none">
        <div className="absolute -inset-3 border border-crimson/25 rounded-sm pointer-events-none" />
        <div className="absolute -inset-6 border border-crimson/10 rounded-sm pointer-events-none" />
        <video
          src={item.src}
          className="w-full h-full object-cover object-center rounded-sm transition-transform duration-700"
          muted
          autoPlay
          loop
          playsInline
          preload="metadata"
          tabIndex={-1}
        />
        <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-crimson rounded-br-sm" />
        <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-crimson rounded-tl-sm" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/50 to-transparent
                      opacity-0 group-hover:opacity-100 transition-opacity duration-500
                      flex flex-col justify-end p-5 pointer-events-none">
        <div className="translate-y-3 group-hover:translate-y-0 transition-transform duration-500">
          <p className="text-crimson text-[10px] font-semibold tracking-widest uppercase mb-1">{item.style}</p>
          <h3 className="text-white font-display text-xl font-bold">{item.title}</h3>
        </div>
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
          <ZoomIn className="w-5 h-5 text-white/80" />
        </div>
      </div>
      <div className="absolute top-3 left-3 bg-dark/70 backdrop-blur-sm border border-crimson/30 px-2 py-1 rounded-sm pointer-events-none">
        <span className="text-crimson text-[9px] sm:text-[10px] font-semibold tracking-wider uppercase">
          {item.style.split(' · ')[0]}
        </span>
      </div>
    </motion.a>
  )
}

// Lightbox wird nicht mehr benötigt, da Videos direkt verlinken

export default function Gallery() {
  // Animations-Delays für die drei Videos
  const delays = [0.1, 0.2, 0.3]

  return (
    <section id="gallery" className="py-20 sm:py-28 relative overflow-x-clip">
      <FloatingOrnamentLeft />
      <FloatingOrnamentRight />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Custom Grid: ab md zwei Spalten, links großes Video (row-span-2), rechts zwei kleine untereinander */}
        <div
          className="grid grid-cols-1 md:grid-cols-[2fr_0.3fr_1fr] md:grid-rows-2 gap-4 lg:gap-6"
        >
          {/* Großes Video links (nimmt 2 Zeilen ein) */}
          <GalleryCard
            item={GALLERY_ITEMS[0]}
            index={0}
            delay={delays[0]}
            className="md:row-span-2 md:col-span-1"
          />
          {/* Abstandhalter mit Mandala-Ornament */}
          <div className="hidden md:flex md:col-span-1 md:row-span-2 items-center justify-center relative" >
          </div>
          {/* Kleines Video oben rechts */}
          <GalleryCard
            item={GALLERY_ITEMS[1]}
            index={1}
            delay={delays[1]}
            className="md:col-span-1 md:row-span-1"
          />
          {/* Kleines Video unten rechts */}
          <GalleryCard
            item={GALLERY_ITEMS[2]}
            index={2}
            delay={delays[2]}
            className="md:col-span-1 md:row-span-1"
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ delay: 0.3, duration: 0.9, ease: EASE }}
          className="mt-12 sm:mt-14"
        >
          {/* <a
            href="#booking"
            onClick={(e) => { e.preventDefault(); document.querySelector('#booking')?.scrollIntoView({ behavior: 'smooth' }) }}
            className="btn-primary inline-flex"
          >
            Ein individuelles Werk beauftragen
          </a> */}
        </motion.div>
      </div>

      <SectionDivider className="mt-16 sm:mt-24 opacity-50" />
    </section>
  )
}

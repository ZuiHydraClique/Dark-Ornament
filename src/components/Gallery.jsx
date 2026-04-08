import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react'
import { SectionDivider, FloatingOrnamentLeft, FloatingOrnamentRight } from './Ornaments'
import tattoo1 from '../assets/tattoo_1.png'
import tattoo2 from '../assets/tattoo_2.png'
import tattoo3 from '../assets/tattoo_3.png'
import tattoo4 from '../assets/tattoo_4.png'
import tattoo5 from '../assets/tattoo_5.png'
import tattoo6 from '../assets/tattoo_6.png'

const EASE = [0.25, 0.46, 0.45, 0.94]

const GALLERY_ITEMS = [
  {
    id: 1,
    src: tattoo1,
    title: 'Ornamentales Mandala',
    style: 'Fine Line · Blackwork',
    desc: 'Aufwendiges Mandala mit heiliger Geometrie und ultrafein gezeichneten Linien.',
  },
  {
    id: 2,
    src: tattoo2,
    title: 'Dunkles Sleeve',
    style: 'Neo-Traditionell',
    desc: 'Kraftvolles Neo-Traditional-Sleeve mit Rosen, Totenköpfen und Raben.',
  },
  {
    id: 3,
    src: tattoo3,
    title: 'Koi & Wellen',
    style: 'Japanisch · Irezumi',
    desc: 'Japanisches Irezumi mit Koi-Fischen, Wellen und Kirschblüten.',
  },
  {
    id: 4,
    src: tattoo4,
    title: 'Heilige Geometrie',
    style: 'Dotwork · Geometrisch',
    desc: 'Allsehendes Auge im Dreieck, umgeben von ornamentalen Schnörkeln.',
  },
  {
    id: 5,
    src: tattoo5,
    title: 'Heilige Geometrie',
    style: 'Dotwork · Geometrisch',
    desc: 'Allsehendes Auge im Dreieck, umgeben von ornamentalen Schnörkeln.',
  },
  {
    id: 6,
    src: tattoo6,
    title: 'Heilige Geometrie',
    style: 'Dotwork · Geometrisch',
    desc: 'Allsehendes Auge im Dreieck, umgeben von ornamentalen Schnörkeln.',
  }
]

function getCardVariants(index) {
  const col = index % 3
  if (col === 0) return { hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }
  if (col === 2) return { hidden: { opacity: 0, x: 20 }, visible: { opacity: 1, x: 0 } }
  return { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }
}

function GalleryCard({ item, index, onClick }) {
  const variants = getCardVariants(index)
  return (
    <motion.article
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, margin: '-60px' }}
      transition={{ duration: 0.85, delay: (index % 3) * 0.1, ease: EASE }}
      className="relative group cursor-pointer overflow-hidden rounded-sm bg-surface aspect-[4/5]"
      onClick={() => onClick(index)}
      role="button"
      tabIndex={0}
      aria-label={`${item.title} in der Lightbox öffnen`}
      onKeyDown={(e) => e.key === 'Enter' && onClick(index)}
    >
      <img
        src={item.src}
        alt={item.title}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/50 to-transparent
                      opacity-0 group-hover:opacity-100 transition-opacity duration-500
                      flex flex-col justify-end p-5">
        <div className="translate-y-3 group-hover:translate-y-0 transition-transform duration-500">
          <p className="text-crimson text-[10px] font-semibold tracking-widest uppercase mb-1">{item.style}</p>
          <h3 className="text-white font-display text-xl font-bold">{item.title}</h3>
        </div>
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
          <ZoomIn className="w-5 h-5 text-white/80" />
        </div>
      </div>
      <div className="absolute top-3 left-3 bg-dark/70 backdrop-blur-sm border border-crimson/30 px-2 py-1 rounded-sm">
        <span className="text-crimson text-[9px] sm:text-[10px] font-semibold tracking-wider uppercase">
          {item.style.split(' · ')[0]}
        </span>
      </div>
    </motion.article>
  )
}

function Lightbox({ items, activeIndex, onClose, onPrev, onNext }) {
  const item = items[activeIndex]
  if (!item) return null
  return (
    <AnimatePresence>
      <motion.div
        key="lightbox"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
        onClick={onClose}
      >
        <button onClick={onClose} className="absolute top-4 right-4 z-10 p-2 text-white/70 hover:text-white bg-surface/50 rounded-sm transition-colors" aria-label="Schließen">
          <X className="w-6 h-6" />
        </button>
        <button onClick={(e) => { e.stopPropagation(); onPrev() }} className="absolute left-3 sm:left-6 z-10 p-3 text-white/70 hover:text-white bg-surface/50 rounded-sm transition-colors" aria-label="Vorheriges Bild">
          <ChevronLeft className="w-6 h-6" />
        </button>

        <motion.div
          key={activeIndex}
          initial={{ scale: 0.94, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.94, opacity: 0 }}
          transition={{ duration: 0.4, ease: EASE }}
          className="relative max-w-3xl w-full max-h-[80vh] overflow-hidden rounded-sm glass"
          onClick={(e) => e.stopPropagation()}
        >
          <img src={item.src} alt={item.title} className="w-full max-h-[68vh] object-contain" />
          <div className="p-5 border-t border-white/10">
            <p className="text-crimson text-[10px] font-semibold tracking-widest uppercase mb-1">{item.style}</p>
            <h3 className="font-display text-xl sm:text-2xl font-bold text-white mb-1">{item.title}</h3>
            <p className="text-gray-400 text-sm">{item.desc}</p>
          </div>
        </motion.div>

        <button onClick={(e) => { e.stopPropagation(); onNext() }} className="absolute right-3 sm:right-6 z-10 p-3 text-white/70 hover:text-white bg-surface/50 rounded-sm transition-colors" aria-label="Nächstes Bild">
          <ChevronRight className="w-6 h-6" />
        </button>
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-gray-400 text-sm">
          {activeIndex + 1} / {items.length}
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default function Gallery() {
  const [lightboxIndex, setLightboxIndex] = useState(null)

  return (
    <>
      <section id="gallery" className="py-20 sm:py-28 relative overflow-x-clip">
        <FloatingOrnamentLeft />
        <FloatingOrnamentRight />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, x: -18 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: '-60px' }}
            transition={{ duration: 0.9, ease: EASE }}
            className="mb-12 sm:mb-16"
          >
            <p className="text-crimson text-[10px] sm:text-sm font-semibold tracking-[0.4em] uppercase mb-4">meine Arbeit</p>
            <h2 className="section-title"><span className="crimson-underline">Gallerie</span></h2>
            <p className="text-gray-400 mt-5 max-w-xl text-sm sm:text-base leading-relaxed">
              Jedes Stück ist eine Zusammenarbeit — ein dauerhafter Ausdruck deiner Geschichte, gefertigt mit sorgfältigem Handwerk und bewusster Intention.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-5">
            {GALLERY_ITEMS.map((item, i) => (
              <GalleryCard key={item.id} item={item} index={i} onClick={setLightboxIndex} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ delay: 0.3, duration: 0.9, ease: EASE }}
            className="mt-12 sm:mt-14"
          >
            <a
              href="#booking"
              onClick={(e) => { e.preventDefault(); document.querySelector('#booking')?.scrollIntoView({ behavior: 'smooth' }) }}
              className="btn-primary inline-flex"
            >
              Ein individuelles Werk beauftragen
            </a>
          </motion.div>
        </div>

        <SectionDivider className="mt-16 sm:mt-24 opacity-50" />
      </section>

      {lightboxIndex !== null && (
        <Lightbox
          items={GALLERY_ITEMS}
          activeIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onPrev={() => setLightboxIndex((i) => (i - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length)}
          onNext={() => setLightboxIndex((i) => (i + 1) % GALLERY_ITEMS.length)}
        />
      )}
    </>
  )
}

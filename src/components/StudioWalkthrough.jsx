import { Suspense, useRef, useEffect, useState, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import { motion, AnimatePresence } from 'framer-motion'
import * as THREE from 'three'

import studioUrl from '../assets/studio.glb'
import tattoo1 from '../assets/tattoo_1.png'
import tattoo2 from '../assets/tattoo_2.png'
import tattoo3 from '../assets/tattoo_3.png'
import tattoo4 from '../assets/tattoo_4.png'
import tattoo5 from '../assets/tattoo_5.png'
import tattoo6 from '../assets/tattoo_6.png'

/* ─────────────────────────────────────────────────────────────────────
   KAMERA-PFAD — drei Wegpunkte durch das Studio (Y = Augenhöhe 1.6 m)
   Diese Werte können nach dem ersten Start angepasst werden.
───────────────────────────────────────────────────────────────────── */
const PATH_POINTS = [
  new THREE.Vector3(0, 1.6, 8),   // Eingang
  new THREE.Vector3(0, 1.6, 2),   // Mitte des Raumes  → Stop 1
  new THREE.Vector3(0, 1.6, -5),   // Hintere Wand      → Stop 2
]

/* ─────────────────────────────────────────────────────────────────────
   STOPS — Wo die Kamera anhält, schwenkt und Bilder zeigt
   range: [scrollStart, scrollEnd] als normalisierter [0..1]-Wert
───────────────────────────────────────────────────────────────────── */
const STOPS = [
  {
    curveT: 0.5,    // Kurvenparameter des Stops (entspricht PATH_POINTS[1])
    lookZ: 2,      // Z-Koordinate des LookAt-Ziels beim Schwenken
    panAmplitude: 3, // ±X-Meter beim Links-Rechts-Schwenk
    range: [0.30, 0.52],
    images: [tattoo1, tattoo2, tattoo3],
    labels: ['Blackwork', 'Fine Line', 'Ornament'],
  },
  {
    curveT: 1.0,
    lookZ: -5,
    panAmplitude: 3,
    range: [0.78, 1.00],
    images: [tattoo4, tattoo5, tattoo6],
    labels: ['Realismus', 'Dotwork', 'Geometric'],
  },
]

/* Vorlade-Optimierung */
useGLTF.preload(studioUrl)

const EASE = [0.25, 0.46, 0.45, 0.94]

/* ──────────────────────────────────────────────────────────────────── */
/* 3-D-Modell                                                           */
/* ──────────────────────────────────────────────────────────────────── */
function StudioModel() {
  const { scene } = useGLTF(studioUrl)
  // Clone, damit der Cache-Eintrag nicht mutiert wird
  const cloned = useMemo(() => scene.clone(true), [scene])
  return <primitive object={cloned} />
}

/* ──────────────────────────────────────────────────────────────────── */
/* Kamera-Steuerung (inside Canvas, liest den scroll-Ref)              */
/* ──────────────────────────────────────────────────────────────────── */
function CameraRig({ scrollProgress }) {
  const { camera } = useThree()

  const curve = useMemo(
    () => new THREE.CatmullRomCurve3(PATH_POINTS, false, 'catmullrom', 0.5),
    []
  )

  // Geglättete Zwischen-Werte (lerp innerhalb useFrame)
  const smoothPos = useRef(PATH_POINTS[0].clone())
  const smoothLook = useRef(new THREE.Vector3(0, 1.6, 2))
  const tmpPos = useRef(new THREE.Vector3())
  const tmpLook = useRef(new THREE.Vector3())

  useFrame(() => {
    const t = scrollProgress.current

    let curveT = 0
    let lookX = 0
    let lookZ = PATH_POINTS[0].z

    if (t < STOPS[0].range[0]) {
      /* ── Laufen zu Stop 1 ── */
      const walkT = t / STOPS[0].range[0]
      curveT = walkT * STOPS[0].curveT
      lookX = 0
      lookZ = STOPS[0].lookZ
    } else if (t < STOPS[0].range[1]) {
      /* ── Schwenken bei Stop 1 ── */
      curveT = STOPS[0].curveT
      const panT = (t - STOPS[0].range[0]) / (STOPS[0].range[1] - STOPS[0].range[0])
      // sin(panT * π/2): eased 0→1, nur nach links (negatives X)
      lookX = -Math.sin(panT * Math.PI * 0.5) * STOPS[0].panAmplitude
      lookZ = STOPS[0].lookZ
    } else if (t < STOPS[1].range[0]) {
      /* ── Laufen zu Stop 2 ── */
      const span = STOPS[1].range[0] - STOPS[0].range[1]
      const walkT = (t - STOPS[0].range[1]) / span
      curveT = STOPS[0].curveT + walkT * (STOPS[1].curveT - STOPS[0].curveT)
      lookX = 0
      lookZ = STOPS[1].lookZ
    } else {
      /* ── Schwenken bei Stop 2 ── */
      curveT = STOPS[1].curveT
      const panT = (t - STOPS[1].range[0]) / (STOPS[1].range[1] - STOPS[1].range[0])
      // sin(panT * π/2): eased 0→1, nur nach rechts (positives X)
      lookX = Math.sin(panT * Math.PI * 0.5) * STOPS[1].panAmplitude
      lookZ = STOPS[1].lookZ
    }

    // Position glätten
    curve.getPoint(Math.min(curveT, 1), tmpPos.current)
    smoothPos.current.lerp(tmpPos.current, 0.06)
    camera.position.copy(smoothPos.current)

    // LookAt glätten
    tmpLook.current.set(lookX, 1.6, lookZ)
    smoothLook.current.lerp(tmpLook.current, 0.06)
    camera.lookAt(smoothLook.current)
  })

  return null
}

/* ──────────────────────────────────────────────────────────────────── */
/* Haupt-Komponente                                                     */
/* ──────────────────────────────────────────────────────────────────── */
export default function StudioWalkthrough() {
  const sectionRef = useRef(null)
  const scrollProgress = useRef(0)
  const [activeStop, setActiveStop] = useState(null)
  const [showHint, setShowHint] = useState(true)
  const [lightbox, setLightbox] = useState(null)  // { src, label } | null

  useEffect(() => {
    const onScroll = () => {
      const section = sectionRef.current
      if (!section) return

      const rect = section.getBoundingClientRect()
      const scrollable = section.offsetHeight - window.innerHeight
      const scrolled = -rect.top
      const t = Math.max(0, Math.min(1, scrolled / scrollable))

      scrollProgress.current = t
      setShowHint(t < 0.03)

      // Aktiven Stop ermitteln
      let next = null
      for (let i = 0; i < STOPS.length; i++) {
        const [start, end] = STOPS[i].range
        if (t >= start && t <= end) { next = i; break }
      }
      setActiveStop(next)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section
      id="studio"
      ref={sectionRef}
      className="relative"
      style={{ height: '500vh' }}
    >
      {/* Sticky Viewport — bleibt 100 vh sichtbar während man scrollt */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">

        {/* ── Section-Label (oben, immer sichtbar) ── */}
        <div
          className="absolute top-8 left-1/2 -translate-x-1/2 z-10 text-center pointer-events-none"
          aria-label="Studio Tour Abschnitt"
        >
          <p className="text-crimson text-[10px] font-semibold tracking-[0.5em] uppercase mb-2">
            Studio Tour
          </p>
          <h2 className="section-title text-white">
            Besuche das{' '}
            <span className="text-crimson">Studio</span>
          </h2>
        </div>

        {/* ── Fortschritts-Punkte (rechts) ── */}
        <div
          className="absolute top-1/2 right-5 -translate-y-1/2 z-10 flex flex-col gap-3 pointer-events-none"
          aria-hidden="true"
        >
          {STOPS.map((_, i) => (
            <div
              key={i}
              className="transition-all duration-500"
              style={{
                width: activeStop === i ? '8px' : '6px',
                height: activeStop === i ? '8px' : '6px',
                borderRadius: '50%',
                border: '1px solid rgba(185,28,28,0.7)',
                background: activeStop === i ? '#b91c1c' : 'transparent',
                boxShadow: activeStop === i ? '0 0 8px rgba(185,28,28,0.7)' : 'none',
              }}
            />
          ))}
        </div>

        {/* ── Scroll-Hinweis ── */}
        <AnimatePresence>
          {showHint && (
            <motion.div
              key="hint"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              transition={{ duration: 0.55, ease: EASE }}
              className="absolute bottom-9 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 pointer-events-none"
              aria-hidden="true"
            >
              <p className="text-gray-400 text-[9px] tracking-[0.45em] uppercase">
                Scroll zum Erkunden
              </p>
              <motion.div
                animate={{ y: [0, 7, 0] }}
                transition={{ repeat: Infinity, duration: 1.9, ease: 'easeInOut' }}
                className="w-5 h-8 rounded-full flex items-start justify-center pt-1.5"
                style={{ border: '1px solid rgba(255,255,255,0.25)' }}
              >
                <div
                  className="w-1 h-2 rounded-full"
                  style={{ background: '#b91c1c' }}
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── 3-D Canvas ── */}
        <Canvas
          camera={{ fov: 75, near: 0.05, far: 200 }}
          style={{ background: '#0d0d0d' }}
          gl={{ antialias: true }}
        >
          <Suspense fallback={null}>
            <StudioModel />
          </Suspense>
          <CameraRig scrollProgress={scrollProgress} />

          {/* Beleuchtung */}
          <ambientLight intensity={0.55} />
          <directionalLight
            position={[5, 8, 3]}
            intensity={0.85}
            castShadow
          />
          <pointLight position={[-4, 3, 0]} color="#b91c1c" intensity={0.7} />
          <pointLight position={[4, 3, -4]} color="#ffffff" intensity={0.45} />
        </Canvas>

        {/* ── Bild-Overlay an den Stops (vertikal zentriert) ── */}
        <AnimatePresence mode="wait">
          {activeStop !== null && (
            <motion.div
              key={`stop-${activeStop}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none"
              style={{
                background:
                  'radial-gradient(ellipse 95% 80% at 50% 50%, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0) 100%)',
              }}
            >
              {/* Stop-Label */}
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: EASE }}
                className="text-crimson text-[9px] font-semibold tracking-[0.55em] uppercase mb-6"
              >
                Stop {activeStop + 1} — Entdecke die Kunst
              </motion.p>

              {/* Drei Bilder */}
              <div className="grid grid-cols-3 gap-5 w-full max-w-2xl px-8 pointer-events-auto">
                {STOPS[activeStop].images.map((src, i) => (
                  <motion.button
                    key={`${activeStop}-${i}`}
                    initial={{ opacity: 0, y: 24, scale: 0.92 }}
                    animate={{ opacity: 1, y: 0,  scale: 1   }}
                    transition={{ delay: i * 0.13, duration: 0.5, ease: EASE }}
                    className="relative overflow-hidden rounded-sm group cursor-pointer text-left"
                    style={{
                      border:    '1px solid rgba(185,28,28,0.30)',
                      boxShadow: '0 8px 32px rgba(0,0,0,0.55)',
                    }}
                    onClick={() => setLightbox({ src, label: STOPS[activeStop].labels[i] })}
                    aria-label={`${STOPS[activeStop].labels[i]} vergrößern`}
                  >
                    {/* Bild */}
                    <img
                      src={src}
                      alt={STOPS[activeStop].labels[i]}
                      className="w-full aspect-[3/4] object-cover object-center transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />

                    {/* Hover: Lupe */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                      style={{ background: 'rgba(0,0,0,0.38)' }}
                    >
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center"
                        style={{ border: '1.5px solid rgba(255,255,255,0.75)' }}
                      >
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <circle cx="11" cy="11" r="7" strokeWidth="2" />
                          <path strokeLinecap="round" strokeWidth="2" d="M21 21l-4.35-4.35" />
                          <path strokeLinecap="round" strokeWidth="2" d="M11 8v6M8 11h6" />
                        </svg>
                      </div>
                    </div>

                    {/* Label */}
                    <div className="absolute bottom-0 left-0 right-0 px-3 py-2 bg-gradient-to-t from-black/85 to-transparent">
                      <p className="text-white text-[9px] font-semibold tracking-widest uppercase">
                        {STOPS[activeStop].labels[i]}
                      </p>
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Lightbox ── */}
        <AnimatePresence>
          {lightbox && (
            <motion.div
              key="lightbox"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.28 }}
              className="fixed inset-0 z-50 flex items-center justify-center"
              style={{ background: 'rgba(0,0,0,0.90)', backdropFilter: 'blur(14px)' }}
              onClick={() => setLightbox(null)}
            >
              <motion.div
                initial={{ scale: 0.86, opacity: 0 }}
                animate={{ scale: 1,    opacity: 1 }}
                exit={{ scale: 0.88,   opacity: 0 }}
                transition={{ duration: 0.32, ease: EASE }}
                className="relative flex flex-col items-center"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Großes Bild */}
                <img
                  src={lightbox.src}
                  alt={lightbox.label}
                  className="max-h-[80vh] max-w-[88vw] object-contain rounded-sm"
                  style={{
                    border:    '1px solid rgba(185,28,28,0.40)',
                    boxShadow: '0 0 80px rgba(0,0,0,0.85), 0 0 0 1px rgba(185,28,28,0.12)',
                  }}
                />

                {/* Label */}
                <p className="mt-4 text-crimson text-[10px] font-semibold tracking-[0.5em] uppercase">
                  {lightbox.label}
                </p>

                {/* Schließen-Button */}
                <button
                  id="lightbox-close"
                  onClick={() => setLightbox(null)}
                  aria-label="Schließen"
                  className="absolute -top-4 -right-4 w-9 h-9 rounded-full flex items-center justify-center text-gray-400 hover:text-white transition-colors"
                  style={{
                    background: 'rgba(20,20,20,0.95)',
                    border:     '1px solid rgba(255,255,255,0.12)',
                  }}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

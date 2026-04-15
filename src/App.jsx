import Navbar from './components/Navbar'
import StudioWalkthrough from './components/StudioWalkthrough'
import Hero from './components/Hero'
import Gallery from './components/Gallery'
import Bio from './components/Bio'
import Testimonials from './components/Testimonials'
import Booking from './components/Booking'
import FAQ from './components/FAQ'
import Footer from './components/Footer'
import { s } from 'framer-motion/client'
import StartAnimation from './components/StartAnimation'
import { useState, useEffect } from 'react'
import { useGLTF } from '@react-three/drei'
import studioGlbUrl from './assets/studio.glb'
import logoGlbUrl from './assets/logo.glb'

export default function App() {
  const [loading, setLoading] = useState(true)
  const [startAnimDone, setStartAnimDone] = useState(false)

  // Nach jedem Reload ganz oben starten
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // Preload alle .glb Dateien (hier statisch, ggf. erweitern)
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const glbFiles = [studioGlbUrl, logoGlbUrl]
    let loaded = 0
    glbFiles.forEach((file) => {
      useGLTF.preload(file)
      setTimeout(() => {
        loaded++
        if (loaded === glbFiles.length) setLoading(false)
      }, 350)
    })
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  // Scrollen bleibt gesperrt, bis Startanimation fertig
  useEffect(() => {
    if (!loading && !startAnimDone) {
      document.body.style.overflow = 'hidden'
    } else if (!loading && startAnimDone) {
      document.body.style.overflow = ''
    }
  }, [loading, startAnimDone])

  if (loading) {
    // Ladeanimation: SVG-Logo-Zeichnen
    return (
      <div className="min-h-screen bg-dark clip-x">
        <StartAnimation onFinish={() => setStartAnimDone(true)} />
      </div>
    )
  }

  if (!startAnimDone) {
    // Startanimation läuft noch
    return (
      <div className="min-h-screen bg-dark clip-x">
        <StartAnimation onFinish={() => setStartAnimDone(true)} />
      </div>
    )
  }

  // App-Inhalt nach Preload & Startanimation
  return (
    <div className="min-h-screen bg-dark clip-x">
      <Navbar />
      <main>
        <Hero startAnimationDone={true} />
        <StudioWalkthrough />
        <Gallery />
        <Bio />
        <Testimonials />
        <Booking />
        <FAQ />
      </main>
      <Footer />
    </div>
  )
}
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

export default function App() {
  return (
    /*
     * clip-x prevents any side-entering animation from creating a horizontal
     * scrollbar while still allowing position:sticky / position:fixed children.
     */
    <div className="min-h-screen bg-dark clip-x">
      <Navbar />
      <main>
        <Hero />
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

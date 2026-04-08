import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Gallery from './components/Gallery'
import Bio from './components/Bio'
import Testimonials from './components/Testimonials'
import Booking from './components/Booking'
import FAQ from './components/FAQ'
import Footer from './components/Footer'

export default function App() {
  return (
    /*
     * clip-x prevents any side-entering animation from creating a horizontal
     * scrollbar while still allowing position:sticky / position:fixed children.
     */
    <div className="min-h-screen bg-dark overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
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

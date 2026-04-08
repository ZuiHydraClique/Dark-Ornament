import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'
import { SectionDivider } from './Ornaments'

const EASE = [0.25, 0.46, 0.45, 0.94]

const REVIEWS = [
  {
    id: 1,
    name: 'Sophia K.',
    city: 'London',
    rating: 5,
    text: 'Raul hat mir das aufwendigste Fine-Line-Sleeve gemacht, das ich je gesehen habe. Die Liebe zum Detail ist unübertroffen. Die Leute sprechen mich auf der Straße an und fragen danach.',
    style: 'Fine Line',
  },
  {
    id: 2,
    name: 'Daniel R.',
    city: 'Berlin',
    rating: 5,
    text: 'Aus Deutschland angereist und es war jeden Kilometer wert. Er verbrachte zwei Stunden mit mir beim Entwurf, bevor wir die Maschine überhaupt anrührten. Das ist selten und man sieht es.',
    style: 'Blackwork',
  },
  {
    id: 3,
    name: 'Amara T.',
    city: 'Manchester',
    rating: 5,
    text: 'Mein Wolf-Realismus am Oberarm ist atemberaubend. Drei Monate später denken die Leute noch immer, es sei eine Fotografie. Purer Zauber mit einer Nadel.',
    style: 'Realismus',
  },
  {
    id: 4,
    name: 'Jack M.',
    city: 'Dublin',
    rating: 5,
    text: 'Sauberes Studio, unglaublicher Musikgeschmack und er hetzt nicht. Mein japanisches Brustmotiv wurde in zwei langen Sessions gemacht und ist absolut makellos.',
    style: 'Japanisch',
  },
  {
    id: 5,
    name: 'Elena V.',
    city: 'Paris',
    rating: 5,
    text: 'Das Dotwork mit heiliger Geometrie auf meinem Handgelenk ist genau das, was ich mir vorgestellt hatte – eigentlich sogar noch mehr. Er bringt Ideen zum Leben, die man kaum in Worte fassen kann.',
    style: 'Dotwork',
  },
  {
    id: 6,
    name: 'Noah C.',
    city: 'New York',
    rating: 5,
    text: 'Online gebucht, hingeflogen und mit dem besten Tattoo meines Lebens nach Hause gegangen. Mein Neo-Trad-Armstück bekommt jeden Tag Komplimente. Jeden Cent wert.',
    style: 'Neo-Traditionell',
  },
]

const ROW1 = [...REVIEWS, ...REVIEWS, ...REVIEWS]
const ROW2 = [...REVIEWS.slice(2), ...REVIEWS.slice(0, 2), ...REVIEWS.slice(2), ...REVIEWS.slice(0, 2), ...REVIEWS.slice(2), ...REVIEWS.slice(0, 2)]

function ReviewCard({ review }) {
  return (
    <article className="
      flex-shrink-0
      w-[260px] sm:w-[320px] md:w-[360px]
      glass rounded-sm p-4 sm:p-5
      mx-2 sm:mx-3
      border-b-2 border-crimson/20 hover:border-crimson
      transition-colors duration-300
      touch-pan-y
    ">
      <Quote className="w-5 h-5 text-crimson/35 mb-2.5" />
      <div className="flex gap-0.5 mb-2.5" role="img" aria-label={`${review.rating} von 5 Sternen`}>
        {Array.from({ length: review.rating }).map((_, i) => (
          <Star key={i} className="w-3 h-3 text-crimson fill-crimson" />
        ))}
      </div>
      <p className="text-gray-300 text-xs sm:text-sm leading-relaxed mb-4 line-clamp-4">
        &ldquo;{review.text}&rdquo;
      </p>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-white font-semibold text-xs sm:text-sm">{review.name}</p>
          <p className="text-gray-500 text-[10px] sm:text-xs">{review.city}</p>
        </div>
        <span className="text-[9px] sm:text-[10px] font-semibold tracking-widest uppercase text-crimson/70 border border-crimson/20 px-2 py-0.5 rounded-sm">
          {review.style}
        </span>
      </div>
    </article>
  )
}

function MarqueeRow({ reviews, direction = 'rtl', slow = false }) {
  const animClass =
    direction === 'ltr'
      ? slow ? 'animate-marquee-ltr-slow' : 'animate-marquee-ltr'
      : slow ? 'animate-marquee-rtl-slow' : 'animate-marquee-rtl'

  return (
    <div
      className="relative overflow-hidden"
      onMouseEnter={(e) => {
        const el = e.currentTarget.querySelector('[data-marquee]')
        if (el) el.style.animationPlayState = 'paused'
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget.querySelector('[data-marquee]')
        if (el) el.style.animationPlayState = 'running'
      }}
    >
      <div
        className="absolute left-0 top-0 bottom-0 w-12 sm:w-24 lg:w-40 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to right, #121212, transparent)' }}
        aria-hidden="true"
      />
      <div
        className="absolute right-0 top-0 bottom-0 w-12 sm:w-24 lg:w-40 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to left, #121212, transparent)' }}
        aria-hidden="true"
      />
      <div data-marquee className={`marquee-track ${animClass}`}>
        {reviews.map((review, i) => (
          <ReviewCard key={`${review.id}-${i}`} review={review} />
        ))}
      </div>
    </div>
  )
}

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 sm:py-28 overflow-x-clip">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 sm:mb-16">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: '-60px' }}
          transition={{ duration: 0.9, ease: EASE }}
          className="text-center"
        >
          <p className="text-crimson text-[10px] sm:text-sm font-semibold tracking-[0.4em] uppercase mb-4">
            Kundenstimmen
          </p>
          <h2 className="section-title">
            Was sie <span className="crimson-underline">sagen</span>
          </h2>
          <p className="text-gray-400 mt-5 max-w-xl mx-auto text-sm sm:text-base">
            Echte Worte von echten Menschen, die ihrer Haut dem Handwerk anvertraut haben.
          </p>
        </motion.div>
      </div>

      {/* Row 1: Links → Rechts */}
      <div className="space-y-4 sm:space-y-5">
        <MarqueeRow reviews={ROW1} direction="ltr" />
        {/* Row 2: Rechts → Links */}
        <MarqueeRow reviews={ROW2} direction="rtl" slow />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ delay: 0.2, duration: 0.9, ease: EASE }}
        className="mt-10 sm:mt-12 text-center"
      >
        <div className="inline-flex items-center gap-3 glass px-5 sm:px-6 py-2.5 sm:py-3 rounded-sm">
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 text-crimson fill-crimson" />
            ))}
          </div>
          <span className="text-white font-semibold text-sm">5,0</span>
          <span className="text-gray-500 text-xs sm:text-sm">· 200+ verifizierte Bewertungen</span>
        </div>
      </motion.div>

      <SectionDivider className="mt-16 sm:mt-20 opacity-60" />
    </section>
  )
}

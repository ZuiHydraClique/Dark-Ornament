import { motion } from 'framer-motion'
import { Award, Users, Clock, Camera } from 'lucide-react'
import { SectionDivider, DotGrid } from './Ornaments'

import profilbild from '../assets/RaRa.png'

const EASE = [0.25, 0.46, 0.45, 0.94]

const STATS = [
  { icon: Clock, value: '12+', label: 'Jahre der Kunst' },
  { icon: Users, value: '1.200+', label: 'Zufriedene Kunden' },
  { icon: Award, value: '18', label: 'Branchenpreise' },
]

const STYLES = ['Fine Line', 'Blackwork', 'Ornament', 'Dotwork']

export default function Bio() {
  return (
    <section id="bio" className="py-20 sm:py-28 bg-surface/30 relative overflow-x-clip">
      <DotGrid className="hidden sm:block top-8 right-8 w-40 h-40" />
      <DotGrid className="hidden sm:block bottom-8 left-8 w-32 h-32" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mobile heading */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.9, ease: EASE }}
          className="mb-10 lg:hidden"
        >
          <p className="text-crimson text-[10px] font-semibold tracking-[0.4em] uppercase mb-3">Tattoo Artist</p>
          <h2 className="section-title">Raul <span className="text-crimson">Pinkasov</span></h2>
        </motion.div>

        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

          {/* Portrait — enters from left */}
          <motion.div
            initial={{ opacity: 0, x: -22 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: '-80px' }}
            transition={{ duration: 1.0, ease: EASE }}
            className="w-full lg:w-2/5 flex-shrink-0"
          >
            <div className="relative mx-auto max-w-sm lg:max-w-none">
              <div className="absolute -inset-3 border border-crimson/25 rounded-sm pointer-events-none" />
              <div className="absolute -inset-6 border border-crimson/10 rounded-sm pointer-events-none" />
              <img
                src={profilbild}
                alt="Raul Pinkasov — Tattoo-Künstler"
                className="w-full aspect-[3/4] object-cover object-center rounded-sm grayscale-0 hover:grayscale transition-all duration-700"
                loading="lazy"
              />
              <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-crimson rounded-br-sm" />
              <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-crimson rounded-tl-sm" />
            </div>
          </motion.div>

          {/* Text — enters from right */}
          <motion.div
            initial={{ opacity: 0, x: 22 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: '-80px' }}
            transition={{ duration: 1.0, delay: 0.12, ease: EASE }}
            className="flex-1"
          >
            <div className="hidden lg:block mb-6">
              <p className="text-crimson text-[10px] font-semibold tracking-[0.4em] uppercase mb-3">Tattoo Artist</p>
              <h2 className="section-title">Raul <span className="text-crimson">Pinkasov</span></h2>
            </div>

            <div className="flex items-center gap-4 mb-6">
              <div className="h-px flex-1 bg-crimson/30" />
              <span className="text-crimson text-[10px] tracking-widest uppercase">Seit 2025</span>
              <div className="h-px flex-1 bg-crimson/30" />
            </div>

            <div className="space-y-4 text-gray-300 text-sm sm:text-base leading-relaxed">
              <p>
                Ich bin ein Krasser Typ. Cool oder? Das hast du jetzt nicht kommen sehen.
              </p>
              <p>
                Ich arbeite jeden Monat mit einer begrenzten Anzahl von Kunden zusammen, um sicherzustellen, dass jedes Stück die volle Aufmerksamkeit erhält, die es verdient. Kein Flash. Kein Kompromiss. Nur individuelles Design.
              </p>
              <p>
                Vielleicht bist du ja mein nächstes Kunstwerk?
              </p>
            </div>

            {/* Style tags */}
            <div className="mt-6 flex flex-wrap gap-2">
              {STYLES.map((style, i) => (
                <motion.span
                  key={style}
                  initial={{ opacity: 0, scale: 0.88 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: false }}
                  transition={{ delay: i * 0.08, duration: 0.5, ease: EASE }}
                  className="px-3 py-1 text-[10px] font-semibold tracking-wide border border-crimson/40 text-crimson/80 rounded-sm uppercase hover:border-crimson hover:text-crimson transition-colors cursor-default"
                >
                  {style}
                </motion.span>
              ))}
            </div>

            {/* Stats */}
            <div className="mt-8 grid grid-cols-3 gap-4">
              {STATS.map(({ icon: Icon, value, label }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false }}
                  transition={{ delay: 0.35 + i * 0.12, duration: 0.8, ease: EASE }}
                  className="text-center sm:text-left"
                >
                  <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                    <Icon className="w-4 h-4 text-crimson flex-shrink-0" />
                    <span className="font-display text-2xl sm:text-3xl font-bold text-white">{value}</span>
                  </div>
                  <p className="text-gray-500 text-[10px] sm:text-xs">{label}</p>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-8 flex items-center gap-4 flex-wrap">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                id="bio-instagram-link"
                className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors group"
              >
                <Camera className="w-4 h-4 text-crimson group-hover:scale-110 transition-transform" />
                @darkornament_ink
              </a>
              <span className="text-gray-700">·</span>
              <a
                href="#booking"
                onClick={(e) => { e.preventDefault(); document.querySelector('#booking')?.scrollIntoView({ behavior: 'smooth' }) }}
                className="btn-primary text-sm px-5 py-2"
              >
                Lass uns was erschaffen
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      <SectionDivider className="mt-16 sm:mt-20 opacity-50" />
    </section>
  )
}

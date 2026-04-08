import { Skull, Globe, Share2, Camera } from 'lucide-react'

const FOOTER_LINKS = [
  { label: 'Galerie',     href: '#gallery' },
  { label: 'Über mich',  href: '#bio' },
  { label: 'Referenzen', href: '#testimonials' },
  { label: 'Buchung',    href: '#booking' },
  { label: 'FAQ',        href: '#faq' },
]

const SOCIALS = [
  { label: 'Instagram', href: 'https://instagram.com',       icon: Camera },
  { label: 'Facebook',  href: 'https://facebook.com',        icon: Share2 },
  { label: 'Website',   href: 'https://darkornament.ink',    icon: Globe  },
]

const scrollTo = (href) => (e) => {
  e.preventDefault()
  document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
}

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-dark border-t border-white/8">
      <div className="h-px bg-gradient-to-r from-transparent via-crimson/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">

          {/* Brand */}
          <div className="lg:col-span-2">
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
              className="inline-flex items-center gap-2 mb-4 group"
            >
              <Skull className="w-6 h-6 text-crimson group-hover:rotate-12 transition-transform duration-300" />
              <span className="font-display font-bold text-xl text-white">
                Dark<span className="text-crimson">Ornament</span>
              </span>
            </a>
            <p className="text-gray-500 text-sm leading-relaxed max-w-sm mb-6">
              Individuelle Tattoo-Kunst von Raul Pinkasov. Jedes Stück ist ein Unikat — entworfen mit Absicht, ausgeführt mit Präzision, getragen mit Stolz.
            </p>
            <div className="flex items-center gap-3">
              {SOCIALS.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="p-2 border border-white/10 text-gray-500 hover:text-crimson hover:border-crimson/50 rounded-sm transition-all duration-200"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-white text-xs font-semibold tracking-[0.3em] uppercase mb-4">Navigation</h3>
            <ul className="space-y-2">
              {FOOTER_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={scrollTo(link.href)}
                    className="text-gray-500 text-sm hover:text-crimson transition-colors duration-200 flex items-center gap-1.5 group"
                  >
                    <span className="w-4 h-px bg-crimson/0 group-hover:bg-crimson/60 transition-all duration-300" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white text-xs font-semibold tracking-[0.3em] uppercase mb-4">Kontakt</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <span className="text-gray-600 text-xs block mb-0.5">E-Mail</span>
                <a href="mailto:raul@darkornament.ink" className="text-gray-400 hover:text-crimson transition-colors">
                  raul@darkornament.ink
                </a>
              </li>
              <li>
                <span className="text-gray-600 text-xs block mb-0.5">Studio</span>
                <span className="text-gray-400">East London (Shoreditch)</span>
              </li>
              <li>
                <span className="text-gray-600 text-xs block mb-0.5">Öffnungszeiten</span>
                <span className="text-gray-400">Di–Sa · 10:00–19:00 Uhr</span>
              </li>
              <li className="pt-2">
                <a
                  href="#booking"
                  onClick={scrollTo('#booking')}
                  className="btn-outline text-xs px-4 py-2 inline-flex items-center"
                >
                  Session buchen
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-600">
          <p>© {year} DarkOrnament · Raul Pinkasov. Alle Rechte vorbehalten.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-gray-400 transition-colors">Datenschutz</a>
            <span>·</span>
            <a href="#" className="hover:text-gray-400 transition-colors">Nutzungsbedingungen</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

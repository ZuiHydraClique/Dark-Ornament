/**
 * Navbar.jsx — Neu gestaltet: Ultra-minimale Premium-Navbar
 *
 * Design:
 *   ◆ Komplett transparent am Hero-Anfang
 *   ◆ Beim Scrollen: dünne Linie unten + dunkler Blur-Hintergrund
 *   ◆ Logo: nur Textmark "DarkOrnament" mit feiner Trennlinie
 *   ◆ Links: uppercase, eng gesperrt, nur Underline-Hover (keine Buttons)
 *   ◆ Buchungs-CTA: crimson-Underline-Style mit Hover-Fill
 *   ◆ Mobile: minimalistisches Fullscreen-Overlay-Menü
 */

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const NAV_LINKS = [
  { label: 'Galerie',     href: '#gallery' },
  { label: 'Über mich',  href: '#bio' },
  { label: 'Referenzen', href: '#testimonials' },
  { label: 'Buchung',    href: '#booking' },
]

function smoothTo(href) {
  document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
}

export default function Navbar() {
  const [open,     setOpen]     = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  const closeAndNav = (href) => {
    setOpen(false)
    setTimeout(() => smoothTo(href), 380)
  }

  return (
    <>
      {/* ── Bar ── */}
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-700"
        style={{
          background: scrolled
            ? 'rgba(12,12,12,0.82)'
            : 'transparent',
          backdropFilter: scrolled ? 'blur(18px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(18px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(185,28,28,0.15)' : '1px solid transparent',
        }}
      >
        <nav className="max-w-7xl mx-auto px-6 lg:px-10 h-[68px] flex items-center justify-between">

          {/* ── Logo ── */}
          <a
            href="#hero"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
            aria-label="DarkOrnament — Startseite"
            className="group flex items-center gap-3"
          >
            {/* Vertikale Zierline */}
            <span className="hidden sm:block w-px h-5 bg-crimson opacity-70 group-hover:h-7 transition-all duration-300" />
            <span className="font-display font-bold text-base sm:text-lg tracking-[0.12em] text-white">
              Dark<span className="text-crimson italic">Ornament</span>
            </span>
          </a>

          {/* ── Desktop Links ── */}
          <ul className="hidden md:flex items-center gap-8" role="list">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); smoothTo(link.href) }}
                  className="relative text-[11px] font-semibold tracking-[0.25em] uppercase text-gray-400 hover:text-white transition-colors duration-300 group py-1"
                >
                  {link.label}
                  <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-crimson group-hover:w-full transition-all duration-400" />
                </a>
              </li>
            ))}

            {/* FAQ als minimaler Outlined-Tag */}
            <li>
              <a
                href="#faq"
                onClick={(e) => { e.preventDefault(); smoothTo('#faq') }}
                className="text-[11px] font-semibold tracking-[0.25em] uppercase text-crimson/70 hover:text-crimson border border-crimson/30 hover:border-crimson px-3 py-1.5 transition-all duration-300"
              >
                FAQ
              </a>
            </li>

            {/* Haupt-CTA */}
            <li>
              <a
                href="#booking"
                id="navbar-book-cta"
                onClick={(e) => { e.preventDefault(); smoothTo('#booking') }}
                className="relative text-[11px] font-bold tracking-[0.25em] uppercase text-white bg-crimson px-5 py-2.5 hover:bg-crimson-light transition-colors duration-300 overflow-hidden group"
              >
                <span className="relative z-10">Jetzt buchen</span>
              </a>
            </li>
          </ul>

          {/* ── Mobile Burger (minimalistisch) ── */}
          <button
            id="navbar-hamburger"
            aria-label={open ? 'Menü schließen' : 'Menü öffnen'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="md:hidden flex flex-col gap-[5px] p-2 group"
          >
            <span className={`block h-px w-6 bg-white transition-all duration-300 ${open ? 'rotate-45 translate-y-[7px]' : ''}`} />
            <span className={`block h-px bg-crimson transition-all duration-300 ${open ? 'w-6 opacity-0' : 'w-4'}`} />
            <span className={`block h-px w-6 bg-white transition-all duration-300 ${open ? '-rotate-45 -translate-y-[7px]' : ''}`} />
          </button>
        </nav>
      </header>

      {/* ── Mobile Fullscreen Overlay ── */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="fixed inset-0 z-40 md:hidden"
              style={{ background: 'rgba(8,8,8,0.97)', backdropFilter: 'blur(12px)' }}
              onClick={() => setOpen(false)}
            />

            <motion.nav
              key="mobile-menu"
              id="mobile-drawer"
              role="dialog"
              aria-modal="true"
              aria-label="Navigation"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-2 md:hidden"
            >
              {/* Schließen-Button oben rechts */}
              <button
                onClick={() => setOpen(false)}
                aria-label="Menü schließen"
                className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors p-2"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M4 4L16 16M16 4L4 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>

              {/* Logo centered oben */}
              <p className="absolute top-6 left-1/2 -translate-x-1/2 font-display text-sm font-bold tracking-[0.15em] text-white">
                Dark<span className="text-crimson italic">Ornament</span>
              </p>

              {/* Navigations-Links */}
              <div className="flex flex-col items-center gap-8 w-full px-8">
                {[...NAV_LINKS, { label: 'FAQ', href: '#faq' }].map((link, i) => (
                  <motion.button
                    key={link.href}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.08 * i, duration: 0.4 }}
                    onClick={() => closeAndNav(link.href)}
                    className="text-2xl font-display font-bold tracking-widest uppercase text-gray-300 hover:text-white transition-colors duration-200 relative group"
                  >
                    {link.label}
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-px w-0 bg-crimson group-hover:w-full transition-all duration-300" />
                  </motion.button>
                ))}
              </div>

              {/* CTA unten */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.40, duration: 0.4 }}
                className="absolute bottom-12 left-0 right-0 px-8"
              >
                <button
                  onClick={() => closeAndNav('#booking')}
                  className="w-full btn-primary justify-center py-4 text-sm tracking-[0.2em] uppercase"
                >
                  Session buchen
                </button>
              </motion.div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

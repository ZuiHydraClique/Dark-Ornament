import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, HelpCircle } from 'lucide-react'
import { SectionDivider, CornerFlourishes, DotGrid } from './Ornaments'

const EASE = [0.25, 0.46, 0.45, 0.94]

const FAQ_ITEMS = [
  {
    id: 'faq-1',
    q: 'Wie kann ich eine Session buchen?',
    a: 'Füll das Buchungsformular mit deiner Idee, bevorzugtem Stil, Körperstelle und Terminen aus. Ich prüfe jede Anfrage persönlich und antworte innerhalb von 48 Stunden, um die Verfügbarkeit zu bestätigen und dein Konzept zu besprechen.',
  },
  {
    id: 'faq-2',
    q: 'Wie viel kostet ein Tattoo?',
    a: 'Alle individuellen Werke beginnen ab 200 € für kleinere Motive. Größere oder komplexere Stücke werden pro Session berechnet (Ganztags-Sessions: 800 €). Ich gebe nach Prüfung deiner Anfrage ein ehrliches Angebot – keine versteckten Kosten.',
  },
  {
    id: 'faq-3',
    q: 'Machst du Walk-ins?',
    a: 'Nein. Jedes Stück, das ich erstelle, wird individuell entworfen und erfordert eine Beratung. So stelle ich sicher, dass die Arbeit bewusst, persönlich und dauerhaft ist – kein überstürztes Flash-Tattoo.',
  },
  {
    id: 'faq-4',
    q: 'Wie soll ich mich auf meinen Termin vorbereiten?',
    a: 'Iss 2–3 Stunden vor der Session eine ordentliche Mahlzeit. Trink in den Tagen davor viel Wasser. Feuchte die Körperstelle täglich mindestens eine Woche lang ein. Trage bequeme Kleidung, die leichten Zugang zur Stelle ermöglicht. Vermeide Alkohol 24 Stunden vorher.',
  },
  {
    id: 'faq-5',
    q: 'Wie ist die Anzahlungspolitik?',
    a: 'Eine nicht erstattungsfähige Anzahlung von 20 % ist erforderlich, um deinen Termin zu sichern. Diese wird auf die Gesamtkosten angerechnet. Bei Stornierungen mit weniger als 72 Stunden Vorankündigung verfällt die Anzahlung.',
  },
  {
    id: 'faq-6',
    q: 'Kann ich eigenes Design mitbringen?',
    a: 'Absolut. Referenzbilder sind immer willkommen und hilfreich. Ich passe deine Idee jedoch so an, dass sie auf der Haut optimal zur Geltung kommt – das Originalwerk eines anderen Künstlers kopiere ich grundsätzlich nicht.',
  },
  {
    id: 'faq-7',
    q: 'Wie pflege ich mein neues Tattoo?',
    a: 'Am Ende deiner Session erhältst du ein vollständiges Pflegeblatt. Im Allgemeinen gilt: Halte es sauber, feuchte es mit parfümfreier Lotion ein, vermeide 4–6 Wochen direkte Sonneneinstrahlung und bade es nicht in Wasser (Badewanne, Pool, Meer), bis es vollständig verheilt ist.',
  },
  {
    id: 'faq-8',
    q: 'Kosten Auffrischungen extra?',
    a: 'Eine kostenlose Auffrischung ist innerhalb von 3 Monaten nach deiner Session für kleinere Verblassungen durch den Heilungsprozess enthalten – nicht durch Lifestyle-Entscheidungen. Beabsichtigte Änderungen oder Ergänzungen werden separat berechnet.',
  },
  {
    id: 'faq-9',
    q: 'Wo befindet sich das Studio?',
    a: 'Mein privates Studio befindet sich in East London (Shoreditch-Viertel). Die genaue Adresse wird nach der Buchung per E-Mail nur an bestätigte Kunden mitgeteilt – um eine ruhige und ablenkungsfreie Atmosphäre zu gewährleisten.',
  },
  {
    id: 'faq-10',
    q: 'Wie schmerzhaft ist ein Tattoo?',
    a: 'Schmerz ist subjektiv und stark von der Körperstelle abhängig. Rippen, Wirbelsäule, Hände und Füße sind tendenziell intensiver. Ich arbeite bedacht und kommuniziere während der Session, um dir bei Bedarf Pausen zu geben. Die meisten Kunden sagen, die Erwartung ist schlimmer als die Realität.',
  },
]

function FAQItem({ item, isOpen, onToggle, index }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: false, margin: '-40px' }}
      transition={{ duration: 0.7, delay: index * 0.05, ease: EASE }}
      className={`border rounded-sm transition-colors duration-300 ${isOpen ? 'border-crimson/50 bg-surface/40' : 'border-white/8 bg-surface/20 hover:border-white/15'
        }`}
    >
      <button
        id={item.id}
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full flex items-center justify-between gap-4 px-4 sm:px-5 py-4 text-left group"
      >
        <span className={`font-medium text-sm sm:text-base transition-colors duration-200 ${isOpen ? 'text-white' : 'text-gray-300 group-hover:text-white'
          }`}>
          {item.q}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.4, ease: EASE }}
          className="flex-shrink-0"
        >
          <ChevronDown className={`w-5 h-5 transition-colors duration-200 ${isOpen ? 'text-crimson' : 'text-gray-500 group-hover:text-gray-300'
            }`} />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: EASE }}
            className="overflow-hidden"
          >
            <div className="px-4 sm:px-5 pb-5">
              <div className="h-px bg-white/8 mb-4" />
              <p className="text-gray-400 text-sm leading-relaxed">{item.a}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function FAQ() {
  const [openId, setOpenId] = useState(null)
  const toggle = (id) => setOpenId((prev) => (prev === id ? null : id))

  return (
    <section id="faq" className="py-20 sm:py-28 relative overflow-x-clip">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-crimson/40 to-transparent" aria-hidden="true" />
      <DotGrid className="hidden lg:block top-1/4 right-4 w-36 h-36 opacity-[0.06]" />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: '-50px' }}
          transition={{ duration: 0.9, ease: EASE }}
          className="text-center mb-12 sm:mb-16"
        >
          <div className="inline-flex items-center gap-2 justify-center mb-4">
            <HelpCircle className="w-4 h-4 text-crimson" />
            <p className="text-crimson text-[10px] sm:text-sm font-semibold tracking-[0.4em] uppercase">FAQ</p>
          </div>
          <h2 className="section-title">
            Häufige <span className="crimson-underline">Fragen</span>
          </h2>
          <p className="text-gray-400 mt-5 text-sm sm:text-base leading-relaxed">
            Alles, was du vor der Buchung wissen möchtest. Deine Frage ist nicht dabei?{' '}
            <a
              href="mailto:raul@darkornament.ink"
              className="text-crimson hover:text-crimson-light transition-colors underline underline-offset-2"
            >
              Schreib mir direkt.
            </a>
          </p>
        </motion.div>

        <div className="space-y-3">
          {FAQ_ITEMS.map((item, i) => (
            <FAQItem
              key={item.id}
              item={item}
              index={i}
              isOpen={openId === item.id}
              onToggle={() => toggle(item.id)}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ delay: 0.2, duration: 0.9, ease: EASE }}
          className="mt-14 p-8 glass rounded-sm border border-crimson/20 relative"
        >
          <CornerFlourishes />
          <p className="font-display text-xl sm:text-2xl font-bold text-white mb-3 text-center">
            Bereit, deine Geschichte zu beginnen?
          </p>
          <p className="text-gray-400 text-sm mb-6 text-center">
            Monatlich begrenzte Plätze verfügbar. Sicher dir deinen, bevor sie weg sind.
          </p>
          <div className="flex justify-center">
            <a
              href="#booking"
              id="faq-book-cta"
              onClick={(e) => {
                e.preventDefault()
                document.querySelector('#booking')?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="btn-primary shadow-[0_0_28px_rgba(185,28,28,0.3)]"
            >
              Deine Session buchen
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

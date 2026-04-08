import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import { Send, Upload, CheckCircle, AlertCircle, Calendar, Loader } from 'lucide-react'
import { SectionDivider, CornerFlourishes, DotGrid } from './Ornaments'

const EASE = [0.25, 0.46, 0.45, 0.94]

const TATTOO_STYLES = [
  'Fine Line',
  'Blackwork',
  'Schwarz & Grau Realismus',
  'Neo-Traditionell',
  'Japanisch / Irezumi',
  'Dotwork / Heilige Geometrie',
  'Ornamental',
  'Sonstiges / Unsicher',
]

const BODY_PLACEMENTS = [
  'Arm (Oben)', 'Arm (Unten)', 'Unterarm', 'Handgelenk', 'Hand',
  'Brust', 'Rücken (Vollständig)', 'Rücken (Oben)', 'Rippen / Seite',
  'Bein (Oberschenkel)', 'Bein (Wade)', 'Knöchel / Fuß', 'Hals', 'Sonstiges',
]

export default function Booking() {
  const [status, setStatus] = useState('idle')
  const { register, handleSubmit, reset, formState: { errors } } = useForm()

  const onSubmit = async (data) => {
    setStatus('loading')
    await new Promise((res) => setTimeout(res, 1800))
    console.log('Buchungsanfrage:', data)
    setStatus('success')
    reset()
    setTimeout(() => setStatus('idle'), 6000)
  }

  return (
    <section id="booking" className="py-20 sm:py-28 bg-surface/20 relative overflow-x-clip">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(185,28,28,0.06)_0%,transparent_60%)] pointer-events-none" aria-hidden="true" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-crimson/40 to-transparent" aria-hidden="true" />
      <DotGrid className="hidden sm:block bottom-8 left-8 w-40 h-40 opacity-[0.05]" />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header — von links */}
        <motion.div
          initial={{ opacity: 0, x: -18 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, margin: '-50px' }}
          transition={{ duration: 0.95, ease: EASE }}
          className="mb-12"
        >
          <p className="text-crimson text-[10px] sm:text-sm font-semibold tracking-[0.4em] uppercase mb-4">
            Lass uns kreieren
          </p>
          <h2 className="section-title">
            Eine Session <span className="crimson-underline">buchen</span>
          </h2>
          <p className="text-gray-400 mt-5 text-sm sm:text-base leading-relaxed max-w-xl">
            Die Plätze sind begrenzt und füllen sich schnell. Füll das Formular aus und ich melde mich innerhalb von 48 Stunden, um deine Vision zu besprechen.
          </p>
        </motion.div>

        {/* Erfolgsanimation */}
        {status === 'success' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="glass border border-green-500/30 rounded-sm p-8 text-center mb-8"
          >
            <CheckCircle className="w-10 h-10 text-green-400 mx-auto mb-3" />
            <h3 className="font-display text-xl text-white font-bold mb-2">Anfrage gesendet!</h3>
            <p className="text-gray-400 text-sm">Ich prüfe deine Anfrage und antworte innerhalb von 48 Stunden. Behalte deinen Posteingang im Blick.</p>
          </motion.div>
        )}

        {/* Formular — von rechts */}
        <motion.form
          initial={{ opacity: 0, x: 18 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, margin: '-50px' }}
          transition={{ duration: 0.95, delay: 0.1, ease: EASE }}
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="glass rounded-sm p-6 sm:p-8 space-y-5 relative"
        >
          <CornerFlourishes />

          {/* Name + E-Mail */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label htmlFor="booking-name" className="block text-[10px] font-semibold tracking-widest uppercase text-gray-400 mb-1.5">
                Vollständiger Name <span className="text-crimson">*</span>
              </label>
              <input
                id="booking-name"
                type="text"
                placeholder="Max Mustermann"
                autoComplete="name"
                className={`input-field ${errors.name ? 'border-red-500' : ''}`}
                {...register('name', { required: 'Name ist erforderlich' })}
              />
              {errors.name && (
                <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.name.message}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="booking-email" className="block text-[10px] font-semibold tracking-widest uppercase text-gray-400 mb-1.5">
                E-Mail <span className="text-crimson">*</span>
              </label>
              <input
                id="booking-email"
                type="email"
                placeholder="du@beispiel.de"
                autoComplete="email"
                className={`input-field ${errors.email ? 'border-red-500' : ''}`}
                {...register('email', {
                  required: 'E-Mail ist erforderlich',
                  pattern: { value: /^\S+@\S+$/i, message: 'Ungültige E-Mail-Adresse' },
                })}
              />
              {errors.email && (
                <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.email.message}
                </p>
              )}
            </div>
          </div>

          {/* Telefon + Datum */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label htmlFor="booking-phone" className="block text-[10px] font-semibold tracking-widest uppercase text-gray-400 mb-1.5">Telefon</label>
              <input
                id="booking-phone"
                type="tel"
                placeholder="+49 151 000 000"
                autoComplete="tel"
                className="input-field"
                {...register('phone')}
              />
            </div>
            <div>
              <label htmlFor="booking-date" className="block text-[10px] font-semibold tracking-widest uppercase text-gray-400 mb-1.5">Bevorzugtes Datum</label>
              <div className="relative">
                <input
                  id="booking-date"
                  type="date"
                  className="input-field pr-10"
                  min={new Date().toISOString().split('T')[0]}
                  {...register('date')}
                />
                <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Stil + Körperstelle */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label htmlFor="booking-style" className="block text-[10px] font-semibold tracking-widest uppercase text-gray-400 mb-1.5">
                Tattoo-Stil <span className="text-crimson">*</span>
              </label>
              <select
                id="booking-style"
                className={`input-field bg-surface/80 ${errors.style ? 'border-red-500' : ''}`}
                {...register('style', { required: 'Bitte einen Stil auswählen' })}
              >
                <option value="">Stil auswählen...</option>
                {TATTOO_STYLES.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
              {errors.style && (
                <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.style.message}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="booking-placement" className="block text-[10px] font-semibold tracking-widest uppercase text-gray-400 mb-1.5">Körperstelle</label>
              <select id="booking-placement" className="input-field bg-surface/80" {...register('placement')}>
                <option value="">Körperstelle auswählen...</option>
                {BODY_PLACEMENTS.map((p) => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
          </div>

          {/* Vision */}
          <div>
            <label htmlFor="booking-description" className="block text-[10px] font-semibold tracking-widest uppercase text-gray-400 mb-1.5">
              Beschreibe deine Vision <span className="text-crimson">*</span>
            </label>
            <textarea
              id="booking-description"
              rows={5}
              placeholder="Erzähl mir von dem Motiv, das du dir vorstellst — Sujet, Größe, Stimmung, Referenzkünstler, Bedeutung dahinter..."
              className={`input-field resize-none ${errors.description ? 'border-red-500' : ''}`}
              {...register('description', {
                required: 'Bitte beschreibe deine Idee',
                minLength: { value: 20, message: 'Bitte gib mehr Details an (min. 20 Zeichen)' },
              })}
            />
            {errors.description && (
              <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.description.message}
              </p>
            )}
          </div>

          {/* Referenzbilder */}
          <div>
            <label className="block text-[10px] font-semibold tracking-widest uppercase text-gray-400 mb-1.5">
              Referenzbilder (optional)
            </label>
            <label
              htmlFor="booking-references"
              className="flex flex-col items-center justify-center gap-2 w-full border border-dashed border-white/20 hover:border-crimson/50 rounded-sm py-6 cursor-pointer transition-colors duration-300 text-gray-500 hover:text-gray-300 group"
            >
              <Upload className="w-5 h-5 group-hover:text-crimson transition-colors" />
              <span className="text-xs">Bilder hier ablegen oder <span className="text-crimson">klicken zum Durchsuchen</span></span>
              <span className="text-[10px] text-gray-600">PNG, JPG, WEBP bis zu 10 MB pro Datei</span>
              <input id="booking-references" type="file" accept="image/*" multiple className="sr-only" {...register('references')} />
            </label>
          </div>

          <p className="text-gray-600 text-xs">
            Deine Daten werden streng vertraulich behandelt und ausschließlich zur Buchungsabwicklung verwendet. Kein Spam, versprochen.
          </p>

          {/* Absenden */}
          <button
            id="booking-submit"
            type="submit"
            disabled={status === 'loading'}
            className="btn-primary w-full justify-center text-sm py-4 shadow-[0_0_24px_rgba(185,28,28,0.22)] hover:shadow-[0_0_40px_rgba(185,28,28,0.4)] transition-shadow disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {status === 'loading' ? (
              <><Loader className="w-4 h-4 animate-spin" /> Anfrage wird gesendet...</>
            ) : (
              <><Send className="w-4 h-4" /> Buchungsanfrage senden</>
            )}
          </button>
        </motion.form>

        <p className="text-center text-gray-600 text-xs mt-6">
          Lieber per E-Mail?{' '}
          <a href="mailto:raul@darkornament.ink" className="text-crimson hover:text-crimson-light transition-colors">
            raul@darkornament.ink
          </a>
        </p>
      </div>

      <SectionDivider className="mt-16 sm:mt-20 opacity-50" />
    </section>
  )
}

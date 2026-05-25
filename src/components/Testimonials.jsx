import { useState, useCallback, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FaStar, FaChevronLeft, FaChevronRight, FaQuoteLeft } from 'react-icons/fa'
import { useLanguage } from '../hooks/useLanguage'
import { translations, reviews as reviewsData } from '../i18n'

export default function Testimonials() {
  const { lang } = useLanguage()
  const t = translations[lang].testimonials
  const reviews = reviewsData[lang]
  const [current, setCurrent] = useState(0)
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const timerRef = useRef(null)

  const next = useCallback(() => setCurrent((p) => (p + 1) % reviews.length), [reviews.length])
  const prev = useCallback(() => setCurrent((p) => (p - 1 + reviews.length) % reviews.length), [reviews.length])

  useEffect(() => {
    if (!inView) return
    timerRef.current = setInterval(next, 4000)
    return () => clearInterval(timerRef.current)
  }, [inView, next])

  return (
    <section id="testimonials" className="section-padding bg-[#F8FDFB] scroll-mt-24" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold bg-primary/10 text-primary mb-4">
            {t.badge}
          </span>
          <h2 className={`text-3xl md:text-4xl font-bold text-gray-900 mb-3 ${lang === 'ar' ? 'font-arabic' : ''}`}>
            {t.title}
          </h2>
          <p className={`text-gray-500 ${lang === 'ar' ? 'font-arabic text-lg' : ''}`}>
            {t.subtitle}
          </p>
        </motion.div>

        <div className="relative max-w-2xl mx-auto">
          <div className="overflow-hidden rounded-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -60 }}
                transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="relative p-9 md:p-11 rounded-2xl bg-white/80 backdrop-blur-sm border border-white/60 shadow-sm"
              >
                <FaQuoteLeft className="text-primary/10 text-4xl absolute top-6 left-7" />
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <FaStar
                      key={i}
                      size={16}
                      className={i < reviews[current].rating ? 'text-gold' : 'text-gray-200'}
                    />
                  ))}
                </div>
                <p className={`text-gray-600 leading-relaxed mb-6 text-base italic ${lang === 'ar' ? 'font-arabic text-lg leading-[1.9]' : ''}`}>
                  "{reviews[current].text}"
                </p>
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-full gradient-green flex items-center justify-center text-white font-bold text-xs shadow-sm">
                    {reviews[current].name.charAt(0)}
                  </div>
                  <div>
                    <div className={`font-semibold text-sm text-gray-900 ${lang === 'ar' ? 'font-arabic' : ''}`}>
                      {reviews[current].name}
                    </div>
                    <div className={`text-xs text-gray-400 ${lang === 'ar' ? 'font-arabic' : ''}`}>
                      {reviews[current].role}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex justify-center items-center gap-4 mt-7">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 cursor-pointer"
            >
              <FaChevronLeft size={13} />
            </button>
            <div className="flex gap-2">
              {reviews.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                    i === current ? 'bg-primary w-6' : 'bg-gray-200 w-2.5'
                  }`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 cursor-pointer"
            >
              <FaChevronRight size={13} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

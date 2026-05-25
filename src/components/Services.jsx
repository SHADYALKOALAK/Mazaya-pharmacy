import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FaPrescriptionBottleAlt, FaSpa, FaLeaf, FaBaby, FaStethoscope, FaMagic } from 'react-icons/fa'
import { useLanguage } from '../hooks/useLanguage'
import { translations } from '../i18n'

const icons = [FaPrescriptionBottleAlt, FaSpa, FaLeaf, FaBaby, FaStethoscope, FaMagic]

export default function Services() {
  const { lang } = useLanguage()
  const t = translations[lang].services
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="services" className="section-padding bg-[#F8FDFB]" ref={ref}>
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {t.list.map((service, idx) => {
            const Icon = icons[idx]
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: idx * 0.07, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="group relative p-7 md:p-8 rounded-2xl bg-white border border-gray-100 card-shadow card-shadow-hover cursor-default"
              >
                <div className="w-14 h-14 mb-5 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white group-hover:shadow-lg transition-all duration-300">
                  <Icon size={24} />
                </div>
                <h3 className={`text-base font-bold text-gray-900 mb-2 ${lang === 'ar' ? 'font-arabic' : ''}`}>
                  {service.title}
                </h3>
                <p className={`text-sm text-gray-500 leading-relaxed ${lang === 'ar' ? 'font-arabic' : ''}`}>
                  {service.desc}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

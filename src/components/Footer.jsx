import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin, FaMapMarkerAlt, FaPhone, FaEnvelope, FaWhatsapp } from 'react-icons/fa'
import { useLanguage } from '../hooks/useLanguage'
import { translations } from '../i18n'

const navKeys = ['home', 'about', 'services', 'whyUs', 'testimonials', 'contact']

const navLabels = {
  en: ['Home', 'About', 'Services', 'Why Us', 'Testimonials', 'Contact'],
  ar: ['الرئيسية', 'عن الصيدلية', 'الخدمات', 'لماذا نحن', 'آراء العملاء', 'اتصل بنا'],
}

export default function Footer() {
  const { lang } = useLanguage()
  const t = translations[lang].footer
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <footer ref={ref} className="bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-14">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-10"
        >
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-10 h-10 rounded-xl gradient-green flex items-center justify-center text-white font-bold shadow-sm">
                M
              </div>
              <div>
                <span className="font-bold text-gray-900 text-lg">Mazaya</span>
                <span className="text-xs text-primary block">Pharmacy</span>
              </div>
            </div>
            <p className={`text-sm text-gray-500 leading-relaxed max-w-xs ${lang === 'ar' ? 'font-arabic' : ''}`}>
              {t.tagline}
            </p>
            <div className="flex gap-2.5 mt-5">
              {[FaFacebook, FaInstagram, FaTwitter, FaLinkedin].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-xl bg-gray-100 hover:bg-primary flex items-center justify-center text-gray-400 hover:text-white transition-all duration-300">
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className={`font-bold text-gray-900 text-sm mb-4 ${lang === 'ar' ? 'font-arabic' : ''}`}>
              {t.quickLinks}
            </h3>
            <ul className="space-y-2.5">
              {navKeys.map((key, i) => (
                <li key={key}>
                  <a
                    href={`#${key === 'whyUs' ? 'why-us' : key}`}
                    className={`text-sm text-gray-500 hover:text-primary transition-colors duration-300 ${lang === 'ar' ? 'font-arabic' : ''}`}
                  >
                    {navLabels[lang][i]}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className={`font-bold text-gray-900 text-sm mb-4 ${lang === 'ar' ? 'font-arabic' : ''}`}>
              {t.contact}
            </h3>
            <ul className="space-y-3">
              {[
                { Icon: FaMapMarkerAlt, text: 'Al Mawaleh South, Seeb, Muscat, Oman' },
                { Icon: FaPhone, text: '+968 9149 0046' },
                { Icon: FaEnvelope, text: 'info@mazaya-pharmacy.com' },
              ].map(({ Icon, text }, i) => (
                <li key={i} className="flex items-center gap-2.5 text-sm text-gray-500">
                  <Icon size={14} className="text-primary shrink-0" />
                  <span className={lang === 'ar' ? 'font-arabic' : ''}>{text}</span>
                </li>
              ))}
              <li>
                <a
                  href="https://wa.me/96891490046"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-sm text-green-600 hover:text-green-700 transition-colors"
                >
                  <FaWhatsapp size={14} />
                  <span className={lang === 'ar' ? 'font-arabic' : ''}>WhatsApp</span>
                </a>
              </li>
            </ul>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="border-t border-gray-100"
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-5 flex flex-col md:flex-row items-center justify-between gap-1">
          <p className={`text-xs text-gray-400 ${lang === 'ar' ? 'font-arabic' : ''}`}>
            {t.copyright}
          </p>
        </div>
      </motion.div>
    </footer>
  )
}

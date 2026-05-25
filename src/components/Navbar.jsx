import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiMenu, HiX } from 'react-icons/hi'
import { useLanguage } from '../hooks/useLanguage'
import { translations } from '../i18n'

const links = (t) => [
  { key: 'home', href: '#home' },
  { key: 'about', href: '#about' },
  { key: 'services', href: '#services' },
  { key: 'whyUs', href: '#why-us' },
  { key: 'testimonials', href: '#testimonials' },
  { key: 'contact', href: '#contact' },
]

export default function Navbar() {
  const { lang, toggleLang } = useLanguage()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const t = translations[lang].nav

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
        scrolled ? 'glass shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between h-16 md:h-20">
        <a href="#home" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl gradient-green flex items-center justify-center text-white font-bold text-sm md:text-base shadow-sm group-hover:shadow-md transition-shadow">
            M
          </div>
          <span className={`text-lg md:text-xl font-bold tracking-tight ${lang === 'ar' ? 'font-arabic' : ''}`}>
            <span className="text-primary">Mazaya</span>
            <span className="text-gray-700"> Pharmacy</span>
          </span>
        </a>

        <div className="hidden lg:flex items-center gap-8">
          {links(t).map((link) => (
            <a key={link.key} href={link.href} className="nav-link">
              {link.key === 'whyUs' ? (lang === 'ar' ? 'لماذا نحن' : t[link.key]) : t[link.key]}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleLang}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold border border-primary/30 text-primary hover:bg-primary hover:text-white transition-all duration-300 cursor-pointer"
          >
            {lang === 'en' ? 'عربي' : 'EN'}
          </button>

          <button
            className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-all cursor-pointer"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <HiX size={22} /> : <HiMenu size={22} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white/95 glass border-t border-gray-100 overflow-hidden"
          >
            <div className="px-4 py-4 flex flex-col gap-1">
              {links(t).map((link) => (
                <a
                  key={link.key}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="py-2.5 px-3 rounded-lg text-gray-700 hover:text-primary hover:bg-primary/5 font-medium transition-all"
                >
                  {link.key === 'whyUs' ? (lang === 'ar' ? 'لماذا نحن' : t[link.key]) : t[link.key]}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

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

  const scrollTo = (id) => {
    setOpen(false)
    const el = document.getElementById(id)
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
          scrolled ? 'glass shadow-sm' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between h-16 md:h-20">
          <a href="#home" onClick={(e) => { e.preventDefault(); scrollTo('home') }} className="flex items-center gap-2.5 group">
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
              <a key={link.key} href={link.href} onClick={(e) => { e.preventDefault(); scrollTo(link.href.replace('#', '')) }} className="nav-link">
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
      </motion.nav>

      {/* Mobile overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 bg-black/40 z-40"
          />
        )}
      </AnimatePresence>

      {/* Drawer menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: lang === 'ar' ? -300 : 300 }}
            animate={{ x: 0 }}
            exit={{ x: lang === 'ar' ? -300 : 300 }}
            transition={{ type: 'spring', damping: 25, stiffness: 250 }}
            className="fixed top-0 bottom-0 w-72 z-50 bg-white shadow-2xl flex flex-col"
            style={{ [lang === 'ar' ? 'left' : 'right']: 0 }}
          >
            <div className="flex items-center justify-between px-5 h-16 border-b border-gray-100">
              <span className="font-bold text-primary">Mazaya Pharmacy</span>
              <button onClick={() => setOpen(false)} className="p-2 rounded-lg hover:bg-gray-100 cursor-pointer">
                <HiX size={22} />
              </button>
            </div>

            <div className="flex-1 px-4 py-6 flex flex-col gap-1 overflow-y-auto">
              {links(t).map((link) => (
                <a
                  key={link.key}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault()
                    scrollTo(link.href.replace('#', ''))
                  }}
                  className="py-3 px-4 rounded-xl text-gray-700 hover:text-primary hover:bg-primary/5 font-medium transition-all cursor-pointer text-base"
                >
                  {link.key === 'whyUs' ? (lang === 'ar' ? 'لماذا نحن' : t[link.key]) : t[link.key]}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

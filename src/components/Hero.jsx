import { motion, useMotionValue, useTransform } from 'framer-motion'
import { FaHeartbeat, FaPills, FaNotesMedical, FaPhoneAlt } from 'react-icons/fa'
import { FaWhatsapp } from 'react-icons/fa'
import { useLanguage } from '../hooks/useLanguage'
import { translations } from '../i18n'

const floatingIcons = [
  { Icon: FaPills, x: 12, y: 25, size: 34 },
  { Icon: FaHeartbeat, x: 88, y: 20, size: 30 },
  { Icon: FaNotesMedical, x: 10, y: 75, size: 36 },
  { Icon: FaPhoneAlt, x: 90, y: 78, size: 28 },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 40, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
}

export default function Hero() {
  const { lang } = useLanguage()
  const t = translations[lang].hero

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const rotateX = useTransform(y, [-300, 300], [8, -8])
  const rotateY = useTransform(x, [-300, 300], [-8, 8])

  function handleMouseMove(e) {
    const { innerWidth, innerHeight } = window
    x.set(e.clientX - innerWidth / 2)
    y.set(e.clientY - innerHeight / 2)
  }

  return (
    <section
      id="home"
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-white via-[#F8FDFB] to-white"
    >

      {/* 🌊 BACKGROUND (same brand colors) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">

        {/* subtle brand glow */}
        <motion.div
          className="absolute top-[-200px] right-[-200px] w-[600px] h-[600px] rounded-full bg-primary/10 blur-3xl"
          animate={{ scale: [1, 1.08, 1], opacity: [0.15, 0.25, 0.15] }}
          transition={{ duration: 5, repeat: Infinity }}
        />

        <motion.div
          className="absolute bottom-[-200px] left-[-200px] w-[500px] h-[500px] rounded-full bg-primary/10 blur-3xl"
          animate={{ scale: [1, 1.1, 1], opacity: [0.12, 0.22, 0.12] }}
          transition={{ duration: 6, repeat: Infinity }}
        />

        {/* ECG line (using primary color instead of green) */}
        <motion.div
          className="absolute top-1/2 left-0 w-full h-[2px] opacity-10"
          animate={{ x: [-200, 200] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
        >
          <div className="w-full h-full bg-gradient-to-r from-transparent via-primary to-transparent" />
        </motion.div>
      </div>

      {/* FLOATING ICONS (brand color) */}
      {floatingIcons.map(({ Icon, x: px, y: py, size }, i) => (
        <motion.div
          key={i}
          className="absolute hidden md:block text-primary/30"
          style={{ left: `${px}%`, top: `${py}%` }}
          animate={{
            y: [0, -18, 0],
            rotate: [-4, 4, -4],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 5 + i,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <Icon size={size} />
        </motion.div>
      ))}

      {/* CONTENT */}
      <motion.div
        style={{ rotateX, rotateY }}
        className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 pt-28 pb-16 text-center"
      >
        <motion.div variants={containerVariants} initial="hidden" animate="visible">

          {/* badge */}
          <motion.div variants={itemVariants} className="inline-block mb-6">
            <span className="px-5 py-1.5 rounded-full text-xs font-semibold bg-primary/10 text-primary">
              {t.badge}
            </span>
          </motion.div>

          {/* heartbeat glow behind title */}
          <motion.div
            className="absolute inset-0 flex justify-center items-center pointer-events-none"
            animate={{
              opacity: [0.05, 0.12, 0.05],
              scale: [1, 1.02, 1],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <div className="w-[500px] h-[500px] bg-primary rounded-full blur-3xl opacity-20" />
          </motion.div>

          {/* title */}
          <motion.h1
            variants={itemVariants}
            className={`text-[2.8rem] md:text-[5rem] font-extrabold leading-[1.05] mb-5 ${
              lang === 'ar' ? 'font-arabic' : ''
            }`}
          >
            <span className="gradient-text inline-block">
              {t.title}
            </span>
            <br />
            <span className="text-gray-800 inline-block">
              {t.subtitle}
            </span>
          </motion.h1>

          {/* desc */}
          <motion.p
            variants={itemVariants}
            className={`max-w-xl mx-auto text-gray-500 mb-10 ${
              lang === 'ar' ? 'font-arabic text-lg leading-[1.9]' : ''
            }`}
          >
            {t.desc}
          </motion.p>

          {/* buttons */}
          <motion.div variants={itemVariants} className="flex justify-center gap-4 flex-wrap">

            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              href="#contact"
              className="px-8 py-4 rounded-xl gradient-green text-white font-semibold shadow-md shadow-primary/20"
            >
              {t.contactBtn}
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              href="https://wa.me/96891490046"
              target="_blank"
              className="px-8 py-4 rounded-xl border-2 border-primary/30 text-primary hover:bg-primary hover:text-white font-semibold flex items-center gap-2"
            >
              <FaWhatsapp />
              {t.whatsappBtn}
            </motion.a>

          </motion.div>

        </motion.div>
      </motion.div>

      {/* bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
    </section>
  )
}
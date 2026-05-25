import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  FaUserMd,
  FaShieldAlt,
  FaBolt,
  FaStar,
  FaHospital,
} from "react-icons/fa";
import { useLanguage } from "../hooks/useLanguage";
import { translations } from "../i18n";

const icons = [FaUserMd, FaShieldAlt, FaBolt, FaStar, FaHospital];

export default function WhyChooseUs() {
  const { lang } = useLanguage();
  const t = translations[lang].whyUs;
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <section
      id="why-us"
      ref={ref}
      className="relative py-28 bg-gradient-to-b from-white via-[#f7fcfa] to-white overflow-hidden scroll-mt-24"
    >
      {/* background glow */}
      <div className="absolute top-[-120px] left-[-120px] w-96 h-96 bg-[#17A36B]/10 blur-3xl rounded-full" />
      <div className="absolute bottom-[-120px] right-[-120px] w-96 h-96 bg-[#17A36B]/10 blur-3xl rounded-full" />

      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full text-xs font-semibold bg-white border border-[#17A36B]/10 shadow-sm text-[#17A36B]">
            <span className="w-2 h-2 bg-[#17A36B] rounded-full animate-pulse" />
            {t.badge}
          </span>

          <h2 className="mt-6 text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
            {t.title}
          </h2>

          <p className="mt-4 text-gray-500 text-lg">
            {t.subtitle}
          </p>
        </motion.div>

        {/* GRID */}
        <div className="grid lg:grid-cols-12 gap-8 items-stretch">

          {/* MAIN FEATURE (Hero Card) */}
          <motion.div
            initial={{ opacity: 0, x: lang === "ar" ? 40 : -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 p-10 rounded-3xl bg-white border border-gray-100 shadow-xl relative overflow-hidden"
          >
            <div className="absolute top-[-40px] right-[-40px] w-40 h-40 bg-[#17A36B]/10 rounded-full blur-2xl" />

            <div className="w-14 h-14 rounded-2xl bg-[#17A36B]/10 flex items-center justify-center text-[#17A36B] mb-6">
              <FaHospital size={22} />
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              {t.features[0].title}
            </h3>

            <p className="text-gray-500 leading-relaxed">
              {t.features[0].desc}
            </p>

            <div className="mt-8 flex items-center gap-2 text-sm text-[#17A36B] font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#17A36B]" />
              Trusted Healthcare Experience
            </div>
          </motion.div>

          {/* SIDE FEATURES */}
          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-6">

            {t.features.slice(1).map((feature, idx) => {
              const Icon = icons[idx + 1];

              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    duration: 0.5,
                    delay: idx * 0.08,
                  }}
                  className="group p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
                >
                  {/* number */}
                  <span className="absolute top-4 right-4 text-5xl font-black text-[#17A36B]/5 select-none">
                    0{idx + 2}
                  </span>

                  {/* icon */}
                  <div className="w-12 h-12 rounded-xl bg-[#17A36B]/10 flex items-center justify-center text-[#17A36B] mb-4 group-hover:scale-110 transition">
                    <Icon size={20} />
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {feature.title}
                  </h3>

                  <p className="text-sm text-gray-500 leading-relaxed">
                    {feature.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
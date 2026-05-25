import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { useLanguage } from "../hooks/useLanguage";

import img1 from "../assets/2.png";
import img2 from "../assets/3.png";
import img3 from "../assets/1.png";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function About() {
  const { lang } = useLanguage();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  const isAr = lang === "ar";

  return (
    <section
      id="about"
      ref={ref}
      dir={isAr ? "rtl" : "ltr"}
      className="relative py-28 bg-gradient-to-b from-white via-[#fbfdfc] to-white overflow-hidden"
    >
      {/* decorative blur */}
      <div className="absolute top-[-80px] left-[-80px] w-72 h-72 bg-[#17A36B]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-[-80px] right-[-80px] w-72 h-72 bg-[#17A36B]/10 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-12 gap-16 items-center">

          {/* TEXT SIDE */}
          <motion.div
            variants={container}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
            className="lg:col-span-7"
          >
            {/* badge */}
            <motion.div variants={item}>
              <span className="inline-flex items-center gap-2 px-4 py-1 rounded-full text-xs font-semibold bg-white shadow-sm border border-[#17A36B]/10 text-[#17A36B]">
                <span className="w-2 h-2 rounded-full bg-[#17A36B]" />
                {isAr ? "من نحن" : "About Us"}
              </span>
            </motion.div>

            {/* title */}
            <motion.h2
              variants={item}
              className="mt-5 text-4xl lg:text-5xl font-bold text-gray-900 leading-tight"
            >
              {isAr
                ? "صيدلية مزايا — رعاية صحية مبنية على الثقة"
                : "Mazaya Pharmacy — Healthcare Built on Trust"}
            </motion.h2>

            {/* accent line */}
            <motion.div
              variants={item}
              className="mt-5 w-20 h-[3px] bg-[#17A36B] rounded-full"
            />

            {/* description */}
            <motion.div
              variants={item}
              className="mt-8 space-y-5 text-gray-600 leading-relaxed text-[15.5px]"
            >
              <p>
                {isAr
                  ? "نلتزم في صيدلية مزايا بتقديم خدمات صيدلانية موثوقة وفق أعلى معايير الجودة والرعاية الصحية."
                  : "Mazaya Pharmacy delivers trusted pharmaceutical services aligned with the highest healthcare standards."}
              </p>

              <p>
                {isAr
                  ? "نوفر بيئة آمنة في مسقط تضمن دقة الخدمة وسهولة الوصول إلى الاستشارات الدوائية."
                  : "We provide a safe and accessible pharmacy environment in Muscat for accurate consultation and service."}
              </p>

              <p>
                {isAr
                  ? "يعمل فريقنا من الصيادلة المؤهلين على تقديم رعاية شخصية لكل عميل باحترافية عالية."
                  : "Our certified pharmacists offer personalized care with professional precision."}
              </p>

              <p>
                {isAr
                  ? "هدفنا تعزيز الصحة العامة عبر خدمات صيدلانية موثوقة وسهلة الوصول."
                  : "Our mission is to enhance public health through reliable and accessible pharmacy services."}
              </p>
            </motion.div>
          </motion.div>

          {/* IMAGES SIDE */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5"
          >
            <div className="grid grid-cols-2 gap-4">

              {/* BIG IMAGE */}
              <div className="col-span-2 rounded-3xl overflow-hidden shadow-xl group border border-gray-100">
                <img
                  src={img1}
                  alt="Pharmacy Interior"
                  className="w-full h-60 object-cover group-hover:scale-105 transition duration-700"
                />
              </div>

              {/* SMALL LEFT */}
              <div className="rounded-2xl overflow-hidden shadow-md group border border-gray-100">
                <img
                  src={img2}
                  alt="Medicine Section"
                  className="w-full h-44 object-cover group-hover:scale-105 transition duration-700"
                />
              </div>

              {/* SMALL RIGHT */}
              <div className="rounded-2xl overflow-hidden shadow-md group border border-gray-100">
                <img
                  src={img3}
                  alt="Pharmacist Service"
                  className="w-full h-44 object-cover group-hover:scale-105 transition duration-700"
                />
              </div>
            </div>

            {/* caption */}
            <div className="mt-4 text-center">
              <p className="text-xs text-gray-400">
                {isAr
                  ? "صور حقيقية من داخل صيدلية مزايا"
                  : "Real pharmacy environment photos"}
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
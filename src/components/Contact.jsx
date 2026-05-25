import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  FaWhatsapp,
  FaPhone,
  FaEnvelope,
  FaClock,
} from "react-icons/fa";
import { useLanguage } from "../hooks/useLanguage";
import { translations } from "../i18n";

export default function Contact() {
  const { lang } = useLanguage();
  const t = translations[lang].contact;
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [sending, setSending] = useState(false);

  const isValid = form.name && form.phone && form.message;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValid) return;

    setSending(true);

    const text = `*Mazaya Pharmacy Inquiry*%0A%0A*Name:* ${encodeURIComponent(
      form.name
    )}%0A*Phone:* ${encodeURIComponent(
      form.phone
    )}%0A*Message:* ${encodeURIComponent(form.message)}`;

    window.open(
      `https://wa.me/96891490046?text=${text}`,
      "_blank",
      "noopener"
    );

    setTimeout(() => setSending(false), 1200);
  };

  return (
    <section
      id="contact"
      ref={ref}
      className="relative py-28 bg-gradient-to-b from-white via-[#f7fcfa] to-white overflow-hidden"
    >
      {/* glow background */}
      <div className="absolute top-[-100px] left-[-100px] w-80 h-80 bg-[#17A36B]/10 blur-3xl rounded-full" />
      <div className="absolute bottom-[-100px] right-[-100px] w-80 h-80 bg-[#17A36B]/10 blur-3xl rounded-full" />

      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1 rounded-full text-xs font-semibold bg-white border border-[#17A36B]/10 shadow-sm text-[#17A36B]">
            <span className="w-2 h-2 bg-[#17A36B] rounded-full" />
            {t.badge}
          </span>

          <h2 className="mt-5 text-4xl lg:text-5xl font-bold text-gray-900">
            {t.title}
          </h2>

          <p className="mt-3 text-gray-500">
            {t.subtitle}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 items-start">

          {/* FORM */}
          <motion.div
            initial={{ opacity: 0, x: lang === "ar" ? 40 : -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="p-6 rounded-3xl bg-white border border-gray-100 shadow-lg"
          >
            <form onSubmit={handleSubmit} className="space-y-5">

              <input
                name="name"
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
                placeholder={t.form.name}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#17A36B] outline-none transition"
              />

              <input
                name="phone"
                value={form.phone}
                onChange={(e) =>
                  setForm({ ...form, phone: e.target.value })
                }
                placeholder={t.form.phone}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#17A36B] outline-none transition"
              />

              <textarea
                rows={4}
                name="message"
                value={form.message}
                onChange={(e) =>
                  setForm({ ...form, message: e.target.value })
                }
                placeholder={t.form.message}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#17A36B] outline-none resize-none transition"
              />

              <button
                type="submit"
                disabled={!isValid || sending}
                className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-[#17A36B] text-white font-semibold shadow-md hover:shadow-xl hover:-translate-y-0.5 transition disabled:opacity-50"
              >
                <FaWhatsapp />
                {sending ? t.form.sent : t.form.submit}
              </button>
            </form>
          </motion.div>

          {/* INFO + MAP */}
          <motion.div
            initial={{ opacity: 0, x: lang === "ar" ? -40 : 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="space-y-5"
          >

            {/* cards */}
            {[
              { icon: FaPhone, text: t.info.phone },
              { icon: FaEnvelope, text: t.info.email },
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-4 p-5 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition"
              >
                <div className="w-11 h-11 rounded-xl bg-[#17A36B]/10 flex items-center justify-center text-[#17A36B]">
                  <item.icon />
                </div>
                <p className="text-gray-600 text-sm">{item.text}</p>
              </div>
            ))}

            {/* Working Hours card */}
            <div className="p-5 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition">
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-[#17A36B]/10 flex items-center justify-center text-[#17A36B]">
                  <FaClock />
                </div>
                <div>
                  <p className="text-gray-600 text-sm font-semibold">{t.info.working}</p>
                  <p className="text-gray-500 text-xs mt-1">{t.info.hours}</p>
                  <p className="text-gray-500 text-xs">{t.info.friday}</p>
                </div>
              </div>
            </div>

            {/* MAP - FIXED */}
            <div className="relative rounded-3xl overflow-hidden border border-gray-200 shadow-lg h-72 group">
              <iframe
                title="location"
                src="https://www.google.com/maps?q=23.601676,58.243187&z=16&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
              />
              <a
                href="https://maps.app.goo.gl/Uui8sunBPJKdrofz7"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0 z-10"
                aria-label="Open in Google Maps"
              />
            </div>

            <a
              href="https://maps.app.goo.gl/Uui8sunBPJKdrofz7"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center text-sm text-gray-400 hover:text-[#17A36B] transition"
            >
              {lang === "ar" ? "افتح في خرائط جوجل" : "Open in Google Maps"}
            </a>

          </motion.div>

        </div>
      </div>
    </section>
  );
}
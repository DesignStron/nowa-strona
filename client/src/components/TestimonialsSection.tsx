/*
 * TestimonialsSection — Dark Glassmorphism Agency
 * Auto-scrolling testimonials carousel with glass cards
 */
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const testimonials = [
  {
    name: "Marek Wiśniewski",
    role: "Właściciel, FitPro Studio",
    avatar: "MW",
    color: "#7c3aed",
    text: "Oszczędzam teraz kilkadziesiąt godzin tygodniowo. Klienci sami znajdują wszystkie informacje na stronie, więc nie muszę powtarzać tego samego w wiadomościach. Fachowe wsparcie na każdym etapie.",
    stars: 5,
  },
  {
    name: "Jakub Kowalczyk",
    role: "Trener Personalny",
    avatar: "JK",
    color: "#06b6d4",
    text: "Dzięki nowej stronie zapisy na treningi ruszyły. Wszystko jest jasno opisane, a klienci sami rezerwują terminy. Widać realny wzrost zainteresowania od pierwszego dnia.",
    stars: 5,
  },
  {
    name: "Anna Piotrowska",
    role: "CEO, TopGlobal Logistics",
    avatar: "AP",
    color: "#a855f7",
    text: "Doceniam profesjonalizm i cierpliwość. Każdy etap był konsultowany, a finalny produkt wygląda solidnie i działa bez zarzutu. Kontrahenci odnotowali lepsze wrażenie.",
    stars: 5,
  },
  {
    name: "Tomasz Nowak",
    role: "Mechanik, AutoSerwis Nowak",
    avatar: "TN",
    color: "#7c3aed",
    text: "Szybka reakcji na pytania i błyskawiczne poprawki. Strona przyciąga więcej klientów, którzy dzwonią prosto z formularza. Zdecydowanie polecam.",
    stars: 5,
  },
  {
    name: "Katarzyna Zielińska",
    role: "Coach Online",
    avatar: "KZ",
    color: "#06b6d4",
    text: "Od teraz moje kursy i konsultacje sprzedają się automatycznie. Płatności działają bez problemów, a klienci chwalą wygodę. Zwiększyłem przychody bez dodatkowej pracy.",
    stars: 5,
  },
  {
    name: "Piotr Adamski",
    role: "Restaurator",
    avatar: "PA",
    color: "#a855f7",
    text: "Profesjonalizm na każdym kroku. Strona działa błyskawicznie, wygląda świetnie na telefonie i naprawdę przyciąga nowych gości. Inwestycja, która się zwróciła.",
    stars: 5,
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-1 mb-3">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#a855f7">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

function TestimonialCard({ t }: { t: (typeof testimonials)[0] }) {
  return (
    <div
      className="flex-shrink-0 w-80 glass-card rounded-xl p-6"
      style={{ marginRight: "1.25rem" }}
    >
      <StarRating count={t.stars} />
      <p
        className="text-sm leading-relaxed mb-5"
        style={{ color: "rgba(255,255,255,0.65)", fontFamily: "'Outfit', sans-serif" }}
      >
        "{t.text}"
      </p>
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
          style={{ background: `${t.color}40`, border: `1px solid ${t.color}60` }}
        >
          {t.avatar}
        </div>
        <div>
          <div
            className="text-sm font-bold text-white"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            {t.name}
          </div>
          <div
            className="text-xs"
            style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'Outfit', sans-serif" }}
          >
            {t.role}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TestimonialsSection() {
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-80px" });
  const doubled = [...testimonials, ...testimonials];

  return (
    <section
      className="relative py-24 lg:py-28 overflow-hidden"
      style={{ background: "#0f0d1f" }}
    >
      <div className="container mx-auto max-w-6xl px-4 mb-12">
        <div ref={titleRef} className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="section-label justify-center mb-4"
          >
            Opinie klientów
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl lg:text-5xl font-bold text-white"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Co mówią{" "}
            <span style={{ color: "#a855f7" }}>nasi klienci</span>
          </motion.h2>
        </div>
      </div>

      {/* Carousel — infinite scroll */}
      <div className="relative overflow-hidden">
        {/* Left fade */}
        <div
          className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{
            background: "linear-gradient(to right, #0f0d1f, transparent)",
          }}
        />
        {/* Right fade */}
        <div
          className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{
            background: "linear-gradient(to left, #0f0d1f, transparent)",
          }}
        />

        <motion.div
          className="flex"
          animate={{ x: [0, -(320 + 20) * testimonials.length] }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{ paddingLeft: "1.25rem" }}
        >
          {doubled.map((t, i) => (
            <TestimonialCard key={i} t={t} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

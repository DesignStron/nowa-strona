/*
 * ServicesSection — Dark Glassmorphism Agency
 * Grid of service cards with glass effect and hover animations
 */
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Globe, ShoppingCart, BarChart3, Smartphone, Search, Wrench } from "lucide-react";

const services = [
  {
    icon: <Globe size={28} />,
    title: "Strony firmowe",
    description:
      "Profesjonalna wizytówka Twojej firmy. Budujemy zaufanie i wiarygodność marki, by klienci wybierali właśnie Ciebie.",
    tag: "Najpopularniejsze",
  },
  {
    icon: <ShoppingCart size={28} />,
    title: "Sklepy internetowe",
    description:
      "E-commerce zoptymalizowany pod konwersję. Intuicyjny proces zakupowy, szybkie ładowanie i integracja z systemami płatności.",
    tag: null,
  },
  {
    icon: <BarChart3 size={28} />,
    title: "Landing page",
    description:
      "Dedykowane strony sprzedażowe dla kampanii reklamowych. Maksymalna konwersja, minimalny czas ładowania.",
    tag: null,
  },
  {
    icon: <Smartphone size={28} />,
    title: "Responsywny design",
    description:
      "Każda strona wygląda perfekcyjnie na wszystkich urządzeniach — od telefonu po duży monitor.",
    tag: null,
  },
  {
    icon: <Search size={28} />,
    title: "SEO & Optymalizacja",
    description:
      "Techniczne SEO wbudowane w kod. Szybkość, struktura i meta dane zoptymalizowane pod Google od pierwszego dnia.",
    tag: null,
  },
  {
    icon: <Wrench size={28} />,
    title: "Opieka & Utrzymanie",
    description:
      "Nie zostawiamy Cię po wdrożeniu. Dbamy o aktualizacje, bezpieczeństwo i wprowadzamy zmiany gdy ich potrzebujesz.",
    tag: null,
  },
];

export default function ServicesSection() {
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-80px" });

  return (
    <section
      id="uslugi"
      className="relative py-24 lg:py-32 overflow-hidden"
      style={{ background: "#0a0818" }}
    >
      {/* Background */}
      <div
        className="blob"
        style={{
          width: "600px",
          height: "600px",
          background: "radial-gradient(circle, rgba(6,182,212,0.06) 0%, transparent 70%)",
          top: "0",
          left: "-150px",
        }}
      />

      <div className="container mx-auto max-w-6xl px-4 relative z-10">
        {/* Header */}
        <div ref={titleRef} className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="section-label justify-center mb-4"
          >
            Nasze usługi
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl lg:text-5xl font-bold text-white"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Co dla Ciebie{" "}
            <span style={{ color: "#a855f7" }}>zrobimy</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-base lg:text-lg max-w-xl mx-auto"
            style={{ color: "rgba(255,255,255,0.5)", fontFamily: "'Outfit', sans-serif" }}
          >
            Kompleksowa obsługa — od strategii, przez design, po wdrożenie i utrzymanie.
          </motion.p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({
  service,
  index,
}: {
  service: (typeof services)[0];
  index: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
      className="glass-card rounded-xl p-6 relative group"
    >
      {service.tag && (
        <span
          className="absolute top-4 right-4 text-xs px-2 py-1 rounded-full"
          style={{
            background: "rgba(124,58,237,0.2)",
            border: "1px solid rgba(124,58,237,0.3)",
            color: "#c084fc",
            fontFamily: "'Outfit', sans-serif",
          }}
        >
          {service.tag}
        </span>
      )}
      <div
        className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110"
        style={{
          background: "rgba(124,58,237,0.15)",
          color: "#a855f7",
        }}
      >
        {service.icon}
      </div>
      <h3
        className="text-lg font-bold text-white mb-3"
        style={{ fontFamily: "'Syne', sans-serif" }}
      >
        {service.title}
      </h3>
      <p
        className="text-sm leading-relaxed"
        style={{ color: "rgba(255,255,255,0.5)", fontFamily: "'Outfit', sans-serif" }}
      >
        {service.description}
      </p>
    </motion.div>
  );
}

/*
 * CostsSection - Sekcja z kosztami
 * Estetyczna sekcja informacyjna o kosztach i wycenie
 */
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Calculator, TrendingUp, Clock, Award } from "lucide-react";

const costPoints = [
  {
    icon: <Calculator size={24} />,
    title: "Indywidualna wycena",
    description: "Każdy projekt jest unikalny - koszt zależy od złożoności, liczby podstron i funkcjonalności. Nie ma dwóch takich samych stron!"
  },
  {
    icon: <TrendingUp size={24} />,
    title: "Już od 1000 zł",
    description: "Ceny zaczynają się już od 1000 złotych. Dokładny koszt ustalamy po bezpłatnej konsultacji."
  },
  {
    icon: <Clock size={24} />,
    title: "Elastyczne opcje",
    description: "Dopasowujemy rozwiązania do Twojego budżetu. Możliwe ratalne płatności i różne terminy rozliczeń."
  },
  {
    icon: <Award size={24} />,
    title: "Brak ukrytych kosztów",
    description: "Wszystko jasno opisane w umowie. Wiesz dokładnie, za co płacisz - zero niespodzianek."
  }
];

function CostCard({ point, index }: { point: typeof costPoints[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      whileHover={{ 
        y: -8,
        scale: 1.02,
        boxShadow: "0 20px 40px -12px rgba(168, 85, 247, 0.15)"
      }}
      className="relative overflow-hidden rounded-2xl group cursor-pointer"
      style={{
        background: "rgba(255,255,255,0.02)",
        border: "1px solid rgba(124,58,237,0.1)",
        backdropFilter: "blur(10px)",
      }}
    >
      {/* Animated gradient overlay */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: "linear-gradient(135deg, rgba(168,85,247,0.08) 0%, rgba(6,182,212,0.04) 100%)",
        }}
      />

      {/* Floating particles */}
      <motion.div
        animate={{
          y: [0, -12, 0],
          opacity: [0.2, 0.6, 0.2],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          delay: index * 0.8,
        }}
        className="absolute top-6 right-6 w-3 h-3 rounded-full"
        style={{ background: "rgba(168,85,247,0.6)" }}
      />

      <div className="p-8 relative z-10">
        <motion.div
          initial={{ rotate: 0 }}
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.6 }}
          className="w-14 h-14 rounded-xl flex items-center justify-center mb-6"
          style={{ 
            background: "linear-gradient(135deg, rgba(168,85,247,0.3), rgba(124,58,237,0.2))", 
            color: "#a855f7",
            border: "2px solid rgba(168,85,247,0.4)",
            boxShadow: "0 8px 24px -8px rgba(168,85,247,0.4)"
          }}
        >
          {point.icon}
        </motion.div>

        <motion.h3
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 + index * 0.15 }}
          className="text-xl lg:text-2xl font-bold text-white mb-4"
          style={{ fontFamily: "'Syne', sans-serif" }}
        >
          {point.title}
        </motion.h3>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 + index * 0.15 }}
          className="text-base leading-relaxed"
          style={{ color: "rgba(255,255,255,0.6)", fontFamily: "'Outfit', sans-serif" }}
        >
          {point.description}
        </motion.p>

        {/* Progress indicator */}
        <motion.div
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 1.2, delay: 0.6 + index * 0.15 }}
          className="absolute bottom-0 left-0 h-1 rounded-full"
          style={{
            background: "linear-gradient(90deg, #a855f7, #06b6d4, transparent)",
          }}
        />
      </div>
    </motion.div>
  );
}

export default function CostsSection() {
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-80px" });

  return (
    <section
      id="koszty"
      className="relative py-24 lg:py-32 overflow-hidden"
      style={{ background: "#0f0d1f" }}
    >
      {/* Background elements */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(135deg, rgba(124,58,237,0.05) 0%, rgba(6,182,212,0.02) 100%)",
        }}
      />

      <div className="container mx-auto max-w-6xl px-4 relative z-10">
        {/* Header */}
        <div ref={titleRef} className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6"
            style={{
              background: "rgba(168,85,247,0.1)",
              color: "#a855f7",
              border: "1px solid rgba(168,85,247,0.2)",
              fontFamily: "'Outfit', sans-serif",
            }}
          >
            <Calculator size={16} />
            Koszty
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl lg:text-5xl font-bold text-white mb-6"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Ile kosztuje{" "}
            <span style={{ color: "#a855f7" }}>Twoja strona?</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg max-w-3xl mx-auto"
            style={{ color: "rgba(255,255,255,0.5)", fontFamily: "'Outfit', sans-serif" }}
          >
            Przejrzyste zasady, brak ukrytych kosztów i elastyczne opcje dopasowane do Twojego budżetu. 
            Każdy projekt wyceniamy indywidualnie, bo wierzymy w uczciwe i przejrzyste warunki.
          </motion.p>
        </div>

        {/* Cost cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {costPoints.map((point, index) => (
            <CostCard key={index} point={point} index={index} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <div
            className="inline-block p-8 rounded-2xl"
            style={{
              background: "linear-gradient(135deg, rgba(168,85,247,0.1), rgba(6,182,212,0.05))",
              border: "1px solid rgba(168,85,247,0.2)",
            }}
          >
            <h3
              className="text-2xl font-bold text-white mb-4"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Bezpłatna wycena w 15 minut
            </h3>
            <p
              className="text-base mb-6"
              style={{ color: "rgba(255,255,255,0.6)", fontFamily: "'Outfit', sans-serif" }}
            >
              Skontaktuj się z nami i otrzymaj dokładny kosztorys dopasowany do Twoich potrzeb. 
              Zero zobowiązań, czysta informacja.
            </p>
            <a
              href="tel:+48884679933"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-white font-medium transition-all duration-300 hover:scale-105"
              style={{
                background: "linear-gradient(135deg, #a855f7, #7c3aed)",
                boxShadow: "0 8px 24px -8px rgba(168,85,247,0.4)",
                fontFamily: "'Outfit', sans-serif",
              }}
            >
              <Calculator size={20} />
              Zobacz wycenę
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

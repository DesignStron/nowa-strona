/*
 * CTASection — Dark Glassmorphism Agency
 * Mid-page CTA with gradient background and bold headline
 */
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function CTASection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="relative py-24 lg:py-32 overflow-hidden"
      style={{ background: "#0a0818" }}
    >
      {/* Background image */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(https://d2xsxph8kpxj0f.cloudfront.net/310519663547167839/DLLv9JMdr6HgqPkdBpdubQ/cta-bg-nKGx3rpEuKCUhJqCmjKSFg.webp)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.5,
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to bottom, #0a0818 0%, transparent 30%, transparent 70%, #0a0818 100%)",
        }}
      />

      <div className="container mx-auto max-w-4xl px-4 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="section-label justify-center mb-6"
        >
          Zacznij teraz
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
          style={{ fontFamily: "'Syne', sans-serif" }}
        >
          Najpierw plan działania,{" "}
          <br className="hidden sm:block" />
          dopiero potem{" "}
          <span style={{ color: "#a855f7" }}>wdrożenie.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="text-base lg:text-lg max-w-2xl mx-auto mb-10 leading-relaxed"
          style={{ color: "rgba(255,255,255,0.6)", fontFamily: "'Outfit', sans-serif" }}
        >
          Zamiast zaczynać od grafiki, zaczynamy od celu. Robimy krótki audyt Twojej oferty,
          ruchu i konkurencji, a potem układamy strukturę strony pod leady i sprzedaż.
          Dopiero gdy zaakceptujesz plan, przechodzimy do projektu i kodu.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            onClick={() => {
              const el = document.querySelector("#kontakt");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className="btn-violet flex items-center gap-2 text-base"
            style={{ padding: "1rem 2.5rem" }}
          >
            <span>Rozpocznij współpracę</span>
            <ArrowRight size={18} />
          </button>
          <div
            className="flex items-center gap-2 text-sm"
            style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'Outfit', sans-serif" }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
            Bezpłatna konsultacja — bez zobowiązań
          </div>
        </motion.div>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="flex flex-wrap items-center justify-center gap-6 mt-12"
        >
          {[
            "✓ Odpowiedź w 24h",
            "✓ Darmowa wycena",
            "✓ Bez długoterminowych umów",
          ].map((item) => (
            <span
              key={item}
              className="text-sm"
              style={{ color: "rgba(255,255,255,0.35)", fontFamily: "'Outfit', sans-serif" }}
            >
              {item}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

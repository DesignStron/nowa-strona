/*
 * AboutSection — Dark Glassmorphism Agency
 * Numbered features list with stats on the right
 * Scroll-triggered animations
 */
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Zap, Code2, Users, Palette } from "lucide-react";

const features = [
  {
    number: "01",
    icon: <Zap size={22} className="text-purple-400" />,
    title: "Szybkość działania",
    description:
      "Projektujemy z myślą o wydajności. Strony ładują się poniżej 2 sekund, co przekłada się na lepsze pozycje w Google i wyższą konwersję użytkowników.",
    stat: "<2s",
    statLabel: "Czas ładowania",
  },
  {
    number: "02",
    icon: <Code2 size={22} className="text-purple-400" />,
    title: "Nowoczesne technologie",
    description:
      "Używamy React i Next.js, co zapewnia skalowalność i łatwość rozbudowy. Twoja strona będzie działać sprawnie przez lata i bez problemów integrować się z nowymi narzędziami.",
    stat: "React",
    statLabel: "Technologia",
  },
  {
    number: "03",
    icon: <Users size={22} className="text-purple-400" />,
    title: "Kompleksowa obsługa",
    description:
      "Zajmujemy się wszystkim — od projektu graficznego po kodowanie i wdrożenie. Nie musisz szukać dodatkowych specjalistów, my zapewniamy pełen zakres usług.",
    stat: "360°",
    statLabel: "Zakres usług",
  },
  {
    number: "04",
    icon: <Palette size={22} className="text-purple-400" />,
    title: "Optymalizacja konwersji",
    description:
      "Każdy element projektu jest przemyślany pod kątem sprzedaży. Od układu strony po kolor przycisku — wszystko ma wspierać Twoje cele biznesowe.",
    stat: "CRO",
    statLabel: "Fokus na sprzedaż",
  },
];

function FeatureItem({
  feature,
  index,
}: {
  feature: (typeof features)[0];
  index: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -40 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="relative flex gap-6 lg:gap-10 py-8 border-b"
      style={{ borderColor: "rgba(255,255,255,0.06)" }}
    >
      {/* Large number decoration */}
      <div
        className="absolute -left-2 top-4 text-7xl font-bold select-none pointer-events-none"
        style={{
          fontFamily: "'Syne', sans-serif",
          color: "rgba(255,255,255,0.03)",
          lineHeight: 1,
        }}
      >
        {feature.number}
      </div>

      {/* Number label */}
      <div
        className="flex-shrink-0 w-12 text-sm font-bold pt-1"
        style={{ fontFamily: "'Syne', sans-serif", color: "rgba(255,255,255,0.2)" }}
      >
        {feature.number}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-2">
          {feature.icon}
          <h3
            className="text-lg lg:text-xl font-bold text-white"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            {feature.title}
          </h3>
        </div>
        <p
          className="text-sm lg:text-base leading-relaxed"
          style={{ color: "rgba(255,255,255,0.5)", fontFamily: "'Outfit', sans-serif" }}
        >
          {feature.description}
        </p>
      </div>

      {/* Stat */}
      <div className="flex-shrink-0 text-right hidden sm:block">
        <div
          className="text-2xl lg:text-3xl font-bold"
          style={{ fontFamily: "'Syne', sans-serif", color: "#a855f7" }}
        >
          {feature.stat}
        </div>
        <div
          className="text-xs uppercase tracking-wider mt-1"
          style={{ color: "rgba(255,255,255,0.35)", fontFamily: "'Outfit', sans-serif" }}
        >
          {feature.statLabel}
        </div>
      </div>
    </motion.div>
  );
}

export default function AboutSection() {
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-80px" });

  return (
    <section
      id="o-nas"
      className="relative py-24 lg:py-32 overflow-hidden"
      style={{ background: "#0f0d1f" }}
    >
      {/* Background blob */}
      <div
        className="blob"
        style={{
          width: "500px",
          height: "500px",
          background: "radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 70%)",
          top: "50%",
          right: "-100px",
          transform: "translateY(-50%)",
        }}
      />

      <div className="container mx-auto max-w-5xl px-4 relative z-10">
        {/* Section header */}
        <div ref={titleRef} className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="section-label mb-4"
          >
            Dlaczego my
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl lg:text-5xl font-bold text-white leading-tight"
            style={{ fontFamily: "'Syne', sans-serif", maxWidth: "600px" }}
          >
            Strony, które{" "}
            <span style={{ color: "#a855f7" }}>naprawdę działają</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-base lg:text-lg max-w-xl"
            style={{ color: "rgba(255,255,255,0.5)", fontFamily: "'Outfit', sans-serif" }}
          >
            Nie sprzedajemy szablonów. Tworzymy narzędzia sprzedażowe, które pracują
            dla Ciebie 24/7 i przynoszą mierzalne rezultaty.
          </motion.p>
        </div>

        {/* Features list */}
        <div>
          {features.map((feature, i) => (
            <FeatureItem key={feature.number} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

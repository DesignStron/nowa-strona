/*
 * ProcessSection — Dark Glassmorphism Agency
 * Numbered process steps with alternating layout and connecting line
 * Background: process-bg image
 */
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MessageSquare, Target, Figma, Code, Rocket, HeartHandshake } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: <MessageSquare size={24} />,
    title: "Wstępna rozmowa",
    description:
      "Badamy Twoje cele, grupę docelową i specyfikę branży. Szukamy wąskich gardeł w Twojej obecnej sprzedaży. Rozmowa bez żadnych zobowiązań — zupełnie za darmo.",
  },
  {
    number: "02",
    icon: <Target size={24} />,
    title: "Budowa strategii",
    description:
      "Przekuwamy research branży w plan realizujący Twoje cele biznesowe. Analizujemy nawyki użytkowników i tworzymy mapę konwersji dopasowaną do Twojego rynku.",
  },
  {
    number: "03",
    icon: <Figma size={24} />,
    title: "Projektowanie",
    description:
      "Designer tworzy unikalny wygląd Twojej marki. Każdy element — od kolorów po układ — służy jednemu celowi: przekonaniu odwiedzającego do działania.",
  },
  {
    number: "04",
    icon: <Code size={24} />,
    title: "Programowanie",
    description:
      "Piszemy autorski kod od zera. Żadnych szablonów, żadnych ciężkich wtyczek. Strona jest szybka, bezpieczna i zoptymalizowana pod SEO od pierwszej linii kodu.",
  },
  {
    number: "05",
    icon: <Rocket size={24} />,
    title: "Wdrożenie",
    description:
      "Testujemy na wszystkich urządzeniach i przeglądarkach. Po Twojej akceptacji publikujemy stronę i konfigurujemy analitykę, by od razu śledzić wyniki.",
  },
  {
    number: "06",
    icon: <HeartHandshake size={24} />,
    title: "Opieka po wdrożeniu",
    description:
      "Nie zostawiamy Cię samego. Monitorujemy stronę, wprowadzamy poprawki i rozwijamy ją razem z Twoim biznesem. Jesteś w dobrych rękach na każdym etapie.",
  },
];

function ProcessStep({
  step,
  index,
}: {
  step: (typeof steps)[0];
  index: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isEven ? -60 : 60, scale: 0.9 }}
      animate={inView ? { opacity: 1, x: 0, scale: 1 } : {}}
      transition={{ duration: 0.8, delay: index * 0.15, type: "spring" }}
      whileHover={{ scale: 1.02 }}
      className={`flex flex-col lg:flex-row items-start lg:items-center gap-8 lg:gap-16 relative ${
        !isEven ? "lg:flex-row-reverse" : ""
      }`}
    >
      {/* Flow line animation */}
      <motion.div
        initial={{ pathLength: 0 }}
        animate={inView ? { pathLength: 1 } : {}}
        transition={{ duration: 1.5, delay: 0.5 + index * 0.2 }}
        className="absolute left-8 lg:left-1/2 top-20 lg:top-1/2 transform -translate-y-1/2 hidden lg:block"
        style={{
          width: "2px",
          height: "80px",
          background: `linear-gradient(to bottom, 
            transparent 0%, 
            rgba(168,85,247,0.6) 20%, 
            rgba(168,85,247,0.8) 50%, 
            rgba(168,85,247,0.6) 80%, 
            transparent 100%)`,
          transformOrigin: "top",
        }}
      />

      {/* Floating particles */}
      <motion.div
        animate={{
          y: [0, -15, 0],
          x: [0, 5, 0],
          opacity: [0.3, 0.7, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          delay: index * 0.8,
        }}
        className="absolute top-10 left-10 w-3 h-3 rounded-full hidden lg:block"
        style={{ background: "rgba(168,85,247,0.6)" }}
      />

      {/* Step card */}
      <motion.div
        initial={{ opacity: 0, rotateY: isEven ? -15 : 15 }}
        animate={inView ? { opacity: 1, rotateY: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.2 + index * 0.15 }}
        whileHover={{ 
          y: -8,
          boxShadow: "0 25px 50px -12px rgba(168, 85, 247, 0.25)"
        }}
        className="flex-1 glass-card rounded-2xl p-8 lg:p-10 relative overflow-hidden group"
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

        <div className="flex items-center gap-4 mb-6 relative z-10">
          <motion.div
            initial={{ rotate: 0 }}
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6 }}
            className="w-12 h-12 rounded-xl flex items-center justify-center"
            style={{ 
              background: "linear-gradient(135deg, rgba(168,85,247,0.3), rgba(124,58,237,0.2))", 
              color: "#a855f7",
              border: "2px solid rgba(168,85,247,0.4)",
              boxShadow: "0 8px 24px -8px rgba(168,85,247,0.4)"
            }}
          >
            {step.icon}
          </motion.div>
          <motion.span
            initial={{ opacity: 0, x: -10 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 + index * 0.15 }}
            className="text-sm font-bold tracking-widest uppercase"
            style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'Syne', sans-serif" }}
          >
            Krok {step.number}
          </motion.span>
        </div>

        <motion.h3
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 + index * 0.15 }}
          className="text-2xl lg:text-3xl font-bold text-white mb-4 relative z-10"
          style={{ fontFamily: "'Syne', sans-serif" }}
        >
          {step.title}
        </motion.h3>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 + index * 0.15 }}
          className="text-base lg:text-lg leading-relaxed relative z-10"
          style={{ color: "rgba(255,255,255,0.6)", fontFamily: "'Outfit', sans-serif" }}
        >
          {step.description}
        </motion.p>

        {/* Progress indicator */}
        <motion.div
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 1.2, delay: 0.8 + index * 0.15 }}
          className="absolute bottom-0 left-0 h-1 rounded-full"
          style={{
            background: "linear-gradient(90deg, #a855f7, #06b6d4, transparent)",
          }}
        />
      </motion.div>

      {/* Number decoration */}
      <motion.div
        initial={{ opacity: 0, scale: 0, rotate: -180 }}
        animate={inView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
        transition={{ delay: 0.6 + index * 0.15, type: "spring" }}
        whileHover={{ scale: 1.1, rotate: 5 }}
        className="flex-shrink-0 flex flex-col items-center relative"
      >
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center text-3xl font-bold border-3 relative"
          style={{
            fontFamily: "'Syne', sans-serif",
            color: "#a855f7",
            borderColor: "rgba(168,85,247,0.5)",
            background: "linear-gradient(135deg, rgba(168,85,247,0.2), rgba(124,58,237,0.1))",
            boxShadow: "0 12px 32px -8px rgba(168,85,247,0.3)",
          }}
        >
          {/* Inner glow */}
          <div 
            className="absolute inset-2 rounded-full opacity-50"
            style={{
              background: "radial-gradient(circle, rgba(168,85,247,0.3) 0%, transparent 70%)",
            }}
          />
          <span className="relative z-10">{step.number}</span>
        </div>
        
        {/* Animated connector line */}
        {index < steps.length - 1 && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={inView ? { height: 60, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 1 + index * 0.15 }}
            className="w-1 mt-4 hidden lg:block relative"
            style={{
              background: "linear-gradient(to bottom, rgba(168,85,247,0.6), transparent)",
              transformOrigin: "top",
            }}
          >
            {/* Flowing dot */}
            <motion.div
              animate={{ y: [0, 60] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: index * 0.3,
              }}
              className="absolute w-2 h-2 rounded-full -left-0.5"
              style={{ background: "#a855f7" }}
            />
          </motion.div>
        )}
      </motion.div>

      {/* Spacer for alternating layout */}
      <div className="flex-1 hidden lg:block" />
    </motion.div>
  );
}

export default function ProcessSection() {
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-80px" });

  return (
    <section
      id="proces"
      className="relative py-24 lg:py-32 overflow-hidden"
      style={{ background: "#0f0d1f" }}
    >
      {/* Background image */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(https://d2xsxph8kpxj0f.cloudfront.net/310519663547167839/DLLv9JMdr6HgqPkdBpdubQ/process-bg-cKdgtFqhmE6ketfT6xwXHJ.webp)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.15,
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to bottom, #0f0d1f 0%, transparent 30%, transparent 70%, #0f0d1f 100%)",
        }}
      />

      <div className="container mx-auto max-w-4xl px-4 relative z-10">
        {/* Header */}
        <div ref={titleRef} className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="section-label justify-center mb-4"
          >
            Proces
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl lg:text-5xl font-bold text-white"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Jak{" "}
            <span style={{ color: "#a855f7" }}>budujemy</span>{" "}
            Twoją stronę
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-base lg:text-lg max-w-xl mx-auto"
            style={{ color: "rgba(255,255,255,0.5)", fontFamily: "'Outfit', sans-serif" }}
          >
            Sześć kroków. Pełna transparentność. Ty decydujesz na każdym etapie.
          </motion.p>
        </div>

        {/* Steps */}
        <div className="flex flex-col gap-8">
          {steps.map((step, i) => (
            <ProcessStep key={step.number} step={step} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

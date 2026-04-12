/*
 * TeamSection — Dark Glassmorphism Agency
 * Team members with roles and descriptions
 */
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const team = [
  {
    number: "01",
    role: "Lead Developer",
    description:
      "Architekt nowoczesnych rozwiązań webowych. Z pasją tworzy błyskawiczne aplikacje, które zachwycają wydajnością. Specjalista od React, Node.js i optymalizacji Core Web Vitals. Jego kod to poezja dla przeglądarek.",
    color: "#7c3aed",
    icon: "⚡",
  },
  {
    number: "02",
    role: "UX/UI Master",
    description:
      "Magik od psychologii użytkownika. Każdy projekt traktuje jak dzieło sztuki, łącząc estetykę z funkcjonalnością. Projektuje interfejsy, które użytkownicy pokochają od pierwszego kliknięcia. Jego designy zdobyły nagrody międzynarodowe.",
    color: "#06b6d4",
    icon: "🎨",
  },
  {
    number: "03",
    role: "SEO Strategist",
    description:
      "Tactical genius świata cyfrowego. Zmienia zwykłe strony w potężne maszyny do generowania leadów. Zna każdy algorytm Google i potrafi sprawić, że Twoja firma pojawi się na szczycie wyników. Jego strategie przynoszą mierzalne zyski.",
    color: "#10b981",
    icon: "🚀",
  },
  {
    number: "04",
    role: "Content Architect",
    description:
      "Słowo ma dla niego ogromną moc. Tworzy treści, które nie tylko informują, ale przede wszystkim sprzedają. Każdy tekst to dopracowana historia, która buduje zaufanie i konwertuje. Jego copywriting zwiększa sprzedaż o średnio 47%.",
    color: "#f59e0b",
    icon: "✍️",
  },
];

export default function TeamSection() {
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-80px" });

  return (
    <section
      className="relative py-24 lg:py-28 overflow-hidden"
      style={{ background: "#0a0818" }}
    >
      <div
        className="blob"
        style={{
          width: "500px",
          height: "500px",
          background: "radial-gradient(circle, rgba(6,182,212,0.06) 0%, transparent 70%)",
          top: "50%",
          right: "-100px",
          transform: "translateY(-50%)",
        }}
      />

      <div className="container mx-auto max-w-5xl px-4 relative z-10">
        <div ref={titleRef} className="mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="section-label mb-4"
          >
            Zespół
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl lg:text-5xl font-bold text-white"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Ludzie, którzy{" "}
            <span style={{ color: "#a855f7" }}>tworzą</span> Twoją stronę
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-base lg:text-lg max-w-2xl"
            style={{ color: "rgba(255,255,255,0.5)", fontFamily: "'Outfit', sans-serif" }}
          >
            Zgrany zespół czterech ekspertów, którzy tworzą cyfrowe rewolucje. Każdy projekt 
            to nasze wspólne dzieło, które przekracza oczekiwania i bije rekordy konwersji.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {team.map((member, i) => (
            <TeamCard key={member.role} member={member} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TeamCard({
  member,
  index,
}: {
  member: (typeof team)[0];
  index: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ 
        y: -8, 
        scale: 1.05,
        boxShadow: `0 20px 40px -10px ${member.color}40`
      }}
      className="glass-card rounded-2xl p-6 group relative overflow-hidden"
      style={{
        background: "rgba(255,255,255,0.02)",
        border: "1px solid rgba(124,58,237,0.1)",
      }}
    >
      {/* Glow effect on hover */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle at 50% 0%, ${member.color}15 0%, transparent 70%)`,
        }}
      />

      <div
        className="text-xs font-bold tracking-widest uppercase mb-3 relative z-10"
        style={{ color: "rgba(255,255,255,0.3)", fontFamily: "'Syne', sans-serif" }}
      >
        {member.number}
      </div>

      <motion.div
        initial={{ rotate: 0 }}
        whileHover={{ rotate: 360 }}
        transition={{ duration: 0.6 }}
        className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl mb-4 mx-auto relative z-10"
        style={{ 
          background: `linear-gradient(135deg, ${member.color}20, ${member.color}10)`, 
          border: `2px solid ${member.color}30`,
          boxShadow: `0 8px 24px -8px ${member.color}40`
        }}
      >
        {member.icon}
      </motion.div>

      <h3
        className="text-lg font-bold mb-3 text-center relative z-10"
        style={{ fontFamily: "'Syne', sans-serif", color: member.color }}
      >
        {member.role}
      </h3>

      <motion.div
        initial={{ width: "0%" }}
        animate={{ width: "100%" }}
        transition={{ duration: 0.8, delay: 0.3 + index * 0.1 }}
        className="h-0.5 mb-4 relative z-10"
        style={{ background: `linear-gradient(90deg, ${member.color}, transparent)` }}
      />

      <p
        className="text-xs leading-relaxed text-center relative z-10"
        style={{ color: "rgba(255,255,255,0.6)", fontFamily: "'Outfit', sans-serif" }}
      >
        {member.description}
      </p>

      {/* Floating particles effect */}
      <motion.div
        animate={{
          y: [0, -10, 0],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          delay: index * 0.5,
        }}
        className="absolute top-4 right-4 w-2 h-2 rounded-full"
        style={{ background: member.color }}
      />
    </motion.div>
  );
}

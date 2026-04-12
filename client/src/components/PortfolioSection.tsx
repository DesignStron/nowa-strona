/*
 * PortfolioSection — Dark Glassmorphism Agency
 * Case studies / portfolio cards with stats
 */
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ExternalLink, TrendingUp, Users, Star } from "lucide-react";

const projects = [
  {
    name: "FitPro Studio",
    category: "Strona firmowa + Lead generation",
    description:
      "Strona studia fitness z systemem zapisów online i integracją Google Ads. Wzrost liczby zapytań o 340% w ciągu 3 miesięcy.",
    stats: [
      { icon: <TrendingUp size={14} />, value: "340%", label: "więcej zapytań" },
      { icon: <Users size={14} />, value: "1.2k+", label: "wejść/mies." },
      { icon: <Star size={14} />, value: "98/100", label: "wynik Google" },
    ],
    tags: ["React", "SEO", "Google Ads"],
    color: "#7c3aed",
    bg: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&q=80",
  },
  {
    name: "AutoSerwis Kowalski",
    category: "Strona firmowa",
    description:
      "Strona mechanika samochodowego nastawiona na nowych klientów z lokalnego SEO. Pierwsza pozycja w Google dla 12 fraz kluczowych.",
    stats: [
      { icon: <TrendingUp size={14} />, value: "#1", label: "w Google lokalnie" },
      { icon: <Users size={14} />, value: "17", label: "nowych klientów/mies." },
      { icon: <Star size={14} />, value: "4.9★", label: "ocena klientów" },
    ],
    tags: ["SEO lokalne", "Konwersja", "WordPress-free"],
    color: "#06b6d4",
    bg: "https://images.unsplash.com/photo-1625047509168-a7026f36de04?w=600&q=80",
  },
  {
    name: "TopGlobal Logistics",
    category: "Strona korporacyjna",
    description:
      "Strona firmy logistycznej budująca wizerunek i wiarygodność marki. Wynik Google PageSpeed 95/100, zero szablonów.",
    stats: [
      { icon: <TrendingUp size={14} />, value: "95/100", label: "PageSpeed" },
      { icon: <Users size={14} />, value: "3x", label: "dłuższy czas na stronie" },
      { icon: <Star size={14} />, value: "100%", label: "autorski kod" },
    ],
    tags: ["Korporacyjna", "Performance", "Branding"],
    color: "#a855f7",
    bg: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&q=80",
  },
];

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.12 }}
      className="glass-card rounded-2xl overflow-hidden group"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={project.bg}
          alt={project.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to bottom, transparent 40%, rgba(15,13,31,0.9) 100%)`,
          }}
        />
        <div className="absolute top-4 right-4">
          <span
            className="text-xs px-2 py-1 rounded-full font-medium"
            style={{
              background: "rgba(0,0,0,0.5)",
              border: `1px solid ${project.color}40`,
              color: project.color,
              fontFamily: "'Outfit', sans-serif",
            }}
          >
            LIVE
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div
          className="text-xs uppercase tracking-wider mb-2"
          style={{ color: "rgba(255,255,255,0.35)", fontFamily: "'Outfit', sans-serif" }}
        >
          {project.category}
        </div>
        <h3
          className="text-xl font-bold text-white mb-3"
          style={{ fontFamily: "'Syne', sans-serif" }}
        >
          {project.name}
        </h3>
        <p
          className="text-sm leading-relaxed mb-5"
          style={{ color: "rgba(255,255,255,0.5)", fontFamily: "'Outfit', sans-serif" }}
        >
          {project.description}
        </p>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-5">
          {project.stats.map((stat) => (
            <div
              key={stat.label}
              className="text-center p-2 rounded-lg"
              style={{ background: "rgba(255,255,255,0.04)" }}
            >
              <div
                className="flex items-center justify-center gap-1 text-base font-bold mb-1"
                style={{ fontFamily: "'Syne', sans-serif", color: project.color }}
              >
                {stat.icon}
                {stat.value}
              </div>
              <div
                className="text-xs"
                style={{ color: "rgba(255,255,255,0.35)", fontFamily: "'Outfit', sans-serif" }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-1 rounded"
              style={{
                background: "rgba(255,255,255,0.06)",
                color: "rgba(255,255,255,0.5)",
                fontFamily: "'Outfit', sans-serif",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function PortfolioSection() {
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-80px" });

  return (
    <section
      id="realizacje"
      className="relative py-24 lg:py-32 overflow-hidden"
      style={{ background: "#0a0818" }}
    >
      <div
        className="blob"
        style={{
          width: "500px",
          height: "500px",
          background: "radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 70%)",
          bottom: "0",
          right: "-100px",
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
            Realizacje
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl lg:text-5xl font-bold text-white"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Nasze{" "}
            <span style={{ color: "#a855f7" }}>projekty</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-base lg:text-lg max-w-xl mx-auto"
            style={{ color: "rgba(255,255,255,0.5)", fontFamily: "'Outfit', sans-serif" }}
          >
            Każdy projekt to historia sukcesu. Sprawdź, co osiągnęliśmy dla naszych klientów.
          </motion.p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.name} project={project} index={i} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <p
            className="text-sm mb-4"
            style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'Outfit', sans-serif" }}
          >
            Chcesz dołączyć do grona zadowolonych klientów?
          </p>
          <button
            onClick={() => {
              const el = document.querySelector("#kontakt");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className="btn-violet"
          >
            <span>Rozpocznij projekt</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}

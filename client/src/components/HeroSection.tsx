/*
 * HeroSection — Dark Glassmorphism Agency
 * Full-screen hero with typing animation, gradient blobs, stats bar
 * Background: generated hero-bg image with overlay
 */
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";

const TYPING_WORDS = [
  "sprzedaje.",
  "zachwyca.",
  "konwertuje.",
  "wyróżnia.",
  "działa.",
];

function useTypingEffect(words: string[], speed = 80, pause = 2000) {
  const [displayed, setDisplayed] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const currentWord = words[wordIdx];

    if (!deleting && charIdx < currentWord.length) {
      timeoutRef.current = setTimeout(() => {
        setDisplayed(currentWord.slice(0, charIdx + 1));
        setCharIdx((c) => c + 1);
      }, speed);
    } else if (!deleting && charIdx === currentWord.length) {
      timeoutRef.current = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIdx > 0) {
      timeoutRef.current = setTimeout(() => {
        setDisplayed(currentWord.slice(0, charIdx - 1));
        setCharIdx((c) => c - 1);
      }, speed / 2);
    } else if (deleting && charIdx === 0) {
      setDeleting(false);
      setWordIdx((w) => (w + 1) % words.length);
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [charIdx, deleting, wordIdx, words, speed, pause]);

  return displayed;
}

function useCountUp(target: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    const startTime = performance.now();
    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

function StatItem({
  value,
  suffix,
  prefix,
  label,
  delay,
  inView,
  customDisplay,
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  delay: number;
  inView: boolean;
  customDisplay?: string;
}) {
  const count = useCountUp(value, 2000, inView);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.6 }}
      className="text-center px-4"
    >
      <div
        className="text-4xl lg:text-5xl font-bold mb-2"
        style={{ fontFamily: "'Syne', sans-serif" }}
      >
        {customDisplay ? (
          <span className="text-white">{customDisplay}</span>
        ) : (
          <>
            {prefix && (
              <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.75em" }}>
                {prefix}
              </span>
            )}
            <span className="text-white">{count}</span>
            {suffix && (
              <span style={{ color: "#a855f7" }}>{suffix}</span>
            )}
          </>
        )}
      </div>
      <p
        className="text-xs uppercase tracking-widest"
        style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'Outfit', sans-serif", lineHeight: 1.6 }}
      >
        {label}
      </p>
    </motion.div>
  );
}

export default function HeroSection() {
  const typedText = useTypingEffect(TYPING_WORDS);
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setStatsVisible(true);
      },
      { threshold: 0.3 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  const handleScroll = () => {
    const el = document.querySelector("#o-nas");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleCTA = () => {
    const el = document.querySelector("#kontakt");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col overflow-hidden"
      style={{ background: "#0a0818" }}
    >
      {/* Background image */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(https://d2xsxph8kpxj0f.cloudfront.net/310519663547167839/DLLv9JMdr6HgqPkdBpdubQ/hero-bg-YUXyMXHBgXSpDjictjV2T5.webp)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.6,
        }}
      />
      {/* Dark overlay gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(10,8,24,0.3) 0%, rgba(10,8,24,0.1) 40%, rgba(10,8,24,0.7) 80%, rgba(10,8,24,1) 100%)",
        }}
      />

      {/* Floating blobs */}
      <div
        className="blob"
        style={{
          width: "600px",
          height: "600px",
          background: "radial-gradient(circle, rgba(124,58,237,0.25) 0%, transparent 70%)",
          top: "-100px",
          left: "-100px",
          animation: "float1 12s ease-in-out infinite",
        }}
      />
      <div
        className="blob"
        style={{
          width: "400px",
          height: "400px",
          background: "radial-gradient(circle, rgba(6,182,212,0.15) 0%, transparent 70%)",
          bottom: "200px",
          right: "-50px",
          animation: "float2 15s ease-in-out infinite",
        }}
      />

      {/* Main hero content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 pt-24 pb-16 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full"
          style={{
            background: "rgba(124,58,237,0.15)",
            border: "1px solid rgba(124,58,237,0.3)",
            fontFamily: "'Outfit', sans-serif",
            fontSize: "0.8rem",
            color: "#c084fc",
          }}
        >
          <span
            className="w-2 h-2 rounded-full animate-pulse"
            style={{ background: "#a855f7" }}
          />
          Profesjonalne strony internetowe dla firm
        </motion.div>

        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight mb-6"
          style={{ fontFamily: "'Syne', sans-serif", maxWidth: "900px" }}
        >
          Zbudujemy Ci stronę,{" "}
          <br className="hidden sm:block" />
          która{" "}
          <span style={{ color: "#a855f7" }}>{typedText}</span>
          <span className="typing-cursor" />
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-base sm:text-lg max-w-xl mb-10 leading-relaxed"
          style={{ color: "rgba(255,255,255,0.6)", fontFamily: "'Outfit', sans-serif" }}
        >
          Tworzymy nowoczesne strony internetowe oparte o twarde dane. Badamy Twoją branżę,
          projektujemy unikalny wygląd i dostarczamy kod, który działa — bez szablonów,
          bez kompromisów.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65 }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <button
            onClick={handleCTA}
            className="btn-violet flex items-center gap-2"
          >
            <span>Porozmawiajmy o Twojej stronie</span>
            <ArrowRight size={16} />
          </button>
          <button
            onClick={() => {
              const el = document.querySelector("#realizacje");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className="text-sm font-medium transition-colors hover:text-purple-400"
            style={{
              color: "rgba(255,255,255,0.6)",
              fontFamily: "'Outfit', sans-serif",
              letterSpacing: "0.03em",
            }}
          >
            Zobacz realizacje →
          </button>
        </motion.div>
      </div>

      {/* Stats bar */}
      <div
        ref={statsRef}
        className="relative z-10 w-full border-t"
        style={{ borderColor: "rgba(255,255,255,0.07)" }}
      >
        <div className="container mx-auto max-w-5xl px-4 py-10">
          <div className="grid grid-cols-3 divide-x" style={{ borderColor: 'rgba(255,255,255,0.07)' }}>
          <StatItem
            value={15}
            suffix="+"
            label="Zrealizowanych projektów"
            delay={0}
            inView={statsVisible}
          />
          <StatItem
            value={98}
            suffix="%"
            label="Klientów poleca nas dalej"
            delay={0.15}
            inView={statsVisible}
          />
          <StatItem
            value={24}
            suffix="/7"
            label="Wsparcie techniczne"
            delay={0.3}
            inView={statsVisible}
          />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={handleScroll}
        className="absolute bottom-32 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 opacity-50 hover:opacity-80 transition-opacity"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        aria-label="Przewiń w dół"
      >
        <ChevronDown size={20} color="white" />
      </motion.button>

      <style>{`
        @keyframes float1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(40px, -30px) scale(1.05); }
          66% { transform: translate(-20px, 20px) scale(0.95); }
        }
        @keyframes float2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-30px, 20px) scale(1.08); }
          66% { transform: translate(20px, -15px) scale(0.92); }
        }
      `}</style>
    </section>
  );
}

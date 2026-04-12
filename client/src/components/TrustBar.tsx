/*
 * TrustBar — Dark Glassmorphism Agency
 * Scrolling marquee with tech stack and trust indicators
 */
import { motion } from "framer-motion";

const baseItems = [
  "⚡ React & Next.js",
  "🎨 Unikalny Design",
  "🔒 Bezpieczny Kod",
  "📱 Responsywność",
  "🚀 PageSpeed 95+",
  "🔍 SEO Techniczne",
  "💜 Autorski Kod",
  "📊 Analityka",
  "🤝 Dedykowany Opiekun",
  "🏆 Zero Szablonów",
];

export default function TrustBar() {
  const items = [...baseItems, ...baseItems];
  return (
    <div
      className="relative overflow-hidden py-4"
      style={{
        background: "rgba(124,58,237,0.06)",
        borderTop: "1px solid rgba(124,58,237,0.12)",
        borderBottom: "1px solid rgba(124,58,237,0.12)",
      }}
    >
      {/* Left fade */}
      <div
        className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to right, #0f0d1f, transparent)" }}
      />
      {/* Right fade */}
      <div
        className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to left, #0f0d1f, transparent)" }}
      />

      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: [0, -(baseItems.length * 200)] }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {items.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-2 mx-8 text-sm font-medium"
            style={{
              color: "rgba(255,255,255,0.5)",
              fontFamily: "'Outfit', sans-serif",
              letterSpacing: "0.03em",
            }}
          >
            {item}
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: "rgba(124,58,237,0.5)" }}
            />
          </span>
        ))}
      </motion.div>
    </div>
  );
}

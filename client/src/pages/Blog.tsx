/*
 * Blog — DesignStron.pl
 * Blog page with articles
 */
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Calendar, User } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const handleArticleClick = (articleId: number) => {
  // Tutaj moglibymy otworzy artyku w nowym oknie lub przekierowa na szczegóowy artyku
  // Na razie otworzymy placeholder
  window.open(`/blog/${articleId}`, '_blank');
};

const articles = [
  {
    id: 1,
    title: "Dlaczego szybkość stron to nie luksus, a konieczność",
    excerpt:
      "Każda sekunda opóźnienia to utrata klientów. Dowiedz się, jak PageSpeed wpływa na konwersję i SEO w 2026 roku.",
    date: "15 kwietnia 2026",
    author: "Jakub Kowalski",
    category: "SEO",
    readTime: "8 min",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&h=400&fit=crop",
  },
  {
    id: 2,
    title: "SEO vs UX - co ważniejsze dla Twojej strony?",
    excerpt:
      "Dwa żywioły, jeden cel. Odkryj jak SEO i UX mogą działać razem dla lepszych wyników Twojej strony.",
    date: "10 kwietnia 2026",
    author: "Anna Nowak",
    category: "SEO/UX",
    readTime: "10 min",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop",
  },
  {
    id: 3,
    title: "Konwersja - jak zamienić odwiedzających na klientów",
    excerpt:
      "Praktyczne strategie CRO, które zwiększają konwersję o 20-40%. Sprawdzone na 50+ projektach.",
    date: "5 kwietnia 2026",
    author: "Tomasz Wiernicki",
    category: "CRO",
    readTime: "12 min",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
  },
  {
    id: 4,
    title: "Jak wybrać odpowiedni hosting dla Twojej strony?",
    excerpt:
      "Kompletny przewodnik po rodzajach hostingu. Od shared po VPS - co wybrać dla Twojego biznesu?",
    date: "1 kwietnia 2026",
    author: "Marek Kowalski",
    category: "Hosting",
    readTime: "8 min",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbcc31c?w=600&h=400&fit=crop",
  },
  {
    id: 5,
    title: "Content marketing - jak tworzyć treści, które sprzedają?",
    excerpt:
      "Strategie tworzenia treści, które przyciągają klientów i budują markę w 2026 roku.",
    date: "28 marca 2026",
    author: "Ewa Nowakowska",
    category: "Marketing",
    readTime: "10 min",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&h=400&fit=crop",
  },
  {
    id: 6,
    title: "Bezpieczeństwo strony - jak chronić swoją obecność online?",
    excerpt:
      "Ochrona przed atakami, SSL, malware. Kompletny przewodnik bezpieczeństwa dla małych firm.",
    date: "20 marca 2026",
    author: "Piotr Zieliaski",
    category: "Bezpieczeństwo",
    readTime: "12 min",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&h=400&fit=crop",
  },
];

export default function Blog() {
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-80px" });

  return (
    <div className="min-h-screen" style={{ background: "#0f0d1f" }}>
      <Navbar />

      {/* Header */}
      <div
        className="relative pt-32 pb-24 overflow-hidden"
        style={{
          background: "linear-gradient(135deg, rgba(124,58,237,0.15), rgba(6,182,212,0.08))",
        }}
      >
        <div
          className="blob"
          style={{
            width: "400px",
            height: "400px",
            background: "radial-gradient(circle, rgba(168,85,247,0.1) 0%, transparent 70%)",
            top: "-100px",
            right: "-100px",
            position: "absolute",
          }}
        />

        <div className="container mx-auto max-w-5xl px-4 relative z-10">
          <motion.div
            ref={titleRef}
            initial={{ opacity: 0, y: 30 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={titleInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5 }}
              className="inline-block px-4 py-2 rounded-full mb-6"
              style={{
                background: "rgba(124,58,237,0.15)",
                border: "1px solid rgba(124,58,237,0.3)",
              }}
            >
              <span
                className="text-xs font-bold uppercase tracking-widest"
                style={{ color: "#c084fc", fontFamily: "'Outfit', sans-serif" }}
              >
                📚 Artykuły i Poradniki
              </span>
            </motion.div>

            <h1
              className="text-5xl lg:text-6xl font-bold text-white mb-4"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Blog <span style={{ color: "#a855f7" }}>DesignStron</span>
            </h1>
            <p
              className="text-lg max-w-2xl mx-auto"
              style={{ color: "rgba(255,255,255,0.5)", fontFamily: "'Outfit', sans-serif" }}
            >
              Artykuły o web designie, technologii i strategii cyfrowej. Dowiedz się, jak tworzyć strony, które sprzedają.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Articles grid */}
      <div className="container mx-auto max-w-5xl px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article, i) => (
            <ArticleCard key={article.id} article={article} index={i} />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}

function ArticleCard({
  article,
  index,
}: {
  article: (typeof articles)[0];
  index: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, delay: (index % 3) * 0.15 }}
      whileHover={{ 
        y: -12,
        scale: 1.03,
        boxShadow: "0 25px 50px -12px rgba(168, 85, 247, 0.25)"
      }}
      onClick={() => handleArticleClick(article.id)}
      className="rounded-2xl overflow-hidden group relative cursor-pointer"
      style={{
        background: "rgba(255,255,255,0.02)",
        border: "1px solid rgba(124,58,237,0.15)",
        backdropFilter: "blur(10px)",
      }}
    >
      {/* Animated gradient overlay */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: "linear-gradient(135deg, rgba(168,85,247,0.1) 0%, rgba(6,182,212,0.05) 100%)",
        }}
      />

      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        <motion.img
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.15 }}
          transition={{ duration: 0.7 }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to bottom, transparent 0%, rgba(15,13,31,0.4) 50%, rgba(15,13,31,0.9) 100%)",
          }}
        />
        
        {/* Floating category badge */}
        <motion.div 
          className="absolute top-4 left-4"
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.3 + index * 0.1 }}
        >
          <motion.span
            whileHover={{ scale: 1.1 }}
            className="px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-md"
            style={{
              background: "rgba(124,58,237,0.6)",
              color: "#c084fc",
              border: "1px solid rgba(124,58,237,0.3)",
              boxShadow: "0 8px 24px -8px rgba(124,58,237,0.4)"
            }}
          >
            {article.category}
          </motion.span>
        </motion.div>

        {/* Reading time indicator */}
        <motion.div
          className="absolute top-4 right-4"
          initial={{ opacity: 0, x: 20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.4 + index * 0.1 }}
        >
          <div className="px-3 py-1 rounded-full text-xs font-medium backdrop-blur-md"
            style={{
              background: "rgba(15,13,31,0.8)",
              color: "rgba(255,255,255,0.7)",
              border: "1px solid rgba(255,255,255,0.1)"
            }}
          >
            {article.readTime}
          </div>
        </motion.div>
      </div>

      {/* Content */}
      <div className="p-6 relative z-10">
        <motion.h3
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 + index * 0.1 }}
          className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-purple-300 transition-colors"
          style={{ fontFamily: "'Syne', sans-serif" }}
        >
          {article.title}
        </motion.h3>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 + index * 0.1 }}
          className="text-sm mb-4 line-clamp-3 leading-relaxed"
          style={{ color: "rgba(255,255,255,0.5)", fontFamily: "'Outfit', sans-serif" }}
        >
          {article.excerpt}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 + index * 0.1 }}
          className="flex items-center justify-between text-xs"
          style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'Outfit', sans-serif" }}
        >
          <div className="flex items-center gap-1">
            <Calendar size={12} className="text-purple-400" />
            {article.date}
          </div>
          <div className="flex items-center gap-1">
            <User size={12} className="text-purple-400" />
            {article.author}
          </div>
        </motion.div>

        {/* Animated CTA button */}
        <motion.div
          className="flex items-center justify-between pt-4 mt-4 border-b-2 border-transparent group-hover:border-purple-500/30 transition-all duration-300"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 + index * 0.1 }}
        >
          <span
            className="text-xs font-medium uppercase tracking-wider"
            style={{ color: "rgba(255,255,255,0.5)", fontFamily: "'Outfit', sans-serif" }}
          >
            Czytaj dalej
          </span>
          <motion.div
            whileHover={{ x: 6 }}
            className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{
              background: "rgba(168,85,247,0.2)",
              border: "1px solid rgba(168,85,247,0.3)"
            }}
          >
            <ArrowRight size={14} className="text-purple-400" />
          </motion.div>
        </motion.div>
      </div>

      {/* Floating particles */}
      <motion.div
        animate={{
          y: [0, -15, 0],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          delay: index * 0.8,
        }}
        className="absolute top-20 right-6 w-3 h-3 rounded-full"
        style={{ background: "rgba(168,85,247,0.6)" }}
      />
    </motion.div>
  );
}

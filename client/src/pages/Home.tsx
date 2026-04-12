/*
 * Home — DesignStron.pl
 * Dark Glassmorphism Agency Website
 * Sections: Navbar, Hero, TrustBar, About, Services, Team, Process, Portfolio, Testimonials, CTA, FAQ, Contact, Footer
 */
import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { ArrowUp } from "lucide-react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import TeamSection from "@/components/TeamSection";
import CostsSection from "@/components/CostsSection";
import ProcessSection from "@/components/ProcessSection";
import PortfolioSection from "@/components/PortfolioSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import CTASection from "@/components/CTASection";
import FAQSection from "@/components/FAQSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const handler = () => setShowScrollTop(window.scrollY > 600);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <div className="min-h-screen" style={{ background: "#0f0d1f" }}>
      {/* Scroll progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 z-[100] h-0.5 origin-left"
        style={{
          scaleX,
          background: "linear-gradient(to right, #7c3aed, #a855f7, #06b6d4)",
        }}
      />

      <Navbar />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <TeamSection />
      <CostsSection />
      <ProcessSection />
      <PortfolioSection />
      <TestimonialsSection />
      <CTASection />
      <FAQSection />
      <ContactSection />
      <Footer />

      {/* Phone CTA - floating */}
      <motion.a
        href="tel:+48884679933"
        className="fixed bottom-8 left-8 z-50 hidden sm:flex items-center gap-2 px-4 py-3 rounded-full text-sm font-medium"
        style={{
          background: "rgba(15,13,31,0.9)",
          border: "1px solid rgba(124,58,237,0.4)",
          color: "#c084fc",
          backdropFilter: "blur(12px)",
          fontFamily: "'Outfit', sans-serif",
          boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
        }}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2 }}
        whileHover={{ scale: 1.05 }}
      >
        <span style={{ fontSize: "1rem" }}>📞</span>
        +48 884 679 933
      </motion.a>

      {/* Scroll to top button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full flex items-center justify-center shadow-lg"
            style={{
              background: "linear-gradient(135deg, #7c3aed, #a855f7)",
              boxShadow: "0 4px 20px rgba(124,58,237,0.4)",
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Powrót na górę"
          >
            <ArrowUp size={18} color="white" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

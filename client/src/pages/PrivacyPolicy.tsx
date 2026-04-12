/*
 * PrivacyPolicy — DesignStron.pl
 * Privacy policy page
 */
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function PrivacyPolicy() {
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
        <div className="container mx-auto max-w-3xl px-4 relative z-10">
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
                🔒 Dokumenty Prawne
              </span>
            </motion.div>

            <h1
              className="text-5xl lg:text-6xl font-bold text-white mb-4"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Polityka <span style={{ color: "#a855f7" }}>Prywatności</span>
            </h1>
            <p
              className="text-base"
              style={{ color: "rgba(255,255,255,0.5)", fontFamily: "'Outfit', sans-serif" }}
            >
              Ostatnia aktualizacja: 12 kwietnia 2026
            </p>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto max-w-3xl px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Section title="1. Wprowadzenie">
            <p>
              DesignStron.pl obsługuje stronę internetową designstron.pl. Ta strona
              Polityki Prywatności wyjaśnia nasze zasady dotyczące gromadzenia,
              wykorzystywania i ujawniania informacji o Tobie.
            </p>
          </Section>

          <Section title="2. Informacje, które zbieramy">
            <p>Zbieramy informacje na wiele sposobów, w tym:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Informacje, które podajesz bezpośrednio (np. poprzez formularz)</li>
              <li>Informacje zbierane automatycznie (np. cookies, logi dostępu)</li>
              <li>Informacje z Google Analytics</li>
            </ul>
          </Section>

          <Section title="3. Jak wykorzystujemy Twoje informacje">
            <p>Wykorzystujemy zebrane informacje do:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Odpowiadania na Twoje zapytania</li>
              <li>Poprawy naszego Serwisu</li>
              <li>Analizy ruchu i zachowania użytkowników</li>
              <li>Wysyłania informacji marketingowych (za Twoją zgodą)</li>
            </ul>
          </Section>

          <Section title="4. Cookies">
            <p>
              Używamy cookies do śledzenia aktywności na naszej stronie. Możesz
              kontrolować cookies poprzez ustawienia przeglądarki.
            </p>
          </Section>

          <Section title="5. Bezpieczeństwo">
            <p>
              Chronimy Twoje informacje poprzez szyfrowanie SSL i inne środki
              bezpieczeństwa.
            </p>
          </Section>

          <Section title="6. Twoje prawa">
            <p>
              Masz prawo dostępu, poprawy lub usunięcia swoich danych osobowych.
              Skontaktuj się z nami na adres designstron.pl@gmail.com.
            </p>
          </Section>

          <Section title="7. Kontakt">
            <p>
              Jeśli masz pytania dotyczące tej Polityki Prywatności, skontaktuj się z
              nami:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Email: designstron.pl@gmail.com</li>
              <li>Telefon: +48 884 679 933</li>
            </ul>
          </Section>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -30, scale: 0.95 }}
      animate={inView ? { opacity: 1, x: 0, scale: 1 } : {}}
      transition={{ duration: 0.7 }}
      whileHover={{ 
        y: -4,
        boxShadow: "0 20px 40px -12px rgba(168, 85, 247, 0.15)"
      }}
      className="mb-12 p-8 rounded-2xl group relative overflow-hidden cursor-pointer"
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

      {/* Lock icon indicator */}
      <motion.div
        initial={{ opacity: 0, scale: 0, rotate: -180 }}
        animate={inView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
        transition={{ delay: 0.2, type: "spring" }}
        className="absolute top-6 right-6 w-12 h-12 rounded-full flex items-center justify-center text-xl"
        style={{
          background: "linear-gradient(135deg, rgba(16,185,129,0.2), rgba(6,182,212,0.1))",
          border: "2px solid rgba(16,185,129,0.3)",
          color: "#10b981"
        }}
      >
        <span>lock</span>
      </motion.div>

      <h2
        className="text-3xl font-bold text-white mb-6 pr-16"
        style={{ fontFamily: "'Syne', sans-serif" }}
      >
        {title}
      </h2>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="text-base leading-relaxed space-y-4 relative z-10"
        style={{ color: "rgba(255,255,255,0.6)", fontFamily: "'Outfit', sans-serif" }}
      >
        {children}
      </motion.div>

      {/* Animated accent line */}
      <motion.div
        initial={{ width: "0%" }}
        animate={{ width: "100%" }}
        transition={{ duration: 1.2, delay: 0.5 }}
        className="absolute bottom-0 left-0 h-1 rounded-full"
        style={{
          background: "linear-gradient(90deg, #10b981, #06b6d4, transparent)",
        }}
      />

      {/* Floating security particles */}
      <motion.div
        animate={{
          y: [0, -8, 0],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
        }}
        className="absolute top-8 left-8 w-2 h-2 rounded-full"
        style={{ background: "rgba(16,185,129,0.6)" }}
      />
    </motion.div>
  );
}

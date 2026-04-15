/*
 * PolitykaCookies - DesignStron.pl
 * Simple cookies policy page with user-provided content
 */
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Cookie, Mail, Phone, Lock } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function PolitykaCookies() {
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-80px" });

  const sections = [
    {
      title: "1. Czym sa pliki cookies?",
      content: [
        "Pliki cookies (tzw. \"ciasteczka\") to male pliki tekstowe zapisywane na urzadzeniu koncowym uzytkownika podczas korzystania ze strony internetowej. Zawieraja informacje niezbedne do prawidlowego funkcjonowania strony oraz moga byc wykorzystywane do celów analitycznych i marketingowych."
      ]
    },
    {
      title: "2. Administrator danych",
      content: [
        "Administratorem danych jest:",
        "Designstron.pl",
        "Email: designstron.pl@gmail.com",
        "Telefon: +48 884 679 933"
      ]
    },
    {
      title: "3. W jakim celu uzywamy cookies?",
      content: [
        "Pliki cookies wykorzystywane sa w nastepujacych celach:",
        "Cookies niezbedne - zapewniaja prawidlowe dzialanie strony (nie wymagaja zgody)",
        "Cookies analityczne - pozwalaja analizowac ruch na stronie (np. Google Analytics)",
        "Cookies marketingowe - sluza do dopasowywania reklam do uzytkownika"
      ]
    },
    {
      title: "4. Podstawa prawna stosowania cookies",
      content: [
        "Cookies niezbedne: art. 173 ust. 3 Prawo telekomunikacyjne",
        "Cookies analityczne i marketingowe: zgoda uzytkownika zgodnie z RODO"
      ]
    },
    {
      title: "5. Zgoda na cookies",
      content: [
        "Podczas pierwszej wizyty na stronie wyswietlany jest baner cookies, który umozliwia:",
        "zaakceptowanie wszystkich cookies",
        "odrzucenie cookies opcjonalnych",
        "zarzadzanie preferencjami",
        "Uzytkownik moze w kazdej chwili zmienic ustawienia cookies."
      ]
    },
    {
      title: "6. Jak zarzadzac cookies?",
      content: [
        "Mozesz zarzadzac cookies poprzez:",
        "ustawienia przegladarki internetowej",
        "baner cookies dostepny na stronie",
        "narzedzia do zarzadzania prywatnoscia"
      ]
    },
    {
      title: "7. Cookies stron trzecich",
      content: [
        "Strona moze korzystac z uslug podmiotów trzecich (np. Google Analytics), które moga zapisywac wlasne pliki cookies. Podmioty te dzialaja na podstawie wlasnych polityk prywatnosci."
      ]
    },
    {
      title: "8. Okres przechowywania cookies",
      content: [
        "Cookies przechowywane sa przez okres:",
        "sesyjne - do momentu zamkniecia przegladarki",
        "stale - od kilku dni do maksymalnie 12 miesiecy"
      ]
    },
    {
      title: "9. Twoje prawa",
      content: [
        "Masz prawo do:",
        "wycofania zgody na cookies",
        "usuniecia cookies z urzadzenia",
        "ograniczenia przetwarzania danych",
        "Wycofanie zgody nie wplywa na legalnosc wczesniejszego przetwarzania."
      ]
    },
    {
      title: "10. Zmiany polityki cookies",
      content: [
        "Zastrzegamy sobie prawo do wprowadzania zmian w polityce cookies. Aktualna wersja bedzie publikowana na stronie."
      ]
    }
  ];

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
                <Cookie size={16} className="inline mr-2" />
                Pliki cookies
              </span>
            </motion.div>

            <h1
              className="text-5xl lg:text-6xl font-bold text-white mb-4"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Polityka <span style={{ color: "#a855f7" }}>Cookies</span>
            </h1>
            <p
              className="text-lg max-w-2xl mx-auto"
              style={{ color: "rgba(255,255,255,0.5)", fontFamily: "'Outfit', sans-serif" }}
            >
              Ostatnia aktualizacja: 12 kwietnia 2026
            </p>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto max-w-4xl px-4 py-20">
        <div className="space-y-8">
          {sections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-50px" }}
              className="glass-card rounded-2xl p-8 lg:p-10"
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(124,58,237,0.1)",
                backdropFilter: "blur(10px)",
              }}
            >
              <h3
                className="text-2xl lg:text-3xl font-bold text-white mb-6"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                {section.title}
              </h3>

              <div className="space-y-3">
                {section.content.map((item, itemIndex) => (
                  <p
                    key={itemIndex}
                    className="text-base leading-relaxed"
                    style={{ color: "rgba(255,255,255,0.6)", fontFamily: "'Outfit', sans-serif" }}
                  >
                    {item}
                  </p>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.1 }}
          viewport={{ once: true }}
          className="mt-16 p-8 rounded-2xl text-center"
          style={{
            background: "rgba(124,58,237,0.1)",
            border: "1px solid rgba(124,58,237,0.2)",
          }}
        >
          <p
            className="text-lg mb-6"
            style={{ color: "rgba(255,255,255,0.7)", fontFamily: "'Outfit', sans-serif" }}
          >
            W razie pytan dotyczacych polityki cookies prosimy o kontakt
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-8">
            <a
              href="mailto:designstron.pl@gmail.com"
              className="flex items-center gap-2 text-base hover:text-purple-400 transition-colors"
              style={{ color: "rgba(255,255,255,0.6)", fontFamily: "'Outfit', sans-serif" }}
            >
              <Mail size={16} />
              designstron.pl@gmail.com
            </a>
            <a
              href="tel:+48884679933"
              className="flex items-center gap-2 text-base hover:text-purple-400 transition-colors"
              style={{ color: "rgba(255,255,255,0.6)", fontFamily: "'Outfit', sans-serif" }}
            >
              <Phone size={16} />
              +48 884 679 933
            </a>
          </div>

          <motion.a
            href="mailto:designstron.pl@gmail.com"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all"
            style={{
              background: "linear-gradient(135deg, #a855f7, #7c3aed)",
              color: "white",
              fontFamily: "'Outfit', sans-serif",
              boxShadow: "0 8px 24px -8px rgba(168,85,247,0.4)",
            }}
          >
            <Cookie size={16} />
            Skontaktuj sie z nami
          </motion.a>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}

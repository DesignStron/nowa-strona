/*
 * FAQSection — Dark Glassmorphism Agency
 * Accordion FAQ with smooth animations
 */
import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    q: "Ile kosztuje strona internetowa?",
    a: "Każdy projekt jest indywidualny i wyceniany na podstawie konkretnych potrzeb. Koszt zależy od wielu czynników: złożoności, liczby podstron, funkcjonalności, integracji. Ceny zaczynają się już od 1000 złotych, ale dokładny koszt ustalamy po bezpłatnej konsultacji, w której poznajemy Twoje cele i wymagania. Jesteśmy elastyczni i dopasowujemy rozwiązania do budżetu.",
  },
  {
    q: "Ile trwa budowa strony?",
    a: "Przewidywany czas realizacji to około tygodnia od dostarczenia materiałów przez klienta plus czas na poprawki. W praktyce najczęściej jest to do 2 tygodni od momentu uzyskania wszystkich potrzebnych informacji. Zawsze ustalamy konkretny harmonogram i trzymamy się terminów, aby wiedzieć na czym staniesz.",
  },
  {
    q: "Dlaczego nie używacie WordPressa?",
    a: "WordPress to świetne narzędzie dla blogów, ale dla stron nastawionych na sprzedaż i wydajność mamy lepsze rozwiązania. Piszemy autorski kod w React, co daje nam pełną kontrolę nad szybkością, bezpieczeństwem i wyglądem. Wynik PageSpeed 95+ jest normą, nie wyjątkiem.",
  },
  {
    q: "Mam już stronę. Czy można ją przebudować?",
    a: "Oczywiście! Przebudowa starej strony to jeden z naszych najczęstszych projektów. Zaczynamy od audytu obecnej strony, analizujemy co działa, a co nie, i budujemy nową wersję, która zachowuje pozycje SEO i jednocześnie znacząco poprawia konwersję.",
  },
  {
    q: "Nie wiem dokładnie, czego potrzebuję. Pomóżcie?",
    a: "To najczęstsza sytuacja i właśnie dlatego oferujemy bezpłatną konsultację strategiczną. Zadajemy właściwe pytania, analizujemy Twój biznes i proponujemy konkretne rozwiązanie. Nie musisz znać się na stronach – od tego jesteśmy my.",
  },
  {
    q: "Co dostaję po zakończeniu projektu?",
    a: "Otrzymujesz w pełni działającą stronę, dostęp do panelu administracyjnego (jeśli dotyczy), dokumentację, szkolenie z obsługi, skonfigurowaną analitykę Google. Jesteś właścicielem wszystkich plików i kodu. Istnieje też możliwość zakupu hostingu u nas – wtedy odpowiadamy też za domenę i jej odnowienie. Zapewniamy pełen techniczny serwis.",
  },
  {
    q: "Czy mogę wprowadzać zmiany po wdrożeniu?",
    a: "Tak. Oferujemy pakiety opieki miesięcznej, w ramach których możesz zgłaszać zmiany, aktualizacje treści i nowe funkcjonalności. Możesz też zamówić jednorazowe modyfikacje. Dodatkowo możemy stworzyć panel admina, gdzie użytkownicy mogą sami zmieniać niektóre treści – np. aktualności, ceny, dane kontaktowe. Nigdy nie zostawiamy klientów bez wsparcia.",
  },
  {
    q: "Czy wystawiacie faktury VAT?",
    a: "Tak, oczywiście. Jesteśmy zarejestrowaną firmą i wystawiamy faktury VAT dla wszystkich klientów. Każdego projektu towarzyszy profesjonalna dokumentacja księgowa. Faktury mogą być wystawiane z różnymi terminami płatności, dopasowanymi do Twoich potrzeb - standardowo 7 dni, ale możliwe są też inne ustalenia.",
  },
];

function FAQItem({
  faq,
  index,
  isOpen,
  onToggle,
}: {
  faq: (typeof faqs)[0];
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: (index % 4) * 0.07 }}
      className="border-b"
      style={{ borderColor: "rgba(255,255,255,0.07)" }}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 py-5 text-left group"
      >
        <span
          className="text-base lg:text-lg font-medium text-white group-hover:text-purple-300 transition-colors"
          style={{ fontFamily: "'Syne', sans-serif" }}
        >
          <span
            className="mr-3 text-sm"
            style={{ color: "rgba(255,255,255,0.2)", fontFamily: "'Outfit', sans-serif" }}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          {faq.q}
        </span>
        <div
          className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300"
          style={{
            background: isOpen ? "rgba(124,58,237,0.3)" : "rgba(255,255,255,0.06)",
            color: isOpen ? "#a855f7" : "rgba(255,255,255,0.4)",
          }}
        >
          {isOpen ? <Minus size={14} /> : <Plus size={14} />}
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            style={{ overflow: "hidden" }}
          >
            <p
              className="pb-5 text-sm lg:text-base leading-relaxed"
              style={{
                color: "rgba(255,255,255,0.55)",
                fontFamily: "'Outfit', sans-serif",
                paddingLeft: "2.5rem",
              }}
            >
              {faq.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-80px" });

  return (
    <section
      id="faq"
      className="relative py-24 lg:py-32 overflow-hidden"
      style={{ background: "#0f0d1f" }}
    >
      <div
        className="blob"
        style={{
          width: "400px",
          height: "400px",
          background: "radial-gradient(circle, rgba(124,58,237,0.07) 0%, transparent 70%)",
          top: "50%",
          left: "-100px",
          transform: "translateY(-50%)",
        }}
      />

      <div className="container mx-auto max-w-3xl px-4 relative z-10">
        {/* Header */}
        <div ref={titleRef} className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="section-label justify-center mb-4"
          >
            FAQ
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl lg:text-5xl font-bold text-white"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Często zadawane{" "}
            <span style={{ color: "#a855f7" }}>pytania</span>
          </motion.h2>
        </div>

        {/* FAQ items */}
        <div>
          {faqs.map((faq, i) => (
            <FAQItem
              key={i}
              faq={faq}
              index={i}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>

        {/* Bottom CTA */}
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
            Nie znalazłeś odpowiedzi? Napisz do nas!
          </p>
          <a
            href="mailto:designstron.pl@gmail.com"
            className="text-purple-400 hover:text-purple-300 transition-colors text-sm font-medium"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            designstron.pl@gmail.com →
          </a>
        </motion.div>
      </div>
    </section>
  );
}

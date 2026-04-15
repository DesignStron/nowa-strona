/*
 * Regulamin - DesignStron.pl
 * Terms of Service page with exact content provided by user
 */
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FileText, Shield, CreditCard, Users, AlertCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Regulamin() {
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-80px" });

  const sections = [
    {
      title: "§1. Postanowienia ogólne",
      content: [
        "Regulamin okresla zasady swiadczenia uslug przez Designstron.pl w zakresie tworzenia stron internetowych.",
        "Administratorem serwisu jest Designstron.pl, prowadzacy dzialalnosc nierejestrowana w rozumieniu art. 5 ust. 1 ustawy z dnia 6 marca 2018 r. - Prawo przedsiebiorców.",
        "Uslugi swiadczone sa na terytorium Rzeczypospolitej Polskiej oraz innych krajach w ramach realizacji projektów zdalnych.",
        "Niniejszy regulamin jest dostepny pod adresem: designstron.pl/regulamin.",
        "Korzystanie z serwisu oznacza zapoznanie sie z regulaminem i jego akceptacje."
      ]
    },
    {
      title: "§2. Definicje",
      content: [
        "Usluga: Tworzenie strony internetowej, w tym projektowanie, programowanie, wdrozenie oraz wsparcie techniczne.",
        "Klient: Osoba fizyczna, prawna lub jednostka organizacyjna, która zleca wykonanie Uslugi.",
        "Projekt: Indywidualnie okreslony zakres prac tworzenia strony internetowej.",
        "Umowa: Umowa o swiadczenie uslug zawarta miedzy Designstron.pl a Klientem.",
        "Wycena: Szacunkowy koszt wykonania Uslugi przedstawiony Klientowi."
      ]
    },
    {
      title: "§3. Zasady wspópracy",
      content: [
        "Klient skada zapytanie o usluge poprzez formularz kontaktowy lub bezposredni kontakt.",
        "Designstron.pl przedstawia wycene projektu w ciagu 2 dni roboczych.",
        "Akceptacja wyceny przez Klienta jest rownoznaczna z zawarciem umowy.",
        "Prace rozpoczynaja sie po wplacie zaliczki w wysokosci 30% wartosci projektu.",
        "Czas realizacji projektu wynosi od 14 do 60 dni w zaleznosci od zlozonosci."
      ]
    },
    {
      title: "§4. Platnosci i rozliczenia",
      content: [
        "Platnosci przyjmowane sa w formie przelewu bankowego.",
        "Harmonogram platnosci:",
        "30% zaliczka przed rozpoczeciem prac",
        "40% po akceptacji projektu graficznego",
        "30% po wdrozeniu strony",
        "W przypadku opóznienia w platnosci powyzej 7 dni, naliczane sa odsetki ustawowe za opóznienie transakcyjne zgodnie z art. 481 § 2 Kodeksu cywilnego.",
        "Na prosbe Klienta mozemy wystawic potwierdzenie otrzymania wplaty.",
        "Wlasciciel serwisu nie jest platnikiem VAT i nie wystawia faktur VAT."
      ]
    },
    {
      title: "§5. Prawa i obowiazki stron",
      content: [
        "Obowiazki Designstron.pl:",
        "Wykonanie projektu zgodnie z uzgodnionymi zalozeniami",
        "Zapewnienie wsparcia technicznego przez 12 miesiecy",
        "Przekazanie praw autorskich po zakonczeniu realizacji i rozliczeniu projektu",
        "Dbannie o bezpieczenstwo strony",
        "Obowiazki Klienta:",
        "Terminowe dokonywanie platnosci",
        "Dostarczenie materialów (teksty, zdjecia, logo)",
        "Aktywne uczestnictwo w procesie projektowym",
        "Testowanie funkcjonalnosci strony"
      ]
    },
    {
      title: "§6. Gwarancja i wsparcie techniczne",
      content: [
        "Designstron.pl udziela 12-miesiecznej gwarancji na poprawne dzialanie strony.",
        "Gwarancja nie obejmuje uszkodzen wynikajacych z nieprawidlowego uzytkowania.",
        "Wsparcie techniczne obejmuje:",
        "Poprawki bledów technicznych",
        "Aktualizacje systemu CMS",
        "Konsultacje techniczne",
        "Po uplywie gwarancji, wsparcie techniczne jest odpplatne."
      ]
    },
    {
      title: "§7. Odstapienie od umowy",
      content: [
        "Klient ma prawo odstapic od umowy w ciagu 14 dni od jej zawarcia zgodnie z art. 27 ustawy z dnia 30 maja 2014 r. o prawach konsumenta.",
        "W przypadku odstapienia, Klient ponosi koszty wykonanych prac zgodnie z art. 34 ust. 2 ustawy o prawach konsumenta.",
        "Designstron.pl moze odstapic od umowy w przypadku:",
        "Braku wspópracy ze strony Klienta",
        "Opóznien w platnosciach powyzej 14 dni",
        "Sily wyzszej uniemozliwiajacej realizacje",
        "Prawo odstapienia nie przysluguje w przypadkach okreslonych w art. 38 ustawy o prawach konsumenta (m.in. uslugi swiadczone droga elektroniczna)."
      ]
    },
    {
      title: "§8. Ochrona danych osobowych",
      content: [
        "Dane osobowe Klientów sa przetwarzane zgodnie z RODO.",
        "Administratorem danych jest Designstron.pl.",
        "Dane sa przetwarzane w celu realizacji umowy i marketingu.",
        "Klient ma prawo dostepu, poprawiania i usuniecia danych."
      ]
    },
    {
      title: "§9. Postanowienia koncowe",
      content: [
        "W sprawach nieuregulowanych niniejszym regulaminem zastosowanie maja przepisy Kodeksu Cywilnego oraz ustawy o prawach konsumenta.",
        "Sadem wlasciwym do rozstrzygania sporów jest sad miejsca siedziby Klienta.",
        "Regulamin wchodzi w zycie z dniem 01.01.2024.",
        "Designstron.pl zastrzega sobie prawo do zmiany regulaminu.",
        "Zmiany w regulaminie beda komunikowane na stronie internetowej z 14-dniowym wyprzedzeniem.",
        "W przypadku sporów transgranicznych wlasciwy bedzie sad panstwa czlonkowskiego UE miejsca zamieszkania konsumenta."
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
                <FileText size={16} className="inline mr-2" />
                Dokumenty prawne
              </span>
            </motion.div>

            <h1
              className="text-5xl lg:text-6xl font-bold text-white mb-4"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Regulamin <span style={{ color: "#a855f7" }}>DesignStron</span>
            </h1>
            <p
              className="text-lg max-w-2xl mx-auto"
              style={{ color: "rgba(255,255,255,0.5)", fontFamily: "'Outfit', sans-serif" }}
            >
              Zasady wspólpracy, warunki platnosci i prawa klientów. Zapewniamy transparentnosc i bezpieczenstwo na kazdym etapie projektu.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto max-w-4xl px-4 py-20">
        <div className="space-y-12">
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
                  <div key={itemIndex} className="flex gap-3">
                    <span
                      className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mt-0.5"
                      style={{
                        background: "rgba(168,85,247,0.2)",
                        color: "#a855f7",
                        border: "1px solid rgba(168,85,247,0.3)",
                        fontFamily: "'Outfit', sans-serif",
                      }}
                    >
                      {itemIndex + 1}
                    </span>
                    <p
                      className="text-base leading-relaxed"
                      style={{ color: "rgba(255,255,255,0.6)", fontFamily: "'Outfit', sans-serif" }}
                    >
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          viewport={{ once: true }}
          className="mt-16 p-8 rounded-2xl text-center"
          style={{
            background: "rgba(124,58,237,0.1)",
            border: "1px solid rgba(124,58,237,0.2)",
          }}
        >
          <p
            className="text-lg mb-4"
            style={{ color: "rgba(255,255,255,0.7)", fontFamily: "'Outfit', sans-serif" }}
          >
            Regulamin wchodzi w zycie z dniem 01.01.2024
          </p>
          <p
            className="text-base mb-6"
            style={{ color: "rgba(255,255,255,0.5)", fontFamily: "'Outfit', sans-serif" }}
          >
            W razie pytan prosimy o kontakt: designstron.pl@gmail.com
          </p>
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
            <AlertCircle size={16} />
            Skontaktuj sie z nami
          </motion.a>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}

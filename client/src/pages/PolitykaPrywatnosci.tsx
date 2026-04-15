/*
 * PolitykaPrywatnosci - DesignStron.pl
 * Privacy Policy page with exact content provided by user
 */
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Shield, Mail, Phone, UserCheck } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function PolitykaPrywatnosci() {
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-80px" });

  const sections = [
    {
      title: "§1. Informacje podstawowe",
      content: [
        "Administratorem Pani/Pana danych osobowych jest Designstron.pl, prowadzacy dzialalnosc nierejestrowana w rozumieniu art. 5 ust. 1 ustawy z dnia 6 marca 2018 r. - Prawo przedsiebiorców.",
        "Kontakt z administratorem: designstron.pl@gmail.com",
        "Pani/Pana dane osobowe beda przetwarzane zgodnie z Rozporzadzeniem Parlamentu Europejskiego i Rady (UE) 2016/679 z dnia 27 kwietnia 2016 r. (RODO).",
        "Niniejsza polityka prywatnosci obowiazuje od dnia 01.01.2024.",
        "Administrator nie wyznaczyl Inspektora Ochrony Danych Osobowych."
      ]
    },
    {
      title: "§2. Cel i zakres przetwarzania danych",
      content: [
        "Pani/Pana dane osobowe przetwarzamy w celu:",
        "Realizacji uslug tworzenia stron internetowych - art. 6 ust. 1 lit. b RODO",
        "Nawiazania kontaktu i przedstawienia oferty - art. 6 ust. 1 lit. f RODO",
        "Marketingu bezposredniego wlasnych produktów i uslug - art. 6 ust. 1 lit. a RODO",
        "Rozliczen finansowych - art. 6 ust. 1 lit. c RODO",
        "Utrzymania relacji biznesowych - art. 6 ust. 1 lit. f RODO",
        "Zakres przetwarzanych danych obejmuje:",
        "Dane identyfikacyjne (imie, nazwisko, nazwa firmy)",
        "Dane kontaktowe (adres e-mail, numer telefonu)",
        "Dane adresowe (ulica, kod pocztowy, miasto)",
        "Podanie danych osobowych jest dobrowolne, ale niezbedne do realizacji uslug."
      ]
    },
    {
      title: "§3. Podstawa prawna przetwarzania",
      content: [
        "Pani/Pana dane osobowe przetwarzamy na podstawie:",
        "Art. 6 ust. 1 lit. a RODO - Pani/Pana zgody",
        "Art. 6 ust. 1 lit. b RODO - niezbednosci do wykonania umowy",
        "Art. 6 ust. 1 lit. f RODO - prawnie uzasadnionego interesu administratora",
        "Art. 6 ust. 1 lit. c RODO - obowiazku prawnego",
        "Podanie danych osobowych jest dobrowolne, ale niezbedne do realizacji uslug."
      ]
    },
    {
      title: "§4. Okres przechowywania danych",
      content: [
        "Pani/Pana dane osobowe beda przechowywane:",
        "W trakcie realizacji umowy - przez okres jej trwania",
        "Po zakonczeniu umowy - przez 5 lat zgodnie z art. 117 ust. 1 ustawy o rachunkowosci",
        "Dane marketingowe - do momentu wycofania zgody",
        "Po uplywie okresów przechowywania dane zostana trwale usuniete.",
        "Dane sa przechowywane na zabezpieczonych serwerach w Unii Europejskiej."
      ]
    },
    {
      title: "§5. Odbiorcy danych",
      content: [
        "Pani/Pana dane osobowe moga byc udostepniane:",
        "Podmiotom przetwarzajacym dane na zlecenie administratora",
        "Dostawcom uslug hostingowych",
        "Kancelariom prawnym",
        "Dane nie beda przekazywane do panstw trzecich poza EOG."
      ]
    },
    {
      title: "§6. Prawa osób, których dane dotycza",
      content: [
        "Przysluguja Pani/Panu nastepujace prawa:",
        "Dostepu do danych - art. 15 RODO",
        "Sprostowania danych - art. 16 RODO",
        "Usuniecia danych - art. 17 RODO",
        "Ograniczenia przetwarzania - art. 18 RODO",
        "Przenoszenia danych - art. 20 RODO",
        "Sprzeciwu wobec przetwarzania - art. 21 RODO",
        "Cofniecia zgody - art. 7 ust. 3 RODO",
        "Realizacje praw mozna zglosic na adres: designstron.pl@gmail.com",
        "Przysluguje Pani/Panu prawo wniesienia skargi do Prezesa Urzedu Ochrony Danych Osobowych.",
        "Administrator odpowie na wniosek w ciagu 30 dni od jego otrzymania."
      ]
    },
    {
      title: "§7. Pliki cookies",
      content: [
        "Serwis uzywa plików cookies w celu:",
        "Zapewnienia prawidlowego dzialania serwisu - niezbedne cookies",
        "Analizy ruchu na stronie - analityczne cookies",
        "Personalizacji tresci - funkcjonalne cookies",
        "Pamieci ustawien uzytkownika - funkcjonalne cookies",
        "Pliki cookies mozna wylaczyc w ustawieniach przegladarki.",
        "Wylaczenie cookies moze wplynac na funkcjonalnosc serwisu.",
        "Szczególowe informacje o plikach cookies dostepne sa w polityce cookies."
      ]
    },
    {
      title: "§8. Bezpieczenstwo danych",
      content: [
        "Administrator stosuje odpowiednie srodki techniczne i organizacyjne zapewniajace ochrone danych.",
        "Dostep do danych maja wylacznie upowaznione osoby.",
        "Dane sa zabezpieczone przed utrata, zniszczeniem lub nieuprawnionym dostepem.",
        "Regularnie przeprowadzane sa audyty bezpieczenstwa."
      ]
    },
    {
      title: "§9. Zmiany polityki prywatnosci",
      content: [
        "Administrator zastrzega sobie prawo do zmiany polityki prywatnosci.",
        "Zmiany beda publikowane na stronie i wchodza w zycie z dniem publikacji.",
        "W przypadku istotnych zmian uzytkownicy zostana poinformowani droga mailowa."
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
                <Shield size={16} className="inline mr-2" />
                Ochrona danych
              </span>
            </motion.div>

            <h1
              className="text-5xl lg:text-6xl font-bold text-white mb-4"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Polityka <span style={{ color: "#a855f7" }}>Prywatnosci</span>
            </h1>
            <p
              className="text-lg max-w-2xl mx-auto"
              style={{ color: "rgba(255,255,255,0.5)", fontFamily: "'Outfit', sans-serif" }}
            >
              Zasady przetwarzania danych osobowych zgodnie z RODO. Twoja prywatnosc jest naszym priorytetem.
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

        {/* Contact Info */}
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
            className="text-lg mb-6"
            style={{ color: "rgba(255,255,255,0.7)", fontFamily: "'Outfit', sans-serif" }}
          >
            W razie pytan dotyczacych przetwarzania danych osobowych prosimy o kontakt:
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
            <UserCheck size={16} />
            Skontaktuj sie z nami
          </motion.a>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}

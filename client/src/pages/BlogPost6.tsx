/*
 * BlogPost6 - Przykadowy artyku blogowy
 * Bezpieczeństwo strony - jak chronić swoją obecność online?
 */
import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowLeft, Calendar, User, Clock, Share2, Heart, Facebook, Twitter, Linkedin, Link2 } from "lucide-react";
import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function BlogPost6() {
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-80px" });
  
  // Inicjalizacja stanu z localStorage
  const [likes, setLikes] = useState(() => {
    const savedLikes = localStorage.getItem('blogPost6_likes');
    return savedLikes ? parseInt(savedLikes) : 124;
  });
  const [isLiked, setIsLiked] = useState(() => {
    const savedLiked = localStorage.getItem('blogPost6_liked');
    return savedLiked === 'true';
  });
  const [showShareMenu, setShowShareMenu] = useState(false);

  // Zamknij menu po klikieciu w dowolne miejsce z wyjtkiem menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      const shareButton = target.closest('[data-share-button]');
      const shareMenu = target.closest('[data-share-menu]');
      
      if (showShareMenu && !shareButton && !shareMenu) {
        setShowShareMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showShareMenu]);

  const handleLike = () => {
    if (!isLiked) {
      const newLikes = likes + 1;
      setLikes(newLikes);
      setIsLiked(true);
      
      // Zapisz do localStorage
      localStorage.setItem('blogPost6_likes', newLikes.toString());
      localStorage.setItem('blogPost6_liked', 'true');
    }
  };

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const text = "Bezpieczeństwo strony - jak chronić swoją obecność online?";
    
    let shareUrl = '';
    switch(platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        break;
      case 'copy':
        navigator.clipboard.writeText(url);
        alert('Link skopiowany do schowka!');
        return;
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
  };

  return (
    <div className="min-h-screen" style={{ background: "#0f0d1f" }}>
      <Navbar />
      
      {/* Header */}
      <div className="relative pt-32 pb-16 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(135deg, rgba(34,197,94,0.15), rgba(245,158,11,0.08))",
          }}
        />
        
        <div className="container mx-auto max-w-4xl px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <Link href="/blog">
              <a className="inline-flex items-center gap-2 text-green-400 hover:text-green-300 transition-colors">
                <ArrowLeft size={20} />
                Powrót do bloga
              </a>
            </Link>
          </motion.div>

          <motion.div
            ref={titleRef}
            initial={{ opacity: 0, y: 30 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-4 mb-6 text-sm"
                 style={{ color: "rgba(255,255,255,0.6)", fontFamily: "'Outfit', sans-serif" }}>
              <span className="flex items-center gap-2">
                <Calendar size={16} />
                20 marca 2026
              </span>
              <span className="flex items-center gap-2">
                <User size={16} />
                Piotr Zieliaski
              </span>
              <span className="flex items-center gap-2">
                <Clock size={16} />
                12 min czytania
              </span>
            </div>

            <h1
              className="text-4xl lg:text-5xl font-bold text-white mb-8"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Bezpieczeństwo strony - jak{" "}
              <span style={{ color: "#22c55e" }}>chronić swoją obecność online?</span>
            </h1>

            <div className="flex items-center gap-6 mb-8">
              <button 
                onClick={handleLike}
                className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-colors ${
                  isLiked 
                    ? 'border-green-500 text-green-400 bg-green-500/10' 
                    : 'border-green-500/30 text-green-400 hover:bg-green-500/10'
                }`}
              >
                <Heart size={16} fill={isLiked ? "currentColor" : "none"} />
                {likes} polubień
              </button>
              
              <div className="relative">
                <button 
                  data-share-button
                  onClick={() => setShowShareMenu(!showShareMenu)}
                  className="flex items-center gap-2 px-4 py-2 rounded-full border border-green-500/30 text-green-400 hover:bg-green-500/10 transition-colors"
                >
                  <Share2 size={16} />
                  Udostępnij
                </button>
                
                {showShareMenu && (
                  <motion.div
                    data-share-menu
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full mt-2 left-0 bg-gray-900 rounded-lg shadow-xl border border-gray-700 p-2 z-50 min-w-[200px]"
                  >
                    <button
                      onClick={() => handleShare('facebook')}
                      className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-800 text-white w-full text-left"
                    >
                      <Facebook size={16} />
                      Facebook
                    </button>
                    <button
                      onClick={() => handleShare('twitter')}
                      className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-800 text-white w-full text-left"
                    >
                      <Twitter size={16} />
                      Twitter
                    </button>
                    <button
                      onClick={() => handleShare('linkedin')}
                      className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-800 text-white w-full text-left"
                    >
                      <Linkedin size={16} />
                      LinkedIn
                    </button>
                    <button
                      onClick={() => handleShare('copy')}
                      className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-800 text-white w-full text-left"
                    >
                      <Link2 size={16} />
                      Kopiuj link
                    </button>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto max-w-4xl px-4 pb-24">
        <motion.article
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="prose prose-invert max-w-none"
        >
          <div className="space-y-8" style={{ color: "rgba(255,255,255,0.8)", fontFamily: "'Outfit', sans-serif", lineHeight: "1.8" }}>
            
            <section>
              <h2
                className="text-3xl font-bold text-white mb-4"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                Bezpieczeństwo to nie luksus, to konieczność
              </h2>
              <p className="text-lg leading-relaxed mb-4">
                W 2025 roku ponad 60% małych firm doznało ataku cybernetycznego. Strona internetowa to witryna Twojego biznesu, 
                ale także potencjalne wejście dla hakerów. Wielu właścicieli firm myśli, że "to mnie nie dotyczy", a prawda jest taka,
                że ataki często celują w małe firmy, które są mniej chronione.
              </p>
              <p className="text-lg leading-relaxed">
                Pomyśl o bezpieczeństwie strony jak o zamku w drzwiach Twojego biura. Czy zostawiłbyś biuro otwarte na noc?
                Czy trzymałbyś klucze pod wycieraczką? Oczywiście, że nie. Ale właśnie to robisz, gdy nie zabezpieczasz swojej strony.
                Każda minuta nieochroniona to ryzyko utraty danych, reputacji i pieniędzy.
              </p>
            </section>

            <section>
              <h2
                className="text-3xl font-bold text-white mb-4"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                Najważniejsze zagrożenia
              </h2>
              <div className="space-y-6">
                <div className="p-6 rounded-xl" style={{ background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.2)" }}>
                  <h3 className="text-xl font-semibold text-white mb-2">Malware i wirusy</h3>
                  <p className="mb-3">Złośliwe oprogramowanie, które może ukraść dane, przekierować ruch lub zainfekować użytkowników.</p>
                  <p className="text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
                    <strong>Objawy:</strong> Działania strony, dziwne przekierowania, ostrzeżenia przeglądarki<br/>
                    <strong>Szkody:</strong> Utrata zaufania klientów, penalizacja Google
                  </p>
                </div>
                <div className="p-6 rounded-xl" style={{ background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.2)" }}>
                  <h3 className="text-xl font-semibold text-white mb-2">Phishing</h3>
                  <p className="mb-3">Podrabianie Twojej strony w celu kradzieży danych logowania klientów.</p>
                  <p className="text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
                    <strong>Objawy:</strong> Klienci skarżą się na dziwne emaile, problemy z logowaniem<br/>
                    <strong>Szkody:</strong> Utrata zaufania, problemy prawne
                  </p>
                </div>
                <div className="p-6 rounded-xl" style={{ background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.2)" }}>
                  <h3 className="text-xl font-semibold text-white mb-2">DDoS (Distributed Denial of Service)</h3>
                  <p className="mb-3">Przeciążenie serwera przez masowe zapytania, co uniemożliwia działanie strony.</p>
                  <p className="text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
                    <strong>Objawy:</strong> Strona bardzo wolna lub niedostępna<br/>
                    <strong>Szkody:</strong> Utrata ruchu, problem z transakcjami
                  </p>
                </div>
                <div className="p-6 rounded-xl" style={{ background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.2)" }}>
                  <h3 className="text-xl font-semibold text-white mb-2">SQL Injection</h3>
                  <p className="mb-3">Atak na baz danych przez formularze na stronie.</p>
                  <p className="text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
                    <strong>Objawy:</strong> Dziwne dane w bazie, utrata informacji<br/>
                    <strong>Szkody:</strong> Utrata danych, problemy z RODO
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2
                className="text-3xl font-bold text-white mb-4"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                Podstawowe zabezpieczenia, każda strona musi mieć
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
                       style={{ background: "rgba(34,197,94,0.2)", color: "#22c55e" }}>
                    1
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">Certyfikat SSL (HTTPS)</h4>
                    <p>Szyfrowanie połączenia między użytkownikiem a serwerem. To absolutna podstawa - bez tego Google
                       ostrzega użytkowników, a przeglądarki oznaczają stronę jako "niebezpieczną". SSL chroni dane
                       przesyłane między klientem a serwerem, takie jak hasła, dane osobowe, informacje kart płatniczych.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
                       style={{ background: "rgba(34,197,94,0.2)", color: "#22c55e" }}>
                    2
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">Regularne aktualizacje</h4>
                    <p>System CMS (WordPress, Joomla), pluginy i motywy muszą być aktualne. Każda aktualizacja to nie tylko 
                       nowe funkcje, ale także poprawki bezpieczeństwa. Zwykłe oprogramowanie to jak otwarte drzwi dla hakerów.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
                       style={{ background: "rgba(34,197,94,0.2)", color: "#22c55e" }}>
                    3
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">Mocne hasa i uwierzytelnianie</h4>
                    <p>Hasa musz by dugie, unikalne i skomplikowane. Uywaj uwierzytelniania dwuskadnikowego (2FA) 
                       wszędzie, gdzie to możliwe. Jedno hasło to za mało w 2025 roku.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
                       style={{ background: "rgba(34,197,94,0.2)", color: "#22c55e" }}>
                    4
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">Regularne kopie zapasowe</h4>
                    <p>Kopie zapasowe to Twoje ubezpieczenie. Powinny być robione codziennie i przechowywane w innym 
                       miejscu niż serwer strony. W razie ataku możesz szybko przywrócić stronę do działania.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
                       style={{ background: "rgba(34,197,94,0.2)", color: "#22c55e" }}>
                    5
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">Firewall i ochrona przed malware</h4>
                    <p>Web Application Firewall (WAF) filtruje żywy ruch. Antywirus i skanery malware wykrywają 
                       złośliwe oprogramowanie. To jak strażnik przed Twoją witryną.</p>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2
                className="text-3xl font-bold text-white mb-4"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                Zaawansowane zabezpieczenia
              </h2>
              <div className="space-y-4">
                <div className="p-6 rounded-xl" style={{ background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.2)" }}>
                  <h3 className="text-xl font-semibold text-white mb-2">Content Security Policy (CSP)</h3>
                  <p>Nagłówek HTTP, który kontroluje, jakie zasoby mogą być ładowane ze strony. Pomaga przed atakami XSS.</p>
                </div>
                <div className="p-6 rounded-xl" style={{ background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.2)" }}>
                  <h3 className="text-xl font-semibold text-white mb-2">Hardening serwera</h3>
                  <p>Konfiguracja serwera w celu minimalizacji atakw - ukrycie wersji oprogramowania, ograniczenie dostpu.</p>
                </div>
                <div className="p-6 rounded-xl" style={{ background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.2)" }}>
                  <h3 className="text-xl font-semibold text-white mb-2">Monitorowanie i logowanie</h3>
                  <p>Ciągłe monitorowanie dzienników serwera w celu wykrywania podejrzanej aktywności.</p>
                </div>
              </div>
            </section>

            <section>
              <h2
                className="text-3xl font-bold text-white mb-4"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                Jak wykry, e strona zostaa zaatakowana?
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="text-green-400 mt-1">:</span>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-1">Ostrzeenia Google Search Console</h4>
                    <p>Google powiadamia o zoliwym oprogramowaniu i problemach z bezpieczestwem.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-green-400 mt-1">:</span>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-1">Dziwne zachowanie strony</h4>
                    <p>Przekierowania, dziwne reklamy, spadek pozycji w Google.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-green-400 mt-1">:</span>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-1">Zgłoszenia użytkowników</h4>
                    <p>Klienci informują o problemach z logowaniem lub dziwnych komunikatach.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-green-400 mt-1">:</span>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-1">Dziwne statystyki</h4>
                    <p>Nagle spadek ruchu lub wzrost ruchu z dziwnych lokalizacji.</p>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2
                className="text-3xl font-bold text-white mb-4"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                Co robi po ataku?
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
                       style={{ background: "rgba(34,197,94,0.2)", color: "#22c55e" }}>
                    1
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">Nie panikuj</h4>
                    <p>Szybkie dziaanie jest kluczowe, ale panika prowadzi do bldów.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
                       style={{ background: "rgba(34,197,94,0.2)", color: "#22c55e" }}>
                    2
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">Odci stron od internetu</h4>
                    <p>Zatrzymaj dalsze szkody - umieść stronę w trybie maintenance.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
                       style={{ background: "rgba(34,197,94,0.2)", color: "#22c55e" }}>
                    3
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">Przywró z kopii zapasowej</h4>
                    <p>Najprostsze i najbezpieczniejsze rozwizanie, jeli masz czyste kopie.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
                       style={{ background: "rgba(34,197,94,0.2)", color: "#22c55e" }}>
                    4
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">Zmie wszystkie hasa</h4>
                    <p>Admin, FTP, baza danych, hosting - wszystko.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
                       style={{ background: "rgba(34,197,94,0.2)", color: "#22c55e" }}>
                    5
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">Zaktualizuj i zabezpiecz</h4>
                    <p>Napraw luk, przez ktr doszo do ataku.</p>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2
                className="text-3xl font-bold text-white mb-4"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                Narzędzia do ochrony strony
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg" style={{ background: "rgba(34,197,94,0.05)", border: "1px solid rgba(34,197,94,0.1)" }}>
                  <h4 className="text-lg font-semibold text-white mb-2">Bezpieczeństwo WordPress</h4>
                  <p>Wordfence, Sucuri, iThemes Security</p>
                </div>
                <div className="p-4 rounded-lg" style={{ background: "rgba(34,197,94,0.05)", border: "1px solid rgba(34,197,94,0.1)" }}>
                  <h4 className="text-lg font-semibold text-white mb-2">Skannery malware</h4>
                  <p>Sucuri SiteCheck, Quttera, VirusTotal</p>
                </div>
                <div className="p-4 rounded-lg" style={{ background: "rgba(34,197,94,0.05)", border: "1px solid rgba(34,197,94,0.1)" }}>
                  <h4 className="text-lg font-semibold text-white mb-2">Firewall</h4>
                  <p>Cloudflare, Sucuri WAF, AWS WAF</p>
                </div>
                <div className="p-4 rounded-lg" style={{ background: "rgba(34,197,94,0.05)", border: "1px solid rgba(34,197,94,0.1)" }}>
                  <h4 className="text-lg font-semibold text-white mb-2">Monitorowanie</h4>
                  <p>Google Search Console, UptimeRobot, Pingdom</p>
                </div>
              </div>
            </section>

            <section>
              <h2
                className="text-3xl font-bold text-white mb-4"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                Koszty bezpieczestwa vs koszty ataku
              </h2>
              <div className="space-y-4">
                <div className="p-6 rounded-xl" style={{ background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.2)" }}>
                  <h3 className="text-xl font-semibold text-white mb-2">Koszty zabezpiecze (rocznie)</h3>
                  <ul className="space-y-2">
                    <li>SSL: 0-500 z</li>
                    <li>Firewall: 100-1000 z</li>
                    <li>Antywirus: 50-300 z</li>
                    <li>Kopie zapasowe: 100-500 z</li>
                    <li><strong>Razem: 250-2300 z</strong></li>
                  </ul>
                </div>
                <div className="p-6 rounded-xl" style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)" }}>
                  <h3 className="text-xl font-semibold text-white mb-2">Koszty ataku (jednorazowo)</h3>
                  <ul className="space-y-2">
                    <li>Oczyszczanie strony: 1000-10000 z</li>
                    <li>Utrata przychodów: 500-50000 z</li>
                    <li>Kary RODO: do 20 mln z</li>
                    <li>Utrata reputacji: nie do oszacowania</li>
                    <li><strong>Razem: 2500+ z (czsto wycznie)</strong></li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2
                className="text-3xl font-bold text-white mb-4"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                Podsumowanie
              </h2>
              <p className="text-lg leading-relaxed">
                Bezpieczeństwo strony to inwestycja, nie koszt. Lepsze jest zapobiegać atakom niż je leczyć.
                Pamiętaj, że ataki są kwestią czasu, a nie "czy". Każda strona będzie celem ataku - pytanie brzmi,
                czy będziesz na niego gotowy. Zainwestuj w odpowiednie zabezpieczenia, monitoruj swoją stronę
                i bądź o krok przed hakerami. Twój biznes, Twoi klienci i Twoje pieniądze tego wymagają.
              </p>
            </section>

          </div>
        </motion.article>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div
            className="p-8 rounded-2xl"
            style={{
              background: "linear-gradient(135deg, rgba(34,197,94,0.1), rgba(245,158,11,0.05))",
              border: "1px solid rgba(34,197,94,0.2)",
            }}
          >
            <h3
              className="text-2xl font-bold text-white mb-4"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Potrzebujesz audytu bezpieczeństwa strony?
            </h3>
            <p
              className="text-base mb-6"
              style={{ color: "rgba(255,255,255,0.6)", fontFamily: "'Outfit', sans-serif" }}
            >
            Sprawdzimy Twoją stronę pod kątem zagrożeń i zabezpieczymy ją przed atakami.
            </p>
            <a
              href="tel:+48884679933"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-white font-medium transition-all duration-300 hover:scale-105"
              style={{
                background: "linear-gradient(135deg, #22c55e, #16a34a)",
                boxShadow: "0 8px 24px -8px rgba(34,197,94,0.4)",
                fontFamily: "'Outfit', sans-serif",
              }}
            >
              Zadzwo teraz
            </a>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}

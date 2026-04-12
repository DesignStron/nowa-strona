/*
 * BlogPost4 - Przykadowy artyku blogowy
 * Jak wybrać odpowiedni hosting dla Twojej strony?
 */
import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowLeft, Calendar, User, Clock, Share2, Heart, Facebook, Twitter, Linkedin, Link2 } from "lucide-react";
import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function BlogPost4() {
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-80px" });
  
  // Inicjalizacja stanu z localStorage
  const [likes, setLikes] = useState(() => {
    const savedLikes = localStorage.getItem('blogPost4_likes');
    return savedLikes ? parseInt(savedLikes) : 67;
  });
  const [isLiked, setIsLiked] = useState(() => {
    const savedLiked = localStorage.getItem('blogPost4_liked');
    return savedLiked === 'true';
  });
  const [showShareMenu, setShowShareMenu] = useState(false);

  // Zamknij menu po kliknieciu w dowolne miejsce z wyjtkiem menu
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
      localStorage.setItem('blogPost4_likes', newLikes.toString());
      localStorage.setItem('blogPost4_liked', 'true');
    }
  };

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const text = "Jak wybrać odpowiedni hosting dla Twojej strony?";
    
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
            background: "linear-gradient(135deg, rgba(239,68,68,0.15), rgba(124,58,237,0.08))",
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
              <a className="inline-flex items-center gap-2 text-red-400 hover:text-red-300 transition-colors">
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
                1 kwietnia 2026
              </span>
              <span className="flex items-center gap-2">
                <User size={16} />
                Marek Kowalski
              </span>
              <span className="flex items-center gap-2">
                <Clock size={16} />
                8 min czytania
              </span>
            </div>

            <h1
              className="text-4xl lg:text-5xl font-bold text-white mb-8"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Jak wybrać{" "}
              <span style={{ color: "#ef4444" }}>odpowiedni hosting</span>{" "}
              dla Twojej strony?
            </h1>

            <div className="flex items-center gap-6 mb-8">
              <button 
                onClick={handleLike}
                className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-colors ${
                  isLiked 
                    ? 'border-red-500 text-red-400 bg-red-500/10' 
                    : 'border-red-500/30 text-red-400 hover:bg-red-500/10'
                }`}
              >
                <Heart size={16} fill={isLiked ? "currentColor" : "none"} />
                {likes} polubie
              </button>
              
              <div className="relative">
                <button 
                  data-share-button
                  onClick={() => setShowShareMenu(!showShareMenu)}
                  className="flex items-center gap-2 px-4 py-2 rounded-full border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-colors"
                >
                  <Share2 size={16} />
                  Udostpnij
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
                Hosting to fundament Twojej strony
              </h2>
              <p className="text-lg leading-relaxed mb-4">
                Wybór odpowiedniego hostingu to jedna z najważniejszych decyzji, której musisz podjąć podczas tworzenia strony internetowej.
                To właśnie od niego zależy szybkie działanie Twojej strony, jej bezpieczeństwo i dostępność dla użytkowników.
                Zły hosting może zniszczyć nawet najlepszą stronę, podczas gdy dobry hosting sprawi, że nawet prosta strona będzie działać jak profesjonalne narzędzie.
              </p>
              <p className="text-lg leading-relaxed">
                Pomyśl o hostingu jak o fundamencie domu - możesz mieć najpiękniejszy budynek na świecie, ale jeśli fundamenty są słabe,
                cały budynek się zawali. Podobnie jest ze stronami internetowymi - nawet najbardziej zaawansowana funkcjonalność 
                i najlepszy design nie pomogą, jeśli hosting jest powolny lub niedostępny.
              </p>
            </section>

            <section>
              <h2
                className="text-3xl font-bold text-white mb-4"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                Rodzaje hostingu - który wybrać?
              </h2>
              <div className="space-y-6">
                <div className="p-6 rounded-xl" style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)" }}>
                  <h3 className="text-xl font-semibold text-white mb-2">Hosting współdzielony (Shared Hosting)</h3>
                  <p className="mb-3">Najtańszy i najpopularniejszy rodzaj hostingu. Dzielisz serwer z innymi stronami.</p>
                  <p className="text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
                    <strong>Zalety:</strong> Niska cena, łatwa obsługa<br/>
                    <strong>Wady:</strong> Ograniczone zasoby, mniejsza kontrola
                  </p>
                </div>
                <div className="p-6 rounded-xl" style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)" }}>
                  <h3 className="text-xl font-semibold text-white mb-2">VPS (Virtual Private Server)</h3>
                  <p className="mb-3">Wirtualny serwer dedykowany. Więcej zasobów i kontroli niż shared hosting.</p>
                  <p className="text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
                    <strong>Zalety:</strong> Więcej mocy, większa kontrola<br/>
                    <strong>Wady:</strong> Wyższa cena, wymaga wiedzy technicznej
                  </p>
                </div>
                <div className="p-6 rounded-xl" style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)" }}>
                  <h3 className="text-xl font-semibold text-white mb-2">Serwer dedykowany (Dedicated Server)</h3>
                  <p className="mb-3">Cały serwer tylko dla Ciebie. Pełna kontrola nad zasobami i konfiguracją.</p>
                  <p className="text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
                    <strong>Zalety:</strong> Maksymalna wydajność, pełny dostęp<br/>
                    <strong>Wady:</strong> Bardzo wysoka cena, wymaga zaawansowanej wiedzy
                  </p>
                </div>
                <div className="p-6 rounded-xl" style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)" }}>
                  <h3 className="text-xl font-semibold text-white mb-2">Cloud Hosting</h3>
                  <p className="mb-3">Nowoczesne rozwiązanie oparte na chmurze. Skalowalność i wysoka dostępność.</p>
                  <p className="text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
                    <strong>Zalety:</strong> Skalowalność, wysoka dostępność<br/>
                    <strong>Wady:</strong> Może być drogi, skomplikowany w konfiguracji
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2
                className="text-3xl font-bold text-white mb-4"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                Na co zwrócić uwagę przy wyborze hostingu?
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
                       style={{ background: "rgba(239,68,68,0.2)", color: "#ef4444" }}>
                    1
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">Wydajność i szybkość</h4>
                    <p>Szybkość ładowania strony ma kluczowe znaczenie dla użytkowników i SEO. Sprawdź parametry takie jak czas odpowiedzi serwera,
                       dostępność (uptime) i jakość dysku (SSD vs HDD).</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
                       style={{ background: "rgba(239,68,68,0.2)", color: "#ef4444" }}>
                    2
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-1">Brak wsparcia technicznego</h4>
                    <p>Dobre wsparcie to podstawa. Sprawdź czy jest dostępne 24/7, jakie są kanały kontaktu (telefon, chat, email) 
                       i w jakim języku jest oferowane.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
                       style={{ background: "rgba(239,68,68,0.2)", color: "#ef4444" }}>
                    3
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">Bezpieczeństwo</h4>
                    <p>Sprawdź czy hosting oferuje certyfikaty SSL, ochronę przed malware, regularne kopie zapasowe i firewall.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
                       style={{ background: "rgba(239,68,68,0.2)", color: "#ef4444" }}>
                    4
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">Skalowalność</h4>
                    <p>Czy możesz łatwo zwiększyć zasoby, gdy Twoja strona się rozrasta? Czy jest możliwość rozbudowy planu?</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
                       style={{ background: "rgba(239,68,68,0.2)", color: "#ef4444" }}>
                    5
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">Cena i warunki</h4>
                    <p>Sprawdź czy cena jest promocyjna i po jakim czasie wzrasta. Czy są ukryte koszty? Jakie są warunki zwrotu pieniędzy?</p>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2
                className="text-3xl font-bold text-white mb-4"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                Polecane firmy hostingowe w Polsce
              </h2>
              <div className="space-y-4">
                <div className="p-6 rounded-xl" style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)" }}>
                  <h3 className="text-xl font-semibold text-white mb-2">Hostinger</h3>
                  <p>Dobry stosunek ceny do jakości, łatwy w obsłudze, dobre wsparcie. Idealny dla początkujących.</p>
                </div>
                <div className="p-6 rounded-xl" style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)" }}>
                  <h3 className="text-xl font-semibold text-white mb-2">Cyberfolks</h3>
                  <p>Polska firma, bardzo dobre wsparcie w języku polskim, stabilne serwery. Nieco droższy.</p>
                </div>
                <div className="p-6 rounded-xl" style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)" }}>
                  <h3 className="text-xl font-semibold text-white mb-2">Linuxpl</h3>
                  <p>Profesjonalny hosting, więcej opcji konfiguracji, dla bardziej zaawansowanych użytkowników.</p>
                </div>
              </div>
            </section>

            <section>
              <h2
                className="text-3xl font-bold text-white mb-4"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                Czynniki, których unikać
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="text-red-400 mt-1">:</span>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-1">Nieograniczone zasoby</h4>
                    <p>"Nieograniczona przestrzeń" lub "nieograniczone transfer" to marketing. Zawsze są gdzieś limity w regulaminie.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-red-400 mt-1">:</span>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-1">Bardzo tanie oferty</h4>
                    <p>Ceny poniżej 5 zł/miesiąc często oznaczają bardzo słaby serwis i ograniczone zasoby.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-red-400 mt-1">:</span>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-1">Brak polskiego wsparcia</h4>
                    <p>Jeśli nie znasz dobrze angielskiego, unikaj firm, które nie oferują wsparcia w języku polskim.</p>
                  </div>
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
                Wybór hostingu to inwestycja w sukces Twojej strony. Nie oszczędzaj na tym elemencie - dobry hosting zapłaci się
                wielokrotnie w postaci szybszej strony, lepszych pozycji w Google i zadowolonych użytkowników. Pamiętaj, że możesz
                zawsze zmienić hosting, ale lepiej wybrać dobry od początku. Zainwestuj czas w research i wybierz rozwiązanie,
                które będzie rosło razem z Twoją stroną.
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
              background: "linear-gradient(135deg, rgba(239,68,68,0.1), rgba(124,58,237,0.05))",
              border: "1px solid rgba(239,68,68,0.2)",
            }}
          >
            <h3
              className="text-2xl font-bold text-white mb-4"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Potrzebujesz porady z hostingiem?
            </h3>
            <p
              className="text-base mb-6"
              style={{ color: "rgba(255,255,255,0.6)", fontFamily: "'Outfit', sans-serif" }}
            >
              Pomożemy Ci wybrać najlepszy hosting dla Twojej strony i zadbamy o prawidłową konfigurację.
            </p>
            <a
              href="tel:+48884679933"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-white font-medium transition-all duration-300 hover:scale-105"
              style={{
                background: "linear-gradient(135deg, #ef4444, #dc2626)",
                boxShadow: "0 8px 24px -8px rgba(239,68,68,0.4)",
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

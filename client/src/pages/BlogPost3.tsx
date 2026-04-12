/*
 * BlogPost3 - Przykadowy artyku blogowy
 * Konwersja - jak zamienić odwiedzających na klientów
 */
import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowLeft, Calendar, User, Clock, Share2, Heart, Facebook, Twitter, Linkedin, Link2 } from "lucide-react";
import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function BlogPost3() {
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-80px" });
  
  // Inicjalizacja stanu z localStorage
  const [likes, setLikes] = useState(() => {
    const savedLikes = localStorage.getItem('blogPost3_likes');
    return savedLikes ? parseInt(savedLikes) : 56;
  });
  const [isLiked, setIsLiked] = useState(() => {
    const savedLiked = localStorage.getItem('blogPost3_liked');
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
      localStorage.setItem('blogPost3_likes', newLikes.toString());
      localStorage.setItem('blogPost3_liked', 'true');
    }
  };

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const text = "Konwersja - jak zamienić odwiedzających na klientów";
    
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
            background: "linear-gradient(135deg, rgba(16,185,129,0.15), rgba(6,182,212,0.08))",
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
              <a className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors">
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
                5 kwietnia 2026
              </span>
              <span className="flex items-center gap-2">
                <User size={16} />
                Tomasz Wiernicki
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
              Konwersja - jak zamienić{" "}
              <span style={{ color: "#10b981" }}>odwiedzających</span>{" "}
              na klientów
            </h1>

            <div className="flex items-center gap-6 mb-8">
              <button 
                onClick={handleLike}
                className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-colors ${
                  isLiked 
                    ? 'border-emerald-500 text-emerald-400 bg-emerald-500/10' 
                    : 'border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10'
                }`}
              >
                <Heart size={16} fill={isLiked ? "currentColor" : "none"} />
                {likes} polubie
              </button>
              
              <div className="relative">
                <button 
                  data-share-button
                  onClick={() => setShowShareMenu(!showShareMenu)}
                  className="flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10 transition-colors"
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
                      className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-800 text-white w-full text-left transition-colors"
                    >
                      <Facebook size={18} className="text-blue-400" />
                      <span>Facebook</span>
                    </button>
                    <button
                      onClick={() => handleShare('twitter')}
                      className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-800 text-white w-full text-left transition-colors"
                    >
                      <Twitter size={18} className="text-sky-400" />
                      <span>Twitter</span>
                    </button>
                    <button
                      onClick={() => handleShare('linkedin')}
                      className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-800 text-white w-full text-left transition-colors"
                    >
                      <Linkedin size={18} className="text-blue-600" />
                      <span>LinkedIn</span>
                    </button>
                    <button
                      onClick={() => handleShare('copy')}
                      className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-800 text-white w-full text-left transition-colors"
                    >
                      <Link2 size={18} className="text-gray-400" />
                      <span>Kopiuj link</span>
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
                Co to jest konwersja?
              </h2>
              <p className="text-lg leading-relaxed mb-4">
                Konwersja to moment, w którym odwiedzający Twoją stronę wykonuje pożądaną przez Ciebie akcję.
                Może to być zakup produktu, wypełnienie formularza kontaktowego, zapis na newsletter,
                lub cokolwiek innego, co jest celem Twojej strony.
              </p>
              <p className="text-lg leading-relaxed">
                Współczynnik konwersji (CR) to procent użytkowników, którzy wykonają daną akcję.
                Jeśli na Twoją stronę wchodzi 1000 osób, a 50 z nich wypełnia formularz, to Twój CR wynosi 5%.
                To kluczowy wskaźnik sukcesu każdej strony internetowej.
              </p>
            </section>

            <section>
              <h2
                className="text-3xl font-bold text-white mb-4"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                Dlaczego konwersja jest ważna?
              </h2>
              <div className="space-y-4">
                <div className="p-6 rounded-xl" style={{ background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.2)" }}>
                  <h3 className="text-xl font-semibold text-white mb-2">Zwrot z inwestycji (ROI)</h3>
                  <p>Lepsza konwersja oznacza więcej klientów z tego samego ruchu. To jakby dostać więcej
                     reklam za darmo!</p>
                </div>
                <div className="p-6 rounded-xl" style={{ background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.2)" }}>
                  <h3 className="text-xl font-semibold text-white mb-2">Efektywność marketingu</h3>
                  <p>Wysoka konwersja sprawia, że Twoje kampanie marketingowe są bardziej opłacalne.</p>
                </div>
                <div className="p-6 rounded-xl" style={{ background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.2)" }}>
                  <h3 className="text-xl font-semibold text-white mb-2">Wzrost biznesu</h3>
                  <p>Większa konwersja to więcej sprzedaży, więcej leadów, więcej zapytań - więcej biznesu.</p>
                </div>
              </div>
            </section>

            <section>
              <h2
                className="text-3xl font-bold text-white mb-4"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                Psychologia konwersji
              </h2>
              <p className="text-lg leading-relaxed mb-4">
                Ludzie podejmują decyzje w oparciu o emocje, a potem je uzasadniają. Zrozumienie psychologii 
                użytkownika to klucz do większej konwersji:
              </p>
              <ul className="space-y-3 text-lg">
                <li className="flex items-start gap-3">
                  <span className="text-emerald-400 mt-1">Zaufanie:</span>
                  <span>Użytkownicy muszą Ci ufać, zanim dokonają zakupu. Buduj zaufanie przez social proof, opinie, certyfikaty.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-400 mt-1">Pilność:</span>
                  <span>Ograniczone oferty, liczniki, "ostatnie szanse" - to wszystko tworzy poczucie pilności.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-400 mt-1">Społeczny dowód:</span>
                  <span>Opinie, recenzje, case studies - ludzie ufają innym ludziom.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-400 mt-1">Prostota:</span>
                  <span>Im prostszy proces, tym większa szansa na dokonanie konwersji.</span>
                </li>
              </ul>
            </section>

            <section>
              <h2
                className="text-3xl font-bold text-white mb-4"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                Elementy strony, które zwiększają konwersję
              </h2>
              <div className="space-y-4">
                <div className="p-6 rounded-xl" style={{ background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.2)" }}>
                  <h3 className="text-xl font-semibold text-white mb-2">Jasne CTA (Call to Action)</h3>
                  <p>Przyciski muszą być wyraźnie widoczne, z czytelnym tekstem ("Kup teraz", "Dowiedz się więcej").
                     Użyj kontrastowych kolorów i odpowiedniego rozmiaru.</p>
                </div>
                <div className="p-6 rounded-xl" style={{ background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.2)" }}>
                  <h3 className="text-xl font-semibold text-white mb-2">Formularze zoptymalizowane</h3>
                  <p>Im mniej pl, tym lepiej. Pytaj tylko o to, co absolutnie konieczne. Uyj placeholderw 
                     i pomocy kontekstowej.</p>
                </div>
                <div className="p-6 rounded-xl" style={{ background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.2)" }}>
                  <h3 className="text-xl font-semibold text-white mb-2">Opinie i recenzje</h3>
                  <p>Pokazuj prawdziwe opinie klientów. Dodaj zdjcia, imiona, nazwy firm. To buduje wiarygodno.</p>
                </div>
                <div className="p-6 rounded-xl" style={{ background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.2)" }}>
                  <h3 className="text-xl font-semibold text-white mb-2">Gwarancje i zwroty</h3>
                  <p>30-dniowa gwarancja satysfakcji, bezproblemowe zwroty - to usuwa barier zakupu.</p>
                </div>
              </div>
            </section>

            <section>
              <h2
                className="text-3xl font-bold text-white mb-4"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                Proces optymalizacji konwersji (CRO)
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
                       style={{ background: "rgba(16,185,129,0.2)", color: "#10b981" }}>
                    1
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">Analiza danych</h4>
                    <p>Zrozum, gdzie użytkownicy opuszczają stronę. Użyj Google Analytics, heatmaps, session recordings.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
                       style={{ background: "rgba(16,185,129,0.2)", color: "#10b981" }}>
                    2
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">Identyfikacja problemów</h4>
                    <p>Znajdź "punkty tarcia" - miejsca, gdzie użytkownicy mają problemy lub wątpliwości.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
                       style={{ background: "rgba(16,185,129,0.2)", color: "#10b981" }}>
                    3
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">Hipotezy</h4>
                    <p>Sformułuj hipotezy: "Jeśli zmienimy kolor przycisku na czerwony, konwersja wzrośnie o 10%".</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
                       style={{ background: "rgba(16,185,129,0.2)", color: "#10b981" }}>
                    4
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">A/B testy</h4>
                    <p>Przetestuj zmiany na rzeczywistych użytkownikach. Porównaj wersję A (oryginalną) z wersją B (zmienioną).</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
                       style={{ background: "rgba(16,185,129,0.2)", color: "#10b981" }}>
                    5
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">Implementacja</h4>
                    <p>Wdr zwycizk wersj i kontynuuj proces optymalizacji.</p>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2
                className="text-3xl font-bold text-white mb-4"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                Przykady udanej optymalizacji
              </h2>
              <div className="space-y-4">
                <div className="p-6 rounded-xl" style={{ background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.2)" }}>
                  <h3 className="text-xl font-semibold text-white mb-2">Zmiana nagwka +47%</h3>
                  <p>Software house zmieni nagłówek "Tworzymy oprogramowanie" na "Twoja firma działa 3x szybciej 
                     dzięki naszemu oprogramowaniu". Konwersja wzrosła o 47%.</p>
                </div>
                <div className="p-6 rounded-xl" style={{ background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.2)" }}>
                  <h3 className="text-xl font-semibold text-white mb-2">Usunięcie pola z formularza +28%</h3>
                  <p>Agencja marketingowa usunęła pole "Nazwa firmy" z formularza kontaktowego. Konwersja wzrosła o 28%.</p>
                </div>
                <div className="p-6 rounded-xl" style={{ background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.2)" }}>
                  <h3 className="text-xl font-semibold text-white mb-2">Dodanie opinii +35%</h3>
                  <p>Sklep internetowy dodał opinie klientów pod produktami. Konwersja wzrosła o 35%.</p>
                </div>
              </div>
            </section>

            <section>
              <h2
                className="text-3xl font-bold text-white mb-4"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                Narzędzia do optymalizacji konwersji
              </h2>
              <ul className="space-y-3 text-lg">
                <li className="flex items-start gap-3">
                  <span className="text-emerald-400 mt-1">Google Analytics:</span>
                  <span>Podstawowa analityka ruchu i zachowań użytkowników</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-400 mt-1">Hotjar/Crazy Egg:</span>
                  <span>Heatmaps i session recordings</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-400 mt-1">Optimizely/VWO:</span>
                  <span>Zaawansowane A/B testy</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-400 mt-1">Google Optimize:</span>
                  <span>Darmowe narzędzie do A/B testów od Google</span>
                </li>
              </ul>
            </section>

            <section>
              <h2
                className="text-3xl font-bold text-white mb-4"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                Podsumowanie
              </h2>
              <p className="text-lg leading-relaxed">
                Optymalizacja konwersji to ciągły proces, nie jednorazowe zadanie. Zawsze można coś poprawić, 
                co przetestować, co zoptymalizować. Pamiętaj, że nawet małe zmiany mogą przynieść wielkie rezultaty.
                Zacznij od analizy danych, zrozum swoich użytkowników i systematycznie ulepszaj ich doświadczenia.
                Twoja konwersja - i Twój biznes - Ci za to podziękują.
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
              background: "linear-gradient(135deg, rgba(16,185,129,0.1), rgba(6,182,212,0.05))",
              border: "1px solid rgba(16,185,129,0.2)",
            }}
          >
            <h3
              className="text-2xl font-bold text-white mb-4"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Chcesz zwiększyć konwersję Twojej strony?
            </h3>
            <p
              className="text-base mb-6"
              style={{ color: "rgba(255,255,255,0.6)", fontFamily: "'Outfit', sans-serif" }}
            >
              Zbudujemy stronę zoptymalizowaną pod kątem maksymalnej konwersji, która zamienia odwiedzających w klientów.
            </p>
            <a
              href="tel:+48884679933"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-white font-medium transition-all duration-300 hover:scale-105"
              style={{
                background: "linear-gradient(135deg, #10b981, #059669)",
                boxShadow: "0 8px 24px -8px rgba(16,185,129,0.4)",
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

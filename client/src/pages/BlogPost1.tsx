
import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowLeft, Calendar, User, Clock, Share2, Heart, Facebook, Twitter, Linkedin, Link2 } from "lucide-react";
import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function BlogPost1() {
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-80px" });
  
  // Inicjalizacja stanu z localStorage
  const [likes, setLikes] = useState(() => {
    const savedLikes = localStorage.getItem('blogPost1_likes');
    return savedLikes ? parseInt(savedLikes) : 42;
  });
  const [isLiked, setIsLiked] = useState(() => {
    const savedLiked = localStorage.getItem('blogPost1_liked');
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
      localStorage.setItem('blogPost1_likes', newLikes.toString());
      localStorage.setItem('blogPost1_liked', 'true');
    }
  };

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const text = "Dlaczego szybkość stron to nie luksus, a konieczność";
    
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
            background: "linear-gradient(135deg, rgba(124,58,237,0.15), rgba(6,182,212,0.08))",
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
              <a className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors">
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
                15 kwietnia 2026
              </span>
              <span className="flex items-center gap-2">
                <User size={16} />
                Jakub Kowalski
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
              Dlaczego szybkość stron to nie luksus, a{" "}
              <span style={{ color: "#a855f7" }}>konieczność</span>
            </h1>

            <div className="flex items-center gap-6 mb-8">
              <button 
                onClick={handleLike}
                className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-colors ${
                  isLiked 
                    ? 'border-purple-500 text-purple-400 bg-purple-500/10' 
                    : 'border-purple-500/30 text-purple-400 hover:bg-purple-500/10'
                }`}
              >
                <Heart size={16} fill={isLiked ? "currentColor" : "none"} />
                {likes} polubień
              </button>
              
              <div className="relative">
                <button 
                  data-share-button
                  onClick={() => setShowShareMenu(!showShareMenu)}
                  className="flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/30 text-purple-400 hover:bg-purple-500/10 transition-colors"
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
                Każda sekunda się liczy
              </h2>
              <p className="text-lg leading-relaxed mb-4">
                W dzisiejszym cyfrowym świecie czas jest najcenniejszym zasobem. Kiedy użytkownik wchodzi na Twoją stronę,
                masz dosłownie kilka sekund, aby zainteresować go na tyle, by został. Badania Google jasno pokazują,
                że prawdopodobieństwo opuszczenia strony wzrasta o 32% z każdą dodatkową sekundą ładowania.
                To oznacza, że jeśli Twoja strona ładuje 3 sekundy dłużej niż konkurencja, tracisz prawie połowę potencjalnych klientów.
              </p>
              <p className="text-lg leading-relaxed mb-4">
                Pomyśl o tym, jak sam korzystasz z internetu. Czy czekasz na stronę, która ładuje 5 sekund?
                Najprawdopodobniej już po 2-3 sekundach zaczynasz się nudzić i myśleć o powrocie do wyników wyszukiwania.
                A co dopiero powiedzieć o Twoich klientach, którzy mają mniej cierpliwości i więcej opcji do wyboru?
              </p>
              <p className="text-lg leading-relaxed">
                Psychologia użytkownika jest bezlitosna. Jeśli strona nie ładuje natychmiast, użytkownik czuje się
                ignorowany i traci zaufanie. Wolne strony kojarzą się z nieprofesjonalizmem i brakiem dbałości o klienta.
                To pierwsze wrażenie, które trudno naprawić, nawet jeśli reszta strony jest doskonała.
              </p>
            </section>

            <section>
              <h2
                className="text-3xl font-bold text-white mb-4"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                Bezpośredni wpływ na konwersję i SEO
              </h2>
              <p className="text-lg leading-relaxed mb-4">
                Szybkość strony ma bezpośredni, mierzalny wpływ na Twoje wyniki biznesowe. Wolniejsze strony mają znacznie
                niższe współczynniki konwersji - to fakt potwierdzony przez niezliczone badania. Amazon obliczył, że każde opóźnienie
                o 100ms kosztuje ich 1% sprzedaży. Dla mniejszych firm ten procent może oznaczać różnicę między zyskiem a stratą,
                między przetrwaniem a bankructwem.
              </p>
              <p className="text-lg leading-relaxed mb-4">
                Google od 2010 roku oficjalnie używa szybkości strony jako jednego z kluczowych czynników rankingowych.
                W 2021 roku wprowadzono Core Web Vitals, które jeszcze bardziej uwypukliły znaczenie wydajności.
                Strony z lepszymi wynikami PageSpeed mają nie tylko wyższe pozycje w wynikach wyszukiwania, ale również
                większy współczynnik klikalności (CTR), co dodatkowo zwiększa ich efektywność.
              </p>
              <p className="text-lg leading-relaxed">
                To nie jest teoria - to praktyka. Firmy, które zainwestowały w optymalizację szybkości, raportują
                zwiększenie konwersji o 20-40%, spadek współczynnika odrzuceń o 15-25% i wzrost pozycji w Google o kilka
                do kilkunastu miejsc. To realne pieniądze i realni klienci, których tracisz przez powolną stronę.
              </p>
            </section>

            <section>
              <h2
                className="text-3xl font-bold text-white mb-4"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                Core Web Vitals - nowe standardy Google
              </h2>
              <p className="text-lg leading-relaxed mb-4">
                Google nie tylko już mierzy szybkość - mierzy doświadczenie użytkownika. Core Web Vitals to trzy kluczowe
                metryki, które bezpośrednio wpływają na pozycje w wynikach wyszukiwania. Zrozumienie ich jest kluczowe
                dla sukcesu Twojej strony:
              </p>
              <div className="space-y-4">
                <div className="p-6 rounded-xl" style={{ background: "rgba(124,58,237,0.1)", border: "1px solid rgba(124,58,237,0.2)" }}>
                  <h3 className="text-xl font-semibold text-white mb-2">LCP (Largest Contentful Paint)</h3>
                  <p className="mb-2">Czas ładowania największego widocznego elementu na stronie.</p>
                  <p className="text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
                    <strong>Dobry:</strong> poniżej 2.5s | <strong>Potrzebny poprawy:</strong> 2.5-4s | <strong>Zły:</strong> powyżej 4s
                  </p>
                </div>
                <div className="p-6 rounded-xl" style={{ background: "rgba(124,58,237,0.1)", border: "1px solid rgba(124,58,237,0.2)" }}>
                  <h3 className="text-xl font-semibold text-white mb-2">FID (First Input Delay)</h3>
                  <p className="mb-2">Czas od pierwszej interakcji użytkownika do odpowiedzi strony.</p>
                  <p className="text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
                    <strong>Dobry:</strong> poniżej 100ms | <strong>Potrzebny poprawy:</strong> 100-300ms | <strong>Zły:</strong> powyżej 300ms
                  </p>
                </div>
                <div className="p-6 rounded-xl" style={{ background: "rgba(124,58,237,0.1)", border: "1px solid rgba(124,58,237,0.2)" }}>
                  <h3 className="text-xl font-semibold text-white mb-2">CLS (Cumulative Layout Shift)</h3>
                  <p className="mb-2">Stabilność layoutu - jak bardzo elementy przesuwają się podczas ładowania.</p>
                  <p className="text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
                    <strong>Dobrze:</strong> poniżej 0.1 | <strong>Potrzebny poprawy:</strong> 0.1-0.25 | <strong>Źle:</strong> powyżej 0.25
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2
                className="text-3xl font-bold text-white mb-4"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                Praktyczne strategie optymalizacji
              </h2>
              <div className="space-y-6">
                <div className="p-6 rounded-xl" style={{ background: "rgba(124,58,237,0.1)", border: "1px solid rgba(124,58,237,0.2)" }}>
                  <h3 className="text-xl font-semibold text-white mb-2">Optymalizacja obrazów - 80% sukcesu</h3>
                  <p className="mb-3">Obrazy to zazwyczaj największy problem ze szybkością strony. Poprawna optymalizacja może
                     zwiększyć szybkość ładowania o 50-70%.</p>
                  <ul className="space-y-2 text-sm" style={{ color: "rgba(255,255,255,0.8)" }}>
                    <li>Kompresuj obrazy do jakości 80-90% (strata niewidoczna dla oka)</li>
                    <li>Używaj nowoczesnych formatów: WebP (50% mniejsze niż JPEG), AVIF (jeszcze mniejsze)</li>
                    <li>Implementuj lazy loading - ładuj obrazy, gdy są potrzebne</li>
                    <li>Używaj responsywnych obrazów z odpowiednimi rozmiarami dla urządzeń</li>
                    <li>Dodaj atrybuty width i height, aby uniknąć CLS</li>
                  </ul>
                </div>
                <div className="p-6 rounded-xl" style={{ background: "rgba(124,58,237,0.1)", border: "1px solid rgba(124,58,237,0.2)" }}>
                  <h3 className="text-xl font-semibold text-white mb-2">Minimalizacja i optymalizacja kodu</h3>
                  <p className="mb-3">Każdy bajt się liczy, zwłaszcza na urządzeniach mobilnych z wolniejszym połączeniem.</p>
                  <ul className="space-y-2 text-sm" style={{ color: "rgba(255,255,255,0.8)" }}>
                    <li>Usuń nieużywany CSS i JavaScript (narzędzia: PurgeCSS, Tree Shaking)</li>
                    <li>Minifikuj pliki HTML, CSS, JS (usuń spacje, komentarze)</li>
                    <li>Używaj code splitting - ładuj tylko to, co potrzebne</li>
                    <li>Kompresuj pliki gzip lub Brotli (do 90% mniejsze)</li>
                    <li>Optymalizuj dostarczanie czcionek (font-display: swap)</li>
                  </ul>
                </div>
                <div className="p-6 rounded-xl" style={{ background: "rgba(124,58,237,0.1)", border: "1px solid rgba(124,58,237,0.2)" }}>
                  <h3 className="text-xl font-semibold text-white mb-2">CDN i inteligentne cache</h3>
                  <p className="mb-3">Dostarczaj treści z lokalizacji bliskiej użytkownikowi dla maksymalnej szybkości.</p>
                  <ul className="space-y-2 text-sm" style={{ color: "rgba(255,255,255,0.8)" }}>
                    <li>Użyj CDN (Cloudflare, AWS CloudFront) - 30-50% szybsze ładowanie</li>
                    <li>Skonfiguruj nagłówki cache dla statycznych zasobów</li>
                    <li>Implementuj service worker dla offline dostępu</li>
                    <li>Używaj HTTP/2 dla równoczesnego ładowania wielu plików</li>
                    <li>Optymalizuj Time To First Byte (TTFB) - powinien być poniżej 600ms</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2
                className="text-3xl font-bold text-white mb-4"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                Narzędzia do monitorowania i optymalizacji
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg" style={{ background: "rgba(124,58,237,0.05)", border: "1px solid rgba(124,58,237,0.1)" }}>
                  <h4 className="text-lg font-semibold text-white mb-2">Google PageSpeed Insights</h4>
                  <p>Darmowe narzędzie Google do analizy Core Web Vitals i sugestii optymalizacji.</p>
                </div>
                <div className="p-4 rounded-lg" style={{ background: "rgba(124,58,237,0.05)", border: "1px solid rgba(124,58,237,0.1)" }}>
                  <h4 className="text-lg font-semibold text-white mb-2">GTmetrix</h4>
                  <p>Szczegółowa analiza wydajności z waterfall i historią wyników.</p>
                </div>
                <div className="p-4 rounded-lg" style={{ background: "rgba(124,58,237,0.05)", border: "1px solid rgba(124,58,237,0.1)" }}>
                  <h4 className="text-lg font-semibold text-white mb-2">WebPageTest</h4>
                  <p>Zaawansowane testy z różnych lokalizacji i na różnych urządzeniach.</p>
                </div>
                <div className="p-4 rounded-lg" style={{ background: "rgba(124,58,237,0.05)", border: "1px solid rgba(124,58,237,0.1)" }}>
                  <h4 className="text-lg font-semibold text-white mb-2">Lighthouse</h4>
                  <p>Integrowane w DevTools Chrome - automatyczne audyty wydajności.</p>
                </div>
              </div>
            </section>

            <section>
              <h2
                className="text-3xl font-bold text-white mb-4"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                Mobilna optymalizacja - klucz do sukcesu
              </h2>
              <p className="text-lg leading-relaxed mb-4">
                Ponad 60% ruchu internetowego pochodzi z urządzeń mobilnych, a ten odsetek ciągle rośnie.
                Mobilni użytkownicy mają inne oczekiwania i ograniczenia - wolniejsze połączenia, mniejsze ekrany,
                ograniczoną pamięć i baterię. Optymalizacja mobilna to nie opcja, to konieczność.
              </p>
              <p className="text-lg leading-relaxed mb-4">
                Mobile-first indexing Google oznacza, że wersja mobilna Twojej strony jest główną wersją
                analizowaną przez algorytmy. Jeśli Twoja strona mobilna jest wolna, cała strona będzie miała
                niskie pozycje, nawet jeśli wersja desktop jest błyskawiczna.
              </p>
              <p className="text-lg leading-relaxed">
                Inwestycja w szybkość strony to nie koszt, to najlepsza możliwa inwestycja marketingowa.
                Zwrot z inwestycji jest natychmiastowy i mierzalny - więcej klientów, lepsze pozycje,
                większe zaufanie. Pamiętaj - w internecie wygrywa ten, kto jest najszybszy.
                Każda milisekunda się liczy, a Twoi konkurenci na pewno o tym wiedzą.
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
              background: "linear-gradient(135deg, rgba(168,85,247,0.1), rgba(6,182,212,0.05))",
              border: "1px solid rgba(168,85,247,0.2)",
            }}
          >
            <h3
              className="text-2xl font-bold text-white mb-4"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Chcesz szybką stronę dla swojego biznesu?
            </h3>
            <p
              className="text-base mb-6"
              style={{ color: "rgba(255,255,255,0.6)", fontFamily: "'Outfit', sans-serif" }}
            >
              Skontaktuj się z nami i zbuduj stronę, która będzie błyskawiczna i zoptymalizowana pod SEO.
            </p>
            <a
              href="tel:+48884679933"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-white font-medium transition-all duration-300 hover:scale-105"
              style={{
                background: "linear-gradient(135deg, #a855f7, #7c3aed)",
                boxShadow: "0 8px 24px -8px rgba(168,85,247,0.4)",
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

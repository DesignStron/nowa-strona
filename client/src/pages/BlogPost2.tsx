/*
 * BlogPost2 - Przykadowy artyku blogowy
 * SEO vs UX - co ważniejsze dla Twojej strony?
 */
import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowLeft, Calendar, User, Clock, Share2, Heart, Facebook, Twitter, Linkedin, Link2 } from "lucide-react";
import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function BlogPost2() {
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-80px" });
  
  // Inicjalizacja stanu z localStorage
  const [likes, setLikes] = useState(() => {
    const savedLikes = localStorage.getItem('blogPost2_likes');
    return savedLikes ? parseInt(savedLikes) : 28;
  });
  const [isLiked, setIsLiked] = useState(() => {
    const savedLiked = localStorage.getItem('blogPost2_liked');
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
      localStorage.setItem('blogPost2_likes', newLikes.toString());
      localStorage.setItem('blogPost2_liked', 'true');
    }
  };

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const text = "SEO vs UX - co ważniejsze dla Twojej strony?";
    
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
            background: "linear-gradient(135deg, rgba(6,182,212,0.15), rgba(124,58,237,0.08))",
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
              <a className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors">
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
                10 kwietnia 2026
              </span>
              <span className="flex items-center gap-2">
                <User size={16} />
                Anna Nowak
              </span>
              <span className="flex items-center gap-2">
                <Clock size={16} />
                10 min czytania
              </span>
            </div>

            <h1
              className="text-4xl lg:text-5xl font-bold text-white mb-8"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              SEO vs UX - co{" "}
              <span style={{ color: "#06b6d4" }}>ważniejsze</span>{" "}
              dla Twojej strony?
            </h1>

            <div className="flex items-center gap-6 mb-8">
              <button 
                onClick={handleLike}
                className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-colors ${
                  isLiked 
                    ? 'border-cyan-500 text-cyan-400 bg-cyan-500/10' 
                    : 'border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10'
                }`}
              >
                <Heart size={16} fill={isLiked ? "currentColor" : "none"} />
                {likes} polubie
              </button>
              
              <div className="relative">
                <button 
                  data-share-button
                  onClick={() => setShowShareMenu(!showShareMenu)}
                  className="flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 transition-colors"
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
                Dwa żywioły, jeden cel
              </h2>
              <p className="text-lg leading-relaxed mb-4">
                SEO (Search Engine Optimization) i UX (User Experience) to często przedstawiane jako przeciwieństwa.
                SEO ma przyciągnąć użytkownika na stronę, UX ma go zatrzymać. Ale co, jeśli powiem Ci, że te dwa
                elementy nie tylko się nie wykluczają, ale w rzeczywistości wzmacniają się nawzajem?
              </p>
              <p className="text-lg leading-relaxed">
                Google od lat podkreśla, że celem algorytmów jest dostarczanie użytkownikom najlepszych możliwych
                wyników. A co oznacza "najlepszy"? Właśnie to, co użytkownicy uważają za wartościowe i przyjazne.
                Więc UX to nie tylko "dodatek" do SEO - to fundament nowoczesnej optymalizacji.
              </p>
            </section>

            <section>
              <h2
                className="text-3xl font-bold text-white mb-4"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                Gdzie SEO i UX się spotykają
              </h2>
              <div className="space-y-4">
                <div className="p-6 rounded-xl" style={{ background: "rgba(6,182,212,0.1)", border: "1px solid rgba(6,182,212,0.2)" }}>
                  <h3 className="text-xl font-semibold text-white mb-2">Szybkość ładowania</h3>
                  <p>SEO: Core Web Vitals, PageSpeed Insights<br/>
                  UX: Użytkownicy nie czekają na wolne strony<br/>
                  <span className="text-cyan-400">Wspólny cel: Szybka, responsywna strona</span></p>
                </div>
                <div className="p-6 rounded-xl" style={{ background: "rgba(6,182,212,0.1)", border: "1px solid rgba(6,182,212,0.2)" }}>
                  <h3 className="text-xl font-semibold text-white mb-2">Mobile-first</h3>
                  <p>SEO: Mobile-first indexing<br/>
                  UX: Większość użytkowników korzysta z telefonów<br/>
                  <span className="text-cyan-400">Wspólny cel: Doskonałe działanie na mobilnych</span></p>
                </div>
                <div className="p-6 rounded-xl" style={{ background: "rgba(6,182,212,0.1)", border: "1px solid rgba(6,182,212,0.2)" }}>
                  <h3 className="text-xl font-semibold text-white mb-2">Struktura treści</h3>
                  <p>SEO: Nagłówki H1-H6, semantyczny HTML<br/>
                  UX: Logiczny układ, łatwa nawigacja<br/>
                  <span className="text-cyan-400">Wspólny cel: Logiczny, przejrzysty układ i intuicyjna nawigacja</span></p>
                </div>
              </div>
            </section>

            <section>
              <h2
                className="text-3xl font-bold text-white mb-4"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                Mity o SEO vs UX
              </h2>
              <p className="text-lg leading-relaxed mb-4">
                Istnieje wiele mitów na temat tego, jak SEO i UX się ze sobą "walą":
              </p>
              <ul className="space-y-3 text-lg">
                <li className="flex items-start gap-3">
                  <span className="text-red-400 mt-1">MIT:</span>
                  <span>"SEO wymaga dużo tekstu, co psuje UX"</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-400 mt-1">FAKT:</span>
                  <span>Google preferuje wartościowe, dobrze sformatowane treści, które są przyjazne dla użytkownika</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400 mt-1">MIT:</span>
                  <span>"UX design to tylko wygląd, SEO to technika"</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-400 mt-1">FAKT:</span>
                  <span>Dobry UX bezpośrednio wpływa na metryki używane przez SEO (czas na stronie, współczynnik odrzuceń)</span>
                </li>
              </ul>
            </section>

            <section>
              <h2
                className="text-3xl font-bold text-white mb-4"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                Jak zręcznie je połączyć
              </h2>
              <p className="text-lg leading-relaxed mb-4">
                Zamiast myśleć "SEO vs UX", myśl "SEO + UX". Oto praktyczne podejście:
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
                       style={{ background: "rgba(6,182,212,0.2)", color: "#06b6d4" }}>
                    1
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">Zacznij od badania użytkowników</h4>
                    <p>Zrozum, czego szukają Twoi klienci i jak się poruszają po stronach.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
                       style={{ background: "rgba(6,182,212,0.2)", color: "#06b6d4" }}>
                    2
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">Stwórz persony i customer journey</h4>
                    <p>Mapa użytkownika pomoże Ci zrozumieć, gdzie mogą być problemy z UX.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
                       style={{ background: "rgba(6,182,212,0.2)", color: "#06b6d4" }}>
                    3
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">Zaimplementuj SEO w procesie projektowania</h4>
                    <p>Nie dodawaj SEO "na koniec" - buduj je od początku w strukturze strony.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
                       style={{ background: "rgba(6,182,212,0.2)", color: "#06b6d4" }}>
                    4
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">Testuj i optymalizuj</h4>
                    <p>Użyj analityki, A/B testingu i feedbacku użytkowników do ciągłego ulepszania.</p>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2
                className="text-3xl font-bold text-white mb-4"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                Przykady sukcesu
              </h2>
              <div className="space-y-4">
                <div className="p-6 rounded-xl" style={{ background: "rgba(6,182,212,0.1)", border: "1px solid rgba(6,182,212,0.2)" }}>
                  <h3 className="text-xl font-semibold text-white mb-2">E-commerce sklep</h3>
                  <p>Poprawa UX (szybszy checkout, lepsze filtry) zwiększyła konwersję o 23%. 
                     Jednocześnie lepsza struktura strony podniosła pozycje SEO o 15%.</p>
                </div>
                <div className="p-6 rounded-xl" style={{ background: "rgba(6,182,212,0.1)", border: "1px solid rgba(6,182,212,0.2)" }}>
                  <h3 className="text-xl font-semibold text-white mb-2">Blog firmowy</h3>
                  <p>Lepsza czytelność i nawigacja zwiększa czas na stronie o 45%. 
                     Google doceni to wyższymi pozycjami na kluczowe frazy.</p>
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
                SEO i UX to nie wrogowie - to partnerzy w sukcesie Twojej strony. Dobre UX przynosi lepsze 
                metryki użytkowników, które Google uważa za sygnały wysokiej jakości. A lepsze SEO przyciąga 
                więcej użytkowników, którzy mogą docenić Twój doskonały UX. Zamiast wybierać, zainwestuj w oba. 
                To zwróci się wielokrotnie.
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
              background: "linear-gradient(135deg, rgba(6,182,212,0.1), rgba(168,85,247,0.05))",
              border: "1px solid rgba(6,182,212,0.2)",
            }}
          >
            <h3
              className="text-2xl font-bold text-white mb-4"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Potrzebujesz strony z doskonałym SEO i UX?
            </h3>
            <p
              className="text-base mb-6"
              style={{ color: "rgba(255,255,255,0.6)", fontFamily: "'Outfit', sans-serif" }}
            >
              Zbudujemy dla Ciebie stronę, która będzie zarówno lubiana przez użytkowników, jak i przez Google.
            </p>
            <a
              href="tel:+48884679933"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-white font-medium transition-all duration-300 hover:scale-105"
              style={{
                background: "linear-gradient(135deg, #06b6d4, #0891b2)",
                boxShadow: "0 8px 24px -8px rgba(6,182,212,0.4)",
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

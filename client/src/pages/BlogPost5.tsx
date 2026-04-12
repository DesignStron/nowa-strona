/*
 * BlogPost5 - Przykadowy artyku blogowy
 * Content marketing - jak tworzyć treści, które sprzedają?
 */
import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowLeft, Calendar, User, Clock, Share2, Heart, Facebook, Twitter, Linkedin, Link2 } from "lucide-react";
import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function BlogPost5() {
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-80px" });
  
  // Inicjalizacja stanu z localStorage
  const [likes, setLikes] = useState(() => {
    const savedLikes = localStorage.getItem('blogPost5_likes');
    return savedLikes ? parseInt(savedLikes) : 89;
  });
  const [isLiked, setIsLiked] = useState(() => {
    const savedLiked = localStorage.getItem('blogPost5_liked');
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
      localStorage.setItem('blogPost5_likes', newLikes.toString());
      localStorage.setItem('blogPost5_liked', 'true');
    }
  };

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const text = "Content marketing - jak tworzyć treści, które sprzedają?";
    
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
            background: "linear-gradient(135deg, rgba(245,158,11,0.15), rgba(239,68,68,0.08))",
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
              <a className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 transition-colors">
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
                28 marca 2026
              </span>
              <span className="flex items-center gap-2">
                <User size={16} />
                Ewa Nowakowska
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
              Content marketing - jak tworzyć{" "}
              <span style={{ color: "#f59e0b" }}>treści, które sprzedają?</span>
            </h1>

            <div className="flex items-center gap-6 mb-8">
              <button 
                onClick={handleLike}
                className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-colors ${
                  isLiked 
                    ? 'border-amber-500 text-amber-400 bg-amber-500/10' 
                    : 'border-amber-500/30 text-amber-400 hover:bg-amber-500/10'
                }`}
              >
                <Heart size={16} fill={isLiked ? "currentColor" : "none"} />
                {likes} polubie
              </button>
              
              <div className="relative">
                <button 
                  data-share-button
                  onClick={() => setShowShareMenu(!showShareMenu)}
                  className="flex items-center gap-2 px-4 py-2 rounded-full border border-amber-500/30 text-amber-400 hover:bg-amber-500/10 transition-colors"
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
                Content marketing to nie tylko blogowanie
              </h2>
              <p className="text-lg leading-relaxed mb-4">
                Wielu właścicieli firm myśli, że content marketing to pisanie bloga. To ważne - ale content marketing to strategiczne
                podejście do tworzenia i dystrybucji treści, które przyciągają, angażują i konwertują Twoją grupę docelową.
                Dobry content marketing to jak budowanie relacji z klientami zanim jeszcze staną się Twoimi klientami.
              </p>
              <p className="text-lg leading-relaxed">
                Pomyśl o tym jak o rozmowie z potencjalnym klientem. Zamiast krzyczeć "KUP!", opowiadasz historię,
                dzielisz się wiedzą, rozwiązujesz jego problemy. Budujesz zaufanie i autorytet. A kiedy przyjdzie czas
                na zakup, to Ty będziesz pierwszym wyborem. To jest istota content marketingu.
              </p>
            </section>

            <section>
              <h2
                className="text-3xl font-bold text-white mb-4"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                Rodzaje treści, które sprzedają
              </h2>
              <div className="space-y-6">
                <div className="p-6 rounded-xl" style={{ background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.2)" }}>
                  <h3 className="text-xl font-semibold text-white mb-2">Artykuły blogowe i poradniki</h3>
                  <p className="mb-3">Edukacyjne treści, które rozwiązują problemy Twojej grupy docelowej.</p>
                  <p className="text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
                    <strong>Przykład:</strong> "Jak wybrać odpowiedni hosting dla strony firmowej"<br/>
                    <strong>Dlaczego działa:</strong> Rozwiązuje rzeczywisty problem, buduje zaufanie
                  </p>
                </div>
                <div className="p-6 rounded-xl" style={{ background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.2)" }}>
                  <h3 className="text-xl font-semibold text-white mb-2">Case studies i historie sukcesu</h3>
                  <p className="mb-3">Prawdziwe historie klientów, którzy skorzystali z Twoich usług.</p>
                  <p className="text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
                    <strong>Przykład:</strong> "Jak zwiększyliśmy konwersję sklepu o 45% w 3 miesiące"<br/>
                    <strong>Dlaczego działa:</strong> Dowód społeczny, pokazuje konkretne rezultaty
                  </p>
                </div>
                <div className="p-6 rounded-xl" style={{ background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.2)" }}>
                  <h3 className="text-xl font-semibold text-white mb-2">Wideo i webinary</h3>
                  <p className="mb-3">Dynamiczne formaty, które pokazują Twoją ekspertyzę w działaniu.</p>
                  <p className="text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
                    <strong>Przykład:</strong> Webinar "10 błędów w projektowaniu stron"<br/>
                    <strong>Dlaczego działa:</strong> Budowanie osobistej marki, wysokie zaangażowanie
                  </p>
                </div>
                <div className="p-6 rounded-xl" style={{ background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.2)" }}>
                  <h3 className="text-xl font-semibold text-white mb-2">E-booki i materiały premium</h3>
                  <p className="mb-3">Głębsze treści za darmo w zamian za dane kontaktowe.</p>
                  <p className="text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
                    <strong>Przykład:</strong> E-book "Kompletny przewodnik po SEO dla początkujących"<br/>
                    <strong>Dlaczego działa:</strong> Generowanie leadów, pokazanie głębszej wiedzy
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2
                className="text-3xl font-bold text-white mb-4"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                Jak tworzyć treści, które konwertują?
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
                       style={{ background: "rgba(245,158,11,0.2)", color: "#f59e0b" }}>
                    1
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">Zrozum swoją grupę docelową</h4>
                    <p>Zanim napiszesz jedno słowo, zdefiniuj do kogo piszesz. Jakie mają problemy? Jakiego języka używają? 
                       Co ich interesuje? Stwórz persony - idealnych klientów i pisz bezpośrednio do nich.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
                       style={{ background: "rgba(245,158,11,0.2)", color: "#f59e0b" }}>
                    2
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">Rozwiąż problemy, nie sprzedawaj</h4>
                    <p>Najlepsze treści to te, które rzeczywiście pomagają. Zamiast opisywać swoje usługi, pokaż jak rozwiązujesz
                       konkretne problemy klientów. Ludzie kupują rozwiązania, nie cechy.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
                       style={{ background: "rgba(245,158,11,0.2)", color: "#f59e0b" }}>
                    3
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">Użyj struktury AIDA</h4>
                    <p><strong>Attention</strong> - zwróć uwagę nagłówkiem<br/>
                       <strong>Interest</strong> - zainteresuj problemem i jego wpływami<br/>
                       <strong>Desire</strong> - stwórz pragnienie rozwiązania<br/>
                       <strong>Action</strong> - zachęć do działania</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
                       style={{ background: "rgba(245,158,11,0.2)", color: "#f59e0b" }}>
                    4
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">Opowiadaj historie</h4>
                    <p>Ludzie pamiętają historie, nie fakty. Dobre historie mają bohatera, konflikt i rozwiązanie. 
                       Twoi klienci powinni być bohaterami historii, które opowiadasz. Twoja firma jest przewodnikiem, który pomaga im osiągnąć cel.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
                       style={{ background: "rgba(245,158,11,0.2)", color: "#f59e0b" }}>
                    5
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">Dodaj dowód socjalny</h4>
                    <p>Opinie, recenzje, statystyki, cytaty ekspertów. Pokaż, że nie tylko Ty tak uważasz, ale także inni 
                       eksperci zgadzają się z Twoją opinią.</p>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2
                className="text-3xl font-bold text-white mb-4"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                Błędy, których unikać
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="text-amber-400 mt-1">:</span>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-1">Pisanie o sobie, nie o kliencie</h4>
                    <p>Zamiast "Jesteśmy liderem w branży" pisz "Pomogliśmy firmom XYZ zwiększyć sprzedaż o 30%".</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-amber-400 mt-1">:</span>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-1">Zbyt techniczny język</h4>
                    <p>Pisz tak, jakbyś rozmawiał z klientem. Unikaj specjalistycznego argo, chyba że Twoja grupa docelowa go używa.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-amber-400 mt-1">:</span>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-1">Brak CTA (Call to Action)</h4>
                    <p>Każdy artykuł powinien mieć jasne wezwanie do działania. Co ma zrobić czytelnik po przeczytaniu?</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-amber-400 mt-1">:</span>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-1">Nieregularna publikacja</h4>
                    <p>Stwórz kalendarz redakcyjny. Trzymaj się go. Lepiej publikować mniej, ale regularnie niż więcej rzadko. Buduje oczekiwanie i nawyk u czytelników.</p>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2
                className="text-3xl font-bold text-white mb-4"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                Jak mierzyć skuteczność content marketingu?
              </h2>
              <div className="space-y-4">
                <div className="p-4 rounded-lg" style={{ background: "rgba(245,158,11,0.05)", border: "1px solid rgba(245,158,11,0.1)" }}>
                  <h4 className="text-lg font-semibold text-white mb-2">Metryki zaangażowania</h4>
                  <p>Czas na stronie, liczba wyświetleń, udostępnienia, komentarze. Pokazuje czy treść jest interesująca.</p>
                </div>
                <div className="p-4 rounded-lg" style={{ background: "rgba(245,158,11,0.05)", border: "1px solid rgba(245,158,11,0.1)" }}>
                  <h4 className="text-lg font-semibold text-white mb-2">Metryki konwersji</h4>
                  <p>Liczba leadów, zapisów na newsletter, pytań o ofertę. Pokazuje czy treść generuje biznes.</p>
                </div>
                <div className="p-4 rounded-lg" style={{ background: "rgba(245,158,11,0.05)", border: "1px solid rgba(245,158,11,0.1)" }}>
                  <h4 className="text-lg font-semibold text-white mb-2">Metryki SEO</h4>
                  <p>Pozycje w Google, ruch organiczny, backlinki. Pokazuje czy treść dociera do nowych ludzi.</p>
                </div>
              </div>
            </section>

            <section>
              <h2
                className="text-3xl font-bold text-white mb-4"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                Narzędzia do content marketingu
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg" style={{ background: "rgba(245,158,11,0.05)", border: "1px solid rgba(245,158,11,0.1)" }}>
                    <h4 className="text-lg font-semibold text-white mb-2">Mierz wyniki</h4>
                    <p>Sprawdzaj co działa, a co nie. Analizuj metryki i dostosowuj strategię.</p>
                </div>
                <div className="p-4 rounded-lg" style={{ background: "rgba(245,158,11,0.05)", border: "1px solid rgba(245,158,11,0.1)" }}>
                  <h4 className="text-lg font-semibold text-white mb-2">Pisanie</h4>
                  <p>Google Docs, Grammarly, Hemingway Editor</p>
                </div>
                <div className="p-4 rounded-lg" style={{ background: "rgba(245,158,11,0.05)", border: "1px solid rgba(245,158,11,0.1)" }}>
                  <h4 className="text-lg font-semibold text-white mb-2">SEO</h4>
                  <p>Ahrefs, SEMrush, SurferSEO, Google Analytics</p>
                </div>
                <div className="p-4 rounded-lg" style={{ background: "rgba(245,158,11,0.05)", border: "1px solid rgba(245,158,11,0.1)" }}>
                  <h4 className="text-lg font-semibold text-white mb-2">Dystrybucja</h4>
                  <p>Buffer, Hootsuite, Mailchimp, Social media</p>
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
                Content marketing to maraton, nie sprint. Wymaga cierpliwości, konsekwencji i prawdziwego zrozumienia 
                potrzeb Twojej grupy docelowej. Ale efekty są warte wysiłku - lojalni klienci, stabilny ruch organiczny 
                i marka, która jest rozpoznawalna w swojej branży. Pamiętaj, że każdy artykuł, każdy film, każdy post
                to cegiełka w budowaniu Twojego biznesu. Inwestuj w jakość, nie ilość, a Twoi klienci Ci za to wynagrodzą.
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
              background: "linear-gradient(135deg, rgba(245,158,11,0.1), rgba(239,68,68,0.05))",
              border: "1px solid rgba(245,158,11,0.2)",
            }}
          >
            <h3
              className="text-2xl font-bold text-white mb-4"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Potrzebujesz strategii content marketingu?
            </h3>
            <p
              className="text-base mb-6"
              style={{ color: "rgba(255,255,255,0.6)", fontFamily: "'Outfit', sans-serif" }}
            >
            Stworzymy dla Ciebie spójną strategię treści, które przyciągną klientów i zbudują Twoją markę.
            </p>
            <a
              href="tel:+48884679933"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-white font-medium transition-all duration-300 hover:scale-105"
              style={{
                background: "linear-gradient(135deg, #f59e0b, #d97706)",
                boxShadow: "0 8px 24px -8px rgba(245,158,11,0.4)",
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

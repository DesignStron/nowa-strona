/*
 * CookieBanner — Dark Glassmorphism Agency
 * Cookie consent banner with smooth animations
 */
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check } from "lucide-react";

export default function CookieBanner() {
  const [show, setShow] = useState(false);
  const [accepted, setAccepted] = useState(false);

  useEffect(() => {
    const cookieConsent = localStorage.getItem("designstron_cookie_consent");
    if (!cookieConsent) {
      const timer = setTimeout(() => setShow(true), 1500);
      return () => clearTimeout(timer);
    } else {
      setAccepted(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("designstron_cookie_consent", "accepted");
    setAccepted(true);
    setShow(false);
  };

  const handleReject = () => {
    localStorage.setItem("designstron_cookie_consent", "rejected");
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && !accepted && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="fixed bottom-0 left-0 right-0 z-40 p-4 sm:p-6"
        >
          <div
            className="max-w-2xl mx-auto rounded-2xl p-5 sm:p-6 border"
            style={{
              background: "rgba(15,13,31,0.95)",
              backdropFilter: "blur(20px)",
              borderColor: "rgba(124,58,237,0.3)",
              boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
            }}
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex-1">
                <h3
                  className="text-sm font-bold text-white mb-2"
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  Pliki cookies
                </h3>
                <p
                  className="text-xs sm:text-sm leading-relaxed"
                  style={{
                    color: "rgba(255,255,255,0.5)",
                    fontFamily: "'Outfit', sans-serif",
                  }}
                >
                  Używamy plików cookies do analizy ruchu i personalizacji doświadczenia.
                  Klikając „Akceptuję", wyrażasz zgodę na ich użycie.{" "}
                  <a
                    href="/polityka-prywatnosci"
                    className="text-purple-400 hover:text-purple-300 transition-colors underline"
                  >
                    Dowiedz się więcej
                  </a>
                </p>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto flex-shrink-0">
                <button
                  onClick={handleReject}
                  className="flex-1 sm:flex-none px-4 py-2.5 rounded-lg text-xs font-medium transition-all"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    color: "rgba(255,255,255,0.6)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    fontFamily: "'Outfit', sans-serif",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "rgba(255,255,255,0.08)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "rgba(255,255,255,0.05)")
                  }
                >
                  Odrzuć
                </button>
                <button
                  onClick={handleAccept}
                  className="flex-1 sm:flex-none px-4 py-2.5 rounded-lg text-xs font-medium flex items-center justify-center gap-2 transition-all"
                  style={{
                    background: "linear-gradient(135deg, #7c3aed, #a855f7)",
                    color: "white",
                    fontFamily: "'Outfit', sans-serif",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.9")}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                >
                  <Check size={14} />
                  Akceptuję
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

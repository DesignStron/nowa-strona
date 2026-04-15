/*
 * CookieConsent - DesignStron.pl
 * GDPR Compliant Cookie Consent Banner with checkboxes
 */
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, X, Settings } from "lucide-react";

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
}

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true, // Always true - can't be disabled
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    // Check if user has already made cookie choices
    const saved = localStorage.getItem('cookie-preferences');
    if (!saved) {
      setIsVisible(true);
    } else {
      try {
        setPreferences(JSON.parse(saved));
      } catch {
        // If corrupted, show banner again
        setIsVisible(true);
      }
    }
  }, []);

  const handleAcceptAll = () => {
    const allAccepted = {
      necessary: true,
      analytics: true,
      marketing: true,
    };
    setPreferences(allAccepted);
    localStorage.setItem('cookie-preferences', JSON.stringify(allAccepted));
    setIsVisible(false);
    setShowSettings(false);
  };

  const handleSavePreferences = () => {
    localStorage.setItem('cookie-preferences', JSON.stringify(preferences));
    setIsVisible(false);
    setShowSettings(false);
  };

  const handleRejectOptional = () => {
    const rejected = {
      necessary: true,
      analytics: false,
      marketing: false,
    };
    setPreferences(rejected);
    localStorage.setItem('cookie-preferences', JSON.stringify(rejected));
    setIsVisible(false);
    setShowSettings(false);
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  const togglePreference = (key: keyof CookiePreferences) => {
    if (key === 'necessary') return; // Can't toggle necessary
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="fixed bottom-0 left-0 right-0 z-50"
          style={{
            background: "rgba(8, 6, 22, 0.98)",
            backdropFilter: "blur(20px)",
            borderTop: "1px solid rgba(124,58,237,0.2)",
          }}
        >
          <div className="container mx-auto max-w-6xl p-4">
            {!showSettings ? (
              // Simple banner
              <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4 lg:gap-6">
                {/* Icon */}
                <div
                  className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{
                    background: "linear-gradient(135deg, rgba(168,85,247,0.3), rgba(124,58,237,0.2))",
                    border: "1px solid rgba(168,85,247,0.3)",
                  }}
                >
                  <Cookie size={20} className="text-purple-400" />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <p
                    className="text-sm font-medium text-white mb-2"
                    style={{ fontFamily: "'Syne', sans-serif" }}
                  >
                    Ta strona używa plików cookies
                  </p>
                  <p
                    className="text-xs leading-relaxed mb-3"
                    style={{ color: "rgba(255,255,255,0.6)", fontFamily: "'Outfit', sans-serif" }}
                  >
                    Używamy plików cookies, aby zapewnić najlepsze doświadczenie na naszej stronie. 
                    Kontynuując przeglądanie, zgadzasz się na naszą{' '}
                    <a
                      href="/polityka-prywatnosci"
                      className="text-purple-400 hover:text-purple-300 underline transition-colors"
                    >
                      politykę prywatności
                    </a>{' '}
                    i{' '}
                    <a
                      href="/polityka-cookies"
                      className="text-purple-400 hover:text-purple-300 underline transition-colors"
                    >
                      politykę cookies
                    </a>
                    .
                  </p>
                </div>

                {/* Buttons */}
                <div className="flex items-center gap-3 flex-shrink-0">
                  <button
                    onClick={handleAcceptAll}
                    className="px-4 py-2 rounded-lg text-sm font-medium transition-all"
                    style={{
                      background: "linear-gradient(135deg, #a855f7, #7c3aed)",
                      color: "white",
                      fontFamily: "'Outfit', sans-serif",
                      boxShadow: "0 4px 12px -4px rgba(168,85,247,0.4)",
                    }}
                  >
                    Akceptuj wszystkie
                  </button>
                  <button
                    onClick={() => setShowSettings(true)}
                    className="px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-1"
                    style={{
                      background: "rgba(255,255,255,0.1)",
                      color: "rgba(255,255,255,0.8)",
                      border: "1px solid rgba(255,255,255,0.2)",
                    }}
                  >
                    <Settings size={14} />
                    Zarządzaj
                  </button>
                  <button
                    onClick={handleRejectOptional}
                    className="px-3 py-2 rounded-lg text-sm font-medium transition-all"
                    style={{
                      background: "transparent",
                      color: "rgba(255,255,255,0.6)",
                      border: "1px solid rgba(255,255,255,0.2)",
                    }}
                  >
                    Odrzuć opcjonalne
                  </button>
                  <button
                    onClick={handleClose}
                    className="w-8 h-8 rounded-lg flex items-center justify-center transition-all"
                    style={{
                      background: "rgba(255,255,255,0.1)",
                      color: "rgba(255,255,255,0.5)",
                      border: "1px solid rgba(255,255,255,0.1)",
                    }}
                  >
                    <X size={14} />
                  </button>
                </div>
              </div>
            ) : (
              // Detailed settings
              <div className="max-w-2xl mx-auto">
                <div className="flex items-center justify-between mb-4">
                  <h3
                    className="text-lg font-medium text-white"
                    style={{ fontFamily: "'Syne', sans-serif" }}
                  >
                    Zarządzaj preferencjami cookies
                  </h3>
                  <button
                    onClick={() => setShowSettings(false)}
                    className="w-8 h-8 rounded-lg flex items-center justify-center transition-all"
                    style={{
                      background: "rgba(255,255,255,0.1)",
                      color: "rgba(255,255,255,0.5)",
                      border: "1px solid rgba(255,255,255,0.1)",
                    }}
                  >
                    <X size={14} />
                  </button>
                </div>

                <div className="space-y-3 mb-6">
                  {/* Necessary */}
                  <div className="flex items-center gap-3 p-3 rounded-lg" style={{ background: "rgba(255,255,255,0.05)" }}>
                    <input
                      type="checkbox"
                      id="necessary"
                      checked={preferences.necessary}
                      disabled
                      className="w-4 h-4 rounded"
                      style={{ accentColor: "#a855f7" }}
                    />
                    <div className="flex-1">
                      <label 
                        htmlFor="necessary"
                        className="text-sm font-medium text-white cursor-pointer"
                        style={{ fontFamily: "'Outfit', sans-serif" }}
                      >
                        Niezbędne cookies
                      </label>
                      <p
                        className="text-xs"
                        style={{ color: "rgba(255,255,255,0.5)", fontFamily: "'Outfit', sans-serif" }}
                      >
                        Wymagane do prawidłowego działania strony (nie można wyłączyć)
                      </p>
                    </div>
                  </div>

                  {/* Analytics */}
                  <div className="flex items-center gap-3 p-3 rounded-lg" style={{ background: "rgba(255,255,255,0.05)" }}>
                    <input
                      type="checkbox"
                      id="analytics"
                      checked={preferences.analytics}
                      onChange={() => togglePreference('analytics')}
                      className="w-4 h-4 rounded"
                      style={{ accentColor: "#a855f7" }}
                    />
                    <div className="flex-1">
                      <label 
                        htmlFor="analytics"
                        className="text-sm font-medium text-white cursor-pointer"
                        style={{ fontFamily: "'Outfit', sans-serif" }}
                      >
                        Cookies analityczne
                      </label>
                      <p
                        className="text-xs"
                        style={{ color: "rgba(255,255,255,0.5)", fontFamily: "'Outfit', sans-serif" }}
                      >
                        Pomagają zrozumieć, jak użytkownicy korzystają ze strony (np. Google Analytics)
                      </p>
                    </div>
                  </div>

                  {/* Marketing */}
                  <div className="flex items-center gap-3 p-3 rounded-lg" style={{ background: "rgba(255,255,255,0.05)" }}>
                    <input
                      type="checkbox"
                      id="marketing"
                      checked={preferences.marketing}
                      onChange={() => togglePreference('marketing')}
                      className="w-4 h-4 rounded"
                      style={{ accentColor: "#a855f7" }}
                    />
                    <div className="flex-1">
                      <label 
                        htmlFor="marketing"
                        className="text-sm font-medium text-white cursor-pointer"
                        style={{ fontFamily: "'Outfit', sans-serif" }}
                      >
                        Cookies marketingowe
                      </label>
                      <p
                        className="text-xs"
                        style={{ color: "rgba(255,255,255,0.5)", fontFamily: "'Outfit', sans-serif" }}
                      >
                        Używane do personalizacji reklam i mierzenia skuteczności kampanii
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={handleSavePreferences}
                    className="flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all"
                    style={{
                      background: "linear-gradient(135deg, #a855f7, #7c3aed)",
                      color: "white",
                      fontFamily: "'Outfit', sans-serif",
                      boxShadow: "0 4px 12px -4px rgba(168,85,247,0.4)",
                    }}
                  >
                    Zapisz preferencje
                  </button>
                  <button
                    onClick={handleAcceptAll}
                    className="flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all"
                    style={{
                      background: "rgba(255,255,255,0.1)",
                      color: "rgba(255,255,255,0.8)",
                      border: "1px solid rgba(255,255,255,0.2)",
                    }}
                  >
                    Akceptuj wszystkie
                  </button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

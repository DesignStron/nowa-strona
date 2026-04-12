/* 
 * LegalNavbar - Navbar for legal pages (Terms, Privacy, Cookies)
 * Only links to main legal pages and blog
 */
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const legalNavLinks = [
  { label: "Regulamin", href: "/regulamin" },
  { label: "Polityka Prywatnosci", href: "/polityka-prywatnosci" },
  { label: "Polityka Cookies", href: "/polityka-cookies" },
];

export default function LegalNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    if (href.startsWith("/")) {
      window.location.href = href;
    } else {
      const el = document.querySelector(href);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled
            ? "rgba(15, 13, 31, 0.92)"
            : "rgba(15, 13, 31, 0.6)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderBottom: scrolled
            ? "1px solid rgba(255,255,255,0.08)"
            : "1px solid transparent",
        }}
      >
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <a
              href="/"
              className="flex items-center gap-2.5 group"
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm"
                style={{ background: "linear-gradient(135deg, #7c3aed, #a855f7)" }}
              >
                DS
              </div>
              <span
                className="text-white font-bold text-lg tracking-wide"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                DESIGNSTRON
              </span>
            </a>

            {/* Desktop Links */}
            <div className="hidden lg:flex items-center gap-8">
              {legalNavLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="text-sm font-medium transition-colors duration-200 hover:text-purple-400"
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    color: "rgba(255,255,255,0.7)",
                    letterSpacing: "0.03em",
                  }}
                >
                  {link.label}
                </button>
              ))}
              <div className="w-px h-6" style={{ background: "rgba(255,255,255,0.1)" }} />
              <a
                href="/blog"
                className="text-sm font-medium transition-colors duration-200 hover:text-purple-400"
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  color: "rgba(255,255,255,0.7)",
                  letterSpacing: "0.03em",
                }}
              >
                Blog
              </a>
            </div>

            {/* CTA */}
            <div className="hidden lg:flex items-center gap-4">
              <a
                href="/"
                className="btn-violet text-sm"
                style={{ padding: "0.625rem 1.5rem" }}
              >
                <span>Strona Gówna</span>
              </a>
            </div>

            {/* Mobile hamburger */}
            <button
              className="lg:hidden text-white p-2"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed top-16 left-0 right-0 z-40 lg:hidden"
            style={{
              background: "rgba(15, 13, 31, 0.97)",
              backdropFilter: "blur(20px)",
              borderBottom: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <div className="container mx-auto max-w-7xl px-4 py-6 flex flex-col gap-4">
              {legalNavLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="text-left text-base font-medium py-2 border-b border-white/5 hover:text-purple-400 transition-colors"
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    color: "rgba(255,255,255,0.8)",
                  }}
                >
                  {link.label}
                </button>
              ))}
              <a
                href="/blog"
                className="text-left text-base font-medium py-2 border-b border-white/5 hover:text-purple-400 transition-colors block"
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  color: "rgba(255,255,255,0.8)",
                }}
              >
                Blog
              </a>
              <a
                href="/"
                className="btn-violet mt-2 text-sm text-center w-full"
              >
                <span>Strona Gówna</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

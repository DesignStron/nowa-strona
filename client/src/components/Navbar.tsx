/* 
 * Navbar — Dark Glassmorphism Agency
 * Sticky nav with blur backdrop, logo left, links center, CTA right
 * Mobile: hamburger menu with slide-down drawer
 */
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "O nas", href: "#o-nas" },
  { label: "Usugi", href: "#uslugi" },
  { label: "Koszty", href: "#koszty" },
  { label: "Proces", href: "#proces" },
  { label: "Realizacje", href: "#realizacje" },
  { label: "FAQ", href: "#faq" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const handleNavClick = (href: string) => {
    console.log('Navbar handleNavClick called with href:', href);
    console.log('Current URL:', window.location.href);
    
    setMobileOpen(false);
    
    // Jeli href zaczyna si od /, to jest to link do innej strony
    if (href.startsWith("/")) {
      console.log('Navigating to external page:', href);
      window.location.href = href;
      return;
    }
    
    const isHomePage = window.location.pathname === '/' || window.location.pathname === '';
    console.log('Is home page:', isHomePage);
    
    if (href.startsWith("#") && isHomePage) {
      console.log('Scrolling to section on home page:', href);
      const el = document.querySelector(href);
      if (el) {
        console.log('Element found:', el);
        el.scrollIntoView({ behavior: "smooth" });
      } else {
        console.log('Element NOT found for href:', href);
      }
      return;
    }
    
    // Jeli href zaczyna si od # ale nie jesteemy na stronie gwnej, przenosz do strony gwnej z sekcj
    if (href.startsWith("#") && !isHomePage) {
      console.log('Navigating to home page with section:', href);
      window.location.href = '/' + href;
      return;
    }
    
    // W innym wypadku prbuj znale element
    console.log('Trying to find element for href:', href);
    const el = document.querySelector(href);
    if (el) {
      console.log('Element found:', el);
      el.scrollIntoView({ behavior: "smooth" });
    } else {
      console.log('Element NOT found for href:', href);
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
            <button
              onClick={() => handleNavClick("/")}
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
            </button>

            {/* Desktop Links */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
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
              <button
                onClick={() => handleNavClick("#kontakt")}
                className="btn-violet text-sm"
                style={{ padding: "0.625rem 1.5rem" }}
              >
                <span>Skontaktuj się</span>
              </button>
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
              {navLinks.map((link) => (
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
              <button
                onClick={() => handleNavClick("#kontakt")}
                className="btn-violet mt-2 text-sm text-center w-full"
              >
                <span>Skontaktuj sie</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

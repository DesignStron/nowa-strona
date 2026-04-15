/*
 * Footer — Dark Glassmorphism Agency
 * Logo, links, contact info, social, copyright
 */
import { motion } from "framer-motion";
import { Mail, Phone, ArrowUp } from "lucide-react";
import CookieConsent from "./CookieConsent";

const navLinks = [
  { label: "O nas", href: "#o-nas" },
  { label: "Usługi", href: "#uslugi" },
  { label: "Koszty", href: "#koszty" },
  { label: "Proces", href: "#proces" },
  { label: "Realizacje", href: "#realizacje" },
  { label: "FAQ", href: "#faq" },
  { label: "Kontakt", href: "#kontakt" },
];

export default function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const handleNavClick = (href: string) => {
    console.log('Footer handleNavClick called with href:', href);
    console.log('Current URL:', window.location.href);
    
    // Jeli href zaczyna si od /, to jest to link do innej strony
    if (href.startsWith("/")) {
      console.log('Footer: Navigating to external page:', href);
      window.location.href = href;
      return;
    }

    const isHomePage = window.location.pathname === '/' || window.location.pathname === '';
    console.log('Footer: Is home page:', isHomePage);

    if (href.startsWith("#") && isHomePage) {
      console.log('Footer: Scrolling to section on home page:', href);
      const el = document.querySelector(href);
      if (el) {
        console.log('Footer: Element found:', el);
        el.scrollIntoView({ behavior: "smooth" });
      } else {
        console.log('Footer: Element NOT found for href:', href);
      }
      return;
    }
    
 
    if (href.startsWith("#") && !isHomePage) {
      console.log('Footer: Navigating to home page with section:', href);
      window.location.href = '/' + href;
      return;
    }
    
    // W innym wypadku prbuj znale element
    console.log('Footer: Trying to find element for href:', href);
    const el = document.querySelector(href);
    if (el) {
      console.log('Footer: Element found:', el);
      el.scrollIntoView({ behavior: "smooth" });
    } else {
      console.log('Footer: Element NOT found for href:', href);
    }
  };

  return (
    <footer
      className="relative overflow-hidden"
      style={{ background: "#080616", borderTop: "1px solid rgba(255,255,255,0.06)" }}
    >
      {/* Top CTA strip */}
      <div
        className="py-12 text-center border-b"
        style={{ borderColor: "rgba(255,255,255,0.06)" }}
      >
        <p
          className="text-2xl lg:text-3xl font-bold text-white mb-4"
          style={{ fontFamily: "'Syne', sans-serif" }}
        >
          Gotowy na stronę, która{" "}
          <span style={{ color: "#a855f7" }}>sprzedaje?</span>
        </p>
        <button
          onClick={() => handleNavClick("#kontakt")}
          className="btn-violet"
        >
          <span>Rozpocznij projekt →</span>
        </button>
      </div>

      {/* Main footer */}
      <div className="container mx-auto max-w-6xl px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
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
            </div>
            <p
              className="text-sm leading-relaxed mb-5"
              style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'Outfit', sans-serif" }}
            >
              Tworzymy profesjonalne strony internetowe, które sprzedają.
              Autorski kod, unikalny design, mierzalne wyniki.
            </p>
            <div className="flex flex-col gap-2">
              <a
                href="mailto:designstron.pl@gmail.com"
                className="flex items-center gap-2 text-sm hover:text-purple-400 transition-colors"
                style={{ color: "rgba(255,255,255,0.5)", fontFamily: "'Outfit', sans-serif" }}
              >
                <Mail size={14} />
                designstron.pl@gmail.com
              </a>
              <a
                href="tel:+48884679933"
                className="flex items-center gap-2 text-sm hover:text-purple-400 transition-colors"
                style={{ color: "rgba(255,255,255,0.5)", fontFamily: "'Outfit', sans-serif" }}
              >
                <Phone size={14} />
                +48 884 679 933
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4
              className="text-sm font-bold text-white mb-4 uppercase tracking-wider"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Nawigacja
            </h4>
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="text-left text-sm hover:text-purple-400 transition-colors"
                  style={{ color: "rgba(255,255,255,0.45)", fontFamily: "'Outfit', sans-serif" }}
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Legal */}
          <div>
            <h4
              className="text-sm font-bold text-white mb-4 uppercase tracking-wider"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Prawne
            </h4>
            <div className="flex flex-col gap-2">
              {[
                { label: "Regulamin", href: "/regulamin" },
                { label: "Polityka prywatności", href: "/polityka-prywatnosci" },
                { label: "Polityka cookies", href: "/polityka-cookies" },
              ].map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="text-left text-sm hover:text-purple-400 transition-colors"
                  style={{ color: "rgba(255,255,255,0.45)", fontFamily: "'Outfit', sans-serif" }}
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="border-t py-6"
        style={{ borderColor: "rgba(255,255,255,0.06)" }}
      >
        <div className="container mx-auto max-w-6xl px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p
            className="text-xs"
            style={{ color: "rgba(255,255,255,0.25)", fontFamily: "'Outfit', sans-serif" }}
          >
            {new Date().getFullYear()} DesignStron.pl — Wszelkie prawa zastrzeżone.
          </p>
          <div className="flex items-center gap-6 flex-wrap">
            <button
              onClick={scrollTop}
              className="flex items-center gap-1.5 text-xs hover:text-purple-400 transition-colors"
              style={{ color: "rgba(255,255,255,0.35)", fontFamily: "'Outfit', sans-serif" }}
            >
              <ArrowUp size={12} />
              Powrót na górę
            </button>
          </div>
        </div>
      </div>

      {/* Cookie Consent Banner */}
      <CookieConsent />
    </footer>
  );
}

/*
 * ContactSection — Dark Glassmorphism Agency
 * Contact form + contact details side by side
 */
import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, Phone, Clock, Send, CheckCircle } from "lucide-react";

export default function ContactSection() {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-80px" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (sending) return;
    setError(null);
    setSending(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        setError(data?.error || "Nie udało się wysłać wiadomości. Spróbuj ponownie.");
        return;
      }

      setSent(true);
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch {
      setError("Błąd połączenia. Spróbuj ponownie za chwilę.");
    } finally {
      setSending(false);
    }
  };

  const inputStyle = {
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "0.5rem",
    color: "#ffffff",
    fontFamily: "'Outfit', sans-serif",
    fontSize: "0.9rem",
    padding: "0.75rem 1rem",
    width: "100%",
    outline: "none",
    transition: "border-color 0.2s",
  };

  return (
    <section
      id="kontakt"
      className="relative py-24 lg:py-32 overflow-hidden"
      style={{ background: "#0a0818" }}
    >
      <div
        className="blob"
        style={{
          width: "600px",
          height: "600px",
          background: "radial-gradient(circle, rgba(124,58,237,0.1) 0%, transparent 70%)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />

      <div className="container mx-auto max-w-6xl px-4 relative z-10">
        {/* Header */}
        <div ref={titleRef} className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="section-label justify-center mb-4"
          >
            Kontakt
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl lg:text-5xl font-bold text-white"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Porozmawiajmy o{" "}
            <span style={{ color: "#a855f7" }}>Twojej stronie</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-base lg:text-lg max-w-xl mx-auto"
            style={{ color: "rgba(255,255,255,0.5)", fontFamily: "'Outfit', sans-serif" }}
          >
            Napisz do nas lub zadzwoń. Odpowiadamy w ciągu 24 godzin.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={titleInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 flex flex-col gap-6"
          >
            <div className="glass-card rounded-2xl p-6">
              <h3
                className="text-xl font-bold text-white mb-6"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                Dane kontaktowe
              </h3>

              <div className="flex flex-col gap-5">
                <ContactItem
                  icon={<Mail size={18} />}
                  label="E-mail"
                  value="designstron.pl@gmail.com"
                  href="mailto:designstron.pl@gmail.com"
                />
                <ContactItem
                  icon={<Phone size={18} />}
                  label="Telefon"
                  value="+48 884 679 933"
                  href="tel:+48884679933"
                />
                <ContactItem
                  icon={<Clock size={18} />}
                  label="Godziny pracy"
                  value="Pon–Pt: 9:00–18:00"
                  href={null}
                />
              </div>
            </div>

            <div className="glass-card rounded-2xl p-6">
              <h4
                className="text-base font-bold text-white mb-3"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                Bezpłatna konsultacja
              </h4>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "rgba(255,255,255,0.5)", fontFamily: "'Outfit', sans-serif" }}
              >
                Pierwsza rozmowa jest zawsze bezpłatna. Opowiedz nam o swoim projekcie,
                a my zaproponujemy najlepsze rozwiązanie dla Twojego biznesu.
              </p>
              <div className="mt-4 flex flex-col gap-2">
                {[
                  "Analiza Twojej branży",
                  "Propozycja strategii",
                  "Wstępna wycena",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-2 text-sm"
                    style={{ color: "rgba(255,255,255,0.5)", fontFamily: "'Outfit', sans-serif" }}
                  >
                    <CheckCircle size={14} style={{ color: "#a855f7", flexShrink: 0 }} />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={titleInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-3"
          >
            <div className="glass-card rounded-2xl p-6 lg:p-8">
              {sent ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200 }}
                  >
                    <CheckCircle size={56} style={{ color: "#a855f7" }} className="mb-4" />
                  </motion.div>
                  <h3
                    className="text-2xl font-bold text-white mb-3"
                    style={{ fontFamily: "'Syne', sans-serif" }}
                  >
                    Wiadomość wysłana!
                  </h3>
                  <p
                    className="text-sm"
                    style={{ color: "rgba(255,255,255,0.5)", fontFamily: "'Outfit', sans-serif" }}
                  >
                    Odezwiemy się do Ciebie w ciągu 24 godzin roboczych.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  {error && (
                    <div
                      className="text-sm rounded-lg px-4 py-3"
                      style={{
                        background: "rgba(239,68,68,0.12)",
                        border: "1px solid rgba(239,68,68,0.25)",
                        color: "rgba(255,255,255,0.8)",
                        fontFamily: "'Outfit', sans-serif",
                      }}
                    >
                      {error}
                    </div>
                  )}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        className="block text-xs mb-2 uppercase tracking-wider"
                        style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'Outfit', sans-serif" }}
                      >
                        Imię i nazwisko *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Jan Kowalski"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        style={inputStyle}
                        onFocus={(e) => (e.target.style.borderColor = "rgba(124,58,237,0.5)")}
                        onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                      />
                    </div>
                    <div>
                      <label
                        className="block text-xs mb-2 uppercase tracking-wider"
                        style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'Outfit', sans-serif" }}
                      >
                        E-mail *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="jan@firma.pl"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        style={inputStyle}
                        onFocus={(e) => (e.target.style.borderColor = "rgba(124,58,237,0.5)")}
                        onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      className="block text-xs mb-2 uppercase tracking-wider"
                      style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'Outfit', sans-serif" }}
                    >
                      Telefon
                    </label>
                    <input
                      type="tel"
                      placeholder="+48 123 456 789"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      style={inputStyle}
                      onFocus={(e) => (e.target.style.borderColor = "rgba(124,58,237,0.5)")}
                      onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                    />
                  </div>

                  <div>
                    <label
                      className="block text-xs mb-2 uppercase tracking-wider"
                      style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'Outfit', sans-serif" }}
                    >
                      Opowiedz o swoim projekcie *
                    </label>
                    <textarea
                      required
                      rows={5}
                      placeholder="Czym zajmuje się Twoja firma? Czego potrzebujesz? Jaki masz budżet i termin?"
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      style={{ ...inputStyle, resize: "vertical" }}
                      onFocus={(e) => (e.target.style.borderColor = "rgba(124,58,237,0.5)")}
                      onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={sending}
                    className="btn-violet flex items-center justify-center gap-2 mt-2"
                    style={{ padding: "0.875rem 2rem" }}
                  >
                    <span>{sending ? "Wysyłanie..." : "Wyślij wiadomość"}</span>
                    <Send size={16} />
                  </button>

                  <p
                    className="text-xs text-center"
                    style={{ color: "rgba(255,255,255,0.25)", fontFamily: "'Outfit', sans-serif" }}
                  >
                    Odpowiadamy w ciągu 24 godzin roboczych. Twoje dane są bezpieczne.
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ContactItem({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href: string | null;
}) {
  const content = (
    <div className="flex items-start gap-3 group">
      <div
        className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
        style={{ background: "rgba(124,58,237,0.15)", color: "#a855f7" }}
      >
        {icon}
      </div>
      <div>
        <div
          className="text-xs uppercase tracking-wider mb-1"
          style={{ color: "rgba(255,255,255,0.3)", fontFamily: "'Outfit', sans-serif" }}
        >
          {label}
        </div>
        <div
          className="text-sm font-medium text-white group-hover:text-purple-300 transition-colors"
          style={{ fontFamily: "'Outfit', sans-serif" }}
        >
          {value}
        </div>
      </div>
    </div>
  );

  if (href) {
    return <a href={href}>{content}</a>;
  }
  return <div>{content}</div>;
}

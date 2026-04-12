/*
 * PricingSection — Dark Glassmorphism Agency
 * Service tiers with pricing and features
 */
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";

const plans = [
  {
    name: "Strona Firmowa",
    price: "2 500",
    period: "zł",
    description: "Idealna dla małych firm i usług",
    features: [
      "Do 5 podstron",
      "Responsywny design",
      "Formularz kontaktowy",
      "Integracja Google Maps",
      "Optymalizacja SEO",
      "SSL certyfikat",
      "30 dni wsparcia",
    ],
    cta: "Zacznij projekt",
    highlighted: false,
  },
  {
    name: "Landing Page",
    price: "1 500",
    period: "zł",
    description: "Kampania, promocja, lead generation",
    features: [
      "1 strona wysokiej konwersji",
      "Sekcja FAQ",
      "Formularz rejestracji",
      "Animacje i efekty",
      "A/B testing gotowy",
      "Google Analytics",
      "14 dni wsparcia",
    ],
    cta: "Zarezerwuj",
    highlighted: false,
  },
  {
    name: "Sklep Internetowy",
    price: "4 000",
    period: "zł",
    description: "Pełny e-commerce z płatnościami",
    features: [
      "Do 50 produktów",
      "System płatności (Stripe/PayU)",
      "Zarządzanie zamówieniami",
      "Email powiadomienia",
      "Integracja kurierów",
      "SEO & Analityka",
      "60 dni wsparcia",
    ],
    cta: "Rozmawiajmy",
    highlighted: true,
  },
  {
    name: "Strona Premium",
    price: "6 000",
    period: "zł+",
    description: "Zaawansowana strona z funkcjami",
    features: [
      "Nieograniczone podstrony",
      "Blog z CMS",
      "System rezerwacji",
      "Integracja mediów społecznych",
      "Zaawansowana analityka",
      "Kampanie Google Ads",
      "90 dni wsparcia",
    ],
    cta: "Konsultacja",
    highlighted: false,
  },
];

export default function PricingSection() {
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-80px" });

  return (
    <section
      id="oferta"
      className="relative py-24 lg:py-32 overflow-hidden"
      style={{ background: "#0f0d1f" }}
    >
      <div
        className="blob"
        style={{
          width: "500px",
          height: "500px",
          background: "radial-gradient(circle, rgba(168,85,247,0.08) 0%, transparent 70%)",
          top: "0%",
          right: "-150px",
          transform: "translateY(-50%)",
        }}
      />

      <div className="container mx-auto max-w-7xl px-4 relative z-10">
        {/* Header */}
        <div ref={titleRef} className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="section-label justify-center mb-4"
          >
            Oferta
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl lg:text-5xl font-bold text-white mb-4"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Pakiety dla każdego{" "}
            <span style={{ color: "#a855f7" }}>budżetu</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base lg:text-lg max-w-2xl mx-auto"
            style={{ color: "rgba(255,255,255,0.5)", fontFamily: "'Outfit', sans-serif" }}
          >
            Wszystkie ceny zawierają konsultację, projekt, wdrożenie i wsparcie.
            Możemy dostosować pakiet do Twoich potrzeb.
          </motion.p>
        </div>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan, i) => (
            <PricingCard
              key={plan.name}
              plan={plan}
              index={i}
              inView={titleInView}
            />
          ))}
        </div>

        {/* Bottom note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-12"
        >
          <p
            className="text-sm"
            style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'Outfit', sans-serif" }}
          >
            Nie widzisz czego szukasz?{" "}
            <a
              href="#kontakt"
              className="text-purple-400 hover:text-purple-300 transition-colors font-medium"
            >
              Skontaktuj się z nami
            </a>{" "}
            — tworzymy również pakiety custom.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function PricingCard({
  plan,
  index,
  inView,
}: {
  plan: (typeof plans)[0];
  index: number;
  inView: boolean;
}) {
  const ref = useRef(null);
  const cardInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={cardInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`relative rounded-2xl p-6 lg:p-8 border transition-all duration-300 group hover:scale-105`}
      style={{
        background: plan.highlighted
          ? "linear-gradient(135deg, rgba(124,58,237,0.15), rgba(168,85,247,0.1))"
          : "rgba(255,255,255,0.03)",
        borderColor: plan.highlighted
          ? "rgba(124,58,237,0.4)"
          : "rgba(255,255,255,0.08)",
      }}
    >
      {plan.highlighted && (
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
          style={{
            background: "linear-gradient(135deg, #7c3aed, #a855f7)",
            color: "white",
          }}
        >
          Najpopularniejszy
        </div>
      )}

      <div className="mb-6">
        <h3
          className="text-xl font-bold text-white mb-2"
          style={{ fontFamily: "'Syne', sans-serif" }}
        >
          {plan.name}
        </h3>
        <p
          className="text-xs"
          style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'Outfit', sans-serif" }}
        >
          {plan.description}
        </p>
      </div>

      <div className="mb-6">
        <div className="flex items-baseline gap-1">
          <span
            className="text-4xl font-bold text-white"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            {plan.price}
          </span>
          <span
            className="text-sm"
            style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'Outfit', sans-serif" }}
          >
            {plan.period}
          </span>
        </div>
      </div>

      <div className="w-8 h-0.5 mb-6" style={{ background: "#a855f7" }} />

      <div className="flex flex-col gap-3 mb-8">
        {plan.features.map((feature) => (
          <div key={feature} className="flex items-start gap-3">
            <Check
              size={16}
              style={{ color: "#a855f7", flexShrink: 0, marginTop: "2px" }}
            />
            <span
              className="text-sm"
              style={{ color: "rgba(255,255,255,0.6)", fontFamily: "'Outfit', sans-serif" }}
            >
              {feature}
            </span>
          </div>
        ))}
      </div>

      <button
        onClick={() => {
          const el = document.querySelector("#kontakt");
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }}
        className={`w-full py-3 rounded-lg font-medium text-sm flex items-center justify-center gap-2 transition-all ${
          plan.highlighted ? "btn-violet" : ""
        }`}
        style={
          !plan.highlighted
            ? {
                background: "rgba(124,58,237,0.1)",
                color: "#c084fc",
                border: "1px solid rgba(124,58,237,0.3)",
                fontFamily: "'Outfit', sans-serif",
              }
            : {}
        }
      >
        <span>{plan.cta}</span>
        <ArrowRight size={14} />
      </button>
    </motion.div>
  );
}

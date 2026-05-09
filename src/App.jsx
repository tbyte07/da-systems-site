import { Fragment, useEffect, useRef } from "react";
import { Button } from "./components/ui/button";
import { Badge } from "./components/ui/badge";
import { Separator } from "./components/ui/separator";
import ColorBends from "./components/ColorBends";
import HorizontalScroll from "./components/HorizontalScroll";
import "./index.css";

// ── Scroll Reveal ──────────────────────────────────────────────────────────
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal, .reveal-right, .reveal-left");
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.15 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

// ── Icons ──────────────────────────────────────────────────────────────────
function IconHeadache() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 12h.01M15 12h.01M12 2a8 8 0 0 1 7.94 9h.06a2 2 0 0 1 0 4h-1a8 8 0 0 1-13.88 0H4a2 2 0 0 1 0-4h.06A8 8 0 0 1 12 2z"/>
    </svg>
  );
}
function IconTarget() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>
    </svg>
  );
}
function IconBolt() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
    </svg>
  );
}
function IconSave() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2"/>
      <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2M12 12v5M10 14h4"/>
    </svg>
  );
}
function IconDown() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M6 2v8M2 7l4 4 4-4"/>
    </svg>
  );
}

// ── Data ───────────────────────────────────────────────────────────────────
const contextItems = [
  "Deine Daten sind überall verteilt",
  "KPIs zu tracken ist aufwendig und dauert lange",
  "Kein Blick über wichtige Zahlen und musst schätzen.",
  "Mitarbeiter verschwenden Zeit mit Datenanalyse",
  "Du hast Datenanalyse Mitarbeiter, die dich viel Geld kosten.",
];

const vorteile = [
  { icon: <IconHeadache />, text: "Null operativer Aufwand für dich." },
  { icon: <IconTarget />,   text: "Du vermeidest falsche KI Implementierung." },
  { icon: <IconBolt />,     text: "Wir nutzen unsere Systeme selbst." },
  { icon: <IconSave />,     text: "Du sparst Zeit, Geld und Nerven." },
];

const phasen = [
  {
    label: "01 · Crawl",
    title: "Crawl",
    subtitle: "Anfang der KI Implementierung.",
    desc: "Wir starten mit einem klar abgegrenzten Anwendungsfall. Reporting, Dashboard oder Datenbereinigung.",
    outputs: ["Reporting & Dashboards", "Datenbereinigung", "Erste Ad-hoc-Analysen"],
  },
  {
    label: "02 · Walk",
    title: "Walk",
    subtitle: "KI übernimmt mehr.",
    desc: "Deine Datenquellen laufen zentral zusammen. KI bekommt mehr Einblick und übernimmt Analyse-Aufgaben.",
    outputs: ["Single Source of Truth", "Systematische KPI-Berechnung", "KI-gestützte Analysen"],
  },
  {
    label: "03 · Run",
    title: "Run",
    subtitle: "KI ist fester Bestandteil.",
    desc: "Multi-Agent-Systeme laufen eigenständig. Geplant, ereignisgesteuert, ohne manuelle Auslösung.",
    outputs: ["Anomalie-Erkennung", "Automatisierte Reports", "Proaktive Insights"],
  },
];

// ── App ────────────────────────────────────────────────────────────────────
export default function App() {
  useReveal();
  const vorteileSlowRef = useRef(null);

  useEffect(() => {
    const section = vorteileSlowRef.current;
    if (!section) return;
    const onScroll = () => {
      const top = section.getBoundingClientRect().top;
      const scrollable = section.offsetHeight - window.innerHeight;
      const progress = Math.max(0, Math.min(1, -top / scrollable));
      // Each card gets its own scroll zone: enterAt → card slides in, centerAt → green pulse
      const ZONES = [0.04, 0.30, 0.56, 0.82].map(t => ({ enterAt: t, centerAt: t + 0.01 }));
      const cards = section.querySelectorAll(".vorteil-card");
      cards.forEach((card, i) => {
        const zone = ZONES[i];
        if (!zone) return;
        if (progress >= zone.enterAt && !card.classList.contains("visible")) {
          card.classList.add("visible");
        }
        if (progress >= zone.centerAt && !card.dataset.pulsed) {
          card.dataset.pulsed = "1";
          card.classList.remove("pulse-green");
          void card.offsetWidth;
          card.classList.add("pulse-green");
        }
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="relative bg-black text-white" style={{ fontFamily: "'Figtree', Inter, sans-serif" }}>

      {/* ── Global glow layer ───────────────────────────────────────────── */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div style={{ position: "absolute", top: "10%",  left: "-10%",  width: 700, height: 700, background: "radial-gradient(circle, rgba(58,136,254,0.18) 0%, transparent 60%)", filter: "blur(40px)" }} />
        <div style={{ position: "absolute", top: "30%",  right: "-12%", width: 650, height: 650, background: "radial-gradient(circle, rgba(55,26,148,0.22) 0%, transparent 60%)",  filter: "blur(40px)" }} />
        <div style={{ position: "absolute", top: "58%",  left: "5%",    width: 600, height: 600, background: "radial-gradient(circle, rgba(138,149,255,0.14) 0%, transparent 60%)", filter: "blur(40px)" }} />
        <div style={{ position: "absolute", top: "78%",  right: "0%",   width: 600, height: 600, background: "radial-gradient(circle, rgba(58,136,254,0.16) 0%, transparent 60%)",  filter: "blur(40px)" }} />
      </div>

      {/* ── Nav ────────────────────────────────────────────────────────── */}
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-48px)] max-w-[960px]">
        <nav className="flex items-center justify-between px-5 py-3 rounded-full bg-black/70 border border-white/[0.08] backdrop-blur-xl">
          <a href="#" className="flex items-center gap-2.5 no-underline text-white">
            <img src="/logo.png" alt="DA Systems" className="h-7 w-auto brightness-0 invert" />
            <span className="font-display text-[14px] whitespace-nowrap">DA Systems</span>
          </a>

          <ul className="hidden md:flex items-center gap-8 list-none m-0 p-0">
            {[["#context","Das Problem"],["#dienst","Die Lösung"],["#vorteile","Vorteile"]].map(([href, label]) => (
              <li key={href}>
                <a href={href} className="text-[14px] text-white/50 no-underline hover:text-white transition-colors">{label}</a>
              </li>
            ))}
          </ul>

          <Button variant="nav" size="sm" asChild>
            <a href="https://form.typeform.com/to/CDaQjC50" target="_blank" rel="noopener noreferrer">Jetzt loslegen</a>
          </Button>
        </nav>
      </div>

      {/* ── Hero ───────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden text-center" id="hero">
        {/* ColorBends background */}
        <div className="absolute inset-0 z-0">
          <ColorBends
            rotation={45}
            speed={0.2}
            colors={["#002e7a","#371a94","#3a88fe"]}
            transparent
            autoRotate={0}
            scale={1}
            frequency={1}
            warpStrength={1}
            mouseInfluence={1}
            parallax={0.5}
            noise={0.1}
          />
        </div>

        {/* Vignette + bottom fade to black */}
        <div
          className="absolute inset-0 z-[1] pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at center, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.6) 100%)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 right-0 z-[2] pointer-events-none"
          style={{ height: "220px", background: "linear-gradient(to bottom, transparent, #000)" }}
        />

        {/* Content */}
        <div className="relative z-10 px-6 pt-16 md:pt-32 pb-24 max-w-[920px] mx-auto flex flex-col items-center">
          <div className="animate-fade-up-1">
            <Badge className="mb-8">
              <span
                className="w-1.5 h-1.5 rounded-full bg-[#8a95ff] animate-pulse-dot"
                style={{ boxShadow: "0 0 8px #8a95ff" }}
              />
              <span className="uppercase tracking-[0.1em] text-[10px] text-white/50">Datenanalyse & Wachstum</span>
              <span className="font-display text-[10px] text-[#8a95ff]">für Unternehmen</span>
            </Badge>
          </div>

          <h1 className="animate-fade-up-2 text-[clamp(34px,5vw,68px)] font-normal leading-[1.07] tracking-[-0.025em] mb-5">
            Wir machen deine<br /><span className="font-display">Datenanalyse und KI.</span>
          </h1>

          <p className="animate-fade-up-3 text-[clamp(17px,1.4vw,21px)] text-white/75 mb-10 leading-relaxed max-w-[520px]">
            Du übergibst die Aufgabe. Das Ergebnis kommt zur vereinbarten Zeit.
          </p>

          <div className="animate-fade-up-4 flex flex-wrap justify-center gap-3">
            <Button variant="default" asChild>
              <a href="https://form.typeform.com/to/CDaQjC50" target="_blank" rel="noopener noreferrer">Jetzt starten</a>
            </Button>
            <Button variant="ghost" asChild>
              <a href="#dienst">Was wir machen</a>
            </Button>
          </div>
        </div>

        <div className="animate-fade-up-5 absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 text-[12px] text-white/35 z-10">
          <span>Scroll</span>
          <span className="flex items-center justify-center w-7 h-7 rounded-full border border-white/10 animate-scroll-bounce">
            <IconDown />
          </span>
        </div>
      </section>

      {/* ── Context ────────────────────────────────────────────────────── */}
      <section id="context" className="relative z-10">
        {/* Top fade from hero */}
        <div className="pointer-events-none absolute top-0 left-0 right-0 z-20" style={{ height: 180, background: "linear-gradient(to bottom, #000 0%, transparent 100%)" }} />

        <HorizontalScroll
          endText={
            <p style={{ fontSize: "clamp(28px, 3.5vw, 52px)", fontWeight: 700, lineHeight: 1.3, textAlign: "center", color: "#fff" }}>
              Diese Sorgen sind von gestern,<br />
              <span style={{ fontFamily: "'Dela Gothic One', sans-serif", color: "#8a95ff" }}>Heute</span>{" "}
              kümmert sich{" "}
              <span style={{ fontFamily: "'Dela Gothic One', sans-serif", color: "#8a95ff" }}>DA Systems</span>{" "}
              darum.
            </p>
          }
          headline={
          <div>
            <p className="text-[11px] tracking-[0.14em] uppercase text-[#8a95ff] mb-4">Das Problem</p>
            <h2 className="text-[clamp(36px,4vw,64px)] font-normal tracking-[-0.03em] leading-tight">
              Erkennst du dich <span className="font-display text-[#8a95ff]">darin?</span>
            </h2>
          </div>
        }>
          {contextItems.map((text, i) => (
            <div key={i} className="h-card">
              <p className="h-card-text">{text}</p>
            </div>
          ))}
        </HorizontalScroll>
      </section>

      {/* ── Dienstleistung ─────────────────────────────────────────────── */}
      <section id="dienst" className="relative z-10 py-16 md:py-24 px-8 md:px-16 overflow-hidden">

        <div className="relative max-w-6xl mx-auto">
          <div className="reveal text-center mb-10 md:mb-14">
            <p className="text-[11px] tracking-[0.14em] uppercase text-[#8a95ff] mb-4">Die Lösung</p>
            <h2 className="text-[clamp(32px,4vw,56px)] font-normal tracking-[-0.02em] text-white leading-tight">
              Wir bringen KI in dein Unternehmen.<br />
              <span className="text-white/85">Mit Köpfchen und Methode.</span>
            </h2>
          </div>

          {/* Desktop: 3 phases horizontally with arrows between */}
          <div className="hidden md:flex items-stretch justify-center gap-0">
            {phasen.map((p, i) => (
              <Fragment key={p.title}>
                <div className="reveal phase-card flex-1" style={{ transitionDelay: `${i * 150}ms` }}>
                  <div className="phase-accent" />
                  <p className="phase-label">{p.label}</p>
                  <h3 className="phase-title">{p.title}</h3>
                  <p className="phase-subtitle">{p.subtitle}</p>
                  <p className="phase-desc">{p.desc}</p>
                  <div className="phase-divider" />
                  <p className="phase-outputs-label">Was du bekommst</p>
                  <ul className="phase-outputs">
                    {p.outputs.map((o) => (
                      <li key={o}>
                        <span className="phase-output-dot" aria-hidden="true" />
                        {o}
                      </li>
                    ))}
                  </ul>
                </div>
                {i < phasen.length - 1 && (
                  <div className="phase-connector phase-connector-h reveal" style={{ transitionDelay: `${i * 150 + 75}ms` }} aria-hidden="true">
                    <svg width="48" height="14" viewBox="0 0 48 14" fill="none">
                      <line x1="0" y1="7" x2="38" y2="7" stroke="rgba(138,149,255,0.45)" strokeWidth="1" strokeDasharray="3 3" />
                      <polygon points="38,2 38,12 46,7" fill="rgba(138,149,255,0.6)" />
                    </svg>
                  </div>
                )}
              </Fragment>
            ))}
          </div>

          {/* Mobile: vertical stack with arrows between */}
          <div className="md:hidden flex flex-col">
            {phasen.map((p, i) => (
              <Fragment key={p.title}>
                <div className="reveal phase-card" style={{ transitionDelay: `${i * 150}ms` }}>
                  <div className="phase-accent" />
                  <p className="phase-label">{p.label}</p>
                  <h3 className="phase-title">{p.title}</h3>
                  <p className="phase-subtitle">{p.subtitle}</p>
                  <p className="phase-desc">{p.desc}</p>
                  <div className="phase-divider" />
                  <p className="phase-outputs-label">Was du bekommst</p>
                  <ul className="phase-outputs">
                    {p.outputs.map((o) => (
                      <li key={o}>
                        <span className="phase-output-dot" aria-hidden="true" />
                        {o}
                      </li>
                    ))}
                  </ul>
                </div>
                {i < phasen.length - 1 && (
                  <div className="phase-connector phase-connector-v" aria-hidden="true">
                    <svg width="14" height="40" viewBox="0 0 14 40" fill="none">
                      <line x1="7" y1="0" x2="7" y2="30" stroke="rgba(138,149,255,0.45)" strokeWidth="1" strokeDasharray="3 3" />
                      <polygon points="2,30 12,30 7,38" fill="rgba(138,149,255,0.6)" />
                    </svg>
                  </div>
                )}
              </Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* ── Vorteile ───────────────────────────────────────────────────── */}
      <section id="vorteile" className="relative z-10">
        {/* Slow-scroll zone: tall container, sticky content */}
        <div ref={vorteileSlowRef} className="vorteile-slow">
          <div style={{ position: "sticky", top: 0, height: "100vh", display: "flex", alignItems: "center", padding: "0 2rem" }}>
            <div className="w-full max-w-5xl mx-auto pt-20 md:pt-0">
              <p className="text-[11px] tracking-[0.14em] uppercase text-[#8a95ff] mb-4 text-center">Deine Vorteile</p>
              <h2 className="text-[clamp(24px,2.5vw,38px)] font-normal tracking-[-0.02em] leading-tight mb-10 text-center">
                Was du erhälst, mit uns als{" "}
                <span className="font-display text-[#8a95ff]">Partner</span>
              </h2>
              <div className="flex flex-col gap-4">
                {vorteile.map((v, i) => (
                  <div
                    key={i}
                    className={`vorteil-card ${i % 2 === 0 ? "from-right" : "from-left"}`}
                  >
                    <p className="text-[clamp(18px,1.8vw,24px)] font-medium text-white/90 leading-snug">{v.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────────────── */}
      <section id="cta" className="relative z-10 py-28 px-8 md:px-16 text-center">

        <div className="relative z-10 max-w-[640px] mx-auto">
          <div className="reveal flex justify-center mb-8">
            <Badge variant="success">
              <span
                className="w-2 h-2 rounded-full bg-emerald-400 flex-shrink-0"
                style={{ boxShadow: "0 0 8px #4ade80" }}
              />
              <span className="text-white/55">Ab nächster Woche sind wieder</span>
              <span className="text-white font-semibold">2 Plätze frei</span>
            </Badge>
          </div>

          <h2 className="reveal text-[clamp(26px,3.5vw,48px)] font-normal tracking-[-0.02em] leading-tight mb-5">
            Sichere dir deine Schmerzmittel, gegen deine{" "}
            <span className="font-display text-[#8a95ff]">Kopfschmerzen</span>{" "}
            von Datenanalyse.
          </h2>

          <p className="reveal text-[16px] text-white/50 mb-10 leading-relaxed">
            Kontaktiere uns oder buch dir direkt ein Meeting.
          </p>

          <div className="reveal flex flex-wrap justify-center gap-4">
            <Button variant="accent" size="lg" asChild>
              <a href="https://form.typeform.com/to/CDaQjC50" target="_blank" rel="noopener noreferrer">Jetzt loslegen</a>
            </Button>
            <Button variant="ghost" size="lg" asChild>
              <a href="mailto:hello@da-systems.de">Kontakt aufnehmen</a>
            </Button>
          </div>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────────────────── */}
      <Separator className="relative z-10" />
      <footer className="relative z-10 px-8 md:px-16 py-7 flex flex-col md:flex-row items-center justify-between gap-3">
        <span className="font-display text-[13px] text-white/35">DA Systems</span>
        <span className="text-[12px] text-white/20">&copy; 2026 DA Systems. Alle Rechte vorbehalten.</span>
      </footer>
    </div>
  );
}

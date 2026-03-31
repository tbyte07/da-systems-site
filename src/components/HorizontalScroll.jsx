import { useEffect, useRef } from "react";

export default function HorizontalScroll({ children, headline, endText, className = "" }) {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const rightPanelRef = useRef(null);
  const endTextRef = useRef(null);
  const leftPanelRef = useRef(null);
  const blurRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    const rightPanel = rightPanelRef.current;
    if (!section || !track || !rightPanel) return;

    let ticking = false;

    const init = () => {
      const panelWidth = rightPanel.clientWidth;
      const totalCardsWidth = track.scrollWidth;
      // Extra travel so end text stays visible longer
      const travelDistance = totalCardsWidth + panelWidth * 2;
      section.style.height = `${travelDistance + window.innerHeight}px`;
    };

    const update = () => {
      const top = section.getBoundingClientRect().top;
      const sectionHeight = section.offsetHeight;
      const windowHeight = window.innerHeight;
      const panelWidth = rightPanel.clientWidth;
      const totalCardsWidth = track.scrollWidth;
      const travelDistance = totalCardsWidth + panelWidth * 2;

      const scrolled = -top;
      const scrollable = sectionHeight - windowHeight;
      const progress = Math.min(1, Math.max(0, scrolled / scrollable));

      const offset = panelWidth - progress * travelDistance;
      track.style.transform = `translate3d(${offset}px, 0, 0)`;

      // Headline fades out: 0.60 → 0.72
      if (leftPanelRef.current) {
        const outProgress = Math.min(1, Math.max(0, (progress - 0.60) / 0.12));
        leftPanelRef.current.style.opacity = 1 - outProgress;
        leftPanelRef.current.style.transform = `translateY(${outProgress * -20}px)`;
      }

      // End text fades in: 0.78 → 0.90
      if (endTextRef.current) {
        const endProgress = Math.min(1, Math.max(0, (progress - 0.78) / 0.12));
        endTextRef.current.style.opacity = endProgress;
        endTextRef.current.style.transform = `translateY(${(1 - endProgress) * 28}px)`;
      }

      // Blur fades out: 0.55 → 0.72 (fully gone before end text appears)
      if (blurRef.current) {
        const blurOut = Math.min(1, Math.max(0, (progress - 0.55) / 0.17));
        blurRef.current.style.opacity = 1 - blurOut;
      }

      // Highlight card closest to center of right panel
      const panelCenter = panelWidth / 2;
      const cards = track.querySelectorAll(".h-card");
      let closestCard = null;
      let closestDist = Infinity;

      cards.forEach((card) => {
        const cardLeft = card.offsetLeft + offset;
        const cardCenter = cardLeft + card.offsetWidth / 2;
        const dist = Math.abs(cardCenter - panelCenter);
        if (dist < closestDist) {
          closestDist = dist;
          closestCard = card;
        }
      });

      cards.forEach((card) => card.classList.remove("h-card--active"));
      if (closestCard && closestDist < closestCard.offsetWidth * 0.65) {
        closestCard.classList.add("h-card--active");
      }

      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    };

    init();
    requestAnimationFrame(update);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", init, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", init);
    };
  }, []);

  return (
    <div ref={sectionRef} className={`horizontal-scroll-section ${className}`}>
      <div className="horizontal-scroll-sticky">

        {/* Left: Headline pinned */}
        <div ref={leftPanelRef} className="hs-left">
          {headline}
        </div>

        {/* Right: Cards track */}
        <div ref={rightPanelRef} className="hs-right">
          <div ref={trackRef} className="horizontal-scroll-track">
            {children}
          </div>
          <div ref={blurRef} style={{ position: "absolute", left: 0, top: 0, width: 180, height: "100%", background: "linear-gradient(to right, #000 0%, transparent 100%)", pointerEvents: "none", zIndex: 2 }} />
        </div>

        {/* End text: full-width overlay centered over entire sticky area */}
        {endText && (
          <div
            ref={endTextRef}
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              opacity: 0,
              pointerEvents: "none",
              padding: "0 10%",
            }}
          >
            {endText}
          </div>
        )}

      </div>
    </div>
  );
}

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
    let activeCard = null;

    const cache = {
      panelWidth: 0,
      totalCardsWidth: 0,
      travelDistance: 0,
      sectionHeight: 0,
      windowHeight: 0,
      scrollable: 0,
      panelCenter: 0,
      cards: [],
    };

    const init = () => {
      cache.panelWidth = rightPanel.clientWidth;
      cache.totalCardsWidth = track.scrollWidth;
      cache.travelDistance = cache.totalCardsWidth + cache.panelWidth * 2;
      cache.windowHeight = window.innerHeight;
      cache.panelCenter = cache.panelWidth / 2;
      section.style.height = `${cache.travelDistance + cache.windowHeight}px`;
      cache.sectionHeight = section.offsetHeight;
      cache.scrollable = cache.sectionHeight - cache.windowHeight;
      cache.cards = Array.from(track.querySelectorAll(".h-card")).map((el) => ({
        el,
        offsetLeft: el.offsetLeft,
        offsetWidth: el.offsetWidth,
        halfWidth: el.offsetWidth / 2,
      }));
    };

    const update = () => {
      const top = section.getBoundingClientRect().top;
      const scrolled = -top;
      const progress = Math.min(1, Math.max(0, scrolled / cache.scrollable));

      const offset = cache.panelWidth - progress * cache.travelDistance;
      track.style.transform = `translate3d(${offset}px, 0, 0)`;

      if (leftPanelRef.current) {
        const outProgress = Math.min(1, Math.max(0, (progress - 0.60) / 0.12));
        leftPanelRef.current.style.opacity = 1 - outProgress;
        leftPanelRef.current.style.transform = `translateY(${outProgress * -20}px)`;
      }

      if (endTextRef.current) {
        const endProgress = Math.min(1, Math.max(0, (progress - 0.78) / 0.12));
        endTextRef.current.style.opacity = endProgress;
        endTextRef.current.style.transform = `translateY(${(1 - endProgress) * 28}px)`;
      }

      if (blurRef.current) {
        const blurOut = Math.min(1, Math.max(0, (progress - 0.55) / 0.17));
        blurRef.current.style.opacity = 1 - blurOut;
      }

      let closest = null;
      let closestDist = Infinity;
      for (const c of cache.cards) {
        const dist = Math.abs(c.offsetLeft + offset + c.halfWidth - cache.panelCenter);
        if (dist < closestDist) {
          closestDist = dist;
          closest = c;
        }
      }
      const newActive = closest && closestDist < closest.offsetWidth * 0.65 ? closest.el : null;
      if (newActive !== activeCard) {
        if (activeCard) activeCard.classList.remove("h-card--active");
        if (newActive) newActive.classList.add("h-card--active");
        activeCard = newActive;
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

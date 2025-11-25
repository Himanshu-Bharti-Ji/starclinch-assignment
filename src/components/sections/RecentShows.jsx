// src/components/sections/RecentShows.jsx
import React, { useEffect, useRef, useState } from "react";
import FadedHeading from "../ui/FadedHeading";
import { RECENT_SHOWS } from "../../utils/staticData";

const AUTOPLAY_MS = 4200;
const TRANSITION_MS = 650;

export default function RecentShows() {
  const [current, setCurrent] = useState(0); // yaha active slide track kar raha hu
  const [pos, setPos] = useState(0); // slider ka actual position
  const [isPaused, setPaused] = useState(false); // hover par pause wala logic

  const timerRef = useRef(null); // autoplay timer ref
  const trackRef = useRef(null); // slide track ref
  const animatingRef = useRef(false); // ek time me ek hi animation chale

  const ribbonTLRef = useRef(null); // top-left ribbon ref
  const ribbonBRRef = useRef(null); // bottom-right ribbon ref

  const duplicated = [...RECENT_SHOWS, ...RECENT_SHOWS]; // infinite loop feel ke liye double list
  const baseCount = RECENT_SHOWS.length;

  useEffect(() => {
    startAutoplay();
    return stopAutoplay;
  }, [pos, isPaused]);

  function startAutoplay() {
    stopAutoplay();
    if (isPaused || RECENT_SHOWS.length <= 1) return;
    timerRef.current = setInterval(() => {
      handleNext(); // next slide move
    }, AUTOPLAY_MS);
  }

  function stopAutoplay() {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const slidePct = 100 / duplicated.length;
    const target = -(pos * slidePct);

    animatingRef.current = true;

    track.style.transition = `transform ${TRANSITION_MS}ms cubic-bezier(.22,.9,.28,1)`;
    track.style.transform = `translateX(${target}%)`;

    const onEnd = () => {
      animatingRef.current = false;

      // loop reset logic
      if (pos >= baseCount) {
        const resetPos = pos - baseCount;
        track.style.transition = "none";
        track.style.transform = `translateX(${-(resetPos * slidePct)}%)`;
        setTimeout(() => setPos(resetPos), 20);
      }

      if (pos < 0) {
        const mirror = (pos + baseCount) % baseCount;
        track.style.transition = "none";
        const mirroredPos = mirror + baseCount;
        track.style.transform = `translateX(${-(mirroredPos * slidePct)}%)`;
        setTimeout(() => setPos(mirror), 20);
      }

      track.removeEventListener("transitionend", onEnd);
    };

    track.addEventListener("transitionend", onEnd);

    const fallback = setTimeout(() => {
      animatingRef.current = false;
      try {
        track.removeEventListener("transitionend", onEnd);
      } catch (e) {}
    }, TRANSITION_MS + 50);

    return () => {
      clearTimeout(fallback);
      if (track) track.removeEventListener("transitionend", onEnd);
    };
  }, [pos]);

  useEffect(() => {
    setCurrent(((pos % baseCount) + baseCount) % baseCount); // active show update
  }, [pos, baseCount]);

  function handlePrev() {
    if (animatingRef.current) return;
    setPaused(true);

    if (pos === 0) {
      const instantPos = baseCount;
      const track = trackRef.current;
      if (track) {
        const slidePct = 100 / duplicated.length;
        track.style.transition = "none";
        track.style.transform = `translateX(${-(instantPos * slidePct)}%)`;
      }
      setTimeout(() => {
        animatingRef.current = true;
        setPos((p) => instantPos - 1);
      }, 20);
    } else {
      animatingRef.current = true;
      setPos((p) => p - 1);
    }

    setTimeout(() => setPaused(false), AUTOPLAY_MS);
  }

  function handleNext() {
    if (animatingRef.current) return;
    setPaused(true);
    animatingRef.current = true;
    setPos((p) => p + 1); // next move
    setTimeout(() => setPaused(false), AUTOPLAY_MS);
  }

  const onEnter = () => {
    setPaused(true); // mouse enter par pause
    stopAutoplay();
  };

  const onLeave = () => {
    setPaused(false); // mouse leave par resume
    startAutoplay();
  };

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    track.style.transition = "none"; // initial reset
    track.style.transform = `translateX(0%)`;
  }, []);

  return (
    <section className="w-full py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <h2
          className="text-3xl sm:text-4xl lg:text-5xl text-center text-white font-light mb-12 max-w-[600px] pb-3.5 mx-auto"
          style={{ lineHeight: 1.05 }}
        >
          Recent shows made star-studded via StarClinch
        </h2>

        <div
          className="relative flex items-center justify-center gap-8"
          onMouseEnter={onEnter}
          onMouseLeave={onLeave}
        >
          <button
            onClick={handlePrev}
            className="w-12 h-12 rounded-full bg-black/30 flex items-center justify-center"
            style={{
              boxShadow: "0 8px 24px rgba(0,0,0,0.55)",
              border: "1px solid rgba(255,255,255,0.04)",
              zIndex: 5,
            }}
            aria-label="Previous"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M15 18L9 12L15 6"
                stroke="#fff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <div style={{ width: 480, minWidth: 280 }} className="relative z-0">
            <div
              style={{
                width: "100%",
                height: 520,
                overflow: "hidden",
                borderTopLeftRadius: 260,
                borderTopRightRadius: 260,
                borderBottomLeftRadius: 8,
                borderBottomRightRadius: 8,
                boxShadow: "inset 0 -40px 60px rgba(0,0,0,0.5)",
                background:
                  "linear-gradient(180deg, rgba(0,0,0,0.03), rgba(0,0,0,0))",
              }}
            >
              <div
                ref={trackRef}
                style={{
                  display: "flex",
                  width: `${duplicated.length * 100}%`,
                  height: "100%",
                }}
              >
                {duplicated.map((item, idx) => (
                  <div
                    key={`dup-${idx}-${item.id}`}
                    style={{
                      width: `${100 / duplicated.length}%`,
                      height: "100%",
                      flexShrink: 0,
                    }}
                  >
                    <img
                      src={item.img}
                      alt={item.title}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block",
                        filter: "brightness(.94)",
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div style={{ width: 440, maxWidth: "44%" }} className="relative z-0">
            {RECENT_SHOWS.map((item, i) => {
              const active = i === ((pos % baseCount) + baseCount) % baseCount;
              return (
                <div
                  key={item.id}
                  style={{
                    transition: "opacity .5s ease, transform .5s ease",
                    opacity: active ? 1 : 0,
                    transform: active ? "translateY(0)" : "translateY(10px)",
                    position: active ? "relative" : "absolute",
                    left: 0,
                    top: 0,
                  }}
                >
                  <FadedHeading
                    text={item.title}
                    fadedWords={item.fadedTexts}
                    width="420px"
                  />
                  <div
                    style={{
                      marginTop: 22,
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      color: "rgba(148,155,165,0.85)",
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M8 7V3M16 7V3M3 11H21M5 21H19C20.1046 21 21 20.1046 21 19V11H3V19C3 20.1046 3.89543 21 5 21Z"
                        stroke="currentColor"
                        strokeWidth="1.1"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span style={{ fontSize: 14 }}>{item.date}</span>
                  </div>
                </div>
              );
            })}
          </div>

          <button
            onClick={handleNext}
            className="w-12 h-12 rounded-full cursor-pointer bg-black/30 flex items-center justify-center"
            style={{
              boxShadow: "0 8px 24px rgba(0,0,0,0.55)",
              border: "1px solid rgba(255,255,255,0.04)",
              zIndex: 5,
            }}
            aria-label="Next"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M9 6L15 12L9 18"
                stroke="#fff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}

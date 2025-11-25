import React, { useEffect, useRef, useState } from "react";

const Slider = ({ items = [], type = "photos", autoplayInterval }) => {
  const containerRef = useRef(null);
  const trackRef = useRef(null);

  const [index, setIndex] = useState(0);
  const [isPaused, setPaused] = useState(false);

  const [modalVideo, setModalVideo] = useState(null);

  const duplicated = [...items, ...items];
  const baseCount = items.length;

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const slide = track.querySelector("[data-slide]");
    if (!slide) return;

    const rect = slide.getBoundingClientRect();
    const move = (rect.width + 16) * index;

    track.style.transition = "transform 480ms cubic-bezier(0.4, 0, 0.2, 1)";
    track.style.transform = `translateX(${-move}px)`;

    if (index >= baseCount) {
      const onEnd = () => {
        track.style.transition = "none";
        const resetIndex = index - baseCount;
        const resetMove = (rect.width + 16) * resetIndex;
        track.style.transform = `translateX(${-resetMove}px)`;
        setTimeout(() => setIndex(resetIndex), 20);
        track.removeEventListener("transitionend", onEnd);
      };
      track.addEventListener("transitionend", onEnd);
    }
  }, [index, baseCount]);

  useEffect(() => {
    if (isPaused || items.length <= 1) return;
    const t = setInterval(() => setIndex((s) => s + 1), autoplayInterval);
    return () => clearInterval(t);
  }, [isPaused, items, autoplayInterval]);

  const pages = items.map((_, i) => i);

  function slideWidth() {
    if (typeof window === "undefined") return "300px";
    if (window.innerWidth >= 1280) return "calc(25% - 12px)";
    if (window.innerWidth >= 1024) return "calc(33.333% - 12px)";
    if (window.innerWidth >= 768) return "calc(45% - 12px)";
    return "calc(90% - 12px)";
  }

  const renderSlide = (src, i) => {
    const w = slideWidth();
    if (type === "photos") {
      return (
        <div
          key={i}
          data-slide
          className="shrink-0 rounded-xl overflow-hidden mr-4"
          style={{ width: w, height: 260 }}
        >
          <img
            src={src}
            className="w-full h-full object-cover"
            alt={`Gallery ${i + 1}`}
            loading="lazy"
          />
        </div>
      );
    }

    return (
      <div
        key={i}
        data-slide
        onClick={() => setModalVideo(src)}
        className="shrink-0 rounded-xl overflow-hidden mr-4 cursor-pointer transition-transform hover:scale-[1.02]"
        style={{ width: w, height: 260 }}
      >
        <video
          src={src}
          muted
          preload="metadata"
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
    );
  };

  return (
    <>
      <div
        ref={containerRef}
        className="overflow-hidden"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div ref={trackRef} className="flex items-stretch">
          {duplicated.map((s, i) => renderSlide(s, i))}
        </div>
      </div>

      <div className="flex justify-center gap-3 mt-6">
        {pages.map((p) => {
          const active = index % baseCount === p;
          return (
            <button
              key={p}
              onClick={() => setIndex(p)}
              className="rounded-md transition-all"
              style={{
                height: 10,
                width: active ? 60 : 40,
                background: active ? "#fff" : "rgba(255,255,255,0.18)",
              }}
            />
          );
        })}
      </div>

      {modalVideo && (
        <div
          className="fixed inset-0 flex items-center justify-center z-9999"
          onClick={() => setModalVideo(null)}
          style={{
            backdropFilter: "blur(6px)",
            background: "rgba(0,0,0,0.55)",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "min(640px, 92%)",
              maxHeight: "60vh",
              background: "rgba(15,15,18,0.95)",
              padding: 12,
              borderRadius: 12,
              boxShadow: "0 18px 55px rgba(0,0,0,0.5)",
            }}
          >
            <video
              src={modalVideo}
              autoPlay
              controls
              style={{ width: "100%", maxHeight: "50vh", borderRadius: 8 }}
            />
            <div className="flex justify-end mt-3">
              <button
                onClick={() => setModalVideo(null)}
                className="text-white px-4 py-1.5 rounded-md"
                style={{ background: "rgba(255,255,255,0.08)", fontSize: 14 }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Slider;

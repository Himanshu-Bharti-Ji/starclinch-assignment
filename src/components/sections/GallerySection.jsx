import React, { useState } from "react";
import { GALLERY_IMAGES, GALLERY_VIDEOS } from "../../utils/staticData";
import TabButton from "../ui/TabButton";
import Slider from "../ui/Slider";

const AUTOPLAY_INTERVAL = 1800;

export default function GallerySection() {
  const [tab, setTab] = useState("photos");

  return (
    <section className="w-full relative mt-[-600px]">
      <div
        className="container mx-auto px-6 relative z-10 pt-60 overflow-y-clip"
        style={{ paddingBottom: "80px" }}
      >
        {/* background circle ka design setup */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            left: "50%",
            top: "0",
            transform: "translateX(-50%)",
            width: "98vw",
            height: "220vh",
            borderRadius: "100%",
            border: "2px solid #201f34",
            boxShadow:
              "inset 0 40px 80px rgba(0,0,0,0.8), inset 0 20px 40px rgba(0,0,0,0.6)",
            zIndex: 0,
            pointerEvents: "none",
          }}
        />

        <div className="flex flex-col items-center gap-8">
          {/* tabs switch karne ka UI */}
          <div
            style={{
              background: "linear-gradient(180deg, #181820 0%, #0f0f14 100%)",
              boxShadow: "0 8px 30px rgba(0,0,0,0.6)",
              borderRadius: 9999,
              padding: 8,
              display: "inline-flex",
              gap: 10,
            }}
          >
            <TabButton
              active={tab === "photos"}
              onClick={() => setTab("photos")}
            >
              Photos
            </TabButton>
            <TabButton
              active={tab === "videos"}
              onClick={() => setTab("videos")}
            >
              Videos
            </TabButton>
          </div>

          {/* gallery slider yaha load ho raha */}
          <div className="w-full max-w-6xl">
            <Slider
              key={tab}
              items={tab === "photos" ? GALLERY_IMAGES : GALLERY_VIDEOS}
              type={tab}
              autoplayInterval={AUTOPLAY_INTERVAL}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

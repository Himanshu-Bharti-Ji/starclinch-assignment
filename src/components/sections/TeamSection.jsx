import React from "react";

export default function TeamSection() {
  return (
    <section className="w-full relative py-24 overflow-hidden ">
      {/* left side purple glow */}
      <div
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/4 w-[600px] h-[600px] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, #7d4b7d 0%, #4a2f4a 50%, transparent 70%)",
          filter: "blur(100px)",
        }}
      />

      {/* right side purple glow */}
      <div
        className="absolute right-0 top-1/4 translate-x-1/4 w-[700px] h-[700px] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, #8b4b7d 0%, #5a3555 50%, transparent 70%)",
          filter: "blur(120px)",
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        {/* main content box */}
        <div className="max-w-5xl mx-auto relative">
          {/* outer border look */}
          <div
            className="relative rounded-[80px] p-[2px]"
            style={{
              background:
                "linear-gradient(135deg, rgba(100,100,120,0.3) 0%, rgba(80,80,100,0.15) 50%, rgba(60,60,80,0.3) 100%)",
            }}
          >
            {/* inner blur container */}
            <div
              className="relative rounded-[78px] px-16 py-20"
              style={{
                background: "rgba(15,15,25,0.6)",
                backdropFilter: "blur(40px)",
                WebkitBackdropFilter: "blur(40px)",
              }}
            >
              {/* small badge top-left */}
              <div
                className="absolute top-24 left-32"
                style={{
                  fontSize: "15px",
                  fontFamily: "cursive",
                  color: "#ff69b4",
                  transform: "rotate(-25deg)",
                }}
              >
                we are the team of
                <img
                  className="absolute top-3 left-34 w-6 h-6"
                  src="/images/small-arrow.png"
                  alt="small-arrow"
                />
              </div>

              {/* floating tag 1 */}
              <div className="absolute top-50 left-36">
                <span
                  className="inline-block px-5 py-2 rounded-full text-sm font-medium"
                  style={{
                    background: "rgba(25,25,35,0.9)",
                    color: "#e0e0e0",
                    border: "1px solid rgba(100,100,120,0.4)",
                    transform: "rotate(-22deg)",
                  }}
                >
                  Fun
                </span>
              </div>

              {/* floating tag 2 */}
              <div className="absolute top-20 right-38">
                <span
                  className="inline-block px-5 py-2 rounded-full text-sm font-medium"
                  style={{
                    background: "rgba(25,25,35,0.9)",
                    color: "#e0e0e0",
                    border: "1px solid rgba(100,100,120,0.4)",
                    transform: "rotate(12deg)",
                  }}
                >
                  Inclusive
                </span>
              </div>

              {/* heading */}
              <h2 className="text-6xl md:text-7xl font-bold text-white text-center mb-8 mt-12">
                20+Talented Folks
              </h2>

              {/* small description */}
              <p
                className="text-center text-base max-w-2xl mx-auto mb-10"
                style={{ color: "#b0b0b0", lineHeight: "1.8" }}
              >
                From passion-driven dedication to impactful contribution,
                <br />
                we do it all here. We are growing and will be excited to hear
                <br />
                from you !
              </p>

              {/* join team button */}
              <div className="flex justify-center">
                <button
                  className="group px-8 py-4 rounded-full font-semibold text-white transition-all duration-300 flex items-center gap-2 hover:scale-105"
                  style={{
                    background:
                      "linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)",
                    boxShadow: "0 8px 24px rgba(231,76,60,0.4)",
                  }}
                >
                  Join our team
                  <svg
                    className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>

              {/* bottom keywords */}
              <div className="absolute bottom-10 left-12 right-12">
                <div className="flex justify-between items-center opacity-30">
                  <span className="text-sm text-gray-400">Focused</span>
                  <span className="text-sm text-gray-400">Collaborative</span>
                  <span className="text-sm text-gray-400">United</span>
                  <span className="text-sm text-gray-400">Vibrant</span>
                  <span className="text-sm text-gray-400">Dynamic</span>
                  <span className="text-sm text-gray-400">Motivated</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

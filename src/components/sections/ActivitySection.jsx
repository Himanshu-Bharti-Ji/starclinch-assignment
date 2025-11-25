import React from "react";
import { ACTIVITIES } from "../../utils/staticData";

const ActivitySection = () => {
  return (
    <section className="w-full relative py-40">
      <div className="max-w-6xl mx-auto relative">
        {/* Curve line */}
        <img
          src="/images/curve-line.png"
          alt="curve line"
          className="w-full opacity-35 pointer-events-none select-none"
        />

        {/* Activity Items */}
        {ACTIVITIES.map((item, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              top: item.top,
              left: item.left,
              transform: `rotate(${item.rotate})`,
            }}
          >
            <div className="relative group">
              {/* TEXT */}
              <p
                className="absolute transition-all duration-300 text-gray-600 group-hover:text-white"
                style={{
                  top: "80%",
                  left: "-400px",
                  transform: "rotate(-16deg)",
                  fontSize: "42px",
                  lineHeight: 1.06,
                  maxWidth: "360px",
                  fontWeight: 300,
                }}
              >
                {item.text}
              </p>

              {/* IMAGE */}
              <div className="w-100 h-100 rounded-3xl overflow-hidden transition-all duration-500 ease-in-out hover:scale-110 hover:-rotate-12">
                <img
                  src={item.img}
                  alt=""
                  className="w-full h-full object-cover opacity-70 hover:opacity-100 transition-all duration-300"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ActivitySection;

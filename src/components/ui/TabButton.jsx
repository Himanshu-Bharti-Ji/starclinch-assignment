import React from "react";

const TabButton = ({ children, active, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="rounded-full transition-all duration-300 font-medium select-none"
      style={{
        minWidth: 160,
        padding: "14px 28px",
        cursor: "pointer",
        fontSize: 17,
        color: active ? "#0b0b0b" : "#d7d7d7",
        background: active
          ? "linear-gradient(180deg, #eef0ff 0%, #d9dbea 100%)"
          : "linear-gradient(180deg, #1d1e26 0%, #14151b 100%)",
        boxShadow: active
          ? "0 8px 24px rgba(0,0,0,0.35)"
          : "inset 0 0 0 1px rgba(255,255,255,0.03)",
      }}
    >
      {children}
    </button>
  );
};

export default TabButton;

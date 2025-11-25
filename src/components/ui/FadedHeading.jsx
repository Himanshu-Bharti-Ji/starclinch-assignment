import React from "react";

const FadedHeading = ({
  text = "",
  fadedWords = [],
  size = "lg",
  align = "left",
  width = "auto",
  className = "",
}) => {
  const sizeMap = {
    sm: "text-2xl",
    md: "text-4xl",
    lg: "text-6xl",
    xl: "text-7xl",
  };

  const faded = new Set(fadedWords.map((w) => w.toLowerCase()));
  const words = text.split(/(\s+)/);

  const alignClass =
    align === "center"
      ? "text-center"
      : align === "right"
      ? "text-right"
      : "text-left";

  return (
    <div
      className={`${sizeMap[size]} ${alignClass} text-white font-medium leading-tight ${className}`}
      style={{
        whiteSpace: "normal",
        width: width,
      }}
    >
      {words.map((word, i) => {
        const clean = word.trim().toLowerCase();
        const isSpace = /^\s+$/.test(word);
        if (isSpace) return word;

        return faded.has(clean) ? (
          <span key={i} className="text-gray-500">
            {word}
          </span>
        ) : (
          <span key={i}>{word}</span>
        );
      })}
    </div>
  );
};

export default FadedHeading;

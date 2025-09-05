import React from "react";

// Simple QR Code component using QR.js-like logic
export function QRCodeSVG({ value, size = 200, bgColor = "#ffffff", fgColor = "#000000" }) {
  // Simple QR pattern generator for demo purposes
  const generateQRPattern = (data) => {
    const size = 25; // 25x25 grid for simplicity
    const pattern = [];
    
    // Create a simple pattern based on data hash
    let hash = 0;
    for (let i = 0; i < data.length; i++) {
      hash = ((hash << 5) - hash + data.charCodeAt(i)) & 0xffffffff;
    }
    
    for (let row = 0; row < size; row++) {
      pattern[row] = [];
      for (let col = 0; col < size; col++) {
        // Create finder patterns (corners)
        if ((row < 7 && col < 7) || 
            (row < 7 && col >= size - 7) || 
            (row >= size - 7 && col < 7)) {
          pattern[row][col] = (row === 0 || row === 6 || col === 0 || col === 6 || 
                              (row >= 2 && row <= 4 && col >= 2 && col <= 4)) ? 1 : 0;
        } else {
          // Simple pseudorandom pattern based on position and hash
          pattern[row][col] = ((row * col + hash) % 3) === 0 ? 1 : 0;
        }
      }
    }
    return pattern;
  };

  const pattern = generateQRPattern(value);
  const moduleSize = size / 25;

  return (
    <svg width={size} height={size} className="border">
      <rect width={size} height={size} fill={bgColor} />
      {pattern.map((row, rowIndex) =>
        row.map((module, colIndex) =>
          module ? (
            <rect
              key={`${rowIndex}-${colIndex}`}
              x={colIndex * moduleSize}
              y={rowIndex * moduleSize}
              width={moduleSize}
              height={moduleSize}
              fill={fgColor}
            />
          ) : null
        )
      )}
    </svg>
  );
}
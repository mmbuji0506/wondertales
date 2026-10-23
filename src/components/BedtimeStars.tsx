import React, { useMemo } from "react";

interface BedtimeStarsProps {
  isActive: boolean;
}

export const BedtimeStars: React.FC<BedtimeStarsProps> = ({ isActive }) => {
  const stars = useMemo(() => {
    return Array.from({ length: 48 }).map((_, i) => ({
      id: i,
      left: `${(i * 19.3) % 100}%`,
      top: `${(i * 13.7) % 100}%`,
      size: (i % 3) + 2,
      duration: (i % 4) + 2,
      delay: (i % 5) * 0.4,
    }));
  }, []);

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden transition-opacity duration-1000 opacity-90">
      {/* Deep Midnight Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#090D16] via-[#10172A] to-[#1E1B4B] -z-10" />

      {/* Glowing Crescent Moon in top-right */}
      <div className="absolute top-10 right-12 w-20 h-20 rounded-full shadow-[0_0_60px_rgba(254,240,138,0.35)] opacity-80">
        <svg viewBox="0 0 100 100" className="w-full h-full fill-amber-200">
          <path d="M 50 10 A 40 40 0 1 0 90 50 A 30 30 0 1 1 50 10 Z" />
        </svg>
      </div>

      {/* Twinkling Stars */}
      {stars.map((s) => (
        <div
          key={s.id}
          style={{
            left: s.left,
            top: s.top,
            width: `${s.size}px`,
            height: `${s.size}px`,
            animationDuration: `${s.duration}s`,
            animationDelay: `${s.delay}s`,
          }}
          className="absolute rounded-full bg-yellow-100 animate-pulse opacity-75"
        />
      ))}
    </div>
  );
};

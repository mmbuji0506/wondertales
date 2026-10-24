import React, { useState } from "react";
import {
  playSplashSound,
  playWindBreezeSound,
  playBellChimeSound,
  playBirdChirpSound,
  playDrumBeatSound,
  playHarpStrumSound,
  playMagicWandSound,
  playCampfireCrackleSound,
  playRoarSound,
  playGiggleSound,
  playSparkleSound,
} from "../services/soundEffects";

interface SoundButton {
  id: string;
  name: string;
  icon: string;
  color: string;
  action: () => void;
}

export const StorySoundBoard: React.FC = () => {
  const [activeSoundId, setActiveSoundId] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const sounds: SoundButton[] = [
    {
      id: "wand",
      name: "Magic Sparkle",
      icon: "✨",
      color: "from-amber-400 to-yellow-500",
      action: playMagicWandSound,
    },
    {
      id: "bird",
      name: "Bird Tweet",
      icon: "🐦",
      color: "from-sky-400 to-blue-500",
      action: playBirdChirpSound,
    },
    {
      id: "breeze",
      name: "Wind Breeze",
      icon: "🍃",
      color: "from-emerald-400 to-teal-500",
      action: playWindBreezeSound,
    },
    {
      id: "splash",
      name: "Water Splash",
      icon: "🌊",
      color: "from-cyan-400 to-blue-600",
      action: playSplashSound,
    },
    {
      id: "drum",
      name: "Tribal Drum",
      icon: "🥁",
      color: "from-amber-600 to-orange-700",
      action: playDrumBeatSound,
    },
    {
      id: "harp",
      name: "Harp Strum",
      icon: "🎶",
      color: "from-violet-400 to-purple-600",
      action: playHarpStrumSound,
    },
    {
      id: "bell",
      name: "Temple Bell",
      icon: "🔔",
      color: "from-yellow-400 to-amber-600",
      action: playBellChimeSound,
    },
    {
      id: "fire",
      name: "Warm Fire",
      icon: "🔥",
      color: "from-rose-400 to-red-600",
      action: playCampfireCrackleSound,
    },
    {
      id: "roar",
      name: "Friendly Roar",
      icon: "🦁",
      color: "from-orange-400 to-amber-600",
      action: playRoarSound,
    },
    {
      id: "giggle",
      name: "Sunny Giggle",
      icon: "😄",
      color: "from-pink-400 to-rose-500",
      action: playGiggleSound,
    },
  ];

  const handleTrigger = (s: SoundButton) => {
    setActiveSoundId(s.id);
    s.action();
    setTimeout(() => {
      setActiveSoundId((prev) => (prev === s.id ? null : prev));
    }, 600);
  };

  return (
    <div className="w-full bg-gradient-to-r from-amber-50/90 via-orange-50/80 to-amber-50/90 border border-amber-200/80 rounded-2xl p-2 sm:p-2.5 shadow-xs backdrop-blur-xs">
      <div className="flex items-center justify-between mb-1.5 px-1">
        <div className="flex items-center gap-1.5 text-xs font-['Fredoka'] font-bold text-amber-900">
          <span className="text-base animate-bounce">🪄</span>
          <span>Story Sound FX Wand</span>
          <span className="text-[10px] text-amber-700/80 font-normal hidden sm:inline">
            (Tap to add sound effects while reading!)
          </span>
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-[11px] font-['Fredoka'] text-amber-700 hover:text-amber-900 font-semibold px-2 py-0.5 rounded-lg bg-amber-100/70 hover:bg-amber-200 cursor-pointer"
        >
          {isExpanded ? "Collapse ▴" : "All Sounds ▾"}
        </button>
      </div>

      <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
        {(isExpanded ? sounds : sounds.slice(0, 6)).map((s) => {
          const isActive = activeSoundId === s.id;
          return (
            <button
              key={s.id}
              onClick={() => handleTrigger(s)}
              title={s.name}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-['Fredoka'] font-semibold transition-all duration-200 shadow-2xs active:scale-90 cursor-pointer ${
                isActive
                  ? `bg-gradient-to-r ${s.color} text-white scale-105 ring-2 ring-amber-400 shadow-md`
                  : "bg-white/90 hover:bg-white text-stone-700 hover:text-stone-900 border border-amber-200/60"
              }`}
            >
              <span className={`text-sm ${isActive ? "animate-spin" : ""}`}>
                {s.icon}
              </span>
              <span className="text-[11px]">{s.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

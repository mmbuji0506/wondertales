import React, { useEffect, useState } from "react";
import {
  getMusicVolume,
  getSfxVolume,
  setBedtimeSleepTimer,
  clearBedtimeSleepTimer,
  setMusicVolume,
  setSfxVolume,
  startAmbientMusic,
  stopAmbientMusic,
  MusicTheme,
  playChimeSound,
} from "../services/soundEffects";

interface AudioSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  ambientTheme: MusicTheme;
  onSelectAmbientTheme: (theme: MusicTheme) => void;
  autoPageTurn: boolean;
  onToggleAutoPageTurn: (enabled: boolean) => void;
  screenWarmthFilter?: "none" | "candle" | "twilight" | "deep";
  onSelectScreenWarmth?: (filter: "none" | "candle" | "twilight" | "deep") => void;
}

export const AudioSettingsModal: React.FC<AudioSettingsModalProps> = ({
  isOpen,
  onClose,
  ambientTheme,
  onSelectAmbientTheme,
  autoPageTurn,
  onToggleAutoPageTurn,
  screenWarmthFilter = "none",
  onSelectScreenWarmth,
}) => {
  const [sfxVol, setLocalSfxVol] = useState(() => Math.round(getSfxVolume() * 100));
  const [musVol, setLocalMusVol] = useState(() => Math.round(getMusicVolume() * 100));
  const [activeSleepTimer, setActiveSleepTimer] = useState<number>(0); // 0 = off, 5, 10, 15, 30
  const [showBreathingCoach, setShowBreathingCoach] = useState<boolean>(false);
  const [breathPhase, setBreathPhase] = useState<"inhale" | "hold" | "exhale">("inhale");
  const [breathSeconds, setBreathSeconds] = useState<number>(4);

  // Calming 4-4-4 breathing cycle
  useEffect(() => {
    if (!showBreathingCoach) return;
    const interval = setInterval(() => {
      setBreathSeconds((prev) => {
        if (prev > 1) return prev - 1;
        setBreathPhase((currentPhase) => {
          if (currentPhase === "inhale") return "hold";
          if (currentPhase === "hold") return "exhale";
          return "inhale";
        });
        return 4;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [showBreathingCoach]);

  if (!isOpen) return null;

  const handleSfxChange = (val: number) => {
    setLocalSfxVol(val);
    setSfxVolume(val / 100);
    playChimeSound(659);
  };

  const handleMusChange = (val: number) => {
    setLocalMusVol(val);
    setMusicVolume(val / 100);
  };

  const handleThemeChange = (t: MusicTheme) => {
    onSelectAmbientTheme(t);
    if (t === "none") {
      stopAmbientMusic();
    } else {
      startAmbientMusic(t, musVol / 100);
    }
  };

  const handleSetTimer = (minutes: number) => {
    setActiveSleepTimer(minutes);
    if (minutes === 0) {
      clearBedtimeSleepTimer();
    } else {
      setBedtimeSleepTimer(minutes, () => {
        setActiveSleepTimer(0);
      });
    }
    playChimeSound(587);
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-lg w-full bg-[#FFFDF7] rounded-3xl p-6 sm:p-8 shadow-2xl border-4 border-[#FBBF24] max-h-[92vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-amber-200">
          <div className="flex items-center gap-2.5">
            <span className="text-3xl">🎛️</span>
            <div>
              <h2 className="font-['Baloo_2'] text-2xl font-bold text-[#78350F]">
                Audio & Bedtime Settings
              </h2>
              <p className="font-['Quicksand'] text-xs text-amber-800">
                Tune ambient soundscapes, lullabies, sleep timers, and bedtime breathing.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-amber-100 hover:bg-amber-200 text-amber-900 flex items-center justify-center font-bold cursor-pointer"
          >
            ✕
          </button>
        </div>

        <div className="space-y-4">
          {/* Ambient Music Theme Selector */}
          <div>
            <label className="block font-['Fredoka'] text-xs font-semibold uppercase text-amber-800 mb-1.5">
              Background Lullaby Theme:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: "lullaby", label: "🌙 Lullaby" },
                { id: "starlight", label: "✨ Starlight" },
                { id: "rainforest", label: "🦜 Rainforest" },
                { id: "forest", label: "🌲 Forest" },
                { id: "meadow", label: "☀️ Meadow" },
                { id: "ocean", label: "🌊 Lagoon" },
                { id: "none", label: "🔇 Silent" },
              ].map((m) => (
                <button
                  key={m.id}
                  onClick={() => handleThemeChange(m.id as any)}
                  className={`py-2 px-2 rounded-xl text-xs font-['Fredoka'] font-semibold transition-all cursor-pointer ${
                    ambientTheme === m.id
                      ? "bg-amber-500 text-white shadow-xs"
                      : "bg-white text-stone-700 hover:bg-amber-100 border border-amber-200"
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>

          {/* Music Volume Slider */}
          <div className="bg-amber-50/70 rounded-2xl p-3.5 border border-amber-200">
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-['Fredoka'] text-xs font-bold text-amber-900 flex items-center gap-1.5">
                <span>🎵</span>
                <span>Lullaby Music Volume:</span>
              </span>
              <span className="font-['Fredoka'] text-xs font-bold text-amber-800">
                {musVol}%
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={musVol}
              onChange={(e) => handleMusChange(Number(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer"
            />
          </div>

          {/* SFX Volume Slider */}
          <div className="bg-amber-50/70 rounded-2xl p-3.5 border border-amber-200">
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-['Fredoka'] text-xs font-bold text-amber-900 flex items-center gap-1.5">
                <span>✨</span>
                <span>Page Turns & Magic Chimes:</span>
              </span>
              <span className="font-['Fredoka'] text-xs font-bold text-amber-800">
                {sfxVol}%
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={sfxVol}
              onChange={(e) => handleSfxChange(Number(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer"
            />
          </div>

          {/* Auto Page Turn Switch */}
          <div className="flex items-center justify-between bg-white rounded-2xl p-3.5 border border-amber-200 shadow-2xs">
            <div>
              <h4 className="font-['Fredoka'] text-sm font-bold text-amber-950">
                Automatic Page Turning 📖
              </h4>
              <p className="font-['Quicksand'] text-xs text-stone-600">
                Automatically flip to next page when the voice narrator finishes.
              </p>
            </div>
            <button
              onClick={() => onToggleAutoPageTurn(!autoPageTurn)}
              className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${
                autoPageTurn ? "bg-amber-500 justify-end" : "bg-stone-300 justify-start"
              }`}
            >
              <div className="w-4 h-4 rounded-full bg-white shadow-md transform transition-transform" />
            </button>
          </div>

          {/* Bedtime Sleep Timer */}
          <div className="bg-amber-50/70 rounded-2xl p-3.5 border border-amber-200">
            <div className="flex items-center justify-between mb-2">
              <span className="font-['Fredoka'] text-xs font-bold text-amber-900 flex items-center gap-1.5">
                <span>⏰</span>
                <span>Bedtime Sleep Timer (Fades Music):</span>
              </span>
              {activeSleepTimer > 0 && (
                <span className="text-[11px] font-['Fredoka'] font-bold text-amber-700 bg-amber-200 px-2 py-0.5 rounded-full animate-pulse">
                  Active: {activeSleepTimer}m
                </span>
              )}
            </div>
            <div className="grid grid-cols-5 gap-1.5">
              {[
                { min: 0, label: "Off" },
                { min: 5, label: "5m" },
                { min: 10, label: "10m" },
                { min: 15, label: "15m" },
                { min: 30, label: "30m" },
              ].map((timer) => (
                <button
                  key={timer.min}
                  onClick={() => handleSetTimer(timer.min)}
                  className={`py-1.5 rounded-xl text-xs font-['Fredoka'] font-bold transition-all cursor-pointer ${
                    activeSleepTimer === timer.min
                      ? "bg-amber-500 text-white shadow-xs"
                      : "bg-white text-stone-700 hover:bg-amber-100 border border-amber-200"
                  }`}
                >
                  {timer.label}
                </button>
              ))}
            </div>
          </div>

          {/* Screen Warmth / Nightlight Glow */}
          {onSelectScreenWarmth && (
            <div className="bg-amber-50/70 rounded-2xl p-3.5 border border-amber-200">
              <span className="font-['Fredoka'] text-xs font-bold text-amber-900 block mb-1.5">
                💡 Screen Nightlight Warmth Filter:
              </span>
              <div className="grid grid-cols-4 gap-1.5">
                {[
                  { id: "none", label: "☀️ Clear" },
                  { id: "candle", label: "🕯️ Candle" },
                  { id: "twilight", label: "🌌 Twilight" },
                  { id: "deep", label: "🌙 Deep Warm" },
                ].map((w) => (
                  <button
                    key={w.id}
                    onClick={() => onSelectScreenWarmth(w.id as any)}
                    className={`py-1.5 rounded-xl text-xs font-['Fredoka'] font-semibold transition-all cursor-pointer ${
                      screenWarmthFilter === w.id
                        ? "bg-amber-500 text-white shadow-xs"
                        : "bg-white text-stone-700 hover:bg-amber-100 border border-amber-200"
                    }`}
                  >
                    {w.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Calming Bedtime Star Breathing Coach */}
          <div className="bg-gradient-to-r from-amber-100/90 to-yellow-100/90 rounded-2xl p-4 border border-amber-300">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xl">⭐</span>
                <div>
                  <h4 className="font-['Fredoka'] text-xs font-bold text-amber-950 uppercase">
                    Bedtime Star Breathing Coach
                  </h4>
                  <p className="font-['Quicksand'] text-[11px] text-amber-800">
                    A gentle 4-4-4 rhythm to relax little explorers before sleep.
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  setShowBreathingCoach(!showBreathingCoach);
                  playChimeSound(659);
                }}
                className="px-2.5 py-1 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-['Fredoka'] text-xs font-bold cursor-pointer"
              >
                {showBreathingCoach ? "Hide" : "Start Star Coach"}
              </button>
            </div>

            {showBreathingCoach && (
              <div className="mt-3 text-center py-2 animate-fadeIn flex flex-col items-center">
                <div
                  className={`w-20 h-20 rounded-full flex items-center justify-center text-3xl shadow-md transition-all duration-1000 ${
                    breathPhase === "inhale"
                      ? "bg-yellow-300 scale-125 border-4 border-amber-400"
                      : breathPhase === "hold"
                      ? "bg-amber-400 scale-120 border-4 border-yellow-200"
                      : "bg-amber-200 scale-90 border-4 border-amber-300"
                  }`}
                >
                  ⭐
                </div>
                <div className="mt-2 font-['Baloo_2'] text-base font-bold text-[#78350F]">
                  {breathPhase === "inhale" && `Breathe in slowly... (${breathSeconds})`}
                  {breathPhase === "hold" && `Hold gently in stillness... (${breathSeconds})`}
                  {breathPhase === "exhale" && `Breathe out smoothly... (${breathSeconds})`}
                </div>
                <p className="font-['Quicksand'] text-[11px] text-amber-800">
                  Feel your shoulders relax as the star twinkles softly.
                </p>
              </div>
            )}
          </div>

          <button
            onClick={onClose}
            className="w-full py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-['Fredoka'] font-bold text-sm shadow-md transition-all active:scale-95 cursor-pointer"
          >
            Save Settings 🌟
          </button>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from "react";
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
}

export const AudioSettingsModal: React.FC<AudioSettingsModalProps> = ({
  isOpen,
  onClose,
  ambientTheme,
  onSelectAmbientTheme,
  autoPageTurn,
  onToggleAutoPageTurn,
}) => {
  const [sfxVol, setLocalSfxVol] = useState(() => Math.round(getSfxVolume() * 100));
  const [musVol, setLocalMusVol] = useState(() => Math.round(getMusicVolume() * 100));
  const [activeSleepTimer, setActiveSleepTimer] = useState<number>(0); // 0 = off, 10, 20, 30

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
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-lg w-full bg-[#FFFDF7] rounded-3xl p-6 sm:p-8 shadow-2xl border-4 border-[#FBBF24] max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between pb-4 mb-5 border-b border-amber-200">
          <div className="flex items-center gap-2.5">
            <span className="text-3xl">🎛️</span>
            <div>
              <h2 className="font-['Baloo_2'] text-2xl font-bold text-[#78350F]">
                Audio & Bedtime Settings
              </h2>
              <p className="font-['Quicksand'] text-xs text-amber-800">
                Tune the ambient lullabies, chimes, and automatic page turning.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-amber-100 hover:bg-amber-200 text-amber-900 flex items-center justify-center font-bold"
          >
            ✕
          </button>
        </div>

        <div className="space-y-5">
          {/* Ambient Music Theme Selector */}
          <div>
            <label className="block font-['Fredoka'] text-xs font-semibold uppercase text-amber-800 mb-2">
              Background Lullaby Theme:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {[
                { id: "lullaby", label: "🌙 Starlight" },
                { id: "forest", label: "🌲 Forest" },
                { id: "meadow", label: "☀️ Meadow" },
                { id: "ocean", label: "🌊 Lagoon" },
                { id: "none", label: "🔇 Silent" },
              ].map((m) => (
                <button
                  key={m.id}
                  onClick={() => handleThemeChange(m.id as any)}
                  className={`py-2 px-2 rounded-xl text-xs font-['Fredoka'] font-semibold transition-all ${
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
          <div className="bg-amber-50/70 rounded-2xl p-4 border border-amber-200">
            <div className="flex items-center justify-between mb-2">
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
          <div className="bg-amber-50/70 rounded-2xl p-4 border border-amber-200">
            <div className="flex items-center justify-between mb-2">
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
          <div className="flex items-center justify-between bg-white rounded-2xl p-4 border border-amber-200 shadow-xs">
            <div>
              <h4 className="font-['Fredoka'] text-sm font-bold text-amber-950">
                Automatic Page Turning 📖
              </h4>
              <p className="font-['Quicksand'] text-xs text-stone-600">
                Automatically flip to the next page when the narrator finishes.
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
          <div>
            <label className="block font-['Fredoka'] text-xs font-semibold uppercase text-amber-800 mb-2">
              Bedtime Sleep Timer (Auto Off):
            </label>
            <div className="grid grid-cols-4 gap-2">
              {[
                { min: 0, label: "Off" },
                { min: 10, label: "10 min" },
                { min: 20, label: "20 min" },
                { min: 30, label: "30 min" },
              ].map((timer) => (
                <button
                  key={timer.min}
                  onClick={() => handleSetTimer(timer.min)}
                  className={`py-2 rounded-xl text-xs font-['Fredoka'] font-bold transition-all ${
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

          <button
            onClick={onClose}
            className="w-full py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-['Fredoka'] font-bold text-sm shadow-md transition-all active:scale-95"
          >
            Save Settings 🌟
          </button>
        </div>
      </div>
    </div>
  );
};

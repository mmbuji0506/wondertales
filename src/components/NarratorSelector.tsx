import React, { useState } from "react";
import {
  NARRATOR_PERSONAS,
  NarratorPersona,
  speechNarrator,
} from "../services/speechNarrator";
import {
  playChimeSound,
  startAmbientMusic,
  stopAmbientMusic,
  MusicTheme,
} from "../services/soundEffects";

interface NarratorSelectorProps {
  currentPersonaId: string;
  onSelectPersona: (personaId: string) => void;
  ambientTheme: MusicTheme;
  onSelectAmbientTheme: (theme: MusicTheme) => void;
  isOpen: boolean;
  onClose: () => void;
}

export const NarratorSelector: React.FC<NarratorSelectorProps> = ({
  currentPersonaId,
  onSelectPersona,
  ambientTheme,
  onSelectAmbientTheme,
  isOpen,
  onClose,
}) => {
  const [testingId, setTestingId] = useState<string | null>(null);
  const [userSpeed, setUserSpeed] = useState<number>(() => speechNarrator.getUserRate());

  if (!isOpen) return null;

  const handleTestVoice = (p: NarratorPersona) => {
    playChimeSound(587);
    setTestingId(p.id);
    speechNarrator.testPersona(p.id, () => {
      setTestingId(null);
    });
  };

  const handleSelect = (id: string) => {
    playChimeSound(659);
    onSelectPersona(id);
    speechNarrator.setPersona(id);
  };

  const handleSpeedChange = (speed: number) => {
    setUserSpeed(speed);
    speechNarrator.setUserRate(speed);
  };

  const handleMusicChange = (theme: MusicTheme) => {
    onSelectAmbientTheme(theme);
    if (theme === "none") {
      stopAmbientMusic();
    } else {
      startAmbientMusic(theme, 0.28);
    }
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-2xl w-full bg-[#FFFDF7] rounded-3xl p-6 sm:p-8 shadow-2xl border-4 border-[#FBBF24] max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-amber-200">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">🎙️</span>
              <h2 className="font-['Baloo_2'] text-2xl font-bold text-[#78350F]">
                Choose Your Storyteller
              </h2>
            </div>
            <p className="font-['Quicksand'] text-xs sm:text-sm text-amber-800">
              Pick a friendly voice to read your story aloud!
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-amber-100 hover:bg-amber-200 text-amber-900 flex items-center justify-center font-bold text-lg transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Narrator Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-6">
          {NARRATOR_PERSONAS.map((p) => {
            const isSelected = p.id === currentPersonaId;
            const isTesting = testingId === p.id;

            return (
              <div
                key={p.id}
                onClick={() => handleSelect(p.id)}
                className={`relative rounded-2xl p-4 cursor-pointer transition-all border-2 text-left ${
                  isSelected
                    ? "bg-amber-50 border-amber-500 shadow-md ring-2 ring-amber-300"
                    : "bg-white hover:bg-amber-50/50 border-amber-200"
                }`}
              >
                <div className="flex items-start gap-3">
                  <span className="text-3xl sm:text-4xl filter drop-shadow-xs">{p.avatar}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <h4 className="font-['Fredoka'] font-bold text-base text-[#451A03] truncate">
                        {p.name}
                      </h4>
                      {isSelected && (
                        <span className="text-[11px] font-['Fredoka'] px-2 py-0.5 rounded-full bg-amber-500 text-white font-semibold">
                          Active
                        </span>
                      )}
                    </div>
                    <p className="font-['Fredoka'] text-xs text-amber-700 font-medium">
                      {p.tagline}
                    </p>
                    <p className="font-['Quicksand'] text-xs text-stone-600 mt-1 leading-snug">
                      {p.description}
                    </p>
                  </div>
                </div>

                <div className="mt-3 pt-2.5 border-t border-amber-100 flex items-center justify-between">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleTestVoice(p);
                    }}
                    className={`px-3 py-1 rounded-full text-xs font-['Fredoka'] font-medium transition-all flex items-center gap-1 ${
                      isTesting
                        ? "bg-amber-600 text-white animate-pulse"
                        : "bg-amber-100 hover:bg-amber-200 text-amber-900"
                    }`}
                  >
                    <span>{isTesting ? "🔊 Speaking..." : "▶ Hear Voice"}</span>
                  </button>

                  <span className="text-[11px] font-['Quicksand'] text-stone-400">
                    Pitch: {p.pitchMultiplier}x
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Speed Slider */}
        <div className="bg-amber-50/70 rounded-2xl p-4 border border-amber-200 mb-5">
          <div className="flex items-center justify-between mb-2">
            <span className="font-['Fredoka'] text-sm font-semibold text-amber-900 flex items-center gap-1.5">
              <span>⏱️</span>
              <span>Reading Pace:</span>
            </span>
            <span className="font-['Fredoka'] text-xs font-bold px-2 py-0.5 rounded-full bg-amber-200 text-amber-900">
              {userSpeed === 0.8 ? "Cozy & Bedtime (0.8x)" : userSpeed === 1.0 ? "Normal Pace (1.0x)" : "Lively (1.25x)"}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleSpeedChange(0.8)}
              className={`flex-1 py-1.5 rounded-xl text-xs font-['Fredoka'] transition-all ${
                userSpeed === 0.8
                  ? "bg-amber-500 text-white font-bold shadow-xs"
                  : "bg-white text-stone-700 hover:bg-amber-100 border border-amber-200"
              }`}
            >
              🐢 Cozy Slow
            </button>
            <button
              onClick={() => handleSpeedChange(1.0)}
              className={`flex-1 py-1.5 rounded-xl text-xs font-['Fredoka'] transition-all ${
                userSpeed === 1.0
                  ? "bg-amber-500 text-white font-bold shadow-xs"
                  : "bg-white text-stone-700 hover:bg-amber-100 border border-amber-200"
              }`}
            >
              📖 Standard
            </button>
            <button
              onClick={() => handleSpeedChange(1.25)}
              className={`flex-1 py-1.5 rounded-xl text-xs font-['Fredoka'] transition-all ${
                userSpeed === 1.25
                  ? "bg-amber-500 text-white font-bold shadow-xs"
                  : "bg-white text-stone-700 hover:bg-amber-100 border border-amber-200"
              }`}
            >
              🐇 Energetic
            </button>
          </div>
        </div>

        {/* Background Ambient Soundscape */}
        <div className="bg-amber-50/70 rounded-2xl p-4 border border-amber-200 mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="font-['Fredoka'] text-sm font-semibold text-amber-900 flex items-center gap-1.5">
              <span>🎵</span>
              <span>Background Ambient Lullaby:</span>
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {[
              { id: "lullaby", label: "🌙 Starlight" },
              { id: "forest", label: "🌲 Forest" },
              { id: "meadow", label: "☀️ Meadow" },
              { id: "ocean", label: "🌊 Lagoon" },
              { id: "none", label: "🔇 Off" },
            ].map((m) => (
              <button
                key={m.id}
                onClick={() => handleMusicChange(m.id as any)}
                className={`py-2 px-2 rounded-xl text-xs font-['Fredoka'] transition-all ${
                  ambientTheme === m.id
                    ? "bg-amber-500 text-white font-bold shadow-xs"
                    : "bg-white text-stone-700 hover:bg-amber-100 border border-amber-200"
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-['Fredoka'] font-bold text-base shadow-md transition-all active:scale-95"
        >
          Ready to Read! 📚
        </button>
      </div>
    </div>
  );
};

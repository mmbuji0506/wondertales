import React, { useEffect, useState } from "react";
import { ChildrenStory } from "../data/childrenStories";
import { playChimeSound, playFanfareSound, playSparkleSound } from "../services/soundEffects";

interface PassportModalProps {
  stories: ChildrenStory[];
  foundStars: string[];
  activeStoryId?: string;
  isOpen: boolean;
  onClose: () => void;
  onSelectStory: (story: ChildrenStory) => void;
  onOpenCertificate?: (name: string) => void;
}

const EXPLORER_MASCOTS = [
  { id: "fox", emoji: "🦊", name: "Felix the Fox" },
  { id: "bear", emoji: "🐻", name: "Barnaby Bear" },
  { id: "owl", emoji: "🦉", name: "Professor Owl" },
  { id: "panda", emoji: "🐼", name: "Bao the Panda" },
  { id: "lion", emoji: "🦁", name: "Leo the Lion" },
  { id: "dolphin", emoji: "🐬", name: "Marina Dolphin" },
  { id: "rocket", emoji: "🚀", name: "Cosmo Starhopper" },
  { id: "peacock", emoji: "🦚", name: "Pari the Peacock" },
];

export const PassportModal: React.FC<PassportModalProps> = ({
  stories,
  foundStars,
  isOpen,
  onClose,
  onSelectStory,
  onOpenCertificate,
}) => {
  const [explorerName, setExplorerName] = useState(() => {
    return localStorage.getItem("wondertales_explorer_name") || "Little Explorer";
  });
  const [selectedMascot, setSelectedMascot] = useState(() => {
    return localStorage.getItem("wondertales_explorer_mascot") || "fox";
  });
  const [isEditingName, setIsEditingName] = useState(false);

  useEffect(() => {
    localStorage.setItem("wondertales_explorer_name", explorerName);
  }, [explorerName]);

  useEffect(() => {
    localStorage.setItem("wondertales_explorer_mascot", selectedMascot);
  }, [selectedMascot]);

  if (!isOpen) return null;

  const totalPossibleStars = stories.reduce((acc, s) => acc + s.pages.length, 0);
  const totalEarnedStars = foundStars.length;

  // Rank progression
  let rankTitle = "Junior Story Explorer 🌿";
  if (totalEarnedStars >= 24) {
    rankTitle = "Grand Sage of Global Lore 👑";
  } else if (totalEarnedStars >= 16) {
    rankTitle = "Master Folktale Wayfinder ⛵";
  } else if (totalEarnedStars >= 8) {
    rankTitle = "World Story Adventurer 🗺️";
  } else if (totalEarnedStars >= 4) {
    rankTitle = "Curious Star Voyager 🧭";
  }

  const activeMascotObj =
    EXPLORER_MASCOTS.find((m) => m.id === selectedMascot) || EXPLORER_MASCOTS[0];

  const handleClaimAward = () => {
    playFanfareSound();
    onOpenCertificate?.(explorerName);
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 animate-fadeIn"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-2xl w-full bg-[#FFFDF7] rounded-3xl p-5 sm:p-7 shadow-2xl border-4 border-[#FBBF24] max-h-[92vh] overflow-y-auto"
      >
        {/* Passport Leather Header */}
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-amber-200">
          <div className="flex items-center gap-2.5">
            <span className="text-3xl">🛂</span>
            <div>
              <h2 className="font-['Baloo_2'] text-2xl font-bold text-[#78350F]">
                World Story Explorer Passport
              </h2>
              <p className="font-['Quicksand'] text-xs text-amber-800">
                Collect cultural stamps and stars on your journey across the globe!
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-amber-100 hover:bg-amber-200 text-amber-900 flex items-center justify-center font-bold text-lg cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Passport Card Identification Banner */}
        <div className="bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 text-white rounded-2xl p-4 sm:p-5 shadow-md mb-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-xs border-2 border-white/60 flex items-center justify-center text-3xl shadow-inner relative group">
              <span>{activeMascotObj.emoji}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-widest font-['Fredoka'] text-amber-200 block">
                Official Explorer Pass
              </span>
              <div className="flex items-center gap-2">
                {isEditingName ? (
                  <input
                    type="text"
                    value={explorerName}
                    onChange={(e) => setExplorerName(e.target.value)}
                    onBlur={() => setIsEditingName(false)}
                    autoFocus
                    className="bg-white text-stone-900 px-2 py-0.5 rounded-lg font-['Baloo_2'] text-base font-bold outline-none"
                  />
                ) : (
                  <h3
                    onClick={() => setIsEditingName(true)}
                    className="font-['Baloo_2'] text-xl sm:text-2xl font-bold cursor-pointer hover:underline flex items-center gap-1.5"
                    title="Click to edit your explorer name"
                  >
                    <span>{explorerName}</span>
                    <span className="text-xs opacity-75">✎</span>
                  </h3>
                )}
              </div>
              <p className="font-['Quicksand'] text-xs text-amber-100 font-semibold mt-0.5">
                {rankTitle}
              </p>
            </div>
          </div>

          <div className="flex sm:flex-col items-center sm:items-end gap-2 shrink-0">
            <span className="text-xs font-['Fredoka'] bg-white/20 backdrop-blur-xs px-3 py-1 rounded-full font-bold">
              ⭐ {totalEarnedStars} / {totalPossibleStars} Stars
            </span>
            <div className="flex items-center gap-1.5">
              <button
                onClick={handleClaimAward}
                className="text-xs font-['Fredoka'] font-bold bg-white/95 hover:bg-white text-amber-900 px-3 py-1.5 rounded-full shadow-sm transition-transform active:scale-95 flex items-center gap-1 cursor-pointer"
              >
                <span>📜 Diploma</span>
              </button>
            </div>
          </div>
        </div>

        {/* Mascot Avatar Picker */}
        <div className="mb-4 bg-amber-50/70 p-3 rounded-2xl border border-amber-200">
          <span className="text-[11px] font-['Fredoka'] font-bold uppercase tracking-wider text-amber-900 block mb-1.5">
            Choose Your Adventure Mascot:
          </span>
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-1.5">
            {EXPLORER_MASCOTS.map((m) => (
              <button
                key={m.id}
                onClick={() => {
                  setSelectedMascot(m.id);
                  playSparkleSound();
                }}
                className={`p-1.5 rounded-xl flex flex-col items-center justify-center text-xl transition-all cursor-pointer ${
                  selectedMascot === m.id
                    ? "bg-amber-400 text-white shadow-xs scale-110 ring-2 ring-amber-300"
                    : "bg-white hover:bg-amber-100"
                }`}
                title={m.name}
              >
                <span>{m.emoji}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Cultural Stamps Grid */}
        <h3 className="font-['Fredoka'] text-xs font-bold uppercase tracking-wider text-[#78350F] mb-2.5 flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <span>🏷️</span>
            <span>Cultural Folktale Stamps ({stories.length} Lands)</span>
          </span>
          <span className="text-[11px] font-normal text-stone-500">
            Tap any land to begin reading!
          </span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-5">
          {stories.map((story) => {
            const starsForBook = foundStars.filter((id) => id.startsWith(story.title)).length;
            const isCompleted = starsForBook >= story.pages.length;

            return (
              <div
                key={story.id}
                onClick={() => {
                  playChimeSound(659);
                  onSelectStory(story);
                  onClose();
                }}
                className={`p-3 rounded-2xl border-2 flex items-center gap-3 cursor-pointer transition-all hover:scale-[1.01] ${
                  isCompleted
                    ? "bg-amber-50/90 border-amber-400 shadow-xs"
                    : "bg-white hover:bg-amber-50/50 border-stone-200"
                }`}
              >
                <div
                  style={{ backgroundColor: story.coverCloth }}
                  className="w-11 h-11 rounded-xl flex items-center justify-center text-xl shadow-xs text-white shrink-0 border border-white"
                >
                  {story.flag}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="font-['Baloo_2'] text-sm font-bold text-[#451A03] truncate">
                      {story.title}
                    </h4>
                    {isCompleted && (
                      <span className="text-[10px] font-['Fredoka'] font-bold text-emerald-800 bg-emerald-100 px-1.5 py-0.5 rounded-full shrink-0">
                        Stamped ✓
                      </span>
                    )}
                  </div>

                  <p className="font-['Quicksand'] text-xs text-stone-500 truncate">
                    {story.country} · {story.culture}
                  </p>

                  <div className="mt-1 flex items-center justify-between text-[11px] font-['Fredoka'] text-amber-800">
                    <span>⭐ {starsForBook} / {story.pages.length} Stars</span>
                    <span className="text-amber-600 hover:underline">Read ➔</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Explorer Pledge */}
        <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-center">
          <p className="font-['Cormorant_Garamond'] italic text-sm text-[#78350F]">
            "Stories are the golden threads that connect all the children of the earth in kindness, wonder, and joy."
          </p>
        </div>
      </div>
    </div>
  );
};

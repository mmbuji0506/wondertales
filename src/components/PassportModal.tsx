import React, { useState } from "react";
import { ChildrenStory } from "../data/childrenStories";
import { playChimeSound, playFanfareSound } from "../services/soundEffects";

interface PassportModalProps {
  stories: ChildrenStory[];
  foundStars: string[];
  activeStoryId: string;
  isOpen: boolean;
  onClose: () => void;
  onSelectStory: (story: ChildrenStory) => void;
  onOpenCertificate?: (name: string) => void;
}

export const PassportModal: React.FC<PassportModalProps> = ({
  stories,
  foundStars,
  isOpen,
  onClose,
  onSelectStory,
  onOpenCertificate,
}) => {
  const [explorerName, setExplorerName] = useState("Little Explorer");
  const [isEditingName, setIsEditingName] = useState(false);

  if (!isOpen) return null;

  const totalPossibleStars = stories.reduce((acc, s) => acc + s.pages.length, 0);
  const totalEarnedStars = foundStars.length;

  const handleClaimAward = () => {
    playFanfareSound();
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
        {/* Passport Leather Header */}
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-amber-200">
          <div className="flex items-center gap-2.5">
            <span className="text-3xl">🛂</span>
            <div>
              <h2 className="font-['Baloo_2'] text-2xl font-bold text-[#78350F]">
                World Story Explorer Passport
              </h2>
              <p className="font-['Quicksand'] text-xs sm:text-sm text-amber-800">
                Collect cultural stamps and stars on your journey across the globe!
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-amber-100 hover:bg-amber-200 text-amber-900 flex items-center justify-center font-bold text-lg"
          >
            ✕
          </button>
        </div>

        {/* Passport Card Identification Banner */}
        <div className="bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 text-white rounded-2xl p-4 sm:p-5 shadow-md mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-xs border-2 border-white/60 flex items-center justify-center text-3xl shadow-inner">
              🌍
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-widest font-['Fredoka'] text-amber-200">
                Official Reader
              </span>
              <div className="flex items-center gap-2">
                {isEditingName ? (
                  <input
                    type="text"
                    value={explorerName}
                    onChange={(e) => setExplorerName(e.target.value)}
                    onBlur={() => setIsEditingName(false)}
                    autoFocus
                    className="bg-white text-stone-900 px-2 py-0.5 rounded font-['Baloo_2'] text-lg font-bold"
                  />
                ) : (
                  <h3
                    onClick={() => setIsEditingName(true)}
                    className="font-['Baloo_2'] text-xl sm:text-2xl font-bold cursor-pointer hover:underline flex items-center gap-1.5"
                    title="Click to change your explorer name!"
                  >
                    <span>{explorerName}</span>
                    <span className="text-xs opacity-80">✎</span>
                  </h3>
                )}
              </div>
              <p className="font-['Quicksand'] text-xs text-amber-100">
                Rank: Junior Global Storyteller
              </p>
            </div>
          </div>

          <div className="flex sm:flex-col items-center sm:items-end gap-2 shrink-0">
            <span className="text-xs font-['Fredoka'] bg-white/20 backdrop-blur-xs px-3 py-1 rounded-full font-bold">
              ⭐ {totalEarnedStars} / {totalPossibleStars} Stars
            </span>
            <div className="flex items-center gap-1.5">
              {onOpenCertificate && (
                <button
                  onClick={() => onOpenCertificate(explorerName)}
                  className="text-xs font-['Fredoka'] font-bold bg-white/90 hover:bg-white text-stone-900 px-3 py-1 rounded-full shadow-sm transition-transform active:scale-95 flex items-center gap-1"
                >
                  <span>📜 Certificate</span>
                </button>
              )}
              <button
                onClick={handleClaimAward}
                className="text-xs font-['Fredoka'] font-bold bg-yellow-300 hover:bg-yellow-400 text-stone-900 px-3 py-1 rounded-full shadow-sm transition-transform active:scale-95 flex items-center gap-1"
              >
                <span>🎉 Celebrate!</span>
              </button>
            </div>
          </div>
        </div>

        {/* Cultural Stamps Grid */}
        <h3 className="font-['Fredoka'] text-sm font-bold uppercase tracking-wider text-[#78350F] mb-3 flex items-center gap-1.5">
          <span>🏷️</span>
          <span>Cultural Story Stamps & Badges</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
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
                className={`p-3.5 rounded-2xl border-2 flex items-center gap-3 cursor-pointer transition-all ${
                  isCompleted
                    ? "bg-amber-50 border-amber-400 shadow-xs"
                    : "bg-white hover:bg-amber-50/50 border-stone-200"
                }`}
              >
                <div
                  style={{ backgroundColor: story.coverCloth }}
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shadow-sm text-white shrink-0 border border-white"
                >
                  {story.flag}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="font-['Baloo_2'] text-sm sm:text-base font-bold text-[#451A03] truncate">
                      {story.title}
                    </h4>
                    {isCompleted && (
                      <span className="text-[10px] font-['Fredoka'] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded-full shrink-0">
                        Mastered
                      </span>
                    )}
                  </div>

                  <p className="font-['Quicksand'] text-xs text-stone-500 truncate">
                    {story.country} · {story.culture}
                  </p>

                  <div className="mt-1 flex items-center justify-between text-[11px] font-['Fredoka'] text-amber-800">
                    <span>Stars: {starsForBook} / {story.pages.length}</span>
                    <span className="text-amber-600 hover:underline">Read Now ➔</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Explorer Pledge */}
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-center">
          <p className="font-['Cormorant_Garamond'] italic text-sm text-[#78350F]">
            "Stories are the golden threads that connect all the children of the earth in kindness, wonder, and joy."
          </p>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from "react";
import { playSparkleSound, playChimeSound } from "../services/soundEffects";
import { ChildrenStoryPage } from "../data/childrenStories";

interface StoryPlateIllustrationProps {
  page: ChildrenStoryPage;
  storyTitle: string;
  accentColor: string;
  foundStars: string[];
  onFindStar: (starId: string) => void;
  onGenerateAiIllustration?: () => void;
  isGeneratingAi?: boolean;
  onOpenColoringStudio?: () => void;
}

export const StoryPlateIllustration: React.FC<StoryPlateIllustrationProps> = ({
  page,
  storyTitle,
  accentColor,
  foundStars,
  onFindStar,
  onGenerateAiIllustration,
  isGeneratingAi = false,
  onOpenColoringStudio,
}) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const [sparkles, setSparkles] = useState<{ id: number; x: number; y: number }[]>([]);
  const [starlightMode, setStarlightMode] = useState(false);

  const starId = `${storyTitle}-page-${page.pageNumber}`;
  const isStarFound = foundStars.includes(starId);

  const handleStageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickXPercent = ((e.clientX - rect.left) / rect.width) * 100;
    const clickYPercent = ((e.clientY - rect.top) / rect.height) * 100;

    // Check if clicked close to hidden star (within 9% radius)
    const dist = Math.hypot(
      clickXPercent - page.hiddenStar.xPercent,
      clickYPercent - page.hiddenStar.yPercent
    );

    if (dist < 9 && !isStarFound) {
      playSparkleSound();
      onFindStar(starId);
    } else {
      playChimeSound(784); // G5 chime note
    }

    // Spawn cute floating star sparkles at click position
    const newSparkle = {
      id: Date.now(),
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
    setSparkles((prev) => [...prev.slice(-6), newSparkle]);
    setTimeout(() => {
      setSparkles((prev) => prev.filter((s) => s.id !== newSparkle.id));
    }, 900);
  };

  return (
    <div className="relative w-full h-full flex flex-col justify-between select-none">
      {/* Ornate Children's Storybook Wooden / Gold Frame */}
      <div className="relative flex-1 rounded-2xl p-3 sm:p-4 bg-gradient-to-br from-[#FFF9EE] to-[#FDECCE] border-4 border-[#E2C799] shadow-inner flex flex-col">
        {/* Top Plate Tag & Action Strip */}
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#E2C799]/60 text-xs font-semibold text-[#8C6D3F]">
          <span className="flex items-center gap-1.5 font-['Fredoka'] tracking-wide">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#E29D45] animate-pulse" />
            PLATE {page.pageNumber} · {page.chapterTitle.split(":")[0]}
          </span>

          <div className="flex items-center gap-2">
            {/* Color Plate Easel Button */}
            {onOpenColoringStudio && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  playChimeSound(784);
                  onOpenColoringStudio();
                }}
                title="Color and paint this story plate!"
                className="px-2 py-0.5 rounded-lg bg-amber-100 hover:bg-amber-200 text-[#8C6D3F] font-['Fredoka'] font-semibold text-xs flex items-center gap-1 transition-colors cursor-pointer"
              >
                <span>🎨</span>
                <span className="hidden sm:inline">Color</span>
              </button>
            )}

            {/* Starlight Glow Mood Toggle */}
            <button
              onClick={() => {
                playChimeSound(659);
                setStarlightMode(!starlightMode);
              }}
              title={starlightMode ? "Switch to Sunny Day Art" : "Switch to Starlight Glow Art"}
              className="p-1 rounded-lg hover:bg-amber-200/50 text-[#8C6D3F] transition-colors text-xs"
            >
              {starlightMode ? "✨ Glow: On" : "✨ Glow"}
            </button>

            {/* Hidden Star Quest Badge */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (!isStarFound) {
                  playSparkleSound();
                  onFindStar(starId);
                }
              }}
              title={isStarFound ? "Star Found!" : `Quest: ${page.hiddenStar.clue}`}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-['Fredoka'] transition-all ${
                isStarFound
                  ? "bg-amber-100 text-amber-800 border border-amber-300 shadow-sm"
                  : "bg-amber-50/70 text-amber-700 hover:bg-amber-100 border border-amber-200"
              }`}
            >
              <span>{isStarFound ? "⭐ Star Found!" : "✨ Find Star"}</span>
            </button>

            {/* Zoom Button */}
            <button
              onClick={() => setIsZoomed(true)}
              className="p-1 rounded-lg hover:bg-amber-200/50 text-[#8C6D3F] transition-colors"
              title="Inspect illustration in full size"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
              </svg>
            </button>
          </div>
        </div>

        {/* The Illustration Canvas Area with Pop-Up Unfold Animation on page turn */}
        <div
          key={`plate-${page.pageNumber}`}
          onClick={handleStageClick}
          className={`relative flex-1 w-full rounded-xl overflow-hidden shadow-md border-2 border-[#D8BE93] bg-[#FEF9EE] cursor-pointer group animate-popupUnfold transition-all duration-500 ${
            starlightMode ? "brightness-105 saturate-125 filter drop-shadow-[0_0_15px_rgba(254,240,138,0.3)]" : ""
          }`}
          title="Click anywhere to make magic sparkles! Or find the hidden star!"
        >
          {/* Render the Bespoke SVG Illustration */}
          <div
            className="w-full h-full flex items-center justify-center transition-transform duration-500 group-hover:scale-[1.015]"
            dangerouslySetInnerHTML={{ __html: page.illustrationSvg }}
          />

          {/* Starlight Ambient Tint Layer */}
          {starlightMode && (
            <div className="absolute inset-0 bg-indigo-950/20 mix-blend-color-dodge pointer-events-none" />
          )}

          {/* Hidden Star Element (Glows gently) */}
          <div
            style={{
              left: `${page.hiddenStar.xPercent}%`,
              top: `${page.hiddenStar.yPercent}%`,
            }}
            className={`absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-transform ${
              isStarFound ? "scale-125" : "scale-100 opacity-80 hover:scale-150"
            }`}
          >
            <div className="relative">
              <span className="text-xl sm:text-2xl filter drop-shadow-[0_0_8px_rgba(254,240,138,0.9)] animate-bounce">
                ⭐
              </span>
              {!isStarFound && (
                <div className="absolute -inset-1 rounded-full bg-yellow-300/30 animate-ping pointer-events-none" />
              )}
            </div>
          </div>

          {/* Click Sparkles Overlay */}
          {sparkles.map((sp) => (
            <div
              key={sp.id}
              style={{ left: sp.x, top: sp.y }}
              className="absolute pointer-events-none text-2xl -translate-x-1/2 -translate-y-1/2 animate-ping"
            >
              ✨
            </div>
          ))}

          {/* Hover Hint */}
          <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded-full bg-black/40 backdrop-blur-xs text-[10px] text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            ✨ Click to sparkle!
          </div>
        </div>

        {/* Caption & Playful Activity */}
        <div className="mt-2.5 px-1 flex flex-col gap-1">
          <p className="text-xs sm:text-sm font-['Cormorant_Garamond'] italic text-[#574426] leading-snug">
            "{page.illustrationCaption}"
          </p>
          <div className="flex items-center justify-between text-[11px] font-['Quicksand'] text-[#7B613A]">
            <span className="flex items-center gap-1 font-medium">
              💡 <span className="font-semibold text-amber-900">Try This:</span> {page.funActivity}
            </span>

            {onGenerateAiIllustration && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onGenerateAiIllustration();
                }}
                disabled={isGeneratingAi}
                className="shrink-0 text-xs font-['Fredoka'] px-2 py-0.5 rounded-full bg-amber-500 hover:bg-amber-600 text-white font-medium shadow-xs transition-colors disabled:opacity-50"
              >
                {isGeneratingAi ? "Painting..." : "🎨 Repaint AI Art"}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Fullscreen Zoom Modal */}
      {isZoomed && (
        <div
          onClick={() => setIsZoomed(false)}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex flex-col items-center justify-center p-4 cursor-zoom-out animate-fadeIn"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full bg-[#FFFDF7] rounded-3xl p-4 sm:p-6 shadow-2xl border-4 border-[#E2C799]"
          >
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#E2C799]">
              <div>
                <h3 className="font-['Baloo_2'] text-xl font-bold text-[#3B2D1B]">
                  {page.chapterTitle}
                </h3>
                <p className="font-['Quicksand'] text-xs text-[#7A6443]">
                  {page.illustrationCaption}
                </p>
              </div>
              <button
                onClick={() => setIsZoomed(false)}
                className="p-2 rounded-full bg-amber-100 hover:bg-amber-200 text-amber-900 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div
              className="w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-inner border border-[#D8BE93] bg-[#FEF9EE]"
              dangerouslySetInnerHTML={{ __html: page.illustrationSvg }}
            />

            <div className="mt-3 flex items-center justify-between text-xs font-['Fredoka'] text-[#8C6D3F]">
              <span>⭐ Hidden Star Clue: {page.hiddenStar.clue}</span>
              <button
                onClick={() => setIsZoomed(false)}
                className="px-4 py-1.5 rounded-full bg-[#8C6D3F] text-white hover:bg-[#6D532E]"
              >
                Close View
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

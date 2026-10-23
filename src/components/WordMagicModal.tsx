import React from "react";
import { StoryVocabularyWord } from "../data/childrenStories";
import { speechNarrator } from "../services/speechNarrator";
import { playChimeSound } from "../services/soundEffects";

interface WordMagicModalProps {
  wordData: StoryVocabularyWord | null;
  onClose: () => void;
}

export const WordMagicModal: React.FC<WordMagicModalProps> = ({ wordData, onClose }) => {
  if (!wordData) return null;

  const handlePronounce = () => {
    playChimeSound(659);
    speechNarrator.speakSingleLine(wordData.word, "Word Guide", "📖");
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-md w-full bg-gradient-to-b from-[#FFFDF7] to-[#FEF3C7] rounded-3xl p-6 shadow-2xl border-4 border-[#FBBF24] text-center"
      >
        {/* Playful Floating Badge */}
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-white font-['Fredoka'] font-bold text-sm shadow-md border-2 border-white flex items-center gap-1.5">
          <span>✨</span>
          <span>Word Magic Discovery</span>
          <span>✨</span>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-amber-100 hover:bg-amber-200 text-amber-900 flex items-center justify-center transition-colors"
        >
          ✕
        </button>

        <div className="mt-4">
          <div className="inline-flex items-center gap-2 mb-1">
            <h2 className="font-['Baloo_2'] text-3xl font-extrabold text-[#78350F]">
              {wordData.word}
            </h2>
            <button
              onClick={handlePronounce}
              title="Hear how to say this word"
              className="p-2 rounded-full bg-amber-200 hover:bg-amber-300 text-amber-900 transition-transform active:scale-90"
            >
              🔊
            </button>
          </div>

          <p className="font-['Quicksand'] font-medium text-xs text-amber-700 tracking-wider mb-4">
            Sounds like: <span className="font-bold underline">{wordData.pronunciation}</span>
          </p>

          <div className="bg-white/80 rounded-2xl p-4 border border-amber-200 shadow-inner mb-4 text-left">
            <h4 className="font-['Fredoka'] text-xs font-semibold uppercase tracking-wider text-amber-600 mb-1">
              What it means:
            </h4>
            <p className="font-['Quicksand'] text-sm sm:text-base text-[#451A03] font-medium leading-relaxed">
              {wordData.definition}
            </p>
          </div>

          <div className="bg-amber-100/70 rounded-2xl p-4 border border-amber-300 text-left">
            <h4 className="font-['Fredoka'] text-xs font-semibold uppercase tracking-wider text-amber-800 mb-1 flex items-center gap-1">
              <span>🌟</span>
              <span>Did you know?</span>
            </h4>
            <p className="font-['Quicksand'] text-xs sm:text-sm text-[#78350F] leading-relaxed">
              {wordData.funFact}
            </p>
          </div>

          <button
            onClick={onClose}
            className="mt-5 w-full py-2.5 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-['Fredoka'] font-bold text-base shadow-md transition-all active:scale-95"
          >
            I Learned Something New! 🎈
          </button>
        </div>
      </div>
    </div>
  );
};

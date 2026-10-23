import React, { useRef } from "react";
import { ChildrenStory } from "../data/childrenStories";
import { playFanfareSound } from "../services/soundEffects";

interface StoryCertificateModalProps {
  explorerName: string;
  stories: ChildrenStory[];
  foundStars: string[];
  isOpen: boolean;
  onClose: () => void;
}

export const StoryCertificateModal: React.FC<StoryCertificateModalProps> = ({
  explorerName,
  stories,
  foundStars,
  isOpen,
  onClose,
}) => {
  const certificateRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const handlePrint = () => {
    playFanfareSound();
    window.print();
  };

  const today = new Date().toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-2xl w-full bg-[#FFFDF7] rounded-3xl p-6 sm:p-8 shadow-2xl border-4 border-[#FBBF24] max-h-[95vh] overflow-y-auto"
      >
        {/* Certificate Printable Canvas */}
        <div
          ref={certificateRef}
          className="relative bg-gradient-to-b from-[#FFFDF7] via-[#FFF9EE] to-[#FEF3C7] rounded-2xl p-6 sm:p-10 border-8 border-double border-[#D97706] shadow-inner text-center"
        >
          {/* Decorative Corner Ornaments */}
          <div className="absolute top-3 left-3 text-2xl select-none">⚜️</div>
          <div className="absolute top-3 right-3 text-2xl select-none">⚜️</div>
          <div className="absolute bottom-3 left-3 text-2xl select-none">⚜️</div>
          <div className="absolute bottom-3 right-3 text-2xl select-none">⚜️</div>

          <span className="text-4xl mb-2 inline-block">📜</span>

          <h3 className="font-['Cinzel'] tracking-widest text-xs sm:text-sm uppercase font-bold text-[#92400E] mb-1">
            WonderTales Academy of Global Lore
          </h3>

          <h1 className="font-['Baloo_2'] text-2xl sm:text-4xl font-extrabold text-[#78350F] mb-3">
            Certificate of Reading Adventure
          </h1>

          <p className="font-['Cormorant_Garamond'] italic text-base sm:text-lg text-[#574426] mb-2">
            This royal honor is proudly presented to:
          </p>

          <div className="inline-block border-b-2 border-amber-600 px-8 py-1 mb-4">
            <span className="font-['Baloo_2'] text-2xl sm:text-3xl font-bold text-amber-900">
              {explorerName || "Valiant Explorer"}
            </span>
          </div>

          <p className="font-['Quicksand'] text-xs sm:text-sm text-stone-700 max-w-lg mx-auto leading-relaxed mb-5">
            For traveling across the world's continents through story, listening with an open heart to ancient folktales, and discovering wisdom, friendship, and courage in every corner of the earth.
          </p>

          {/* Mastered Cultural Flags */}
          <div className="flex items-center justify-center gap-2 mb-6 flex-wrap">
            {stories.map((s) => (
              <span
                key={s.id}
                title={`${s.country}: ${s.title}`}
                className="w-9 h-9 rounded-full bg-white shadow-sm border border-amber-300 flex items-center justify-center text-lg"
              >
                {s.flag}
              </span>
            ))}
          </div>

          {/* Date & Embossed Seal */}
          <div className="flex items-center justify-between border-t border-amber-200/80 pt-4 px-4 text-xs font-['Fredoka'] text-amber-900">
            <div className="text-left">
              <span className="block text-stone-500 text-[10px]">Date Awarded:</span>
              <span className="font-bold">{today}</span>
            </div>

            {/* Embossed Golden Seal */}
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-amber-400 via-yellow-300 to-amber-500 border-2 border-white shadow-md flex items-center justify-center text-xl filter drop-shadow-xs">
                ⭐
              </div>
              <span className="text-[10px] font-bold mt-0.5 text-amber-800">
                Official Seal
              </span>
            </div>

            <div className="text-right">
              <span className="block text-stone-500 text-[10px]">Stars Collected:</span>
              <span className="font-bold">⭐ {foundStars.length} Stars</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-5 flex items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-2xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-['Fredoka'] font-semibold text-sm transition-colors"
          >
            Close
          </button>

          <button
            onClick={handlePrint}
            className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-['Fredoka'] font-bold text-sm shadow-md transition-all active:scale-95 flex items-center gap-2"
          >
            <span>🖨️</span>
            <span>Print / Save Certificate</span>
          </button>
        </div>
      </div>
    </div>
  );
};

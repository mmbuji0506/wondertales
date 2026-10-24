import React, { useState } from "react";
import { ChildrenStory } from "../data/childrenStories";
import { playChimeSound, playSparkleSound, playFanfareSound } from "../services/soundEffects";

interface StoryMapModalProps {
  stories: ChildrenStory[];
  isOpen: boolean;
  onClose: () => void;
  onSelectStory: (story: ChildrenStory) => void;
  foundStars: string[];
}

interface MapLocation {
  storyId: string;
  name: string;
  flag: string;
  continent: "Africa" | "Asia" | "Americas" | "Europe" | "Oceania";
  xPercent: number; // approximate map coordinate
  yPercent: number;
}

const STORY_LOCATIONS: MapLocation[] = [
  { storyId: "anansi_pot_of_wisdom", name: "Ghana (West Africa)", flag: "🇬🇭", continent: "Africa", xPercent: 49, yPercent: 55 },
  { storyId: "momotaro_peach_boy", name: "Japan (East Asia)", flag: "🇯🇵", continent: "Asia", xPercent: 86, yPercent: 36 },
  { storyId: "colibri_rain_flower", name: "Peru (Andes)", flag: "🇵🇪", continent: "Americas", xPercent: 28, yPercent: 68 },
  { storyId: "ma_liang_paintbrush", name: "China (East Asia)", flag: "🇨🇳", continent: "Asia", xPercent: 76, yPercent: 40 },
  { storyId: "tiddalik_frog", name: "Australia (Dreamtime)", flag: "🇦🇺", continent: "Oceania", xPercent: 85, yPercent: 76 },
  { storyId: "moana_turtle_voyage", name: "Polynesia (Pacific)", flag: "🌺", continent: "Oceania", xPercent: 94, yPercent: 62 },
  { storyId: "lars_northern_lights", name: "Norway (Scandinavia)", flag: "🇳🇴", continent: "Europe", xPercent: 51, yPercent: 18 },
  { storyId: "panchatantra_turtle_geese", name: "India (South Asia)", flag: "🇮🇳", continent: "Asia", xPercent: 68, yPercent: 46 },
  { storyId: "jaguar_quetzal_mexico", name: "Mexico (Mesoamerica)", flag: "🇲🇽", continent: "Americas", xPercent: 20, yPercent: 44 },
  { storyId: "finbar_salmon_ireland", name: "Ireland (Celtic)", flag: "🇮🇪", continent: "Europe", xPercent: 45, yPercent: 26 },
  { storyId: "amira_golden_scarab", name: "Egypt (Nile Valley)", flag: "🇪🇬", continent: "Africa", xPercent: 55, yPercent: 44 },
  { storyId: "curupira_emerald_jaguar", name: "Brazil (Amazon)", flag: "🇧🇷", continent: "Americas", xPercent: 32, yPercent: 64 },
];

export const StoryMapModal: React.FC<StoryMapModalProps> = ({
  stories,
  isOpen,
  onClose,
  onSelectStory,
  foundStars,
}) => {
  const [selectedStoryId, setSelectedStoryId] = useState<string>("anansi_pot_of_wisdom");
  const [selectedContinent, setSelectedContinent] = useState<string>("all");

  if (!isOpen) return null;

  const activeLoc = STORY_LOCATIONS.find((loc) => loc.storyId === selectedStoryId) || STORY_LOCATIONS[0];
  const activeStory = stories.find((s) => s.id === activeLoc.storyId) || stories[0];

  const handlePinClick = (loc: MapLocation) => {
    playChimeSound(659);
    setSelectedStoryId(loc.storyId);
  };

  const handleEmbarkToStory = () => {
    playSparkleSound();
    onSelectStory(activeStory);
    onClose();
  };

  const handleRandomExpedition = () => {
    playFanfareSound();
    const randomLoc = STORY_LOCATIONS[Math.floor(Math.random() * STORY_LOCATIONS.length)];
    setSelectedStoryId(randomLoc.storyId);
    setSelectedContinent(randomLoc.continent);
  };

  const continentFilters = [
    { id: "all", label: "All World (12)" },
    { id: "Africa", label: "Africa (2)" },
    { id: "Asia", label: "Asia (3)" },
    { id: "Americas", label: "Americas (3)" },
    { id: "Europe", label: "Europe (2)" },
    { id: "Oceania", label: "Oceania (2)" },
  ];

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 animate-fadeIn"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-4xl w-full bg-[#FFFDF7] rounded-3xl p-5 sm:p-7 shadow-2xl border-4 border-[#FBBF24] max-h-[92vh] overflow-y-auto flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-amber-200">
          <div className="flex items-center gap-2.5">
            <span className="text-3xl">🗺️</span>
            <div>
              <h2 className="font-['Baloo_2'] text-2xl font-bold text-[#78350F]">
                World Story Atlas
              </h2>
              <p className="font-['Quicksand'] text-xs sm:text-sm text-amber-800">
                Explore where all 12 enchanting children's tales come from around the globe!
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-amber-100 hover:bg-amber-200 text-amber-900 flex items-center justify-center font-bold text-lg cursor-pointer transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Filter Tabs & Random Expedition Bar */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {continentFilters.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  playChimeSound(587);
                  setSelectedContinent(tab.id);
                }}
                className={`px-3 py-1 rounded-full text-xs font-['Fredoka'] font-semibold transition-all cursor-pointer whitespace-nowrap ${
                  selectedContinent === tab.id
                    ? "bg-amber-500 text-white shadow-xs"
                    : "bg-white hover:bg-amber-100 text-stone-700 border border-amber-200"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <button
            onClick={handleRandomExpedition}
            className="px-3 py-1 rounded-full bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300 text-xs font-['Fredoka'] font-bold flex items-center gap-1.5 transition-transform active:scale-95 cursor-pointer shrink-0"
          >
            <span>🎲 Random Expedition</span>
          </button>
        </div>

        {/* The Illustrated Map Canvas Area */}
        <div className="relative w-full rounded-2xl bg-gradient-to-b from-[#BAE6FD] via-[#7DD3FC] to-[#38BDF8] border-2 border-sky-300 p-2 overflow-hidden shadow-inner aspect-[16/9] min-h-[260px] sm:min-h-[360px]">
          {/* Compass Rose */}
          <div className="absolute top-3 right-3 w-10 h-10 sm:w-12 sm:h-12 pointer-events-none opacity-80 flex items-center justify-center font-['Cinzel'] font-bold text-sky-950 text-xs sm:text-sm">
            🧭 N
          </div>

          {/* Subtle World Map SVG Continents Outline */}
          <svg
            viewBox="0 0 1000 550"
            className="absolute inset-0 w-full h-full opacity-60 pointer-events-none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* North America */}
            <path
              d="M 120 70 Q 180 60 260 80 Q 280 150 240 220 Q 210 250 180 290 Q 150 250 110 180 Z"
              fill="#86EFAC"
              stroke="#4ADE80"
              strokeWidth={2}
            />
            {/* South America */}
            <path
              d="M 230 290 Q 320 310 320 390 Q 280 490 240 510 Q 210 430 220 350 Z"
              fill="#86EFAC"
              stroke="#4ADE80"
              strokeWidth={2}
            />
            {/* Europe */}
            <path
              d="M 440 80 Q 520 70 560 120 Q 530 190 460 200 Q 420 150 440 80 Z"
              fill="#86EFAC"
              stroke="#4ADE80"
              strokeWidth={2}
            />
            {/* Africa */}
            <path
              d="M 450 210 Q 550 200 580 300 Q 540 430 490 440 Q 430 350 450 210 Z"
              fill="#86EFAC"
              stroke="#4ADE80"
              strokeWidth={2}
            />
            {/* Asia */}
            <path
              d="M 570 90 Q 750 70 870 140 Q 860 260 760 300 Q 640 280 580 190 Z"
              fill="#86EFAC"
              stroke="#4ADE80"
              strokeWidth={2}
            />
            {/* Australia & Oceania */}
            <path
              d="M 780 370 Q 880 370 870 460 Q 800 480 770 420 Z"
              fill="#86EFAC"
              stroke="#4ADE80"
              strokeWidth={2}
            />
          </svg>

          {/* Ocean Waves Decor */}
          <div className="absolute left-6 top-8 text-sky-100 text-xs font-['Fredoka'] opacity-70 tracking-widest pointer-events-none">
            🌊 NORTH ATLANTIC
          </div>
          <div className="absolute right-12 bottom-6 text-sky-100 text-xs font-['Fredoka'] opacity-70 tracking-widest pointer-events-none">
            🌊 SOUTH PACIFIC
          </div>

          {/* Interactive Glowing Story Pins */}
          {STORY_LOCATIONS.map((loc) => {
            const isSelected = loc.storyId === selectedStoryId;
            const storyObj = stories.find((s) => s.id === loc.storyId);
            const starsForStory = foundStars.filter((s) => s.startsWith(storyObj?.title || "")).length;
            const matchesContinent = selectedContinent === "all" || loc.continent === selectedContinent;

            return (
              <button
                key={loc.storyId}
                onClick={() => handlePinClick(loc)}
                style={{
                  left: `${loc.xPercent}%`,
                  top: `${loc.yPercent}%`,
                }}
                className={`absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer transition-all duration-300 z-20 ${
                  isSelected ? "scale-125 z-30" : "hover:scale-115"
                } ${matchesContinent ? "opacity-100" : "opacity-35 scale-90"}`}
                title={`${loc.name} · ${storyObj?.title}`}
              >
                <div
                  className={`relative flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full shadow-lg border-2 transition-all ${
                    isSelected
                      ? "bg-amber-400 border-white ring-4 ring-amber-300 animate-bounce"
                      : "bg-white/95 border-amber-400 hover:bg-amber-100"
                  }`}
                >
                  <span className="text-base sm:text-xl filter drop-shadow-xs">{loc.flag}</span>
                  {starsForStory > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 text-stone-900 text-[10px] font-bold rounded-full flex items-center justify-center border border-white">
                      ★
                    </span>
                  )}
                </div>
                {/* Floating Pin Label */}
                <span
                  className={`hidden sm:block absolute left-1/2 -translate-x-1/2 top-full mt-1 px-2 py-0.5 rounded-full text-[10px] font-['Fredoka'] font-bold whitespace-nowrap shadow-sm pointer-events-none ${
                    isSelected
                      ? "bg-stone-900 text-amber-300"
                      : "bg-white/90 text-stone-800 opacity-90 group-hover:opacity-100"
                  }`}
                >
                  {storyObj?.country}
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Country Story Preview Card */}
        {activeStory && (
          <div className="mt-4 p-4 rounded-2xl bg-amber-50 border-2 border-amber-300 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <span className="text-4xl filter drop-shadow-xs">{activeStory.flag}</span>
              <div>
                <span className="text-[10px] font-['Fredoka'] uppercase tracking-wider text-amber-800 font-bold block">
                  {activeStory.country} · {activeStory.culture} Tradition ({activeStory.region})
                </span>
                <h3 className="font-['Baloo_2'] text-xl font-bold text-[#451A03] leading-tight">
                  {activeStory.title}
                </h3>
                <p className="font-['Quicksand'] text-xs text-stone-600 line-clamp-1 mt-0.5">
                  "{activeStory.moral}"
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 w-full sm:w-auto">
              <button
                onClick={handleEmbarkToStory}
                className="w-full sm:w-auto px-5 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-600 active:scale-95 text-white font-['Fredoka'] font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer whitespace-nowrap"
              >
                <span>Open Storybook</span>
                <span>📖 ➔</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

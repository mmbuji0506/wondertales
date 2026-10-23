import React, { useState } from "react";
import { ChildrenStory } from "../data/childrenStories";
import { playChimeSound } from "../services/soundEffects";

interface StoryLibraryGalleryProps {
  stories: ChildrenStory[];
  activeStoryId: string;
  onSelectStory: (story: ChildrenStory) => void;
  onOpenStoryWeaver: () => void;
  onOpenCulturalLore: (story: ChildrenStory) => void;
  foundStars: string[];
}

const REGION_FILTERS = [
  { id: "all", label: "All Worlds 🌍" },
  { id: "Africa", label: "Africa 🇬🇭" },
  { id: "Asia", label: "Asia 🇯🇵🇨🇳🇮🇳" },
  { id: "Americas", label: "Americas 🇵🇪🇲🇽" },
  { id: "Europe", label: "Europe 🇳🇴🇮🇪" },
  { id: "Oceania", label: "Oceania 🌺🇦🇺" },
];

export const StoryLibraryGallery: React.FC<StoryLibraryGalleryProps> = ({
  stories,
  activeStoryId,
  onSelectStory,
  onOpenStoryWeaver,
  onOpenCulturalLore,
  foundStars,
}) => {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredStories = stories.filter((s) => {
    // Continent filter
    if (selectedFilter === "Africa" && !s.region.includes("Africa")) return false;
    if (selectedFilter === "Asia" && !s.region.includes("Asia")) return false;
    if (selectedFilter === "Americas" && !s.region.includes("America")) return false;
    if (selectedFilter === "Europe" && !s.region.includes("Europe")) return false;
    if (selectedFilter === "Oceania" && !s.region.includes("Oceania") && !s.region.includes("Polynesia")) return false;

    // Search query filter (title, country, culture, summary, theme)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const match =
        s.title.toLowerCase().includes(q) ||
        s.country.toLowerCase().includes(q) ||
        s.culture.toLowerCase().includes(q) ||
        s.summary.toLowerCase().includes(q) ||
        s.theme.toLowerCase().includes(q) ||
        s.pages.some((p) => p.narrativeText.toLowerCase().includes(q));
      if (!match) return false;
    }

    return true;
  });

  return (
    <div className="w-full max-w-6xl mx-auto py-6 px-4">
      {/* Title & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="font-['Baloo_2'] text-2xl sm:text-3xl font-extrabold text-[#451A03] flex items-center gap-2">
            <span>📚</span>
            <span>Global Storybook Treasury</span>
          </h2>
          <p className="font-['Quicksand'] text-xs sm:text-sm text-stone-600">
            Enchanting folktales and children's adventures from every continent of the earth.
          </p>
        </div>

        {/* Action Button: AI Magic Story Weaver */}
        <button
          onClick={onOpenStoryWeaver}
          className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-['Fredoka'] font-bold text-sm shadow-md transition-all active:scale-95 flex items-center gap-2 shrink-0 cursor-pointer"
        >
          <span>🪄</span>
          <span>Weave New Story with AI</span>
        </button>
      </div>

      {/* Search Input & Continent Filters */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-6">
        {/* Search Bar */}
        <div className="relative flex-1 max-w-md">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400 text-sm">
            🔍
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by animal (bear, turtle, spider), country, or theme..."
            className="w-full pl-9 pr-8 py-2 rounded-2xl bg-white border border-amber-200 text-xs sm:text-sm font-['Quicksand'] text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-400 shadow-2xs"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 text-xs font-bold"
            >
              ✕
            </button>
          )}
        </div>

        {/* Continent Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {REGION_FILTERS.map((f) => (
            <button
              key={f.id}
              onClick={() => {
                playChimeSound(659);
                setSelectedFilter(f.id);
              }}
              className={`px-3 py-1.5 rounded-full text-xs font-['Fredoka'] font-semibold transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                selectedFilter === f.id
                  ? "bg-amber-500 text-white shadow-xs"
                  : "bg-white/80 hover:bg-amber-100 text-stone-700 border border-amber-200"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Storybook Shelf Grid */}
      {filteredStories.length === 0 ? (
        <div className="py-16 text-center bg-white/60 rounded-3xl border border-amber-200 p-8">
          <span className="text-4xl block mb-2">🔍</span>
          <h3 className="font-['Baloo_2'] text-xl font-bold text-amber-900 mb-1">
            No Stories Found Matching "{searchQuery}"
          </h3>
          <p className="font-['Quicksand'] text-xs sm:text-sm text-stone-600 mb-4">
            Try searching for another animal, country, or clear your filters!
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedFilter("all");
            }}
            className="px-4 py-2 rounded-xl bg-amber-500 text-white font-['Fredoka'] font-bold text-xs shadow-xs"
          >
            Show All Stories
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStories.map((s) => {
            const isSelected = s.id === activeStoryId;
            const starsCollectedForThisBook = foundStars.filter((starId) =>
              starId.startsWith(s.title)
            ).length;

            return (
              <div
                key={s.id}
                style={{
                  borderColor: s.coverSpine,
                }}
                className={`group relative rounded-3xl p-4 sm:p-5 transition-all duration-300 border-3 flex flex-col justify-between shadow-md hover:shadow-xl hover:-translate-y-1.5 ${
                  isSelected
                    ? "bg-[#FFF9EE] ring-4 ring-amber-400"
                    : "bg-white hover:bg-[#FFFDF9]"
                }`}
              >
                {/* Header Info */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="flex items-center gap-1.5 text-xs font-['Fredoka'] font-bold text-stone-600">
                      <span className="text-base">{s.flag}</span>
                      <span>{s.country}</span>
                    </span>

                    <span className="text-[11px] font-['Fredoka'] px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-medium">
                      {s.ageRange}
                    </span>
                  </div>

                  <h3
                    onClick={() => {
                      playChimeSound(784);
                      onSelectStory(s);
                    }}
                    className="font-['Baloo_2'] text-xl font-bold text-[#3B2813] group-hover:text-amber-800 transition-colors leading-snug mb-1 cursor-pointer"
                  >
                    {s.title}
                  </h3>
                  <p className="font-['Quicksand'] text-xs text-stone-500 mb-3 line-clamp-1">
                    {s.subtitle}
                  </p>

                  {/* Cover Art Preview */}
                  <div
                    onClick={() => {
                      playChimeSound(784);
                      onSelectStory(s);
                    }}
                    className="w-full aspect-[16/10] rounded-2xl overflow-hidden shadow-inner border border-stone-200 mb-3 bg-[#FEF9EE] group-hover:scale-[1.01] transition-transform cursor-pointer"
                    dangerouslySetInnerHTML={{ __html: s.coverSvg }}
                  />

                  <p className="font-['Quicksand'] text-xs text-stone-600 line-clamp-2 leading-relaxed mb-3">
                    {s.summary}
                  </p>
                </div>

                {/* Bottom Card Footer */}
                <div className="pt-3 border-t border-stone-100 flex items-center justify-between gap-2">
                  <span className="text-xs font-['Fredoka'] text-amber-800 font-semibold flex items-center gap-1">
                    <span>⭐</span>
                    <span>{starsCollectedForThisBook}/{s.pages.length} Stars</span>
                  </span>

                  <div className="flex items-center gap-1.5">
                    {/* Cultural Lore Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenCulturalLore(s);
                      }}
                      title="Read historical lore and cultural background"
                      className="p-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 text-xs font-['Fredoka'] font-medium transition-colors border border-amber-200 cursor-pointer"
                    >
                      🏛️ Lore
                    </button>

                    <button
                      onClick={() => {
                        playChimeSound(784);
                        onSelectStory(s);
                      }}
                      className={`px-3 py-1.5 rounded-xl text-xs font-['Fredoka'] font-bold transition-all cursor-pointer ${
                        isSelected
                          ? "bg-amber-500 text-white shadow-xs"
                          : "bg-amber-100 group-hover:bg-amber-500 group-hover:text-white text-amber-900"
                      }`}
                    >
                      {isSelected ? "📖 Reading" : "Open Book ➔"}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

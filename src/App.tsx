import React, { useEffect, useState } from "react";
import { CHILDREN_STORIES, ChildrenStory, StoryVocabularyWord } from "./data/childrenStories";
import { BookPageSpread } from "./components/BookPageSpread";
import { StoryLibraryGallery } from "./components/StoryLibraryGallery";
import { WordMagicModal } from "./components/WordMagicModal";
import { NarratorSelector } from "./components/NarratorSelector";
import { StoryWeaverModal } from "./components/StoryWeaverModal";
import { PassportModal } from "./components/PassportModal";
import { AudioSettingsModal } from "./components/AudioSettingsModal";
import { CulturalLoreDrawer } from "./components/CulturalLoreDrawer";
import { StoryCertificateModal } from "./components/StoryCertificateModal";
import { BedtimeStars } from "./components/BedtimeStars";
import { StoryMapModal } from "./components/StoryMapModal";
import { ColoringStudioModal } from "./components/ColoringStudioModal";
import { VoiceRecorderModal } from "./components/VoiceRecorderModal";
import { StoryMemoryGameModal } from "./components/StoryMemoryGameModal";
import { StoryWonderQuizModal } from "./components/StoryWonderQuizModal";
import { NARRATOR_PERSONAS, speechNarrator } from "./services/speechNarrator";
import {
  playChimeSound,
  playSparkleSound,
  startAmbientMusic,
  stopAmbientMusic,
  MusicTheme,
} from "./services/soundEffects";

export default function App() {
  const [stories, setStories] = useState<ChildrenStory[]>(CHILDREN_STORIES);
  const [activeStory, setActiveStory] = useState<ChildrenStory>(CHILDREN_STORIES[0]);
  const [currentPageIdx, setCurrentPageIdx] = useState<number>(0);
  const [viewMode, setViewMode] = useState<"reader" | "library">("reader");

  // Narrator & Audio state
  const [narratorPersonaId, setNarratorPersonaId] = useState<string>("grandma_willow");
  const [ambientTheme, setAmbientTheme] = useState<MusicTheme>("lullaby");
  const [autoPageTurn, setAutoPageTurn] = useState<boolean>(true);
  const [screenWarmthFilter, setScreenWarmthFilter] = useState<"none" | "candle" | "twilight" | "deep">("none");

  // Child interactive quests & rewards
  const [foundStars, setFoundStars] = useState<string[]>([]);
  const [isBedtimeMode, setIsBedtimeMode] = useState<boolean>(false);
  const [explorerName, setExplorerName] = useState<string>("Little Explorer");

  // Custom Recorded Voices (key: `${storyId}-page-${pageNumber}`)
  const [customPageVoices, setCustomPageVoices] = useState<Record<string, string>>({});

  // Modals & Drawers
  const [activeWordMagic, setActiveWordMagic] = useState<StoryVocabularyWord | null>(null);
  const [isNarratorModalOpen, setIsNarratorModalOpen] = useState<boolean>(false);
  const [isStoryWeaverOpen, setIsStoryWeaverOpen] = useState<boolean>(false);
  const [isPassportOpen, setIsPassportOpen] = useState<boolean>(false);
  const [isAudioSettingsOpen, setIsAudioSettingsOpen] = useState<boolean>(false);
  const [loreStory, setLoreStory] = useState<ChildrenStory | null>(null);
  const [isCertificateOpen, setIsCertificateOpen] = useState<boolean>(false);
  const [isStoryMapOpen, setIsStoryMapOpen] = useState<boolean>(false);
  const [isColoringStudioOpen, setIsColoringStudioOpen] = useState<boolean>(false);
  const [isVoiceRecorderOpen, setIsVoiceRecorderOpen] = useState<boolean>(false);
  const [isMemoryGameOpen, setIsMemoryGameOpen] = useState<boolean>(false);
  const [isQuizOpen, setIsQuizOpen] = useState<boolean>(false);

  // Start gentle ambient lullaby on first user click
  useEffect(() => {
    const handleFirstInteraction = () => {
      if (ambientTheme !== "none") {
        startAmbientMusic(ambientTheme, 0.25);
      }
      window.removeEventListener("click", handleFirstInteraction);
    };
    window.addEventListener("click", handleFirstInteraction, { once: true });
    return () => {
      window.removeEventListener("click", handleFirstInteraction);
      stopAmbientMusic();
    };
  }, [ambientTheme]);

  const activePersona =
    NARRATOR_PERSONAS.find((p) => p.id === narratorPersonaId) || NARRATOR_PERSONAS[0];

  const handleSelectStory = (story: ChildrenStory) => {
    setActiveStory(story);
    setCurrentPageIdx(0);
    setViewMode("reader");
    speechNarrator.stop();
  };

  const handleStoryCreated = (newStory: ChildrenStory) => {
    setStories((prev) => [newStory, ...prev]);
    setActiveStory(newStory);
    setCurrentPageIdx(0);
    setViewMode("reader");
  };

  const handleFindStar = (starId: string) => {
    if (!foundStars.includes(starId)) {
      setFoundStars((prev) => [...prev, starId]);
      playSparkleSound();
    }
  };

  const toggleBedtimeMode = () => {
    playChimeSound(523);
    setIsBedtimeMode((prev) => !prev);
    if (!isBedtimeMode) {
      setAmbientTheme("lullaby");
      startAmbientMusic("lullaby", 0.25);
    }
  };

  const handleOpenCertificate = (name: string) => {
    setExplorerName(name || "Little Explorer");
    setIsCertificateOpen(true);
  };

  const handleSavePageVoice = (pageNum: number, audioUrl: string) => {
    setCustomPageVoices((prev) => ({
      ...prev,
      [`${activeStory.id}-page-${pageNum}`]: audioUrl,
    }));
  };

  const currentPage = activeStory.pages[currentPageIdx] || activeStory.pages[0];
  const currentVoiceKey = `${activeStory.id}-page-${currentPage.pageNumber}`;
  const currentVoiceAudio = customPageVoices[currentVoiceKey];

  return (
    <div
      className={`min-h-screen w-full flex flex-col justify-between transition-colors duration-700 relative overflow-x-hidden ${
        isBedtimeMode
          ? "bg-[#090D16] text-[#F3F4F6]"
          : "bg-[#FFFDF7] text-[#2D2A26]"
      }`}
    >
      {/* Bedtime Twinkling Stars Background */}
      <BedtimeStars isActive={isBedtimeMode} />

      {/* =====================================================================
          TOP BAR CONTRACT: [Brand Wordmark] — [Nav Links] — [Action Buttons]
         ===================================================================== */}
      <header
        className={`sticky top-0 z-40 w-full px-4 sm:px-8 py-3.5 backdrop-blur-md border-b transition-colors duration-500 flex items-center justify-between gap-8 ${
          isBedtimeMode
            ? "bg-[#0F172A]/85 border-slate-800"
            : "bg-[#FFFDF7]/90 border-amber-200/80 shadow-xs"
        }`}
      >
        {/* Zone 1: Single Wordmark Brand */}
        <button
          onClick={() => {
            playChimeSound(659);
            setViewMode("reader");
          }}
          className="flex items-center gap-2 group whitespace-nowrap shrink-0 text-left cursor-pointer"
        >
          <span className="text-2xl sm:text-3xl filter drop-shadow-xs group-hover:scale-110 transition-transform">
            📖
          </span>
          <span
            className={`font-['Baloo_2'] text-xl sm:text-2xl font-extrabold tracking-tight transition-colors ${
              isBedtimeMode ? "text-amber-300" : "text-[#78350F]"
            }`}
          >
            WonderTales
          </span>
        </button>

        {/* Zone 2: Clean single-line navigation links */}
        <nav className="hidden md:flex items-center gap-5 lg:gap-6 text-sm font-semibold font-['Fredoka']">
          <button
            onClick={() => {
              playChimeSound(587);
              setViewMode("library");
            }}
            className={`hover:text-amber-600 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer ${
              viewMode === "library"
                ? "text-amber-600 font-bold underline decoration-amber-400 decoration-2"
                : isBedtimeMode ? "text-slate-300" : "text-stone-700"
            }`}
          >
            <span>📚</span>
            <span>Treasury Shelf</span>
          </button>

          <button
            onClick={() => {
              playChimeSound(659);
              setIsStoryMapOpen(true);
            }}
            className={`hover:text-amber-600 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer ${
              isBedtimeMode ? "text-slate-300" : "text-stone-700"
            }`}
          >
            <span>🗺️</span>
            <span>Story Atlas</span>
          </button>

          <button
            onClick={() => {
              playChimeSound(659);
              setViewMode("reader");
            }}
            className={`hover:text-amber-600 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer ${
              viewMode === "reader"
                ? "text-amber-600 font-bold underline decoration-amber-400 decoration-2"
                : isBedtimeMode ? "text-slate-300" : "text-stone-700"
            }`}
          >
            <span>📖</span>
            <span>Storybook Reader</span>
          </button>

          <button
            onClick={() => {
              playChimeSound(784);
              setIsPassportOpen(true);
            }}
            className={`hover:text-amber-600 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer ${
              isBedtimeMode ? "text-slate-300" : "text-stone-700"
            }`}
          >
            <span>🛂</span>
            <span>Passport</span>
          </button>

          <button
            onClick={() => {
              playChimeSound(784);
              setIsMemoryGameOpen(true);
            }}
            className={`hover:text-amber-600 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer ${
              isBedtimeMode ? "text-slate-300" : "text-stone-700"
            }`}
          >
            <span>🃏</span>
            <span>Memory Game</span>
          </button>

          <button
            onClick={() => {
              playChimeSound(784);
              setIsStoryWeaverOpen(true);
            }}
            className="hover:text-amber-600 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer text-amber-600 font-bold"
          >
            <span>🪄</span>
            <span>Story Weaver</span>
          </button>
        </nav>

        {/* Zone 3: Primary Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Folktale Memory Match Game Button */}
          <button
            onClick={() => {
              playChimeSound(784);
              setIsMemoryGameOpen(true);
            }}
            title="Play World Folktale Memory Match Game"
            className={`hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-full text-xs font-['Fredoka'] font-bold transition-transform active:scale-95 ${
              isBedtimeMode
                ? "bg-slate-800 text-amber-300 hover:bg-slate-700"
                : "bg-amber-100/80 hover:bg-amber-200 text-amber-900 border border-amber-300"
            }`}
          >
            <span>🃏 Match Game</span>
          </button>

          {/* Folklore Quiz Button */}
          <button
            onClick={() => {
              playChimeSound(659);
              setIsQuizOpen(true);
            }}
            title="Take the Folklore Master Quiz"
            className={`hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-full text-xs font-['Fredoka'] font-bold transition-transform active:scale-95 ${
              isBedtimeMode
                ? "bg-slate-800 text-amber-300 hover:bg-slate-700"
                : "bg-amber-500 hover:bg-amber-600 text-white shadow-xs"
            }`}
          >
            <span>🧠 Folklore Quiz</span>
          </button>

          {/* Certificate Award Button */}
          <button
            onClick={() => setIsCertificateOpen(true)}
            title="View Official Certificate of Reading Adventure"
            className={`hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-full text-xs font-['Fredoka'] font-bold transition-transform active:scale-95 ${
              isBedtimeMode
                ? "bg-slate-800 text-amber-300 hover:bg-slate-700"
                : "bg-amber-100/80 hover:bg-amber-200 text-amber-900 border border-amber-300"
            }`}
          >
            <span>📜 Certificate</span>
          </button>

          {/* Passport / Star Tally Button */}
          <button
            onClick={() => {
              playChimeSound(784);
              setIsPassportOpen(true);
            }}
            title="Open Explorer Passport to see collected cultural badges and stars"
            className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-['Fredoka'] font-bold transition-transform active:scale-95 ${
              isBedtimeMode
                ? "bg-amber-950/70 border border-amber-600/50 text-amber-300 hover:bg-amber-900/60"
                : "bg-amber-100 hover:bg-amber-200 border border-amber-300 text-amber-900"
            }`}
          >
            <span>⭐</span>
            <span>{foundStars.length} Stars</span>
          </button>

          {/* Audio Settings Button */}
          <button
            onClick={() => setIsAudioSettingsOpen(true)}
            title="Audio, Volume & Sleep Timer Settings"
            className={`p-2 rounded-full text-xs transition-colors cursor-pointer ${
              isBedtimeMode
                ? "bg-slate-800 text-amber-300 hover:bg-slate-700"
                : "bg-amber-100 hover:bg-amber-200 text-amber-900"
            }`}
          >
            🎛️
          </button>

          {/* Bedtime Mode Toggle */}
          <button
            onClick={toggleBedtimeMode}
            className={`px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-['Fredoka'] font-semibold transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer ${
              isBedtimeMode
                ? "bg-amber-400 text-slate-900 hover:bg-amber-300 shadow-md"
                : "bg-stone-800 text-white hover:bg-stone-900"
            }`}
          >
            <span>{isBedtimeMode ? "☀️ Daylight" : "🌙 Bedtime"}</span>
          </button>

          {/* Mobile Library toggle */}
          <button
            onClick={() => setViewMode(viewMode === "reader" ? "library" : "reader")}
            className="md:hidden p-2 rounded-xl bg-amber-100 text-amber-900 text-xs font-bold"
          >
            {viewMode === "reader" ? "📚 Library" : "📖 Read"}
          </button>
        </div>
      </header>

      {/* =====================================================================
          MAIN CONTENT AREA: 3D OPEN BOOK SPREAD OR GLOBAL STORY SHELF
         ===================================================================== */}
      <main className="flex-1 w-full flex items-center justify-center p-2 sm:p-6 z-10">
        {viewMode === "reader" ? (
          <BookPageSpread
            story={activeStory}
            currentPageIdx={currentPageIdx}
            onPageChange={(idx) => setCurrentPageIdx(idx)}
            foundStars={foundStars}
            onFindStar={handleFindStar}
            onOpenWordMagic={(word) => setActiveWordMagic(word)}
            onOpenNarratorModal={() => setIsNarratorModalOpen(true)}
            onOpenAudioSettings={() => setIsAudioSettingsOpen(true)}
            onOpenCulturalLore={() => setLoreStory(activeStory)}
            onOpenColoringStudio={() => setIsColoringStudioOpen(true)}
            onOpenVoiceRecorder={() => setIsVoiceRecorderOpen(true)}
            customAudioUrl={currentVoiceAudio}
            activePersonaAvatar={activePersona.avatar}
            activePersonaName={activePersona.name}
            isBedtimeMode={isBedtimeMode}
            autoPageTurn={autoPageTurn}
            onOpenQuiz={() => setIsQuizOpen(true)}
          />
        ) : (
          <StoryLibraryGallery
            stories={stories}
            activeStoryId={activeStory.id}
            onSelectStory={handleSelectStory}
            onOpenStoryWeaver={() => setIsStoryWeaverOpen(true)}
            onOpenCulturalLore={(story) => setLoreStory(story)}
            foundStars={foundStars}
          />
        )}
      </main>

      {/* =====================================================================
          CALM QUIET FOOTER
         ===================================================================== */}
      <footer
        className={`w-full py-3.5 px-6 border-t text-center text-xs font-['Quicksand'] font-medium z-10 transition-colors ${
          isBedtimeMode
            ? "border-slate-800 text-slate-500 bg-[#090D16]"
            : "border-amber-200/60 text-stone-500 bg-[#FFFDF7]"
        }`}
      >
        <div className="flex flex-col sm:flex-row items-center justify-between max-w-6xl mx-auto gap-2">
          <span>WonderTales · Beautiful Illustrated Children's Stories From Around The World</span>
          <div className="flex items-center gap-3 sm:gap-4 text-[11px] font-['Fredoka'] flex-wrap justify-center">
            <button
              onClick={() => setIsStoryMapOpen(true)}
              className="hover:underline text-amber-700 cursor-pointer font-bold"
            >
              🗺️ Story Atlas
            </button>
            <span aria-hidden="true">·</span>
            <button
              onClick={() => setIsPassportOpen(true)}
              className="hover:underline text-amber-700 cursor-pointer"
            >
              Explorer Passport
            </button>
            <span aria-hidden="true">·</span>
            <button
              onClick={() => setIsCertificateOpen(true)}
              className="hover:underline text-amber-700 cursor-pointer"
            >
              Printable Certificate
            </button>
            <span aria-hidden="true">·</span>
            <button
              onClick={() => setIsAudioSettingsOpen(true)}
              className="hover:underline text-amber-700 cursor-pointer"
            >
              Bedtime Sleep Timer
            </button>
            <span aria-hidden="true">·</span>
            <button
              onClick={() => setViewMode(viewMode === "reader" ? "library" : "reader")}
              className="hover:underline text-amber-700 cursor-pointer"
            >
              {viewMode === "reader" ? "Treasury Library" : "Open Current Story"}
            </button>
          </div>
        </div>
      </footer>

      {/* Interactive Modals & Drawers */}
      <WordMagicModal
        wordData={activeWordMagic}
        onClose={() => setActiveWordMagic(null)}
      />

      <NarratorSelector
        currentPersonaId={narratorPersonaId}
        onSelectPersona={(id) => setNarratorPersonaId(id)}
        ambientTheme={ambientTheme}
        onSelectAmbientTheme={(th) => setAmbientTheme(th)}
        isOpen={isNarratorModalOpen}
        onClose={() => setIsNarratorModalOpen(false)}
      />

      <StoryWeaverModal
        isOpen={isStoryWeaverOpen}
        onClose={() => setIsStoryWeaverOpen(false)}
        onStoryCreated={handleStoryCreated}
      />

      <PassportModal
        stories={stories}
        foundStars={foundStars}
        activeStoryId={activeStory.id}
        isOpen={isPassportOpen}
        onClose={() => setIsPassportOpen(false)}
        onSelectStory={handleSelectStory}
        onOpenCertificate={handleOpenCertificate}
      />

      <AudioSettingsModal
        isOpen={isAudioSettingsOpen}
        onClose={() => setIsAudioSettingsOpen(false)}
        ambientTheme={ambientTheme}
        onSelectAmbientTheme={(th) => setAmbientTheme(th)}
        autoPageTurn={autoPageTurn}
        onToggleAutoPageTurn={(en) => setAutoPageTurn(en)}
        screenWarmthFilter={screenWarmthFilter}
        onSelectScreenWarmth={setScreenWarmthFilter}
      />

      {loreStory && (
        <CulturalLoreDrawer
          story={loreStory}
          isOpen={Boolean(loreStory)}
          onClose={() => setLoreStory(null)}
        />
      )}

      <StoryCertificateModal
        explorerName={explorerName}
        stories={stories}
        foundStars={foundStars}
        isOpen={isCertificateOpen}
        onClose={() => setIsCertificateOpen(false)}
      />

      <StoryMapModal
        stories={stories}
        isOpen={isStoryMapOpen}
        onClose={() => setIsStoryMapOpen(false)}
        onSelectStory={(s) => {
          handleSelectStory(s);
          setIsStoryMapOpen(false);
        }}
        foundStars={foundStars}
      />

      <ColoringStudioModal
        page={currentPage}
        storyTitle={activeStory.title}
        isOpen={isColoringStudioOpen}
        onClose={() => setIsColoringStudioOpen(false)}
      />

      <VoiceRecorderModal
        page={currentPage}
        storyTitle={activeStory.title}
        isOpen={isVoiceRecorderOpen}
        onClose={() => setIsVoiceRecorderOpen(false)}
        onSaveRecording={handleSavePageVoice}
        existingAudioUrl={currentVoiceAudio}
      />

      <StoryMemoryGameModal
        isOpen={isMemoryGameOpen}
        onClose={() => setIsMemoryGameOpen(false)}
        onRewardStar={handleFindStar}
      />

      <StoryWonderQuizModal
        story={activeStory}
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        onRewardStars={handleFindStar}
        onOpenDiploma={() => setIsCertificateOpen(true)}
      />

      {/* Screen Nightlight Warmth Filter Overlay */}
      {screenWarmthFilter !== "none" && (
        <div
          className={`fixed inset-0 pointer-events-none z-50 transition-opacity duration-700 ${
            screenWarmthFilter === "candle"
              ? "bg-amber-600/12 mix-blend-multiply"
              : screenWarmthFilter === "twilight"
              ? "bg-indigo-950/16 mix-blend-multiply"
              : "bg-yellow-700/18 mix-blend-multiply"
          }`}
        />
      )}
    </div>
  );
}

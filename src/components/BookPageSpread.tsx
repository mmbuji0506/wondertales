import React, { useEffect, useRef, useState } from "react";
import { ChildrenStory, ChildrenStoryPage, StoryVocabularyWord } from "../data/childrenStories";
import { StoryPlateIllustration } from "./StoryPlateIllustration";
import { StorySoundBoard } from "./StorySoundBoard";
import { AtmosphericEffectCanvas } from "./AtmosphericEffectCanvas";
import {
  playPageTurnSound,
  playChimeSound,
  playFanfareSound,
  playSparkleSound,
  playRoarSound,
  playSplashSound,
  playWindBreezeSound,
  playBellChimeSound,
  playGiggleSound,
  playPhonicsBlipSound,
  playCorrectAnswerSound,
} from "../services/soundEffects";
import { speechNarrator, SpokenSegment } from "../services/speechNarrator";

interface BookPageSpreadProps {
  story: ChildrenStory;
  currentPageIdx: number;
  onPageChange: (newPageIdx: number) => void;
  foundStars: string[];
  onFindStar: (starId: string) => void;
  onOpenWordMagic: (word: StoryVocabularyWord) => void;
  onOpenNarratorModal: () => void;
  onOpenAudioSettings: () => void;
  activePersonaAvatar: string;
  activePersonaName: string;
  isBedtimeMode: boolean;
  autoPageTurn: boolean;
  onOpenCulturalLore?: () => void;
  onOpenColoringStudio?: () => void;
  onOpenVoiceRecorder?: () => void;
  onOpenQuiz?: () => void;
  customAudioUrl?: string;
}

// Cultural riddles for the end of each story
const STORY_RIDDLES: Record<
  string,
  { question: string; options: string[]; correctIdx: number; funCelebration: string }
> = {
  anansi_pot_of_wisdom: {
    question: "Where did clever Anansi try to tie the clay pot of wisdom?",
    options: ["In a secret cave", "At the top of a giant baobab tree", "At the bottom of the ocean"],
    correctIdx: 1,
    funCelebration: "Super job! Anansi tied it around his belly, then learned sharing is sweetest!",
  },
  momotaro_peach_boy: {
    question: "What delicious treat did Momotaro share to make friends with the animals?",
    options: ["Sweet millet dumplings (kibi-dango)", "Roasted marshmallows", "Crunchy carrot sticks"],
    correctIdx: 0,
    funCelebration: "Hooray! The sweet millet dumplings brought everyone together in peace!",
  },
  colibri_rain_flower: {
    question: "Which brave creature flew all the way to the mountain summit to save the flowers?",
    options: ["The giant condor", "The little golden hummingbird", "The mountain llama"],
    correctIdx: 1,
    funCelebration: "Wonderful! The tiniest hummingbird showed the greatest courage!",
  },
  ma_liang_paintbrush: {
    question: "What happened to the paintings Ma Liang created with his magical paintbrush?",
    options: ["They turned into gold coins", "They sprang to life!", "They flew away into outer space"],
    correctIdx: 1,
    funCelebration: "Splendid! The paintings came alive to help the kind-hearted villagers!",
  },
  tiddalik_frog: {
    question: "What finally made Tiddalik the giant frog release the billabong water?",
    options: ["A ticklish, contagious belly laugh", "A cold winter frost", "A loud clap of thunder"],
    correctIdx: 0,
    funCelebration: "Belly laugh! Laughter brought the sweet sparkling water back to Australia!",
  },
  moana_turtle_voyage: {
    question: "How did Polynesian navigators find their way across the wide Pacific Ocean?",
    options: ["By reading the stars and ocean swells", "With paper street maps", "By asking seagulls"],
    correctIdx: 0,
    funCelebration: "Bravo! Wayfinders steered by the Southern Cross and the whispering currents!",
  },
  lars_northern_lights: {
    question: "What danced in green and violet ribbons across the Arctic night sky for Lars?",
    options: ["Shooting fireworks", "The dancing Northern Lights (Aurora)", "City neon signs"],
    correctIdx: 1,
    funCelebration: "Magical! The Northern Lights painted a soothing twilight lullaby!",
  },
  panchatantra_turtle_geese: {
    question: "How did Kambugriva the turtle travel through the sky with his geese friends?",
    options: ["In a wicker travel basket", "Biting firmly on a wooden willow stick", "On a magic flying carpet"],
    correctIdx: 1,
    funCelebration: "Spot on! By holding the stick with quiet patience, Kambugriva soared safely!",
  },
  jaguar_quetzal_mexico: {
    question: "What helped Balam the jaguar cub calm down and step free from the roots?",
    options: ["A spider monkey shared a banana", "The Quetzal bird's gentle song of peace", "He gave his loudest angry roar"],
    correctIdx: 1,
    funCelebration: "Brilliant! Listening to the gentle song helped Balam step free in peace!",
  },
  finbar_salmon_ireland: {
    question: "How did young Finbar first taste the droplet of wisdom from the Salmon?",
    options: ["He drank from a crystal cup", "He put his thumb to his lips when a tiny hot droplet popped", "He ate a purple hazelnut"],
    correctIdx: 1,
    funCelebration: "Sláinte! Finbar cooled his thumb, and immediately understood the songs of birds!",
  },
  amira_golden_scarab: {
    question: "What did Amira wish for when placing the golden scarab in the sacred turquoise basin?",
    options: ["A chest of gold coins", "Water and green gardens for every village along the Nile", "A magic carpet"],
    correctIdx: 1,
    funCelebration: "Mabrouk! Wishing kindness and water for others brought the golden dawn to all Egypt!",
  },
  curupira_emerald_jaguar: {
    question: "Why are Curupira's footprints turned backwards in the rainforest?",
    options: ["To confuse anyone who tries to hurt the forest", "Because he wears shoes backwards", "To dance samba in circles"],
    correctIdx: 0,
    funCelebration: "Maravilhoso! His backward tracks gently protect the sacred trees and all forest animals!",
  },
};

// Friendly syllable break heuristics for kids
function getPhonicsSyllables(word: string): string {
  const clean = word.toLowerCase().replace(/[^a-z]/g, "");
  if (clean.length <= 3) return word;
  const match = clean.match(/[^aeiouy]*[aeiouy]+(?:[^aeiouy]*$|[^aeiouy](?=[^aeiouy]))?/gi);
  return match ? match.join(" · ") : word;
}

export const BookPageSpread: React.FC<BookPageSpreadProps> = ({
  story,
  currentPageIdx,
  onPageChange,
  foundStars,
  onFindStar,
  onOpenWordMagic,
  onOpenNarratorModal,
  onOpenAudioSettings,
  activePersonaAvatar,
  activePersonaName,
  isBedtimeMode,
  autoPageTurn,
  onOpenCulturalLore,
  onOpenColoringStudio,
  onOpenVoiceRecorder,
  onOpenQuiz,
  customAudioUrl,
}) => {
  const [isFlippingForward, setIsFlippingForward] = useState(false);
  const [isFlippingBackward, setIsFlippingBackward] = useState(false);
  const [isNarrating, setIsNarrating] = useState(false);
  const [activeSegmentIdx, setActiveSegmentIdx] = useState<number>(-1);
  const [activeSegment, setActiveSegment] = useState<SpokenSegment | null>(null);
  const [activeSpokenWord, setActiveSpokenWord] = useState<string | null>(null);
  const [readingSpeed, setReadingSpeed] = useState<number>(1.0);
  const [fontSizeTier, setFontSizeTier] = useState<"standard" | "large">("standard");
  const [showCelebration, setShowCelebration] = useState(false);
  const [showAtmosphere, setShowAtmosphere] = useState(true);

  const handleToggleSpeed = () => {
    const nextSpeed = readingSpeed === 0.8 ? 1.0 : readingSpeed === 1.0 ? 1.25 : 0.8;
    setReadingSpeed(nextSpeed);
    speechNarrator.setUserRate(nextSpeed);
    playChimeSound(659);
  };

  // Early reader & interaction states
  const [readingMode, setReadingMode] = useState<"read_to_me" | "read_by_myself">("read_to_me");
  const [activePhonicsWord, setActivePhonicsWord] = useState<string | null>(null);
  const [selfReadPages, setSelfReadPages] = useState<number[]>([]);
  const [selectedRiddleOption, setSelectedRiddleOption] = useState<number | null>(null);
  const [isRiddleCorrect, setIsRiddleCorrect] = useState<boolean | null>(null);

  // Bookmark ribbon & Folio Ambience Mood
  const [bookmarkedPageIdx, setBookmarkedPageIdx] = useState<number | null>(null);
  const [folioGlow, setFolioGlow] = useState<"daylight" | "lantern" | "starlight">("daylight");
  const [readingMinutes, setReadingMinutes] = useState<number>(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setReadingMinutes((prev) => prev + 1);
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const handleToggleBookmark = () => {
    if (bookmarkedPageIdx === currentPageIdx) {
      setBookmarkedPageIdx(null);
      playChimeSound(523);
    } else {
      setBookmarkedPageIdx(currentPageIdx);
      playSparkleSound();
      onFindStar(`${story.title}-bookmark-star`);
    }
  };

  // Touch gesture tracking for mobile / tablet swiping
  const touchStartXRef = useRef<number | null>(null);
  const touchStartYRef = useRef<number | null>(null);

  // Tracks if narration should continue across page flips
  const shouldContinueNarrationRef = useRef(false);
  const customAudioElementRef = useRef<HTMLAudioElement | null>(null);

  const totalPages = story.pages.length;
  const page: ChildrenStoryPage = story.pages[currentPageIdx] || story.pages[0];

  const riddle = STORY_RIDDLES[story.id] || {
    question: `What did this folktale from ${story.country} teach us?`,
    options: ["To be kind and thoughtful", "To be greedy", "To stay angry"],
    correctIdx: 0,
    funCelebration: `Wonderful! The tale teaches us ${story.moral.toLowerCase()}`,
  };

  // Turn page logic with seamless auto-narration continuation
  const turnToPage = (targetIdx: number, fromAutoTurn = false) => {
    if (targetIdx < 0 || targetIdx >= totalPages || targetIdx === currentPageIdx) return;

    const wasRunning = (isNarrating || shouldContinueNarrationRef.current || fromAutoTurn) && readingMode === "read_to_me";
    shouldContinueNarrationRef.current = wasRunning;

    if (customAudioElementRef.current) {
      customAudioElementRef.current.pause();
    }
    speechNarrator.stop();
    setIsNarrating(false);
    setActiveSegmentIdx(-1);
    setActiveSegment(null);
    setActiveSpokenWord(null);
    setActivePhonicsWord(null);

    playPageTurnSound();

    if (targetIdx > currentPageIdx) {
      setIsFlippingForward(true);
      setTimeout(() => {
        onPageChange(targetIdx);
        setIsFlippingForward(false);

        if (targetIdx === totalPages - 1) {
          setShowCelebration(true);
          playFanfareSound();
        }
      }, 450);
    } else {
      setIsFlippingBackward(true);
      setTimeout(() => {
        onPageChange(targetIdx);
        setIsFlippingBackward(false);
      }, 450);
    }
  };

  // When currentPageIdx changes and narration was active in 'read_to_me' mode, auto-start reading!
  useEffect(() => {
    if (shouldContinueNarrationRef.current && readingMode === "read_to_me") {
      const timer = setTimeout(() => {
        startPageNarration();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [currentPageIdx, readingMode]);

  // Touch Swipe Handlers for mobile & tablets
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
    touchStartYRef.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null || touchStartYRef.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartXRef.current;
    const deltaY = e.changedTouches[0].clientY - touchStartYRef.current;

    // Detect predominantly horizontal swipe greater than 50px
    if (Math.abs(deltaX) > 50 && Math.abs(deltaX) > Math.abs(deltaY) * 1.4) {
      if (deltaX < 0) {
        turnToPage(currentPageIdx + 1);
      } else {
        turnToPage(currentPageIdx - 1);
      }
    }
    touchStartXRef.current = null;
    touchStartYRef.current = null;
  };

  // Master Narration Controller for current page
  const startPageNarration = () => {
    playChimeSound(659);
    setIsNarrating(true);
    shouldContinueNarrationRef.current = true;

    // If custom audio was recorded for this page, play the custom voice recording!
    if (customAudioUrl) {
      if (!customAudioElementRef.current) {
        customAudioElementRef.current = new Audio();
      }
      const audio = customAudioElementRef.current;
      audio.src = customAudioUrl;
      audio.currentTime = 0;
      audio.play().catch((err) => {
        console.warn("Could not play custom audio:", err);
      });

      audio.onended = () => {
        setIsNarrating(false);
        if (autoPageTurn && currentPageIdx < totalPages - 1) {
          setTimeout(() => {
            turnToPage(currentPageIdx + 1, true);
          }, 1100);
        } else {
          shouldContinueNarrationRef.current = false;
        }
      };

      audio.onerror = () => {
        setIsNarrating(false);
        shouldContinueNarrationRef.current = false;
      };
      return;
    }

    const segments = speechNarrator.parseStorySegments(page.narrativeText, page.dialogueLines);

    speechNarrator.speakStory(segments, {
      onStart: () => {
        setIsNarrating(true);
      },
      onSegmentStart: (idx, seg) => {
        setActiveSegmentIdx(idx);
        setActiveSegment(seg);
      },
      onWordBoundary: (word) => {
        const clean = word.toLowerCase().trim().replace(/[^a-z0-9]/g, "");
        if (clean) setActiveSpokenWord(clean);
      },
      onEnd: () => {
        setIsNarrating(false);
        setActiveSegmentIdx(-1);
        setActiveSegment(null);
        setActiveSpokenWord(null);

        // Auto page-turn to next page if enabled
        if (autoPageTurn && currentPageIdx < totalPages - 1) {
          setTimeout(() => {
            turnToPage(currentPageIdx + 1, true);
          }, 1100);
        } else {
          shouldContinueNarrationRef.current = false;
        }
      },
      onError: () => {
        setIsNarrating(false);
        setActiveSegmentIdx(-1);
        setActiveSegment(null);
        setActiveSpokenWord(null);
        shouldContinueNarrationRef.current = false;
      },
    });
  };

  const handleToggleNarrate = () => {
    if (isNarrating) {
      if (customAudioElementRef.current) {
        customAudioElementRef.current.pause();
      }
      speechNarrator.stop();
      setIsNarrating(false);
      shouldContinueNarrationRef.current = false;
      setActiveSegmentIdx(-1);
      setActiveSegment(null);
      setActiveSpokenWord(null);
    } else {
      startPageNarration();
    }
  };

  // Keyboard accessibility navigation (ArrowLeft / ArrowRight / Space)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        document.activeElement?.tagName === "INPUT" ||
        document.activeElement?.tagName === "TEXTAREA"
      ) {
        return;
      }

      if (e.key === "ArrowRight") {
        turnToPage(currentPageIdx + 1);
      } else if (e.key === "ArrowLeft") {
        turnToPage(currentPageIdx - 1);
      } else if (e.key === " " && readingMode === "read_to_me") {
        e.preventDefault();
        handleToggleNarrate();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentPageIdx, totalPages, readingMode, isNarrating]);

  // Play a single character line or quotation on tap
  const handlePlayCharacterLine = (text: string, speaker: string, avatar: string) => {
    playChimeSound(784);
    speechNarrator.speakSingleLine(text, speaker, avatar);
  };

  // Phonics tap on an individual word in 'Read By Myself' mode
  const handlePhonicsWordTap = (word: string) => {
    playPhonicsBlipSound();
    setActivePhonicsWord(word);
    speechNarrator.speakWord(word);
    setTimeout(() => {
      setActivePhonicsWord((prev) => (prev === word ? null : prev));
    }, 2800);
  };

  // Child marks this page as self-read
  const handleMarkPageAsRead = () => {
    if (!selfReadPages.includes(page.pageNumber)) {
      setSelfReadPages((prev) => [...prev, page.pageNumber]);
      playFanfareSound();
      playSparkleSound();
      onFindStar(`${story.title}-self-read-page-${page.pageNumber}`);
    } else {
      playChimeSound(784);
    }
  };

  // Cultural Riddle Option Select in Celebration Modal
  const handleSelectRiddleOption = (idx: number) => {
    setSelectedRiddleOption(idx);
    if (idx === riddle.correctIdx) {
      setIsRiddleCorrect(true);
      playCorrectAnswerSound();
      onFindStar(`${story.id}-riddle-master`);
    } else {
      setIsRiddleCorrect(false);
      playChimeSound(440);
    }
  };

  // Highlight vocabulary words, quotations, or phonics tiles
  const renderInteractiveNarrative = (text: string) => {
    const quoteRegex = /([“"][^”"]+[”"])/g;
    const parts = text.split(quoteRegex);

    return parts.map((chunk, partIdx) => {
      const isQuote =
        (chunk.startsWith('"') && chunk.endsWith('"')) ||
        (chunk.startsWith('“') && chunk.endsWith('”'));

      if (isQuote) {
        const cleanQuote = chunk.replace(/[“"”]/g, "");
        const isSpeakingThisQuote =
          isNarrating &&
          activeSegment?.isQuotation &&
          activeSegment?.text.toLowerCase() === cleanQuote.toLowerCase();

        return (
          <span
            key={`quote-${partIdx}`}
            onClick={(e) => {
              e.stopPropagation();
              handlePlayCharacterLine(cleanQuote, "Character", "💬");
            }}
            title="Click to hear this character line!"
            className={`cursor-pointer inline-block mx-1 my-0.5 px-2 py-0.5 rounded-xl border transition-all ${
              isSpeakingThisQuote
                ? "animate-speakingGlow border-amber-500 font-bold scale-[1.02]"
                : "bg-amber-100/60 hover:bg-amber-200/70 border-amber-300/80 text-amber-950 font-semibold"
            }`}
          >
            <span className="text-amber-600 font-serif mr-0.5">“</span>
            {renderVocabAndPhonics(cleanQuote, partIdx)}
            <span className="text-amber-600 font-serif ml-0.5">”</span>
            <span className="text-[10px] ml-1 opacity-70">🗣️</span>
          </span>
        );
      }

      return <span key={`prose-${partIdx}`}>{renderVocabAndPhonics(chunk, partIdx)}</span>;
    });
  };

  const renderVocabAndPhonics = (textChunk: string, parentIdx: number) => {
    let result: React.ReactNode[] = [textChunk];

    // First replace vocabulary words with clickable definition triggers
    page.vocabulary.forEach((vocab) => {
      const newResult: React.ReactNode[] = [];
      const regex = new RegExp(`\\b(${vocab.word})\\b`, "gi");

      result.forEach((part, partIdx) => {
        if (typeof part !== "string") {
          newResult.push(part);
          return;
        }

        const pieces = part.split(regex);
        pieces.forEach((piece, pieceIdx) => {
          if (piece.toLowerCase() === vocab.word.toLowerCase()) {
            newResult.push(
              <span
                key={`${parentIdx}-${partIdx}-${pieceIdx}-${vocab.word}`}
                onClick={(e) => {
                  e.stopPropagation();
                  playChimeSound(784);
                  onOpenWordMagic(vocab);
                }}
                title={`Click to learn what '${vocab.word}' means!`}
                className="cursor-pointer font-bold text-amber-900 underline decoration-amber-400 decoration-wavy decoration-2 hover:bg-amber-100/90 rounded-sm px-1 py-0.5 transition-colors inline-block"
              >
                {piece}
                <span className="text-[10px] ml-0.5 text-amber-600">✨</span>
              </span>
            );
          } else if (piece) {
            newResult.push(piece);
          }
        });
      });
      result = newResult;
    });

    // In 'Read By Myself' mode, make all remaining prose words individually clickable for phonics!
    if (readingMode === "read_by_myself") {
      const phonicsResult: React.ReactNode[] = [];
      result.forEach((segment, segIdx) => {
        if (typeof segment !== "string") {
          phonicsResult.push(segment);
          return;
        }

        // Split by spaces while preserving punctuation
        const words = segment.split(/(\s+)/);
        words.forEach((w, wIdx) => {
          if (!w.trim()) {
            phonicsResult.push(w);
            return;
          }

          const cleanWord = w.replace(/[^a-zA-Z0-9'-]/g, "");
          const isActive = activePhonicsWord === cleanWord;
          const syllables = getPhonicsSyllables(cleanWord);

          phonicsResult.push(
            <span
              key={`phonics-${parentIdx}-${segIdx}-${wIdx}-${cleanWord}`}
              onClick={(e) => {
                e.stopPropagation();
                handlePhonicsWordTap(cleanWord);
              }}
              title={`Tap to sound out: ${cleanWord}`}
              className={`relative inline-block cursor-pointer px-1 py-0.5 rounded-lg transition-all ${
                isActive
                  ? "bg-amber-300 text-stone-900 font-extrabold scale-110 shadow-xs z-20"
                  : "hover:bg-amber-100/80 hover:text-amber-900"
              }`}
            >
              {w}
              {isActive && (
                <span className="absolute -top-7 left-1/2 -translate-x-1/2 bg-stone-900 text-amber-300 text-[11px] font-['Baloo_2'] font-bold px-2 py-0.5 rounded-full shadow-md whitespace-nowrap z-30 pointer-events-none animate-bounce">
                  {syllables} 🔊
                </span>
              )}
            </span>
          );
        });
      });
      return phonicsResult;
    }

    // In 'Read To Me' mode, highlight the currently spoken word with the Bouncing Star Karaoke charm!
    if (readingMode === "read_to_me" && isNarrating && activeSpokenWord) {
      const karaokeResult: React.ReactNode[] = [];
      result.forEach((segment, segIdx) => {
        if (typeof segment !== "string") {
          karaokeResult.push(segment);
          return;
        }

        const words = segment.split(/(\s+)/);
        words.forEach((w, wIdx) => {
          if (!w.trim()) {
            karaokeResult.push(w);
            return;
          }

          const cleanWord = w.toLowerCase().replace(/[^a-z0-9]/g, "");
          const isSpoken = cleanWord === activeSpokenWord;

          if (isSpoken) {
            karaokeResult.push(
              <span
                key={`karaoke-${parentIdx}-${segIdx}-${wIdx}-${cleanWord}`}
                className="relative inline-block px-1.5 py-0.5 rounded-lg bg-yellow-300 text-stone-900 font-extrabold scale-105 shadow-xs transition-all ring-2 ring-amber-400 z-10"
              >
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[11px] animate-bounce pointer-events-none select-none">
                  ⭐
                </span>
                {w}
              </span>
            );
          } else {
            karaokeResult.push(w);
          }
        });
      });
      return karaokeResult;
    }

    return result;
  };

  const progressPercent = ((currentPageIdx + 1) / totalPages) * 100;
  const isPageSelfRead = selfReadPages.includes(page.pageNumber);

  return (
    <div className="relative w-full max-w-6xl mx-auto flex flex-col items-center justify-center p-2 sm:p-4 select-none">
      {/* Real Hardcover Outer Casing with Touch/Swipe Gestures */}
      <div
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        style={{
          backgroundColor: story.coverCloth,
          borderColor: story.coverSpine,
        }}
        className={`relative w-full rounded-[28px] sm:rounded-[36px] p-2.5 sm:p-5 shadow-[0_20px_50px_rgba(0,0,0,0.28)] border-4 sm:border-8 transition-colors duration-500 ${
          isBedtimeMode ? "shadow-[0_20px_50px_rgba(0,0,0,0.65)]" : ""
        }`}
      >
        {/* Physical Page Edge Stack Effect */}
        <div className="hidden sm:block absolute -right-2 top-6 bottom-6 w-3 bg-[#E5DCC9] rounded-r-md border-r border-[#C7BBA5] shadow-xs" />
        <div className="hidden sm:block absolute -bottom-2 left-6 right-6 h-3 bg-[#E5DCC9] rounded-b-md border-b border-[#C7BBA5] shadow-xs" />

        {/* Golden Foil Corner Protectors */}
        <div className="absolute top-2 left-2 w-8 h-8 border-t-4 border-l-4 border-yellow-300/80 rounded-tl-xl pointer-events-none" />
        <div className="absolute top-2 right-2 w-8 h-8 border-t-4 border-r-4 border-yellow-300/80 rounded-tr-xl pointer-events-none" />
        <div className="absolute bottom-2 left-2 w-8 h-8 border-b-4 border-l-4 border-yellow-300/80 rounded-bl-xl pointer-events-none" />
        <div className="absolute bottom-2 right-2 w-8 h-8 border-b-4 border-r-4 border-yellow-300/80 rounded-br-xl pointer-events-none" />

        {/* Satin Bookmark Ribbon dangling down from the center spine */}
        <button
          onClick={handleToggleBookmark}
          title={
            bookmarkedPageIdx === currentPageIdx
              ? "Bookmark saved on this page! Tap to unclip"
              : "Tap ribbon to save your place with a bookmark!"
          }
          className="absolute -top-3 left-1/2 -translate-x-1/2 w-7 h-14 bg-gradient-to-b from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 shadow-md rounded-b-md z-30 cursor-pointer flex flex-col items-center justify-between pb-1 pt-1 transition-all hover:scale-105 active:scale-95 group"
        >
          <span className="text-[10px] drop-shadow-xs group-hover:scale-125 transition-transform">
            {bookmarkedPageIdx === currentPageIdx ? "⭐" : "🔖"}
          </span>
          <div className="w-0 h-0 border-x-3 border-x-transparent border-b-4 border-b-white/50" />
        </button>

        {/* The Open Book Two-Page Spread Container */}
        <div
          style={{
            backgroundColor:
              folioGlow === "lantern"
                ? "#FFF8EB"
                : folioGlow === "starlight"
                ? "#F0F4F8"
                : story.paperColor,
            perspective: "1800px",
          }}
          className={`relative w-full min-h-[580px] sm:min-h-[640px] rounded-[20px] sm:rounded-[26px] overflow-hidden shadow-inner grid grid-cols-1 md:grid-cols-2 border border-[#D5CBB8] transition-colors duration-500 ${
            isBedtimeMode ? "brightness-[0.96]" : ""
          } ${folioGlow === "lantern" ? "shadow-[inset_0_0_80px_rgba(245,158,11,0.12)]" : ""}`}
        >
          {/* Subtle Center Spine Crease Shadow */}
          <div className="hidden md:block absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-10 bg-gradient-to-r from-black/8 via-black/18 to-black/8 pointer-events-none z-10" />

          {/* Atmospheric Particle Canvas Effect Layer */}
          <AtmosphericEffectCanvas
            country={story.country}
            culture={story.culture}
            storyId={story.id}
            isActive={showAtmosphere}
            isBedtimeMode={isBedtimeMode}
          />

          {/* 3D Page Flip Leaf Overlay Animation */}
          {isFlippingForward && (
            <div className="hidden md:block absolute inset-0 z-30 pointer-events-none overflow-hidden">
              <div
                style={{
                  transformOrigin: "left center",
                  animation: "pageTurnForward 0.45s ease-in-out forwards",
                }}
                className="absolute right-0 top-0 w-1/2 h-full bg-[#FFFDF7] border-l border-[#D5CBB8] shadow-2xl"
              />
            </div>
          )}

          {isFlippingBackward && (
            <div className="hidden md:block absolute inset-0 z-30 pointer-events-none overflow-hidden">
              <div
                style={{
                  transformOrigin: "right center",
                  animation: "pageTurnBackward 0.45s ease-in-out forwards",
                }}
                className="absolute left-0 top-0 w-1/2 h-full bg-[#FFFDF7] border-r border-[#D5CBB8] shadow-2xl"
              />
            </div>
          )}

          {/* ===============================================================
              LEFT FOLIO: THE BESPOKE ILLUSTRATION FOR THIS SPECIFIC PAGE
             =============================================================== */}
          <div className="relative p-4 sm:p-6 md:border-r border-[#D5CBB8] flex flex-col justify-between">
            {/* Left Page Running Header */}
            <div className="flex items-center justify-between pb-2 mb-3 border-b border-[#D5CBB8]/70 text-xs font-['Fredoka'] text-[#7A7267] tracking-wider uppercase">
              <span className="flex items-center gap-1.5 font-bold text-[#451A03]">
                <span className="text-base">{story.flag}</span>
                <span>{story.country} · {story.culture}</span>
              </span>
              <span>PLATE {page.pageNumber} OF {totalPages}</span>
            </div>

            {/* Illustration Plate Component with pop-up unfold animation */}
            <div className="flex-1 w-full min-h-[300px]">
              <StoryPlateIllustration
                page={page}
                storyTitle={story.title}
                accentColor={story.accentColor}
                foundStars={foundStars}
                onFindStar={onFindStar}
                onOpenColoringStudio={onOpenColoringStudio}
              />
            </div>

            {/* Left Page Footer Indicator */}
            <div className="pt-3 mt-2 border-t border-[#D5CBB8]/60 flex items-center justify-between text-xs font-['Fredoka'] text-[#7A7267]">
              <span>⭐ Story Stars: {foundStars.filter((s) => s.startsWith(story.title)).length}/{totalPages}</span>
              <span className="font-bold text-[#451A03]">PAGE {page.pageNumber * 2 - 1}</span>
            </div>

            {/* Previous Page Dog-Ear Corner */}
            {currentPageIdx > 0 && (
              <button
                onClick={() => turnToPage(currentPageIdx - 1)}
                title="Turn back to previous page"
                className="absolute bottom-0 left-0 w-14 h-14 bg-gradient-to-tr from-[#D5CBB8] to-transparent rounded-tr-3xl opacity-75 hover:opacity-100 hover:scale-110 transition-all cursor-pointer flex items-end justify-start p-2 text-stone-700 font-bold group"
              >
                <span className="group-hover:-translate-x-1 transition-transform">◀</span>
              </button>
            )}
          </div>

          {/* ===============================================================
              RIGHT FOLIO: THE STORY TEXT, QUOTATIONS & CHARACTER DIALOGUE
             =============================================================== */}
          <div className="relative p-5 sm:p-8 flex flex-col justify-between">
            {/* Top Right Header Bar & Mode Selector */}
            <div className="flex items-center justify-between pb-2 mb-3 border-b border-[#D5CBB8]/70 text-xs font-['Fredoka'] text-[#7A7267] flex-wrap gap-2">
              <span className="font-bold text-[#451A03] truncate max-w-[200px]">
                {story.title}
              </span>

              <div className="flex items-center gap-1.5 flex-wrap">
                {/* Reading Mode Switcher */}
                <div className="flex items-center bg-amber-100/70 p-0.5 rounded-xl border border-amber-300/80">
                  <button
                    onClick={() => {
                      playChimeSound(659);
                      setReadingMode("read_to_me");
                    }}
                    className={`px-2 py-0.5 rounded-lg text-xs font-['Fredoka'] font-semibold transition-all ${
                      readingMode === "read_to_me"
                        ? "bg-amber-500 text-white shadow-xs"
                        : "text-amber-900 hover:text-amber-950"
                    }`}
                  >
                    🎙️ Read To Me
                  </button>
                  <button
                    onClick={() => {
                      playChimeSound(784);
                      speechNarrator.stop();
                      setIsNarrating(false);
                      setReadingMode("read_by_myself");
                    }}
                    className={`px-2 py-0.5 rounded-lg text-xs font-['Fredoka'] font-semibold transition-all ${
                      readingMode === "read_by_myself"
                        ? "bg-amber-500 text-white shadow-xs"
                        : "text-amber-900 hover:text-amber-950"
                    }`}
                  >
                    🔤 Read By Myself
                  </button>
                </div>

                {/* Cultural Lore Drawer Trigger */}
                {onOpenCulturalLore && (
                  <button
                    onClick={onOpenCulturalLore}
                    className="px-2 py-0.5 rounded-md hover:bg-amber-100 text-amber-900 text-xs font-['Fredoka'] font-semibold border border-amber-200 cursor-pointer flex items-center gap-1"
                    title="Read about the cultural lore and history behind this folktale"
                  >
                    <span>🏛️</span>
                    <span>Lore</span>
                  </button>
                )}

                {/* Atmospheric Particle Effects Toggle */}
                <button
                  onClick={() => {
                    playChimeSound(659);
                    setShowAtmosphere(!showAtmosphere);
                  }}
                  className={`px-2 py-0.5 rounded-md text-xs font-['Fredoka'] font-semibold border cursor-pointer flex items-center gap-1 transition-colors ${
                    showAtmosphere
                      ? "bg-amber-100/90 text-amber-900 border-amber-300"
                      : "bg-stone-100 text-stone-500 border-stone-200"
                  }`}
                  title={
                    showAtmosphere
                      ? "Atmospheric particle effects: ON (Tap to toggle)"
                      : "Atmospheric particle effects: OFF (Tap to toggle)"
                  }
                >
                  <span>🍃</span>
                  <span className="hidden sm:inline">Atmosphere</span>
                </button>

                {/* Folklore Quiz Button */}
                {onOpenQuiz && (
                  <button
                    onClick={onOpenQuiz}
                    className="px-2.5 py-0.5 rounded-md bg-amber-500 hover:bg-amber-600 text-white text-xs font-['Fredoka'] font-bold shadow-xs cursor-pointer flex items-center gap-1 transition-all"
                    title="Take the 3-question Folklore Master Quiz for this story!"
                  >
                    <span>🧠</span>
                    <span>Quiz</span>
                  </button>
                )}

                {/* Folio Ambience Mood Switcher */}
                <button
                  onClick={() => {
                    playChimeSound(784);
                    setFolioGlow((prev) =>
                      prev === "daylight" ? "lantern" : prev === "lantern" ? "starlight" : "daylight"
                    );
                  }}
                  className="px-2 py-0.5 rounded-md hover:bg-amber-100 text-amber-900 text-xs font-['Fredoka'] font-semibold border border-amber-200 cursor-pointer flex items-center gap-1"
                  title="Switch reading light mood (Daylight, Candle Lantern, or Starlight)"
                >
                  <span>
                    {folioGlow === "daylight" ? "☀️" : folioGlow === "lantern" ? "🏮" : "✨"}
                  </span>
                  <span className="hidden sm:inline capitalize">{folioGlow}</span>
                </button>

                {/* Font Size Tier Toggle */}
                <button
                  onClick={() => setFontSizeTier(fontSizeTier === "standard" ? "large" : "standard")}
                  className="px-2 py-0.5 rounded-md hover:bg-amber-100 text-amber-900 text-xs font-['Fredoka'] font-bold border border-amber-200 cursor-pointer"
                  title="Toggle font size for early readers"
                >
                  {fontSizeTier === "standard" ? "A+" : "A-"}
                </button>

                {/* Reading Session Timer Badge */}
                <span className="hidden sm:flex items-center gap-1 text-[11px] font-['Fredoka'] text-amber-800 bg-amber-100/70 px-2 py-0.5 rounded-md font-semibold border border-amber-200/60">
                  <span>⏱️</span>
                  <span>{readingMinutes}m read</span>
                </span>
              </div>
            </div>

            {/* Chapter Title & Narrative Content */}
            <div className="flex-1 flex flex-col justify-start">
              <h2 className="font-['Baloo_2'] text-2xl sm:text-3xl font-extrabold text-[#3B2813] mb-2 leading-tight">
                {page.chapterTitle}
              </h2>

              {/* Narrative Text with Drop Cap, Vocabulary & Phonics Interactive Tiles */}
              <div className="rounded-2xl p-4 sm:p-5 mb-3 border bg-white/60 border-amber-100 transition-all shadow-2xs">
                <p
                  className={`font-['EB_Garamond'] text-[#261E14] leading-relaxed text-justify first-letter:text-4xl first-letter:font-bold first-letter:font-['Baloo_2'] first-letter:text-amber-800 first-letter:mr-1.5 first-letter:float-left ${
                    fontSizeTier === "large" ? "text-xl sm:text-2xl" : "text-lg sm:text-xl"
                  }`}
                >
                  {renderInteractiveNarrative(page.narrativeText)}
                </p>
              </div>

              {/* Interactive Story Sound FX Wand */}
              <div className="mb-2.5">
                <StorySoundBoard />
              </div>

              {/* Character Spoken Dialogue Cards */}
              <div className="space-y-2 my-1">
                {page.dialogueLines.map((line, lIdx) => {
                  const isLineSpeaking =
                    isNarrating &&
                    activeSegment?.speakerRole === "character" &&
                    activeSegment?.text.toLowerCase() === line.text.toLowerCase();

                  return (
                    <div
                      key={lIdx}
                      onClick={() => handlePlayCharacterLine(line.text, line.speaker, line.avatar)}
                      title="Click to hear this character speak!"
                      className={`relative flex items-start gap-3 p-3 rounded-2xl cursor-pointer transition-all border ${
                        isLineSpeaking
                          ? "animate-speakingGlow border-amber-500 scale-[1.02] shadow-md"
                          : "bg-amber-50/50 hover:bg-amber-50 border-amber-200/60"
                      }`}
                    >
                      {/* Character Avatar with speaking bounce animation */}
                      <span
                        className={`text-2xl sm:text-3xl filter drop-shadow-xs shrink-0 transition-transform ${
                          isLineSpeaking ? "animate-avatarTalk" : ""
                        }`}
                      >
                        {line.avatar}
                      </span>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-0.5">
                          <span className="font-['Fredoka'] font-bold text-xs text-[#78350F] flex items-center gap-1">
                            <span>{line.speaker}</span>
                            {isLineSpeaking && (
                              <span className="text-[10px] bg-amber-500 text-white px-1.5 py-0.2 rounded-full font-semibold animate-pulse">
                                Speaking
                              </span>
                            )}
                          </span>
                          <span className="font-['Quicksand'] text-[10px] text-stone-500 capitalize">
                            {line.mood} · Tap to hear 🔊
                          </span>
                        </div>
                        <p
                          className={`font-['Quicksand'] font-semibold text-[#451A03] leading-snug ${
                            fontSizeTier === "large" ? "text-base sm:text-lg" : "text-sm sm:text-base"
                          }`}
                        >
                          "{line.text}"
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Read By Myself Encouragement Badge */}
              {readingMode === "read_by_myself" && (
                <div className="mt-2.5 p-3 rounded-2xl bg-amber-50 border border-amber-300 flex items-center justify-between gap-3 shadow-2xs">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">📖⭐</span>
                    <div>
                      <p className="font-['Fredoka'] font-bold text-xs text-amber-950">
                        Early Reader Quest:
                      </p>
                      <p className="font-['Quicksand'] text-[11px] text-stone-600">
                        Tap any word to sound it out. When finished, collect your star!
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={handleMarkPageAsRead}
                    className={`px-3.5 py-1.5 rounded-xl font-['Fredoka'] font-bold text-xs shadow-xs transition-all flex items-center gap-1 shrink-0 ${
                      isPageSelfRead
                        ? "bg-green-600 text-white cursor-default"
                        : "bg-amber-500 hover:bg-amber-600 active:scale-95 text-white cursor-pointer"
                    }`}
                  >
                    <span>{isPageSelfRead ? "✅ Page Read!" : "⭐ I Read This Page!"}</span>
                  </button>
                </div>
              )}
            </div>

            {/* Bottom Right Page Controls & Reader Bar */}
            <div className="pt-3 mt-3 border-t border-[#D5CBB8]/70 flex flex-col gap-2">
              {/* Progress Filament Along Page Edge */}
              <div className="w-full h-1.5 bg-[#D5CBB8]/50 rounded-full overflow-hidden">
                <div
                  style={{ width: `${progressPercent}%` }}
                  className="h-full bg-gradient-to-r from-amber-400 to-amber-600 transition-all duration-300"
                />
              </div>

              <div className="flex items-center justify-between">
                {/* Narrator Voice Avatar & Modal Launcher */}
                <div className="flex items-center gap-1.5 flex-wrap">
                  <button
                    onClick={onOpenNarratorModal}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-100 hover:bg-amber-200 text-amber-900 text-xs font-['Fredoka'] transition-all shadow-xs"
                  >
                    <span className="text-base">{activePersonaAvatar}</span>
                    <span className="font-semibold">{activePersonaName}</span>
                    <span className="text-stone-400 text-[10px]">▼</span>
                  </button>

                  <button
                    onClick={onOpenAudioSettings}
                    className="p-1.5 rounded-full hover:bg-amber-100 text-amber-900 transition-colors cursor-pointer"
                    title="Audio, Volume & Sleep Timer Settings"
                  >
                    🎛️
                  </button>

                  {/* Reading Speed Toggle Button */}
                  <button
                    onClick={handleToggleSpeed}
                    className="px-2.5 py-1.5 rounded-full bg-amber-100 hover:bg-amber-200 text-amber-900 text-xs font-['Fredoka'] font-bold transition-all shadow-xs cursor-pointer flex items-center gap-1"
                    title="Toggle reading speed: 0.8x (Gentle) · 1.0x (Normal) · 1.25x (Lively)"
                  >
                    <span>{readingSpeed === 0.8 ? "🐢 0.8x" : readingSpeed === 1.25 ? "🚀 1.25x" : "🐇 1.0x"}</span>
                  </button>

                  {/* Voice Recorder Studio Button */}
                  {onOpenVoiceRecorder && (
                    <button
                      onClick={onOpenVoiceRecorder}
                      className={`flex items-center gap-1 px-2.5 py-1.5 rounded-full text-xs font-['Fredoka'] font-semibold transition-all shadow-xs cursor-pointer ${
                        customAudioUrl
                          ? "bg-purple-100 text-purple-900 border border-purple-300 hover:bg-purple-200"
                          : "bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-200"
                      }`}
                      title={customAudioUrl ? "Custom voice recorded! Click to re-record or listen" : "Record your own voice for this page"}
                    >
                      <span>🎙️</span>
                      <span className="hidden sm:inline">{customAudioUrl ? "My Voice (Active)" : "Record"}</span>
                      {customAudioUrl && <span className="inline-block w-2 h-2 rounded-full bg-purple-600 animate-ping" />}
                    </button>
                  )}
                </div>

                {/* Read Aloud Button (in Read To Me mode) */}
                {readingMode === "read_to_me" ? (
                  <button
                    onClick={handleToggleNarrate}
                    className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-['Fredoka'] font-bold transition-all shadow-sm flex items-center gap-1.5 cursor-pointer ${
                      isNarrating
                        ? "bg-red-500 hover:bg-red-600 text-white animate-pulse"
                        : "bg-amber-500 hover:bg-amber-600 text-white active:scale-95"
                    }`}
                  >
                    <span>{isNarrating ? "⏸ Pause Reading" : "▶ Read To Me"}</span>
                  </button>
                ) : (
                  <button
                    onClick={() => turnToPage(currentPageIdx + 1)}
                    disabled={currentPageIdx === totalPages - 1}
                    className="px-4 py-1.5 rounded-full text-xs sm:text-sm font-['Fredoka'] font-bold bg-amber-500 hover:bg-amber-600 disabled:opacity-40 text-white active:scale-95 shadow-sm cursor-pointer"
                  >
                    Next Page ▶
                  </button>
                )}

                {/* Page Number */}
                <span className="text-xs font-['Fredoka'] font-bold text-[#451A03]">
                  PAGE {page.pageNumber * 2}
                </span>
              </div>
            </div>

            {/* Next Page Turn Dog-Ear Corner */}
            {currentPageIdx < totalPages - 1 ? (
              <button
                onClick={() => turnToPage(currentPageIdx + 1)}
                title="Turn to next page ➔"
                className="absolute bottom-0 right-0 w-14 h-14 bg-gradient-to-tl from-[#D5CBB8] to-transparent rounded-tl-3xl opacity-80 hover:opacity-100 hover:scale-110 transition-all cursor-pointer flex items-end justify-end p-2 text-stone-700 font-extrabold group"
              >
                <span className="group-hover:translate-x-1 transition-transform">▶</span>
              </button>
            ) : (
              <div className="absolute bottom-2 right-2 text-xs font-['Fredoka'] text-amber-700 font-bold flex items-center gap-1">
                <span>🎉</span>
                <span>The End!</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Floating Bottom Quick Navigator & Page Thumbnails */}
      <div className="mt-4 flex items-center justify-center gap-2 sm:gap-3 flex-wrap">
        <button
          onClick={() => turnToPage(currentPageIdx - 1)}
          disabled={currentPageIdx === 0}
          className="px-3 sm:px-4 py-2 rounded-2xl bg-white hover:bg-amber-50 disabled:opacity-40 text-stone-700 font-['Fredoka'] text-xs sm:text-sm font-semibold shadow-sm border border-stone-200 transition-all cursor-pointer"
        >
          ◀ Previous Page
        </button>

        <div className="flex items-center gap-1.5 bg-white/80 backdrop-blur-xs p-1.5 rounded-2xl border border-amber-200 shadow-sm">
          {story.pages.map((p, pIdx) => {
            const isCurrent = pIdx === currentPageIdx;
            return (
              <button
                key={p.pageNumber}
                onClick={() => turnToPage(pIdx)}
                className={`w-7 h-7 sm:w-8 sm:h-8 rounded-xl font-['Fredoka'] text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  isCurrent
                    ? "bg-amber-500 text-white shadow-xs scale-105"
                    : "text-stone-600 hover:bg-amber-100"
                }`}
              >
                {p.pageNumber}
              </button>
            );
          })}
        </div>

        <button
          onClick={() => turnToPage(currentPageIdx + 1)}
          disabled={currentPageIdx === totalPages - 1}
          className="px-3 sm:px-4 py-2 rounded-2xl bg-white hover:bg-amber-50 disabled:opacity-40 text-stone-700 font-['Fredoka'] text-xs sm:text-sm font-semibold shadow-sm border border-stone-200 transition-all cursor-pointer"
        >
          Next Page ▶
        </button>
      </div>

      {/* Keyboard & Touch Navigation Tip */}
      <div className="mt-2 text-center text-[11px] font-['Fredoka'] text-stone-500 opacity-75 hidden sm:block">
        <span>💡 Keyboard tips: Press </span>
        <kbd className="px-1.5 py-0.5 bg-stone-200/90 text-stone-700 rounded font-mono text-[10px] font-bold">◀</kbd>
        <span> or </span>
        <kbd className="px-1.5 py-0.5 bg-stone-200/90 text-stone-700 rounded font-mono text-[10px] font-bold">▶</kbd>
        <span> to turn pages · </span>
        <kbd className="px-1.5 py-0.5 bg-stone-200/90 text-stone-700 rounded font-mono text-[10px] font-bold">Space</kbd>
        <span> to read aloud / pause</span>
      </div>

      {/* Storybook Finished Celebration Modal with Interactive Cultural Riddle */}
      {showCelebration && (
        <div
          onClick={() => setShowCelebration(false)}
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-lg w-full bg-[#FFFDF7] rounded-3xl p-6 sm:p-8 shadow-2xl border-4 border-[#FBBF24] text-center max-h-[92vh] overflow-y-auto"
          >
            <span className="text-5xl mb-2 inline-block">🌟🎉</span>
            <h2 className="font-['Baloo_2'] text-2xl sm:text-3xl font-extrabold text-[#78350F] mb-1">
              You Finished the Story!
            </h2>
            <p className="font-['Quicksand'] text-sm text-stone-600 mb-4">
              "{story.title}" has been stamped into your World Story Explorer Passport!
            </p>

            {/* Passport Stamp Card */}
            <div className="bg-amber-50 rounded-2xl p-4 border border-amber-200 mb-4 text-left">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-3xl">{story.flag}</span>
                <div>
                  <p className="font-['Fredoka'] font-bold text-amber-900 text-base leading-tight">
                    {story.country} Cultural Passport Stamp
                  </p>
                  <p className="font-['Quicksand'] text-xs text-stone-500">
                    {story.culture} Tradition · {story.theme}
                  </p>
                </div>
              </div>
              <p className="font-['Cormorant_Garamond'] italic text-xs text-[#78350F] mt-1 border-t border-amber-200/80 pt-1.5">
                "{story.moral}"
              </p>
            </div>

            {/* Interactive Cultural Riddle Mini-Game */}
            <div className="bg-gradient-to-br from-amber-100/90 to-yellow-100/80 rounded-2xl p-4 border border-amber-300 mb-5 text-left">
              <div className="flex items-center gap-1.5 mb-2 font-['Fredoka'] font-bold text-xs uppercase tracking-wider text-amber-900">
                <span>🧩</span>
                <span>Grandmother's Cultural Riddle:</span>
              </div>
              <p className="font-['Baloo_2'] font-bold text-sm sm:text-base text-[#451A03] mb-3">
                {riddle.question}
              </p>

              <div className="space-y-2 mb-3">
                {riddle.options.map((opt, optIdx) => {
                  const isSelected = selectedRiddleOption === optIdx;
                  const isCorrect = isRiddleCorrect && isSelected;
                  const isWrong = isRiddleCorrect === false && isSelected;

                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleSelectRiddleOption(optIdx)}
                      className={`w-full text-left p-2.5 rounded-xl text-xs sm:text-sm font-['Fredoka'] font-semibold transition-all border flex items-center justify-between cursor-pointer ${
                        isCorrect
                          ? "bg-green-100 border-green-500 text-green-950 font-bold shadow-xs"
                          : isWrong
                          ? "bg-red-50 border-red-300 text-red-900"
                          : "bg-white hover:bg-amber-50 border-amber-200 text-stone-800"
                      }`}
                    >
                      <span>{opt}</span>
                      <span>
                        {isCorrect ? "✅" : isWrong ? "❌" : "👉"}
                      </span>
                    </button>
                  );
                })}
              </div>

              {isRiddleCorrect && (
                <div className="p-2.5 rounded-xl bg-green-50 border border-green-300 text-green-900 text-xs font-['Fredoka'] animate-fadeIn">
                  🎉 {riddle.funCelebration}
                  <span className="block font-bold text-[11px] text-green-800 mt-0.5">
                    +1 Golden Riddle Star Awarded to Passport! ⭐
                  </span>
                </div>
              )}
            </div>

            {onOpenQuiz && (
              <button
                onClick={() => {
                  setShowCelebration(false);
                  onOpenQuiz();
                }}
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-['Fredoka'] font-bold text-sm sm:text-base shadow-md transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-2 mb-2.5"
              >
                <span>🧠</span>
                <span>Take Folklore Master Quiz (Earn Diploma) 📜</span>
              </button>
            )}

            <button
              onClick={() => setShowCelebration(false)}
              className="w-full py-2.5 rounded-2xl bg-amber-100 hover:bg-amber-200 text-amber-900 font-['Fredoka'] font-bold text-sm transition-all active:scale-95 cursor-pointer"
            >
              Close & View Story 📖
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

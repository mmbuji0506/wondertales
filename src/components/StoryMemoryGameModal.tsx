import React, { useState, useEffect } from "react";
import {
  playChimeSound,
  playSparkleSound,
  playFanfareSound,
  playCorrectAnswerSound,
} from "../services/soundEffects";

interface MemoryCard {
  id: number;
  pairId: string;
  emoji: string;
  name: string;
  country: string;
  isFlipped: boolean;
  isMatched: boolean;
}

interface StoryMemoryGameModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRewardStar: (starId: string) => void;
}

const MEMORY_ITEMS = [
  { pairId: "anansi_pot", emoji: "🍯", name: "Pot of Wisdom", country: "Ghana" },
  { pairId: "peach_momotaro", emoji: "🍑", name: "Giant Peach", country: "Japan" },
  { pairId: "magic_brush", emoji: "🖌️", name: "Golden Paintbrush", country: "China" },
  { pairId: "quetzal_bird", emoji: "🦜", name: "Singing Quetzal", country: "Mexico" },
  { pairId: "salmon_knowledge", emoji: "🐟", name: "Salmon of Knowledge", country: "Ireland" },
  { pairId: "golden_scarab", emoji: "🪲", name: "Sun Scarab", country: "Egypt" },
];

function generateShuffledCards(): MemoryCard[] {
  const cards: MemoryCard[] = [];
  let id = 1;
  MEMORY_ITEMS.forEach((item) => {
    // Add two cards for each pair
    cards.push({
      id: id++,
      pairId: item.pairId,
      emoji: item.emoji,
      name: item.name,
      country: item.country,
      isFlipped: false,
      isMatched: false,
    });
    cards.push({
      id: id++,
      pairId: item.pairId,
      emoji: item.emoji,
      name: item.name,
      country: item.country,
      isFlipped: false,
      isMatched: false,
    });
  });

  // Fisher-Yates shuffle
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }

  return cards;
}

export const StoryMemoryGameModal: React.FC<StoryMemoryGameModalProps> = ({
  isOpen,
  onClose,
  onRewardStar,
}) => {
  const [cards, setCards] = useState<MemoryCard[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [moves, setMoves] = useState<number>(0);
  const [matchesCount, setMatchesCount] = useState<number>(0);
  const [hasWon, setHasWon] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      resetGame();
    }
  }, [isOpen]);

  const resetGame = () => {
    setCards(generateShuffledCards());
    setFlippedIndices([]);
    setMoves(0);
    setMatchesCount(0);
    setHasWon(false);
  };

  const handleCardClick = (index: number) => {
    if (flippedIndices.length >= 2) return;
    if (cards[index].isFlipped || cards[index].isMatched) return;

    playChimeSound(659);
    const newCards = [...cards];
    newCards[index].isFlipped = true;
    setCards(newCards);

    const newFlipped = [...flippedIndices, index];
    setFlippedIndices(newFlipped);

    if (newFlipped.length === 2) {
      setMoves((m) => m + 1);
      const [idx1, idx2] = newFlipped;
      const card1 = newCards[idx1];
      const card2 = newCards[idx2];

      if (card1.pairId === card2.pairId) {
        // MATCH!
        setTimeout(() => {
          playCorrectAnswerSound();
          playSparkleSound();
          newCards[idx1].isMatched = true;
          newCards[idx2].isMatched = true;
          setCards([...newCards]);
          setFlippedIndices([]);
          setMatchesCount((c) => {
            const nextCount = c + 1;
            if (nextCount === MEMORY_ITEMS.length) {
              setHasWon(true);
              playFanfareSound();
              onRewardStar("memory-master-champion-star");
            }
            return nextCount;
          });
        }, 500);
      } else {
        // NO MATCH -> FLIP BACK
        setTimeout(() => {
          newCards[idx1].isFlipped = false;
          newCards[idx2].isFlipped = false;
          setCards([...newCards]);
          setFlippedIndices([]);
        }, 900);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="relative w-full max-w-xl bg-gradient-to-b from-[#FFFDF7] via-[#FFF9EE] to-[#FEF3C7] rounded-3xl p-5 sm:p-6 shadow-2xl border-4 border-amber-300 max-h-[92vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-amber-100 hover:bg-amber-200 text-amber-900 font-bold flex items-center justify-center transition-colors cursor-pointer"
        >
          ✕
        </button>

        {/* Header */}
        <div className="text-center mb-4">
          <span className="text-3xl sm:text-4xl">🃏✨</span>
          <h2 className="font-['Baloo_2'] text-xl sm:text-2xl font-extrabold text-[#78350F]">
            World Folktale Memory Match
          </h2>
          <p className="text-xs sm:text-sm font-['Fredoka'] text-amber-800">
            Find the matching pairs of magical story artifacts from around the world!
          </p>
        </div>

        {/* Score & Moves Bar */}
        <div className="flex items-center justify-between px-4 py-2 mb-4 bg-amber-100/80 rounded-2xl border border-amber-200 text-xs font-['Fredoka'] font-bold text-amber-900">
          <span>Pairs Matched: {matchesCount} / {MEMORY_ITEMS.length}</span>
          <span>Moves: {moves}</span>
          <button
            onClick={resetGame}
            className="px-2.5 py-1 bg-amber-200 hover:bg-amber-300 rounded-xl text-[11px] text-amber-950 transition-colors cursor-pointer"
          >
            🔄 New Game
          </button>
        </div>

        {/* Card Grid (3 rows x 4 cols) */}
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5 sm:gap-3 mb-4">
          {cards.map((card, idx) => {
            const isShown = card.isFlipped || card.isMatched;
            return (
              <button
                key={card.id}
                onClick={() => handleCardClick(idx)}
                disabled={isShown}
                className={`aspect-square rounded-2xl p-2 flex flex-col items-center justify-center transition-all duration-300 transform select-none cursor-pointer ${
                  isShown
                    ? card.isMatched
                      ? "bg-emerald-100 border-2 border-emerald-400 text-emerald-900 scale-95 opacity-90 shadow-xs"
                      : "bg-white border-2 border-amber-400 text-amber-900 shadow-md scale-102"
                    : "bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 border-2 border-amber-600 text-white shadow-md hover:scale-105 active:scale-95"
                }`}
              >
                {isShown ? (
                  <>
                    <span className="text-2xl sm:text-3xl mb-1">{card.emoji}</span>
                    <span className="text-[10px] font-['Fredoka'] font-bold leading-tight text-center">
                      {card.name}
                    </span>
                    <span className="text-[9px] text-stone-500">
                      {card.country}
                    </span>
                  </>
                ) : (
                  <span className="text-2xl sm:text-3xl opacity-80 animate-pulse">
                    ⭐
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Win Celebration Banner */}
        {hasWon && (
          <div className="bg-gradient-to-r from-emerald-100 to-amber-100 border-2 border-emerald-400 rounded-2xl p-4 text-center animate-bounce mb-3">
            <span className="text-3xl">🎉 ⭐ 🏆</span>
            <h3 className="font-['Baloo_2'] text-lg font-bold text-emerald-900">
              Super Memory Explorer!
            </h3>
            <p className="text-xs font-['Fredoka'] text-emerald-800">
              You matched all story artifacts in {moves} moves! You earned a special Explorer Star!
            </p>
          </div>
        )}

        <div className="text-center pt-2">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-full bg-amber-500 hover:bg-amber-600 text-white font-['Fredoka'] font-bold text-sm shadow-md transition-all active:scale-95 cursor-pointer"
          >
            {hasWon ? "Hooray! Back to Reading ▶" : "Close"}
          </button>
        </div>
      </div>
    </div>
  );
};

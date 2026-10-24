import React, { useState } from "react";
import { ChildrenStory } from "../data/childrenStories";
import {
  playChimeSound,
  playCorrectAnswerSound,
  playFanfareSound,
  playSparkleSound,
} from "../services/soundEffects";

interface QuizQuestion {
  question: string;
  options: string[];
  correctIdx: number;
  explanation: string;
}

const STORY_QUIZZES: Record<string, QuizQuestion[]> = {
  anansi_pot_of_wisdom: [
    {
      question: "What kind of creature is clever Anansi in West African folklore?",
      options: ["A wise spider with eight nimble legs", "A giant trumpeting elephant", "A soaring golden eagle"],
      correctIdx: 0,
      explanation: "Anansi is the beloved spider hero whose wits and humor teach us lessons!",
    },
    {
      question: "Where did Anansi try to tie the clay pot filled with all the world's wisdom?",
      options: ["At the very top of a giant baobab tree", "In a secret underground cave", "At the bottom of a river"],
      correctIdx: 0,
      explanation: "He tied it to his belly, but his son reminded him that tying it to his back would make climbing easy!",
    },
    {
      question: "What is the heart-warming moral lesson Anansi learned when the pot broke?",
      options: [
        "Wisdom is meant to be shared with everyone, not hidden away in a pot",
        "Never climb trees with clay pots",
        "Keep all good ideas to yourself",
      ],
      correctIdx: 0,
      explanation: "The pieces of wisdom scattered across the globe so everyone could share understanding!",
    },
  ],
  momotaro_peach_boy: [
    {
      question: "Where did the kind grandmother first discover baby Momotaro?",
      options: [
        "Floating gently down the river inside a giant sweet peach",
        "Inside a hollow bamboo stalk",
        "Sleeping beneath a cherry blossom tree",
      ],
      correctIdx: 0,
      explanation: "A giant pink peach came bobbing down the clear mountain stream!",
    },
    {
      question: "What delicious treat did Momotaro share to make friends with the dog, monkey, and pheasant?",
      options: [
        "Sweet millet dumplings (kibi-dango) packed with love",
        "Roasted campfire marshmallows",
        "Crunchy carrot sticks",
      ],
      correctIdx: 0,
      explanation: "Sharing his mother's kibi-dango turned wild animals into loyal companions!",
    },
    {
      question: "How did Momotaro make peace with the ogres of Ogre Island?",
      options: [
        "By sharing dumplings and showing that kindness unites us in friendship",
        "By challenging them to a loud shouting contest",
        "By building a giant wooden fortress",
      ],
      correctIdx: 0,
      explanation: "Japanese mukashi-banashi teaches 'Wa'—harmony and peaceful fellowship over anger!",
    },
  ],
  colibri_rain_flower: [
    {
      question: "Which creature showed the greatest courage to save the Andean flowers?",
      options: [
        "The tiny, shimmering golden hummingbird (Colibrí)",
        "The giant mountain condor with huge wings",
        "The woolly highland alpaca",
      ],
      correctIdx: 0,
      explanation: "While the big birds were afraid of the storm, the hummingbird flew bravely forward!",
    },
    {
      question: "Where did the little hummingbird fly to ask for refreshing rain?",
      options: [
        "To the icy snow-capped summit of Mount Huascarán",
        "To the village fruit market",
        "Under a warm boulder",
      ],
      correctIdx: 0,
      explanation: "He soared higher than any cloud to reach the sacred mountain guardian spirits (Apus)!",
    },
    {
      question: "What is the red Cantuta flower in Peru known as?",
      options: [
        "The Sacred Flower of the Sun and national flower of the Andes",
        "The midnight cactus",
        "The desert thistle",
      ],
      correctIdx: 0,
      explanation: "The Cantuta was sacred to ancient Inca royalty and bloomed with gratitude!",
    },
  ],
  ma_liang_paintbrush: [
    {
      question: "What magical secret did the old master's paintbrush possess?",
      options: [
        "Whatever Ma Liang painted with honest love sprang instantly to life!",
        "It turned everything into blocks of gold",
        "It could erase words from books",
      ],
      correctIdx: 0,
      explanation: "Painted fish swam into rivers and painted birds took flight into the blue sky!",
    },
    {
      question: "What did kind Ma Liang paint to help the hardworking villagers?",
      options: [
        "Water wheels, sturdy irrigation pumps, and gentle water buffalos",
        "Gold jewelry and palaces",
        "Giant stone walls",
      ],
      correctIdx: 0,
      explanation: "He used his talent solely to help the poor farmers grow healthy crops!",
    },
    {
      question: "What does this Chinese folktale teach young creators?",
      options: [
        "Talent and creativity are noble gifts meant to help others, not selfish greed",
        "Only expensive paintbrushes make good art",
        "Never share paintings with anyone",
      ],
      correctIdx: 0,
      explanation: "True artistic magic comes from a kind and compassionate heart!",
    },
  ],
  tiddalik_frog: [
    {
      question: "What did Tiddalik the giant Australian frog do when he woke up thirsty?",
      options: [
        "He drank up all the sparkling freshwater in the billabongs and rivers",
        "He drank five cups of morning eucalyptus tea",
        "He went swimming in the salty ocean",
      ],
      correctIdx: 0,
      explanation: "Tiddalik swelled up until he was as big as a mountain, leaving the land dry!",
    },
    {
      question: "What finally caused Tiddalik to release the freshwater?",
      options: [
        "A contagious belly laugh from the silly, squiggly dance of the eels",
        "A loud clap of thunder from the sky",
        "A cold frost on the red rocks",
      ],
      correctIdx: 0,
      explanation: "Laughter melted his stubbornness and returned the joyful waters to Australia!",
    },
    {
      question: "What is the ancient Aboriginal Dreamtime moral of this story?",
      options: [
        "Precious water belongs to all creatures, and sharing brings joy and balance",
        "Frogs should never drink water",
        "Eels should always dance upside down",
      ],
      correctIdx: 0,
      explanation: "For tens of thousands of years, elders used Tiddalik to teach water conservation!",
    },
  ],
  moana_turtle_voyage: [
    {
      question: "What creature did young Moana rescue that became her guiding guardian?",
      options: [
        "A wise green sea turtle (Honu) with emerald eyes",
        "A blue dolphin with a silver fin",
        "A playful hermit crab",
      ],
      correctIdx: 0,
      explanation: "The Honu is honored across Polynesia as a sacred symbol of navigation and safe passage!",
    },
    {
      question: "How did Polynesian wayfinders steer across the vast Pacific without instruments?",
      options: [
        "By reading celestial stars, ocean swells, and bird flight paths",
        "Using digital satellite compasses",
        "By following lighthouses along the beach",
      ],
      correctIdx: 0,
      explanation: "Wayfinding masters read the Southern Cross and the rhythm of deep ocean swells!",
    },
    {
      question: "What did Moana's grandmother teach her about respecting the ocean?",
      options: [
        "The ocean is a living elder that connects all islands and families in harmony",
        "The ocean is too dangerous to ever explore",
        "Only sail when the sea is completely flat",
      ],
      correctIdx: 0,
      explanation: "Moana learned that courage, respect for nature, and patience guide any voyage!",
    },
  ],
  lars_northern_lights: [
    {
      question: "Who was Lars's cozy furry companion under the Arctic twilight?",
      options: [
        "Barnaby, a gentle white polar bear cub",
        "A sled dog with golden fur",
        "A snowy arctic hare",
      ],
      correctIdx: 0,
      explanation: "Barnaby and Lars watched the dancing auroras from their snowy timber lodge!",
    },
    {
      question: "What painted the Arctic winter sky with shimmering green and violet ribbons?",
      options: [
        "The dancing Northern Lights (Nordlys / Aurora Borealis)",
        "Festive city fireworks",
        "The reflection of giant mirrors",
      ],
      correctIdx: 0,
      explanation: "Solar particles whispering with the atmosphere paint the enchanting polar twilight!",
    },
    {
      question: "How does the tale of Lars comfort children around the world at bedtime?",
      options: [
        "It weaves a cozy, quiet lullaby reminding us that warmth and love watch over us",
        "It tells them to play in snowstorms",
        "It teaches them to count polar bears",
      ],
      correctIdx: 0,
      explanation: "A soothing twilight journey designed to ease little ones into restful dreams!",
    },
  ],
  panchatantra_turtle_geese: [
    {
      question: "Who were Kambugriva the turtle's two faithful, winged companions?",
      options: [
        "Two wise white geese named Sankata and Vikata",
        "Two colorful jungle parrots",
        "Two dancing peacocks",
      ],
      correctIdx: 0,
      explanation: "The geese cared for their turtle friend and wanted to save him from the drying pond!",
    },
    {
      question: "How did the geese carry Kambugriva safely through the clouds?",
      options: [
        "The turtle held tightly to a wooden stick with his mouth while the geese flew holding each end",
        "They carried him inside a golden travel basket",
        "He balanced on their feathers",
      ],
      correctIdx: 0,
      explanation: "A clever plan that required just one thing: keeping his mouth firmly closed!",
    },
    {
      question: "What is the ancient Sanskrit wisdom behind this Panchatantra fable?",
      options: [
        "Cultivate patient self-restraint and avoid speaking in moments of excitement or anger",
        "Never travel to new places",
        "Turtles can fly if they flap their flippers",
      ],
      correctIdx: 0,
      explanation: "Composed over 2,200 years ago, it remains one of the world's most famous wisdom fables!",
    },
  ],
  jaguar_quetzal_mexico: [
    {
      question: "Who was Balam in the emerald rainforest of southern Mexico?",
      options: [
        "A spirited young golden jaguar cub learning the ways of the forest",
        "A sleepy tree sloth",
        "A mischievous spider monkey",
      ],
      correctIdx: 0,
      explanation: "In Mayan tradition, Balam the jaguar represents courage, grace, and nocturnal wonder!",
    },
    {
      question: "What bird sang a tranquil song of harmony to guide Balam?",
      options: [
        "The iridescent green and crimson Quetzal bird",
        "A noisy toucan with a yellow beak",
        "A night owl with big spectacles",
      ],
      correctIdx: 0,
      explanation: "The Quetzal bird's gentle melody taught Balam how to breathe and listen to the forest!",
    },
    {
      question: "What did Balam discover about true bravery and leadership?",
      options: [
        "Real strength comes from calm mindfulness, patience, and living in peace with others",
        "Being the loudest creature makes you the boss",
        "Only roar when other animals are sleeping",
      ],
      correctIdx: 0,
      explanation: "Quiet confidence and empathy are a hundred times more powerful than loud roars!",
    },
  ],
  finbar_salmon_ireland: [
    {
      question: "Where did the legendary Salmon of Knowledge live in ancient Ireland?",
      options: [
        "In a crystal pool shaded by nine sacred purple hazel trees along the River Boyne",
        "In the stormy open Atlantic ocean",
        "Inside an ancient castle fountain",
      ],
      correctIdx: 0,
      explanation: "The hazel trees dropped nuts of wisdom into the pool, which the salmon ate!",
    },
    {
      question: "How did young Finbar (Fionn mac Cumhaill) first taste the droplet of wisdom?",
      options: [
        "He sucked his thumb after a hot droplet of juice popped while watching the fire",
        "He read ten ancient leather books",
        "He drank from a silver cup",
      ],
      correctIdx: 0,
      explanation: "Cooling his burned thumb unlocked the songs of birds and deep understanding!",
    },
    {
      question: "How did Finbar choose to use his wisdom throughout his life?",
      options: [
        "To protect his people, compose poetry of joy, and resolve conflicts peacefully",
        "To demand gold from all the kings",
        "To keep every secret to himself",
      ],
      correctIdx: 0,
      explanation: "The Gaelic seanchai honor Finbar as a hero whose wisdom belonged to all Ireland!",
    },
  ],
  amira_golden_scarab: [
    {
      question: "Where did young Amira discover the shimmering golden scarab beetle in Egypt?",
      options: [
        "In the warm golden sands near the sacred banks of the River Nile",
        "Inside an ancient museum display",
        "At the bottom of the sea",
      ],
      correctIdx: 0,
      explanation: "The scarab beetle Khepri was resting gently on a piece of papyrus reed!",
    },
    {
      question: "What magical deed could the golden scarab perform at sunrise?",
      options: [
        "Grant one heartfelt wish placed inside the turquoise fountain at dawn",
        "Turn sand dunes into pyramids",
        "Speak ten different languages",
      ],
      correctIdx: 0,
      explanation: "When dawn's first golden light touched the turquoise basin, the wish blossomed!",
    },
    {
      question: "What did generous Amira wish for when she had the chance for anything?",
      options: [
        "Flowing water, sweet date palms, and blooming gardens for every village",
        "A chest full of rubies and diamonds",
        "A grand golden chariot for herself",
      ],
      correctIdx: 0,
      explanation: "Wishing happiness and abundance for everyone made her an immortal legend along the Nile!",
    },
  ],
  curupira_emerald_jaguar: [
    {
      question: "What makes Curupira's footprints distinctive in the Brazilian Amazon?",
      options: [
        "His feet face backwards to confuse hunters and protect the wild creatures",
        "He wears glowing golden boots",
        "He walks on his hands",
      ],
      correctIdx: 0,
      explanation: "Curupira is the ancient Tupi-Guarani forest guardian whose backward tracks defend the canopy!",
    },
    {
      question: "What friend of the rainforest did Curupira gently untangle and protect?",
      options: [
        "An emerald-eyed spotted jaguar (onça pintada)",
        "A pink river dolphin",
        "A giant blue macaw",
      ],
      correctIdx: 0,
      explanation: "The jaguar and Curupira stood together as protectors of the green jungle!",
    },
    {
      question: "What is the heart of Curupira's message to children worldwide?",
      options: [
        "When we honor and take care of the trees and rivers, nature protects and nourishes all of us",
        "Never walk through forests with shoes",
        "Animals can take care of everything alone",
      ],
      correctIdx: 0,
      explanation: "The Amazon is the lungs of planet Earth, and every child is its guardian!",
    },
  ],
};

interface StoryWonderQuizModalProps {
  story: ChildrenStory;
  isOpen: boolean;
  onClose: () => void;
  onRewardStars: (starId: string) => void;
  onOpenDiploma: () => void;
}

export const StoryWonderQuizModal: React.FC<StoryWonderQuizModalProps> = ({
  story,
  isOpen,
  onClose,
  onRewardStars,
  onOpenDiploma,
}) => {
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [isQuizComplete, setIsQuizComplete] = useState<boolean>(false);

  if (!isOpen) return null;

  const questions = STORY_QUIZZES[story.id] || STORY_QUIZZES["anansi_pot_of_wisdom"];
  const currentQ = questions[currentQuestionIdx];

  const handleSelectOption = (idx: number) => {
    if (isAnswerChecked) return;
    setSelectedOption(idx);
    setIsAnswerChecked(true);

    if (idx === currentQ.correctIdx) {
      playCorrectAnswerSound();
      setScore((prev) => prev + 1);
      onRewardStars(`${story.title}-quiz-q${currentQuestionIdx + 1}`);
    } else {
      playChimeSound(440);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIdx < questions.length - 1) {
      setCurrentQuestionIdx((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswerChecked(false);
      playChimeSound(659);
    } else {
      setIsQuizComplete(true);
      playFanfareSound();
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIdx(0);
    setSelectedOption(null);
    setIsAnswerChecked(false);
    setScore(0);
    setIsQuizComplete(false);
    playChimeSound(523);
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/65 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-xl w-full bg-[#FFFDF7] rounded-3xl p-6 sm:p-8 shadow-2xl border-4 border-[#FBBF24] max-h-[92vh] overflow-y-auto"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-amber-200">
          <div className="flex items-center gap-2.5">
            <span className="text-3xl">{story.flag}</span>
            <div>
              <h2 className="font-['Baloo_2'] text-2xl font-bold text-[#78350F]">
                Folklore Master Quiz
              </h2>
              <p className="font-['Quicksand'] text-xs text-amber-800">
                "{story.title}" · Question {currentQuestionIdx + 1} of {questions.length}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-amber-100 hover:bg-amber-200 text-amber-900 flex items-center justify-center font-bold"
          >
            ✕
          </button>
        </div>

        {!isQuizComplete ? (
          <div>
            {/* Progress Bar & Stars Counter */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-1.5">
                {questions.map((_, i) => (
                  <span
                    key={i}
                    className={`text-lg transition-transform ${
                      i < currentQuestionIdx
                        ? "text-amber-500 scale-110"
                        : i === currentQuestionIdx
                        ? "text-amber-400 animate-pulse scale-125"
                        : "text-stone-300"
                    }`}
                  >
                    ⭐
                  </span>
                ))}
              </div>
              <span className="font-['Fredoka'] text-xs font-bold text-amber-800 bg-amber-100 px-3 py-1 rounded-full">
                Score: {score}/{questions.length}
              </span>
            </div>

            {/* Question Card */}
            <div className="bg-amber-50/80 rounded-2xl p-4 sm:p-5 border border-amber-200 mb-4">
              <span className="text-[11px] font-['Fredoka'] font-bold uppercase tracking-wider text-amber-700 block mb-1">
                Challenge Question #{currentQuestionIdx + 1}:
              </span>
              <p className="font-['Baloo_2'] text-base sm:text-lg font-bold text-[#451A03] leading-snug">
                {currentQ.question}
              </p>
            </div>

            {/* Multiple Choice Options */}
            <div className="space-y-2.5 mb-4">
              {currentQ.options.map((opt, optIdx) => {
                const isSelected = selectedOption === optIdx;
                const isCorrect = optIdx === currentQ.correctIdx;

                let btnStyle = "bg-white hover:bg-amber-50 border-amber-200 text-stone-800";
                if (isAnswerChecked) {
                  if (isCorrect) {
                    btnStyle = "bg-green-100 border-green-500 text-green-950 font-bold shadow-xs";
                  } else if (isSelected) {
                    btnStyle = "bg-red-50 border-red-300 text-red-900";
                  } else {
                    btnStyle = "bg-stone-50 border-stone-200 text-stone-400 opacity-60";
                  }
                }

                return (
                  <button
                    key={optIdx}
                    onClick={() => handleSelectOption(optIdx)}
                    disabled={isAnswerChecked}
                    className={`w-full text-left p-3 sm:p-3.5 rounded-2xl text-xs sm:text-sm font-['Fredoka'] font-semibold transition-all border flex items-center justify-between cursor-pointer ${btnStyle}`}
                  >
                    <span className="pr-2">{opt}</span>
                    <span className="text-base shrink-0">
                      {isAnswerChecked && isCorrect ? "✅" : isAnswerChecked && isSelected ? "❌" : "👉"}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Explanation box after checking answer */}
            {isAnswerChecked && (
              <div
                className={`p-3.5 rounded-2xl border text-xs sm:text-sm font-['Quicksand'] mb-4 animate-fadeIn ${
                  selectedOption === currentQ.correctIdx
                    ? "bg-green-50 border-green-300 text-green-900"
                    : "bg-amber-50 border-amber-300 text-amber-900"
                }`}
              >
                <div className="font-['Fredoka'] font-bold text-xs uppercase mb-1">
                  {selectedOption === currentQ.correctIdx ? "🎉 Splendid Answer!" : "💡 Folklore Wisdom:"}
                </div>
                <p>{currentQ.explanation}</p>
              </div>
            )}

            {/* Next or Continue Button */}
            {isAnswerChecked && (
              <button
                onClick={handleNextQuestion}
                className="w-full py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-['Fredoka'] font-bold text-sm shadow-md transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-2"
              >
                <span>
                  {currentQuestionIdx < questions.length - 1 ? "Next Question ➔" : "See Final Explorer Score 🏆"}
                </span>
              </button>
            )}
          </div>
        ) : (
          /* Quiz Completed Victory View */
          <div className="text-center py-2 animate-fadeIn">
            <span className="text-5xl mb-2 inline-block">🏆✨</span>
            <h3 className="font-['Baloo_2'] text-2xl sm:text-3xl font-extrabold text-[#78350F] mb-1">
              Folklore Scholar Achievement!
            </h3>
            <p className="font-['Quicksand'] text-sm text-stone-600 mb-4">
              You scored <span className="font-bold text-amber-800">{score}</span> out of {questions.length} on "{story.title}"!
            </p>

            <div className="bg-gradient-to-r from-amber-100/90 via-yellow-100 to-amber-100/90 rounded-2xl p-4 border border-amber-300 mb-5 text-left">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-4xl">{story.flag}</span>
                <div>
                  <h4 className="font-['Fredoka'] font-bold text-amber-950 text-base">
                    {story.country} Storyteller Rank Earned
                  </h4>
                  <p className="font-['Quicksand'] text-xs text-amber-800">
                    Cultural Lore of {story.culture} · {story.theme}
                  </p>
                </div>
              </div>
              <p className="font-['Cormorant_Garamond'] italic text-xs text-[#78350F] border-t border-amber-200/80 pt-2">
                "{story.moral}"
              </p>
            </div>

            <div className="space-y-2.5">
              <button
                onClick={() => {
                  onClose();
                  onOpenDiploma();
                }}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-['Fredoka'] font-bold text-base shadow-md transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-2"
              >
                <span>📜</span>
                <span>Claim Official Reading Diploma</span>
              </button>

              <button
                onClick={handleRestart}
                className="w-full py-2.5 rounded-2xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-['Fredoka'] font-semibold text-xs transition-colors cursor-pointer"
              >
                Retake Quiz 🔄
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

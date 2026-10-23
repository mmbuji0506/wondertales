import React, { useState } from "react";
import { ChildrenStory } from "../data/childrenStories";
import { playChimeSound, playSparkleSound } from "../services/soundEffects";
import { GoogleGenAI } from "../genaiProxy";

interface StoryWeaverModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStoryCreated: (newStory: ChildrenStory) => void;
}

const REGION_OPTIONS = [
  { id: "celtic", label: "Celtic Scotland & Ireland", flag: "🏴󠁧󠁢󠁳󠁣󠁴󠁿", country: "Scotland", color: "#1E3A8A" },
  { id: "west_africa", label: "West Africa & Savannah", flag: "🇬🇭", country: "Ghana", color: "#D97706" },
  { id: "japan", label: "Cherry Blossom Japan", flag: "🇯🇵", country: "Japan", color: "#BE123C" },
  { id: "andes", label: "Andean Rain Forest & Peru", flag: "🇵🇪", country: "Peru", color: "#0D9488" },
  { id: "nordic", label: "Nordic Northern Lights", flag: "🇳🇴", country: "Norway", color: "#0284C7" },
  { id: "india", label: "Monsoon India & Panchatantra", flag: "🇮🇳", country: "India", color: "#EA580C" },
  { id: "persia", label: "Arabian Nights & Oasis", flag: "🏜️", country: "Persia", color: "#7C3AED" },
  { id: "polynesia", label: "Polynesian Coral Lagoons", flag: "🌺", country: "Hawaii", color: "#0284C7" },
];

const THEME_OPTIONS = [
  { id: "kindness", label: "Kindness & Empathy", icon: "💖" },
  { id: "courage", label: "Brave Hearts & Curiosity", icon: "🦁" },
  { id: "nature", label: "Protecting Nature & Animals", icon: "🌱" },
  { id: "sharing", label: "Generosity & Community", icon: "🎁" },
  { id: "honesty", label: "Truth & Self-Belief", icon: "⭐" },
];

export const StoryWeaverModal: React.FC<StoryWeaverModalProps> = ({
  isOpen,
  onClose,
  onStoryCreated,
}) => {
  const [selectedRegion, setSelectedRegion] = useState(REGION_OPTIONS[0]);
  const [selectedTheme, setSelectedTheme] = useState(THEME_OPTIONS[0]);
  const [heroCreature, setHeroCreature] = useState("Lars the little polar bear cub");
  const [customPrompt, setCustomPrompt] = useState("");
  const [isWeaving, setIsWeaving] = useState(false);
  const [weavingStage, setWeavingStage] = useState("");

  if (!isOpen) return null;

  const handleWeaveStory = async () => {
    setIsWeaving(true);
    playChimeSound(659);
    setWeavingStage("Consulting ancient folktales from " + selectedRegion.label + "...");

    try {
      const prompt = `You are a world-renowned children's author and illustrator creating a magical, culturally rich 4-page children's storybook.
Region & Culture: ${selectedRegion.label} (${selectedRegion.country})
Hero / Character: ${heroCreature}
Theme: ${selectedTheme.label}
Additional Notes: ${customPrompt || "A warm, heartwarming bedtime adventure suitable for ages 4-8."}

Return a valid JSON object strictly matching this schema:
{
  "title": "Story Title",
  "subtitle": "Subtitle explaining culture/region",
  "ageRange": "4–8 years",
  "moral": "One sentence moral",
  "summary": "2-3 sentences summary",
  "pages": [
    {
      "pageNumber": 1,
      "chapterTitle": "Chapter 1: ...",
      "narrativeText": "Warm engaging story text (approx 70-90 words)",
      "illustrationCaption": "A descriptive scene caption",
      "dialogue": [
        { "speaker": "Narrator", "speakerRole": "narrator", "avatar": "📖", "text": "..." },
        { "speaker": "Character Name", "speakerRole": "character", "avatar": "🐻", "text": "..." }
      ],
      "vocabularyWord": "Special word from culture",
      "vocabularyPronunciation": "Pronunciation",
      "vocabularyDefinition": "Kid friendly definition",
      "vocabularyFunFact": "Fun fact for kids",
      "funActivity": "Interactive action for the child"
    }
    ... total 4 pages
  ]
}`;

      setWeavingStage("Weaving multi-page narrative & dialogue with Gemini...");
      const ai = new GoogleGenAI();
      const response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents: [{ role: "user", parts: [{ text: prompt }] }],
      });

      const responseText = response?.text || "";
      let parsedData: any = null;

      try {
        const jsonMatch = responseText.match(/```json\s*([\s\S]*?)\s*```/) || responseText.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const raw = jsonMatch[1] || jsonMatch[0];
          parsedData = JSON.parse(raw);
        }
      } catch {
        // Fallback below
      }

      setWeavingStage("Painting colorful vector illustrations for all 4 pages...");

      // Generate bespoke colorful SVGs for all pages
      const storyId = `custom_${Date.now()}`;
      const title = parsedData?.title || `The Legend of ${heroCreature}`;
      const subtitle = parsedData?.subtitle || `A Folktale from ${selectedRegion.country}`;
      const pagesData = parsedData?.pages && Array.isArray(parsedData.pages) && parsedData.pages.length === 4
        ? parsedData.pages
        : [
            {
              pageNumber: 1,
              chapterTitle: "Chapter 1: The Secret Wish",
              narrativeText: `Once upon a time in the whispering lands of ${selectedRegion.country}, ${heroCreature} watched the morning sun rise over the hills. There was a legend told around evening fires of a golden flower that blooms only when friends share laughter.`,
              illustrationCaption: `${heroCreature} looking up at the morning sky with hopeful eyes.`,
              dialogue: [{ speaker: "Narrator", speakerRole: "narrator", avatar: "📖", text: "Every big adventure begins with a tiny hopeful heartbeat." }],
              vocabularyWord: "Wonder",
              vocabularyPronunciation: "WUN-der",
              vocabularyDefinition: "A feeling of joy and curiosity when seeing something magical and beautiful.",
              vocabularyFunFact: "Looking at starlight makes your eyes sparkle naturally!",
              funActivity: "Take a deep breath and make a wish on a morning star!",
            },
            {
              pageNumber: 2,
              chapterTitle: "Chapter 2: The Journey of Friendship",
              narrativeText: `Setting off along the ancient mossy trail, ${heroCreature} met a gentle companion with warm eyes and a sweet smile. Together they crossed bubbling streams and shared sweet berries under the shade of ancient trees.`,
              illustrationCaption: `Friends journeying together across the vibrant green hills.`,
              dialogue: [{ speaker: "Friend", speakerRole: "character", avatar: "🦊", text: "Walk with me! The trail is always brighter with a buddy!" }],
              vocabularyWord: "Companion",
              vocabularyPronunciation: "kum-PAN-yun",
              vocabularyDefinition: "A loyal friend who walks with you on adventures.",
              vocabularyFunFact: "Animals often travel in pairs to keep each other safe!",
              funActivity: "Hold hands or give a gentle wave to someone nearby!",
            },
            {
              pageNumber: 3,
              chapterTitle: "Chapter 3: The Golden Riddle",
              narrativeText: `At the highest mountain ridge, a gentle starlight spirit posed a riddle: 'What shines brighter than diamonds yet costs nothing to give?' ${heroCreature} smiled and replied: 'A warm act of kindness!'`,
              illustrationCaption: `The starlight spirit glowing softly above the clouds.`,
              dialogue: [{ speaker: "Spirit", speakerRole: "character", avatar: "✨", text: "Your heart knows the true magic of the world!" }],
              vocabularyWord: "Kindness",
              vocabularyPronunciation: "KYND-niss",
              vocabularyDefinition: "Being friendly, generous, and considerate of others.",
              vocabularyFunFact: "Kindness actually releases cozy happy feelings in your brain!",
              funActivity: "Say something nice about yourself or a friend right now!",
            },
            {
              pageNumber: 4,
              chapterTitle: "Chapter 4: The Bloom of Joy",
              narrativeText: `The golden flower burst into brilliant rainbow blossoms! A gentle warm breeze swept across ${selectedRegion.country}, showering glittering starlight over every cottage and village. Everyone danced and smiled together in peace.`,
              illustrationCaption: `The radiant flower blooming into sparkling starlight across the village.`,
              dialogue: [{ speaker: "All Friends", speakerRole: "character", avatar: "🎉", text: "Hooray! The world is filled with love and laughter!" }],
              vocabularyWord: "Harmony",
              vocabularyPronunciation: "HAR-muh-nee",
              vocabularyDefinition: "Living happily together in friendship and peace.",
              vocabularyFunFact: "Singing together in harmony makes everyone's heartbeats sync up!",
              funActivity: "Let out a happy cheer and clap your hands three times!",
            },
          ];

      const colors = [
        ["#38BDF8", "#0284C7", "#0369A1"],
        ["#FDE047", "#F59E0B", "#B45309"],
        ["#4ADE80", "#16A34A", "#14532D"],
        ["#F472B6", "#DB2777", "#831843"],
      ];

      const fullPages = pagesData.map((p: any, idx: number) => {
        const c = colors[idx % colors.length];
        return {
          pageNumber: idx + 1,
          chapterTitle: p.chapterTitle || `Chapter ${idx + 1}`,
          scenePrompt: p.illustrationCaption || "A vibrant children's storybook scene",
          narrativeText: p.narrativeText,
          dialogueLines: (p.dialogue || []).map((d: any) => ({
            speaker: d.speaker || "Narrator",
            speakerRole: d.speakerRole || "narrator",
            avatar: d.avatar || "📖",
            text: d.text,
            voiceName: "Grandma Willow",
            mood: "cheerful",
          })),
          illustrationCaption: p.illustrationCaption || "Scene illustration",
          vocabulary: [
            {
              word: p.vocabularyWord || "Wonder",
              pronunciation: p.vocabularyPronunciation || "WUN-der",
              definition: p.vocabularyDefinition || "A feeling of joy and curiosity.",
              funFact: p.vocabularyFunFact || "Stories keep our imaginations strong!",
            },
          ],
          hiddenStar: {
            xPercent: 20 + ((idx * 27) % 60),
            yPercent: 15 + ((idx * 23) % 45),
            clue: "Look high in the glowing sky!",
          },
          funActivity: p.funActivity || "Imagine the colors in this scene!",
          illustrationSvg: `<svg viewBox="0 0 800 600" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="customPageGrad_${idx}" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="${c[0]}" />
                <stop offset="50%" stop-color="${c[1]}" />
                <stop offset="100%" stop-color="${c[2]}" />
              </linearGradient>
            </defs>
            <rect width="800" height="600" fill="url(#customPageGrad_${idx})" />
            <circle cx="400" cy="220" r="140" fill="#FEF08A" opacity="0.8" />
            <ellipse cx="400" cy="500" rx="460" ry="140" fill="#15803D" opacity="0.9" />
            <ellipse cx="400" cy="380" rx="70" ry="50" fill="#FDE68A" />
            <circle cx="400" cy="320" r="35" fill="#FDE68A" />
            <circle cx="390" cy="315" r="5" fill="#000" /><circle cx="410" cy="315" r="5" fill="#000" />
            <path d="M 390 330 Q 400 340 410 330" stroke="#78350F" stroke-width="3" fill="none" />
            <polygon points="400,100 404,112 416,113 406,122 410,134 400,127 390,134 394,122 384,113 396,112" fill="#FEF08A" />
          </svg>`,
        };
      });

      const newStory: ChildrenStory = {
        id: storyId,
        title,
        subtitle,
        region: selectedRegion.label,
        country: selectedRegion.country,
        flag: selectedRegion.flag,
        culture: selectedRegion.label,
        ageRange: parsedData?.ageRange || "4–8 years",
        readTimeMinutes: 5,
        theme: selectedTheme.label,
        moral: parsedData?.moral || "Love and friendship brighten the whole world.",
        coverCloth: selectedRegion.color,
        coverSpine: selectedRegion.color,
        accentColor: selectedRegion.color,
        paperColor: "#FFFDF7",
        cardColor: "#FEF3C7",
        summary: parsedData?.summary || `A heartwarming tale of ${heroCreature} from ${selectedRegion.country}.`,
        coverSvg: `<svg viewBox="0 0 800 500" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <rect width="800" height="500" fill="${selectedRegion.color}" />
          <circle cx="400" cy="250" r="160" fill="#FEF08A" opacity="0.3" />
          <circle cx="400" cy="250" r="60" fill="#FEF08A" />
        </svg>`,
        pages: fullPages,
      };

      playSparkleSound();
      onStoryCreated(newStory);
      onClose();
    } catch (err) {
      console.error("Weave story error:", err);
      alert("Let's try again! You can also enjoy our beautiful built-in library.");
    } finally {
      setIsWeaving(false);
      setWeavingStage("");
    }
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-xl w-full bg-[#FFFDF7] rounded-3xl p-6 sm:p-8 shadow-2xl border-4 border-[#FBBF24] max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between pb-3 mb-5 border-b border-amber-200">
          <div className="flex items-center gap-2">
            <span className="text-3xl">✨</span>
            <div>
              <h2 className="font-['Baloo_2'] text-2xl font-bold text-[#78350F]">
                AI Magic Story Weaver
              </h2>
              <p className="font-['Quicksand'] text-xs text-amber-800">
                Create a bespoke illustrated children's story from any culture!
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

        {isWeaving ? (
          <div className="py-12 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 rounded-full bg-amber-100 border-4 border-amber-400 border-t-amber-600 animate-spin mb-4" />
            <h3 className="font-['Baloo_2'] text-xl font-bold text-amber-900 mb-1">
              Weaving Your Illustrated Storybook...
            </h3>
            <p className="font-['Quicksand'] text-sm text-amber-700 animate-pulse">
              {weavingStage}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* World Culture Selector */}
            <div>
              <label className="block font-['Fredoka'] text-xs font-semibold uppercase text-amber-800 mb-1.5">
                1. Pick a World Region / Culture:
              </label>
              <div className="grid grid-cols-2 gap-2">
                {REGION_OPTIONS.map((reg) => (
                  <button
                    key={reg.id}
                    onClick={() => setSelectedRegion(reg)}
                    className={`py-2 px-3 rounded-xl text-xs font-['Fredoka'] text-left flex items-center gap-2 transition-all border ${
                      selectedRegion.id === reg.id
                        ? "bg-amber-100 border-amber-500 font-bold text-amber-950 shadow-xs"
                        : "bg-white hover:bg-amber-50/70 border-stone-200 text-stone-700"
                    }`}
                  >
                    <span className="text-lg">{reg.flag}</span>
                    <span className="truncate">{reg.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Theme / Moral */}
            <div>
              <label className="block font-['Fredoka'] text-xs font-semibold uppercase text-amber-800 mb-1.5">
                2. Core Moral or Heart Lesson:
              </label>
              <div className="flex flex-wrap gap-1.5">
                {THEME_OPTIONS.map((th) => (
                  <button
                    key={th.id}
                    onClick={() => setSelectedTheme(th)}
                    className={`py-1.5 px-3 rounded-full text-xs font-['Fredoka'] flex items-center gap-1.5 transition-all border ${
                      selectedTheme.id === th.id
                        ? "bg-amber-500 text-white font-bold border-amber-600 shadow-xs"
                        : "bg-white text-stone-700 hover:bg-amber-100 border-stone-200"
                    }`}
                  >
                    <span>{th.icon}</span>
                    <span>{th.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Hero / Character */}
            <div>
              <label className="block font-['Fredoka'] text-xs font-semibold uppercase text-amber-800 mb-1.5">
                3. Protagonist / Animal Companion:
              </label>
              <input
                type="text"
                value={heroCreature}
                onChange={(e) => setHeroCreature(e.target.value)}
                placeholder="e.g. Maya the brave cloud kitten, or Little Tariq"
                className="w-full px-4 py-2.5 rounded-xl border border-amber-300 bg-white font-['Quicksand'] text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>

            {/* Custom Extra Wishes */}
            <div>
              <label className="block font-['Fredoka'] text-xs font-semibold uppercase text-amber-800 mb-1.5">
                4. Extra Story Ideas (Optional):
              </label>
              <textarea
                rows={2}
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
                placeholder="e.g. Include a gentle sleeping dragon, a magical flute, and a cozy cup of tea..."
                className="w-full px-4 py-2 rounded-xl border border-amber-300 bg-white font-['Quicksand'] text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-400 resize-none"
              />
            </div>

            <button
              onClick={handleWeaveStory}
              className="mt-2 w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-['Fredoka'] font-bold text-base shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              <span>🪄</span>
              <span>Weave 4-Page Illustrated Storybook</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
